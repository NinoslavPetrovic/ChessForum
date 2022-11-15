using ChessForumWebApp.Data;
using ChessForumWebApp.Interfaces;
using ChessForumWebApp.Models;
using ChessForumWebApp.Repository;
using ChessForumWebApp.Services;
using ChessForumWebApp.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ChessForumWebApp.Controllers
{
    public class TournamentController : Controller
    {
        private readonly ITournamentRepository _tournamentRepository;
        private readonly IPhotoServices _photoServices;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public TournamentController(ITournamentRepository tournamentRepository, IPhotoServices photoServices, IHttpContextAccessor httpContextAccessor)
        {
            _tournamentRepository = tournamentRepository;
            _photoServices = photoServices;
            _httpContextAccessor = httpContextAccessor;
        }
        public async Task<IActionResult> Index()
        {
            var tournaments = await _tournamentRepository.GetAll();
            return View(tournaments);
        }
        public async Task<IActionResult> Detail(int id)
        {
            Tournament t = await _tournamentRepository.GetByIdAsync(id);
            return View(t);
        }

        public IActionResult Create()
        {
            var curUserId = _httpContextAccessor.HttpContext?.User.GetUserId();
            var createTournamentViewModel = new CreateTournamentViewModel { AppUserId = curUserId };
            return View(createTournamentViewModel);
        }
        [HttpPost]
        public async Task<IActionResult> Create(CreateTournamentViewModel tournamentVM)
        {
            if (ModelState.IsValid)
            {
                var result = await _photoServices.AddPhotoAsync(tournamentVM.Image);
                var tournament = new Tournament
                {
                    Title = tournamentVM.Title,
                    Description = tournamentVM.Description,
                    Image = result.Url.ToString(),
                    AppUserId = tournamentVM.AppUserId,
                    Address = new Address
                    {
                        Street = tournamentVM.Address.Street,
                        City = tournamentVM.Address.City,
                        State = tournamentVM.Address.State
                    }
                };
                _tournamentRepository.Add(tournament);
                return RedirectToAction("Index");
            }
            else
            {
                ModelState.AddModelError("", "Photo upload failed!");
            }
            return View(tournamentVM);
        }
        public async Task<IActionResult> Edit(int Id)
        {
            var tournament = await _tournamentRepository.GetByIdAsync(Id);
            if (tournament == null) return View("Error");
            var tournamentVM = new EditTournamentViewModel
            {
                Title = tournament.Title,
                Description = tournament.Description,
                AddressId = tournament.AddressId,
                Address = tournament.Address,
                URL = tournament.Image,
                TournamentCategory = tournament.TournamentCategory
            };
            return View(tournamentVM);
        }
        [HttpPost]
        public async Task<IActionResult> Edit(int Id, EditTournamentViewModel tournamentVM)
        {
            if (!ModelState.IsValid)
            {
                ModelState.AddModelError("", "Failed to edit club");
                return View("Edit", tournamentVM);
            }
            var userTournament = await _tournamentRepository.GetByIdAsyncNoTracking(Id);
            if (userTournament != null)
            {
                try
                {
                    await _photoServices.DeletePhotoAsync(userTournament.Image);
                }
                catch (Exception ex)
                {
                    ModelState.AddModelError("", "Failer to delete old photo");
                    return View(tournamentVM);
                }

                var photoResult = await _photoServices.AddPhotoAsync(tournamentVM.Image);
                var tournament = new Tournament
                {
                    Id = Id,
                    Title = tournamentVM.Title,
                    Description = tournamentVM.Description,
                    Image = photoResult.Url.ToString(),
                    AddressId = tournamentVM.AddressId,
                    Address = tournamentVM.Address
                };
                _tournamentRepository.Update(tournament);
                return RedirectToAction("Index");

            }
            else return View(tournamentVM);
        }
        public async Task<IActionResult> Delete(int Id)
        {
            var tournament = await _tournamentRepository.GetByIdAsync(Id);
            if (tournament == null) return View("Error");
            return View(tournament);
        }
        [HttpPost, ActionName("Delete")]
        public async Task<IActionResult> DeleteTournament(int Id)
        {
            var tournament = await _tournamentRepository.GetByIdAsync(Id);
            if (tournament == null) return View("Error");
            _tournamentRepository.Delete(tournament);
            return RedirectToAction("Index");
        }
    }
}
