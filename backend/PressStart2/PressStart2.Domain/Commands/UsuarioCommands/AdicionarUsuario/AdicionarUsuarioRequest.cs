using MediatR;
using PressStart2.Domain.DTOs;

namespace PressStart2.Domain.Commands.UsuarioCommands.AdicionarUsuario
{
    public class AdicionarUsuarioRequest : IRequest<CommandResponse>
    {
        public string Nome { get; set; }
        public string Email { get; set; }
        public string Senha { get; set; }
        public string ConfirmacaoSenha { get; set; }
    }
}
