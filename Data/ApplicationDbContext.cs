using ChessForumWebApp.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace ChessForumWebApp.Data
{
    public class ApplicationDbContext : IdentityDbContext<AppUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
                
        }
        public DbSet<Club> Clubs { get; set; }
        public DbSet<Tournament> Tournaments { get; set; }
        public DbSet<Address> Addresses { get; set; }
    }
}
