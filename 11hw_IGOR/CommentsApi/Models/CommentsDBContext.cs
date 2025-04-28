using Microsoft.EntityFrameworkCore;

namespace CommentsApi.Models
{
    public class CommentsDbContext : DbContext
    {
        public CommentsDbContext(DbContextOptions<CommentsDbContext> options) : base(options)
        {

        }

        public DbSet<Comment> Comments { get; set; }
    }
}