using MediatR;
using PressStart2.Domain.DTOs;

namespace PressStart2.Domain.Commands.UsuarioCommands.LoginUsuario
{
    public class LoginUsuarioRequest : IRequest<CommandResponse>
    {
        public string Login { get; set; }
        public string Senha { get; set; }

        public LoginUsuarioRequest(string login, string senha)
        {
            Login = login;
            Senha = senha;
        }
    }
}
