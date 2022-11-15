using ChessForumWebApp.Data.Enum;
using ChessForumWebApp.Models;

namespace ChessForumWebApp.ViewModels
{
    public class EditTournamentViewModel
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int AddressId { get; set; }
        public Address Address { get; set; }
        public IFormFile Image { get; set; }
        public string? URL { get; set; }
        public TournamentCategory TournamentCategory { get; set; }
    }
}
