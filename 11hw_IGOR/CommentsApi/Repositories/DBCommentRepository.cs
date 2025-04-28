using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using CommentsApi.Models;

namespace CommentsApi.Repositories
{
    public class DbCommentRepository : ICommentRepository
    {
        private readonly CommentsDbContext _context;

        public DbCommentRepository(CommentsDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Comment>> GetAll()
        {
            return await _context.Comments.ToListAsync();
        }

        public async Task<Comment> GetById(int id)
        {
            return await _context.Comments.FindAsync(id);
        }

        public async Task<Comment> Add(Comment comment)
        {
            _context.Comments.Add(comment);
            await _context.SaveChangesAsync();
            return comment;
        }

        public async Task Update(int id, Comment comment)
        {
            _context.Entry(comment).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task Delete(int id)
        {
            var comment = await _context.Comments.FindAsync(id);
            if (comment != null)
            {
                _context.Comments.Remove(comment);
                await _context.SaveChangesAsync();
            }
        }
    }
}
