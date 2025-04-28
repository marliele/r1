using CommentsApi.Models;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace CommentsApi.Repositories
{
    public class CommentRepository : ICommentRepository
    {
        private readonly Dictionary<int, Comment> _comments = new();
        private static int _nextId = 1;

        public async Task<IEnumerable<Comment>> GetAll() => await Task.FromResult(_comments.Values);

        public async Task<Comment?> GetById(int id)
        {
            _comments.TryGetValue(id, out var comment);
            return await Task.FromResult(comment);
        }

        public async Task<Comment> Add(Comment comment)
        {
            comment.Id = _nextId++;
            _comments[comment.Id] = comment;
            return await Task.FromResult(comment);
        }

        public async Task Update(int id, Comment updated)
        {
            if (_comments.ContainsKey(id))
            {
                updated.Id = id;
                _comments[id] = updated;
            }
        }

        public async Task Delete(int id)
        {
            _comments.Remove(id);
            await Task.CompletedTask;
        }
    }
}