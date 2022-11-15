using ChessForumWebApp.Data;
using ChessForumWebApp.Interfaces;
using ChessForumWebApp.Models;
using ChessForumWebApp.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ChessForumWebApp.Controllers
{
    public class ClubController : Controller
    {
        private readonly IClubRepository _clubRepository;
        private readonly IPhotoServices _photoServices;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public ClubController(IClubRepository clubRepository, IPhotoServices photoServices, IHttpContextAccessor httpContextAccessor)
        {
            _clubRepository = clubRepository;
            _photoServices = photoServices;
            _httpContextAccessor = httpContextAccessor;
        }
        public async Task<IActionResult> Index()
        {
            IEnumerable<Club> clubs = await _clubRepository.GetAll();
            return View(clubs);
        }
        public async Task<IActionResult> Detail(int id)
        {
            Club club = await _clubRepository.GetByIdAsync(id);
            return View(club);
        }
        public IActionResult Create()
        {
            var curUserId = _httpContextAccessor.HttpContext.User.GetUserId();
            var createClubViewModel = new CreateClubViewModel { AppUserId = curUserId };
            return View(createClubViewModel);
        }
        [HttpPost]
        public async Task<IActionResult> Create(CreateClubViewModel clubVM)
        {
            if (ModelState.IsValid)
            {
                var result = await _photoServices.AddPhotoAsync(clubVM.Image);
                var club = new Club
                {
                    Title = clubVM.Title,
                    Description = clubVM.Description,
                    Image = result.Url.ToString(),
                    AppUserId = clubVM.AppUserId,
                    Address = new Address
                    {
                        Street = clubVM.Address.Street,
                        City = clubVM.Address.City,
                        State = clubVM.Address.State
                    }
                };
                _clubRepository.Add(club);
                return RedirectToAction("Index");
            }
            else
            {
                ModelState.AddModelError("", "Photo upload failed!");
            }
            return View(clubVM);
        }

        public async Task<IActionResult> Edit(int Id)
        {
            var club = await _clubRepository.GetByIdAsync(Id);
            if (club == null) return View("Error");
            var clubVM = new EditClubViewModel
            {
                Title = club.Title,
                Description = club.Description,
                AddressId = club.AddressId,
                Address = club.Address,
                URL = club.Image,
                ClubCategory = club.ClubCategory
            };
            return View(clubVM);
        }
        [HttpPost]
        public async Task<IActionResult> Edit(int Id, EditClubViewModel clubVM)
        {
            if (!ModelState.IsValid)
            {
                ModelState.AddModelError("", "Failed to edit club");
                return View("Edit", clubVM);
            }
            var userClub = await _clubRepository.GetByIdAsyncNoTracking(Id);
            if (userClub != null)
            {
                try
                {
                    await _photoServices.DeletePhotoAsync(userClub.Image);
                }
                catch (Exception ex)
                {
                    ModelState.AddModelError("", "Failer to delete old photo");
                    return View(clubVM);
                }

                var photoResult = await _photoServices.AddPhotoAsync(clubVM.Image);
                var club = new Club
                {
                    Id = Id,
                    Title = clubVM.Title,
                    Description = clubVM.Description,
                    Image = photoResult.Url.ToString(),
                    AddressId = clubVM.AddressId,
                    Address = clubVM.Address
                };
                _clubRepository.Update(club);
                return RedirectToAction("Index");

            }
            else return View(clubVM);
        }
        public async Task<IActionResult> Delete(int Id)
        {
            var club = await _clubRepository.GetByIdAsync(Id);
            if (club == null) return View("Error");
            return View(club);
        }
        [HttpPost, ActionName("Delete")]
        public async Task<IActionResult> DeleteClub(int Id)
        {
            var club = await _clubRepository.GetByIdAsync(Id);
            if (club == null) return View("Error");
            _clubRepository.Delete(club);
            return RedirectToAction("Index");
        }
    }
}
