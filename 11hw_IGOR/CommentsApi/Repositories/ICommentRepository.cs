using CommentsApi.Models;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace CommentsApi.Repositories
{
    public interface ICommentRepository
    {
        Task<IEnumerable<Comment>> GetAll();
        Task<Comment?> GetById(int id);
        Task<Comment> Add(Comment comment);
        Task Update(int id, Comment updated);
        Task Delete(int id);
    }
}
