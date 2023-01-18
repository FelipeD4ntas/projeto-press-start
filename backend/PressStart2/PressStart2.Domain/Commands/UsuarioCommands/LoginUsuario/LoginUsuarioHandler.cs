using MediatR;
using PressStart2.Domain.DTOs;
using PressStart2.Domain.Entities;
using PressStart2.Domain.Interfaces.Repositories;
using PressStart2.Domain.Services;
using PressStart2.Infra.CrossCutting.Constants;
using prmToolkit.NotificationPattern;
using SecureIdentity.Password;

namespace PressStart2.Domain.Commands.UsuarioCommands.LoginUsuario
{
    public class LoginUsuarioHandler : Notifiable, IRequestHandler<LoginUsuarioRequest, CommandResponse>
    {
        private readonly IRepositoryUsuario _repositoryUsuario;
        private readonly TokenService _tokenService;

        public LoginUsuarioHandler(IRepositoryUsuario repositoryUsuario, TokenService tokenService)
        {
            _repositoryUsuario = repositoryUsuario;
            _tokenService = tokenService;
        }

        public Task<CommandResponse> Handle(LoginUsuarioRequest request, CancellationToken cancellationToken)
        {
            var usuario = _repositoryUsuario.Autenticar(request.Login);

            if (usuario == null)
            {
                AddNotification(Notificacoes.USUARIO_MODULO, Notificacoes.USUARIO_LOGIN_INCORRETO);
                return Task.FromResult(new CommandResponse(this));
            }

            if (!PasswordHasher.Verify(usuario.Senha, request.Senha))
            {
                AddNotification(Notificacoes.USUARIO_MODULO, Notificacoes.USUARIO_LOGIN_INCORRETO);
                return Task.FromResult(new CommandResponse(this));
            }

            var token = _tokenService.GerarToken(usuario);
            var loginUsuarioResponse = new LoginUsuarioResponse(usuario.Id, usuario.Nome, token);

            return Task.FromResult(new CommandResponse(loginUsuarioResponse, this));
        }
    }
}
