using ChessForumWebApp.Data;
using ChessForumWebApp.Models;
using ChessForumWebApp.ViewModels;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace ChessForumWebApp.Controllers
{
    public class AccountController : Controller
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _singInManager;
        private readonly ApplicationDbContext _context;
        public AccountController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, ApplicationDbContext context)
        {
            _userManager = userManager;
            _singInManager = signInManager;
            _context = context;
        }

        public IActionResult Login()
        {
            var response = new LoginViewModel();
            return View(response);
        }
        [HttpPost]
        public async Task<IActionResult> Login(LoginViewModel login)
        {
            if(!ModelState.IsValid) return View(login);
            var user = await _userManager.FindByEmailAsync(login.EmailAddress);
            if(user != null)
            {
                //User is Found
                var checkPassword = await _userManager.CheckPasswordAsync(user, login.Password);
                if(checkPassword)
                {
                    var result = await _singInManager.PasswordSignInAsync(user, login.Password, false, false);
                    if(result.Succeeded)
                    {
                        return RedirectToAction("Index", "Tournament");
                    }
                }  
                TempData["Error"] = "Wrong password. Please try again.";
                return View(login);
               
            }
            else
            {
                TempData["Error"] = "Wrong username. Please try again.";
                return View(login);
            }
        }

        public IActionResult Register()
        {
            var response = new RegisterViewModel();
            return View(response);
        }
        [HttpPost]
        public async Task<IActionResult> Register(RegisterViewModel register)
        {
            if (!ModelState.IsValid) return View(register);
            var user = await _userManager.FindByEmailAsync(register.EmailAddress);
            if (user != null) 
            {
                TempData["Error"] = "Email address is already used.";
                return View(register);
            }
            var newUser = new AppUser()
            {
                Email = register.EmailAddress,
                UserName = register.EmailAddress
            };
            var newUserResponse = await _userManager.CreateAsync(newUser, register.Password);
            if(newUserResponse.Succeeded)            
                await _userManager.AddToRoleAsync(newUser, UserRoles.User);
            return RedirectToAction("Index", "Tournament");
        }
        [HttpPost]
        public async Task<IActionResult> Logout()
        {
            await _singInManager.SignOutAsync();
            return RedirectToAction("Index", "Tournament");
        }
    }
}
