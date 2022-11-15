using ChessForumWebApp.Data;
using ChessForumWebApp.Interfaces;
using ChessForumWebApp.Models;
using Microsoft.EntityFrameworkCore;

namespace ChessForumWebApp.Repository
{
    public class TournamentRepository : ITournamentRepository
    {
        private readonly ApplicationDbContext _context;

        public TournamentRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public bool Add(Tournament tournament)
        {
            _context.Add(tournament);
            return Save();
        }

        public bool Delete(Tournament tournament)
        {
            _context.Remove(tournament);
            return Save();
        }

        public async Task<IEnumerable<Tournament>> GetAll()
        {
            return await _context.Tournaments.ToListAsync();
        }

        public async Task<IEnumerable<Tournament>> GetAllTournamentsByCity(string city)
        {
            return await _context.Tournaments.Where(a => a.Address.City.Contains(city)).ToListAsync();
        }


        public async Task<Tournament> GetByIdAsync(int id)
        {
            return await _context.Tournaments.Include(i => i.Address).FirstOrDefaultAsync(a => a.Id == id);
        }
        public async Task<Tournament> GetByIdAsyncNoTracking(int id)
        {
            return await _context.Tournaments.Include(i => i.Address).AsNoTracking().FirstOrDefaultAsync(a => a.Id == id);
        }

        public bool Save()
        {
            var saved = _context.SaveChanges();
            return saved > 0 ? true : false;
        }

        public bool Update(Tournament tournament)
        {
            _context.Update(tournament);
            return Save();
        }
    }
}
