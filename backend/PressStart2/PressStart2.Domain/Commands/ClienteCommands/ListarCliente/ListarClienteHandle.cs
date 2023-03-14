using AspNetCore.IQueryable.Extensions;
using AspNetCore.IQueryable.Extensions.Filter;
using MediatR;
using PressStart2.Domain.DTOs;
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
            var clientes = _repositroyCliente.ListarComFiltro().Apply(request).ToList();
            var totalClientesFiltrados = _repositroyCliente.ListarComFiltro().Filter(request);

            var listaClientes = clientes.Select(cliente => new ListarClienteDTO(cliente.Id, cliente.Nome, cliente.Email, cliente.Telefone, cliente.CPF, cliente.Inativo)).ToList();

            var listaClientesResponse = new ListarClienteResponse(totalClientesFiltrados.Count(), listaClientes);

            return Task.FromResult(new CommandResponse(listaClientesResponse, this));
        }
    }
}
