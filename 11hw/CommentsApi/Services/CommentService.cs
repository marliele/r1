using System.Collections.Generic;
using System.Threading.Tasks;
using CommentsApi.Models;
using CommentsApi.Repositories;

namespace CommentsApi.Services
{
    public class CommentService
    {
        private readonly ICommentRepository _repository;

        public CommentService(ICommentRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<Comment>> GetAllComments()
        {
            return await _repository.GetAllComments();
        }

        public async Task<Comment> GetCommentById(int id)
        {
            return await _repository.GetCommentById(id);
        }

        public async Task AddComment(Comment comment)
        {
            await _repository.AddComment(comment);
        }

        public async Task UpdateComment(int id, Comment comment)
        {
            await _repository.UpdateComment(id, comment);
        }

        public async Task DeleteComment(int id)
        {
            await _repository.DeleteComment(id);
        }
    }
}