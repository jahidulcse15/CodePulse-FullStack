namespace CodePulse.API.Models.DTO
{
    public class LoginResponseDto
    {
        public string Email { get; set; }
        public IList<string>Roles { get; set; }
    }
}
