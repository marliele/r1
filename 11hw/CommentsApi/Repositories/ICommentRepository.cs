using System.Collections.Generic;
using System.Threading.Tasks;
using CommentsApi.Models;

namespace CommentsApi.Repositories
{
    public interface ICommentRepository
    {
        Task<IEnumerable<Comment>> GetAllComments();
        Task<Comment> GetCommentById(int id);
        Task AddComment(Comment comment);
        Task UpdateComment(int id, Comment comment);
        Task DeleteComment(int id);
    }
}