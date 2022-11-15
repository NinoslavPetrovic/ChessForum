using ChessForumWebApp.Data;
using ChessForumWebApp.Interfaces;
using ChessForumWebApp.Models;
using Microsoft.EntityFrameworkCore;

namespace ChessForumWebApp.Repository
{
    public class DashboardRepository : IDashboardRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public DashboardRepository(ApplicationDbContext context, IHttpContextAccessor httpContextAccessor)
        {
            _context = context;
            _httpContextAccessor = httpContextAccessor;
        }
        public async Task<List<Club>> GetAllUserClubs()
        {
            var curUser = _httpContextAccessor.HttpContext?.User.GetUserId();
            var userClubs = _context.Clubs.Where(r => r.AppUser.Id == curUser);
            return userClubs.ToList();
        }

        public async Task<List<Tournament>> GetAllUserTournaments()
        {
            var curUser = _httpContextAccessor.HttpContext?.User.GetUserId();
            var userTournaments = _context.Tournaments.Where(r => r.AppUser.Id == curUser);
            return userTournaments.ToList();
        }

        public async Task<AppUser> GetUserById(string id)
        {
            return await _context.Users.FindAsync(id);
        }
        public async Task<AppUser> GetUserByIdNoTracking(string id)
        {
            var user = await _context.Users.Where(a => a.Id == id).AsNoTracking().FirstOrDefaultAsync();
            return user;
        }
        public bool Update(AppUser appUser)
        {
            _context.Users.Update(appUser);
            return Save();
        }
        public bool Save()
        {
            var saved = _context.SaveChanges();
            return saved > 0 ? true : false;
        }
    }
}
