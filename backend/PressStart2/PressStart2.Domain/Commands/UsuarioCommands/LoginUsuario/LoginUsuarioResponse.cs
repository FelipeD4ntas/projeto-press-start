namespace PressStart2.Domain.Commands.UsuarioCommands.LoginUsuario
{
    public class LoginUsuarioResponse
    {
        public Guid Id { get; }
        public string Nome { get; }
        public string Token { get; }

        public LoginUsuarioResponse(Guid id, string nome, string token)
        {
            Id = id;
            Nome = nome;
            Token = token;
        }
    }
}
