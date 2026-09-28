using CodePulse.API.Models.DTO;
using CodePulse.API.Repositories.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace CodePulse.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly ITokenRepository tokenRepository;

        public AuthController(UserManager<IdentityUser> userManager, SignInManager<IdentityUser> signInManager, ITokenRepository tokenRepository)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            this.tokenRepository = tokenRepository;
        }

        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequestDto registerRequestDto)
        {
            var email = registerRequestDto.Email?.Trim();

            var findEmail = await _userManager.FindByEmailAsync(email);
            if(findEmail != null)
            {
                return BadRequest("Email already registered.");
            }

            var user = new IdentityUser
            {
                UserName = email,
                Email = email
            };

            var result=await _userManager.CreateAsync(user,registerRequestDto.Password);

            if (result.Succeeded)
            {
                result=await _userManager.AddToRoleAsync(user, "Reader");

                if (result.Succeeded)
                {
                    return Ok("register successfully.");
                }
            }

            foreach(var error in result.Errors)
            {
                ModelState.AddModelError("", error.Description);
            }

            return ValidationProblem(ModelState);
        }


        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequestDto loginRequestDto)
        {
            var existsUser =await _userManager.FindByEmailAsync(loginRequestDto.Email);

            if (existsUser == null)
            {
                ModelState.AddModelError("", "Email or password is incorrect.");
                return ValidationProblem(ModelState);
            }

            var User =await _signInManager.CheckPasswordSignInAsync(
                     existsUser,
                     loginRequestDto.Password,
                     false
                     
             );

            if (!User.Succeeded)
            {
                ModelState.AddModelError("", "Email or password is incorrect.");
                return ValidationProblem(ModelState);
            }

            var roles =await _userManager.GetRolesAsync(existsUser);

            var token =tokenRepository.CreateJwtToken(existsUser, roles.ToList());

            var response = new LoginResponseDto
            {
                Email=existsUser.Email,
                Tokens=token,
                Roles=roles
            };

            return Ok(response);
        }
    }
}
