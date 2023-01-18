using MediatR;
using PressStart2.Domain.DTOs;
using PressStart2.Domain.Interfaces.Repositories;
using PressStart2.Infra.CrossCutting.Constants;
using prmToolkit.NotificationPattern;
using System.Reflection.Metadata.Ecma335;

namespace PressStart2.Domain.Commands.ClienteCommands.RemoverCliente
{
    public class RemoverClienteHandler : Notifiable, IRequestHandler<RemoverClienteRequest, CommandResponse>
    {
        private readonly IRepositoryCliente _repositoryCliente;
        private readonly IRepositoryVenda _repositoryVenda;

        public RemoverClienteHandler(IRepositoryCliente repositoryCliente, IRepositoryVenda repositoryVenda)
        {
            _repositoryCliente = repositoryCliente;
            _repositoryVenda = repositoryVenda;
        }

        public Task<CommandResponse> Handle(RemoverClienteRequest request, CancellationToken cancellationToken)
        {
            var cliente = _repositoryCliente.Obter(request.Id);

            if (cliente == null)
            {
                AddNotification(Notificacoes.CLIENTE_MODULO, Notificacoes.CLIENTE_NAO_ENCONTRADO);
                return Task.FromResult(new CommandResponse(this));
            }

            var clientePossuiVendas = _repositoryVenda.VerificarVendasCliente(cliente.Id);

            if (clientePossuiVendas)
            {
                cliente.Inativar();
                _repositoryCliente.Commit();

                AddNotification(Notificacoes.CLIENTE_MODULO, Notificacoes.CLIENTE_POSSUI_VENDAS);
                return Task.FromResult(new CommandResponse(this));
            }

            _repositoryCliente.Deletar(cliente);
            _repositoryCliente.Commit();

            return Task.FromResult(new CommandResponse(Notificacoes.CLIENTE_REMOVIDO, this));
        }
    }
}

