using MediatR;
using PressStart2.Domain.DTOs;
using PressStart2.Domain.Interfaces.Repositories;
using PressStart2.Infra.CrossCutting.Constants;
using prmToolkit.NotificationPattern;

namespace PressStart2.Domain.Commands.VendaCommands.RemoverVenda
{
    public class RemoverVendaHandler : Notifiable, IRequestHandler<RemoverVendaRequest, CommandResponse>
    {
        private IRepositoryVenda _repositoryVenda;
        private IRepositoryCliente _repositoryCliente;

        public RemoverVendaHandler(IRepositoryVenda repositoryVenda, IRepositoryCliente repositoryCliente)
        {
            _repositoryVenda = repositoryVenda;
            _repositoryCliente = repositoryCliente;
        }

        public Task<CommandResponse> Handle(RemoverVendaRequest request, CancellationToken cancellationToken)
        {
            var venda = _repositoryVenda.ObterComDependencia(request.Id);

            if (venda == null)
            {
                AddNotification(Notificacoes.VENDA_MODULO, Notificacoes.VENDA_NAO_ENCONTRADA);
                return Task.FromResult(new CommandResponse(this));
            }

            venda.ItensVenda.ToList().ForEach(item => venda.RemoverVendaItem(item));

            _repositoryVenda.Deletar(venda);
            _repositoryVenda.Commit();

            var cliente = _repositoryCliente.Obter(venda.ClienteId);

            var clientePossuiVendas = _repositoryVenda.VerificarVendasCliente(cliente.Id);

            if (!clientePossuiVendas)
            {
                cliente.Ativar();
                _repositoryCliente.Commit();
            }

            return Task.FromResult(new CommandResponse(Notificacoes.VENDA_REMOVIDA, this));
        }
    }
}
