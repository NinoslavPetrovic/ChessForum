using ChessForumWebApp.Models;
using Microsoft.AspNetCore.Mvc;

namespace ChessForumWebApp.Interfaces
{
    public interface IUserRepository
    {
        Task<IEnumerable<AppUser>> GetAllUsers();
        Task<AppUser> GetUserById(string id);
        bool Add(AppUser user);
        bool Delete(AppUser user);
        bool Update(AppUser user);
        bool Save();
        
    }
}
