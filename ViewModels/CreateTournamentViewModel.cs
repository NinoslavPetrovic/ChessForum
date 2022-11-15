using ChessForumWebApp.Data.Enum;
using ChessForumWebApp.Models;

namespace ChessForumWebApp.ViewModels
{
    public class CreateTournamentViewModel
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public Address Address { get; set; }
        public string AppUserId { get; set; }
        public IFormFile Image { get; set; }
        public TournamentCategory TournamentCategory { get; set; }
    }
}
