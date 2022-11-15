using ChessForumWebApp.Models;

namespace ChessForumWebApp.Interfaces
{
    public interface ITournamentRepository
    {        
        Task<IEnumerable<Tournament>> GetAll();
        Task<Tournament> GetByIdAsync(int id);
        Task<Tournament> GetByIdAsyncNoTracking(int id);
        Task<IEnumerable<Tournament>> GetAllTournamentsByCity(string city);
        bool Add(Tournament tournament);
        bool Update(Tournament tournament);
        bool Delete(Tournament tournament);
        bool Save();
    }
}
