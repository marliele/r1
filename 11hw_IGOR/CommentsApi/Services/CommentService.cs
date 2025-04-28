using System.Threading.Tasks;
using System.Collections.Generic;
using CommentsApi.Models;
using CommentsApi.Repositories;

namespace CommentsApi.Services
{
    public class CommentService
    {
        private readonly ICommentRepository _repo;

        public CommentService(ICommentRepository repo)
        {
            _repo = repo;
        }

        public Task<IEnumerable<Comment>> GetAll() => _repo.GetAll();
        public Task<Comment?> GetById(int id) => _repo.GetById(id);
        public Task<Comment> Add(Comment comment) => _repo.Add(comment);
        public Task Update(int id, Comment comment) => _repo.Update(id, comment);
        public Task Delete(int id) => _repo.Delete(id);
    }
}