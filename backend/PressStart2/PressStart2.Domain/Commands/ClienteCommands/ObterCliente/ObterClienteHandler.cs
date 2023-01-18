using MediatR;
using PressStart2.Domain.DTOs;
using PressStart2.Domain.Interfaces.Repositories;
using PressStart2.Infra.CrossCutting.Constants;
using prmToolkit.NotificationPattern;

namespace PressStart2.Domain.Commands.ClienteCommands.ObterCliente
{
    public class ObterClienteHandler : Notifiable, IRequestHandler<ObterClienteRequest, CommandResponse>
    {
        private readonly IRepositoryCliente _repositoryCliente;

        public ObterClienteHandler(IRepositoryCliente repositoryCliente)
        {
            _repositoryCliente = repositoryCliente;
        }

        public Task<CommandResponse> Handle(ObterClienteRequest request, CancellationToken cancellationToken)
        {
            var cliente = _repositoryCliente.Obter(request.Id);

            if (cliente == null)
            {
                AddNotification(Notificacoes.CLIENTE_MODULO, Notificacoes.CLIENTE_NAO_ENCONTRADO);
                return Task.FromResult(new CommandResponse(this));
            }

            var clienteResponse = new ObterrClienteResponse(cliente.Id, cliente.Nome, cliente.Email, cliente.Telefone, cliente.CPF, cliente.Inativo);

            return Task.FromResult(new CommandResponse(clienteResponse, this));
        }
    }
}
