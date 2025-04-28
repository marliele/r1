using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

using CommentsApi.Services;
using CommentsApi.Repositories;
using CommentsApi.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        policy =>
        {
            policy.AllowAnyOrigin()
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
}); 

builder.Services.AddScoped<ICommentRepository, CommentDbRepository>();
builder.Services.AddScoped<CommentService>();
builder.Services.AddDbContext<CommentsDbContext>(options =>
    options.UseNpgsql("Host=localhost;Database=postgres;Username=postgres;Password=postgres"));

var app = builder.Build();

app.UseCors("AllowAll");

var commentApi = app.MapGroup("/api/comments");

commentApi.MapGet("/", async (CommentService service) =>
{
    return Results.Ok(await service.GetAllComments());
});

commentApi.MapGet("/{id:int}", async (int id, CommentService service) =>
{
    var comment = await service.GetCommentById(id);
    return comment is null ? Results.NotFound() : Results.Ok(comment);
});

commentApi.MapPost("/", async (Comment comment, CommentService service) =>
{
    await service.AddComment(comment);
    return Results.Created($"/api/comments/{comment.Id}", comment);
});

commentApi.MapPatch("/{id:int}", async (int id, Comment comment, CommentService service) =>
{
    if (id != comment.Id)
        return Results.BadRequest("ID in URL and body do not match");

    await service.UpdateComment(id, comment);
    return Results.Ok(comment);
});

commentApi.MapDelete("/{id:int}", async (int id, CommentService service) =>
{
    await service.DeleteComment(id);
    return Results.NoContent();
});

app.Run();