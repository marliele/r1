using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

using CommentsApi.Models;
using CommentsApi.Repositories;
using CommentsApi.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", p =>
        p.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
});

builder.Services.AddScoped<ICommentRepository, DbCommentRepository>();
builder.Services.AddScoped<CommentService>();
builder.Services.AddDbContext<CommentsDbContext>(options =>
    options.UseNpgsql("Host=localhost;Database=comments;Username=postgres;Password=postgres"));

var app = builder.Build();

app.UseCors("AllowAll");

var api = app.MapGroup("/api/comments");

api.MapGet("/", async (CommentService service) =>
    Results.Ok(await service.GetAll()));

api.MapGet("/{id:int}", async (int id, CommentService service) =>
{
    var comment = await service.GetById(id);
    return comment is null ? Results.NotFound() : Results.Ok(comment);
});

api.MapPost("/", async (Comment comment, CommentService service) =>
{
    var added = await service.Add(comment);
    return Results.Created($"/api/comments/{added.Id}", added);
});

api.MapPatch("/{id:int}", async (int id, Comment updated, CommentService service) =>
{
    if (id != updated.Id) return Results.BadRequest("Mismatched IDs");
    await service.Update(id, updated);
    return Results.Ok(updated);
});

api.MapDelete("/{id:int}", async (int id, CommentService service) =>
{
    await service.Delete(id);
    return Results.NoContent();
});

app.Run();