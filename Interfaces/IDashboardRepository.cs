using ChessForumWebApp.Models;

namespace ChessForumWebApp.Interfaces
{
    public interface IDashboardRepository
    {
        Task<List<Club>> GetAllUserClubs();
        Task<List<Tournament>> GetAllUserTournaments();
        Task<AppUser> GetUserById(string id);
        Task<AppUser> GetUserByIdNoTracking(string id);
        bool Update(AppUser appUser);
        bool Save();
    }
}
