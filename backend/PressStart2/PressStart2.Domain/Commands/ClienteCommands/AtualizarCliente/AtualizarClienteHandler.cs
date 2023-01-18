using MediatR;
using PressStart2.Domain.DTOs;
using PressStart2.Domain.Entities;
using PressStart2.Domain.Extensions;
using PressStart2.Domain.Interfaces.Repositories;
using PressStart2.Infra.CrossCutting.Constants;
using prmToolkit.NotificationPattern;

namespace PressStart2.Domain.Commands.ClienteCommands.AtualizarCliente
{
    public class AtualizarClienteHandler : Notifiable, IRequestHandler<AtualizarClienteRequest, CommandResponse>
    {
        private readonly IRepositoryCliente _repositoryCliente;

        public AtualizarClienteHandler(IRepositoryCliente repositoryCliente)
        {
            _repositoryCliente = repositoryCliente;
        }

        public Task<CommandResponse> Handle(AtualizarClienteRequest request, CancellationToken cancellationToken)
        {
            var cliente = _repositoryCliente.Obter(request.Id);

            if (cliente == null)
            {
                AddNotification(Notificacoes.CLIENTE_MODULO, Notificacoes.CLIENTE_NAO_ENCONTRADO);
                return Task.FromResult(new CommandResponse(this));
            }

            if (_repositoryCliente.CpfJaExistente(request.CPF, request.Id))
            {
                AddNotification(Notificacoes.CLIENTE_MODULO, Notificacoes.CPF_CADASTRADO);
                return Task.FromResult(new CommandResponse(this));
            }

            var telefoneFormatado = request.Telefone.FormatarStringParaSomenteNumeros();
            var CPFFormatado = request.CPF.FormatarStringParaSomenteNumeros();
            var emailFormatado = request.Email.ToLower();

            cliente.Atualizar(request.Nome, emailFormatado, telefoneFormatado, CPFFormatado);
            AddNotifications(cliente);

            if (IsInvalid())
            {
                return Task.FromResult(new CommandResponse(this));
            }

            _repositoryCliente.Atualizar(cliente);
            _repositoryCliente.Commit();

            return Task.FromResult(new CommandResponse(Notificacoes.CLIENTE_ATUALIZADO, this));
        }
    }
}
