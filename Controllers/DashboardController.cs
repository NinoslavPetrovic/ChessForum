using ChessForumWebApp.Interfaces;
using ChessForumWebApp.Models;
using ChessForumWebApp.ViewModels;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Mvc;

namespace ChessForumWebApp.Controllers
{
    public class DashboardController : Controller
    {
        private readonly IDashboardRepository _dashboardRepository;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IPhotoServices _photoServices;

        public DashboardController(IDashboardRepository dashboardRepository,
            IHttpContextAccessor httpContextAccessor, IPhotoServices photoServices)
        {
            _dashboardRepository = dashboardRepository;
            _httpContextAccessor = httpContextAccessor;
            _photoServices = photoServices;
        }

        private void MapUserEdit(AppUser user, EditUserDashboardViewModel editVM, ImageUploadResult photoResult)
        {
            user.Id = editVM.Id;
            user.FideRating = editVM.FideRating;
            user.City = editVM.City;
            user.State = editVM.State;
            user.ProfileImageUrl = photoResult.Url.ToString();
        }
        public async Task<IActionResult> Index()
        {
            var userClubs = await _dashboardRepository.GetAllUserClubs();
            var userTournaments = await _dashboardRepository.GetAllUserTournaments();
            var dashboardViewModel = new DashboardViewModel()
            {
                Clubs = userClubs,
                Tournaments = userTournaments
            };
            return View(dashboardViewModel);
        }

        public async Task<IActionResult> EditUserProfile()
        {
            var curUserId = _httpContextAccessor.HttpContext.User.GetUserId();
            var user = await _dashboardRepository.GetUserById(curUserId);
            if (user == null) return View("Error");
            var editUserDVM = new EditUserDashboardViewModel()
            {
                Id = user.Id,
                FideRating = user.FideRating,
                ProfileImageUrl = user.ProfileImageUrl,
                City = user.City,
                State = user.State
            };
            return View(editUserDVM);
        }
        [HttpPost]
        public async Task<IActionResult> EditUserProfile(EditUserDashboardViewModel editVM)
        {
            if (!ModelState.IsValid)
            {
                ModelState.AddModelError("", "Failed to edit profile");
                return View("EditUserProfile", editVM);
            }
            var user = await _dashboardRepository.GetUserByIdNoTracking(editVM.Id);
            if (user.ProfileImageUrl == "" || user.ProfileImageUrl == null)
            {
                var result = await _photoServices.AddPhotoAsync(editVM.Image);
                MapUserEdit(user, editVM, result);
                _dashboardRepository.Update(user);
                return RedirectToAction("Index");
            }
            else
            {
                try
                {
                    await _photoServices.DeletePhotoAsync(user.ProfileImageUrl);
                }
                catch
                {
                    ModelState.AddModelError("", "Pohoto deletion failed");
                    return View(editVM);
                }
                var result = await _photoServices.AddPhotoAsync(editVM.Image);
                MapUserEdit(user, editVM, result);
                _dashboardRepository.Update(user);
                return RedirectToAction("Index");
            }
            
        }
    }
}
