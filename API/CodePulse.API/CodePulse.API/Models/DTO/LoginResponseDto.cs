namespace CodePulse.API.Models.DTO
{
    public class LoginResponseDto
    {
        public string Email { get; set; }
        public string Tokens { get; set; }
        public IList<string>Roles { get; set; }
    }
}
