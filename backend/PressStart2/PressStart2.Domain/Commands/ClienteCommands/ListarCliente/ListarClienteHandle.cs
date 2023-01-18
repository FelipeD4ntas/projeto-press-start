using MediatR;
using PressStart2.Domain.DTOs;
using PressStart2.Domain.Entities;
using PressStart2.Domain.Interfaces.Repositories;
using prmToolkit.NotificationPattern;

namespace PressStart2.Domain.Commands.ClienteCommands.ListarCliente
{
    public class ListarClienteHandle : Notifiable, IRequestHandler<ListarClienteRequest, CommandResponse>
    {
        private readonly IRepositoryCliente _repositroyCliente;

        public ListarClienteHandle(IRepositoryCliente repositroyCliente)
        {
            _repositroyCliente = repositroyCliente;
        }

        public Task<CommandResponse> Handle(ListarClienteRequest request, CancellationToken cancellationToken)
        {
            var clientes = _repositroyCliente.Listar().Select(cliente =>
                new ListarClienteResponse(cliente.Id, cliente.Nome, cliente.Email, cliente.Telefone, cliente.CPF, cliente.Inativo));

            return Task.FromResult(new CommandResponse(clientes, this));
        }
    }
}
