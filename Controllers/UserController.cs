using ChessForumWebApp.Interfaces;
using ChessForumWebApp.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace ChessForumWebApp.Controllers
{
    public class UserController : Controller
    {
        private readonly IUserRepository _userRepository;

        public UserController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }
        [HttpGet("Users")]
        public async Task<IActionResult> Index()
        {
            var users = await _userRepository.GetAllUsers();
            List<UserViewModel> result = new List<UserViewModel>();
            foreach(var user in users)
            {
                var userVM = new UserViewModel
                {
                    Id = user.Id,
                    UserName = user.UserName,
                    FideRating = user.FideRating,
                    ProfileImageUrl = user.ProfileImageUrl
                };
                result.Add(userVM);
            }
            return View(result);
        }

        public async Task<IActionResult> Detail(string id)
        {
            var user = await _userRepository.GetUserById(id);
            var userDetailViewModel = new UserDetailViewModel()
            {
                Id = user.Id,
                FideRating = user.FideRating,
                UserName = user.UserName,
                ProfileImageUrl = user.ProfileImageUrl
            };
            return View(userDetailViewModel);
        }
    }
}
