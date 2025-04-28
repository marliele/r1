using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CommentsApi.Models;

namespace CommentsApi.Repositories
{
    public class CommentRepository : ICommentRepository
    {
        private static int _nextId = 0;
        private readonly Dictionary<int, Comment> _comments = new Dictionary<int, Comment>();

        public CommentRepository()
        {
            var comments = new List<Comment> {};

            foreach (var comment in comments)
            {
                _comments[comment.Id] = comment;
            }
        }

        public async Task<IEnumerable<Comment>> GetAllComments()
        {
            return await Task.FromResult(_comments.Values.AsEnumerable());
        }

        public async Task<Comment> GetCommentById(int id)
        {
            if (_comments.TryGetValue(id, out var comment))
            {
                return await Task.FromResult(comment);
            }
            return null;
        }

        public async Task AddComment(Comment comment)
        {
            comment.Id = _nextId;
            _comments[comment.Id] = comment;
            Console.WriteLine($"Added comment with ID: {comment.Id}");
            _nextId += 1;
        }

        public async Task UpdateComment(int id, Comment comment)
        {
            _comments[id] = comment;
        }

        public async Task DeleteComment(int id)
        {
            _comments.Remove(id);
        }
    }
}