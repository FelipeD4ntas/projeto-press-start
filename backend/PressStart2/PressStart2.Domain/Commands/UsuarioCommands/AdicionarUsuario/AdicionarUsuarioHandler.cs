using MediatR;
using PressStart2.Domain.DTOs;
using PressStart2.Domain.Entities;
using PressStart2.Domain.Extensions;
using PressStart2.Domain.Interfaces.Repositories;
using PressStart2.Infra.CrossCutting.Constants;
using prmToolkit.NotificationPattern;

namespace PressStart2.Domain.Commands.UsuarioCommands.AdicionarUsuario
{
    public class AdicionarUsuarioHandler : Notifiable, IRequestHandler<AdicionarUsuarioRequest, CommandResponse>
    {
        private readonly IRepositoryUsuario _repositoryUsuario;

        public AdicionarUsuarioHandler(IRepositoryUsuario repositoryUsuario)
        {
            _repositoryUsuario = repositoryUsuario;
        }

        public Task<CommandResponse> Handle(AdicionarUsuarioRequest request, CancellationToken cancellationToken)
        {
            if (_repositoryUsuario.EmailjaCadastrado(request.Email))
            {
                AddNotification(Notificacoes.USUARIO_MODULO, Notificacoes.USUARIO_EMAIL_CADASTRADO);
            }

            if (request.Senha != request.ConfirmacaoSenha)
            {
                AddNotification(Notificacoes.USUARIO_MODULO, Notificacoes.USUARIO_SENHA_NAO_CONFERE);
            }

            var usuario = new Usuario(request.Nome, request.Email, request.Senha.EncryptSenha());
            AddNotifications(usuario);

            if (IsInvalid())
            {
                return Task.FromResult(new CommandResponse(this));
            }

            _repositoryUsuario.Adicionar(usuario);
            _repositoryUsuario.Commit();

            var adicionarUsuarioResponse = new AdicionarUsuarioResponse(usuario.Id, Notificacoes.USUARIO_REGISTRADO);

            return Task.FromResult(new CommandResponse(adicionarUsuarioResponse, this));
        }
    }
}
