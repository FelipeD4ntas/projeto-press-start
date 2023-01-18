using MediatR;
using PressStart2.Domain.DTOs;
using PressStart2.Domain.Interfaces.Repositories;
using PressStart2.Infra.CrossCutting.Constants;
using prmToolkit.NotificationPattern;

namespace PressStart2.Domain.Commands.VendaCommands.ObterVenda
{
    public class ObterVendaHandler : Notifiable, IRequestHandler<ObterVendaRequest, CommandResponse>
    {
        private readonly IRepositoryVenda _repositoryVenda;

        public ObterVendaHandler(IRepositoryVenda repositoryVenda)
        {
            _repositoryVenda = repositoryVenda;
        }

        public Task<CommandResponse> Handle(ObterVendaRequest request, CancellationToken cancellationToken)
        {
            var vendaResponse = _repositoryVenda.ObterComDependencia(request.Id);

            if (vendaResponse == null)
            {
                AddNotification(Notificacoes.VENDA_MODULO, Notificacoes.VENDA_NAO_ENCONTRADA);
                return Task.FromResult(new CommandResponse(this));
            }

            var venda = new ObterVendaResponse(
                vendaResponse.Id,
                vendaResponse.ClienteId,
                vendaResponse.Cliente.Nome,
                vendaResponse.QuantidadeItens,
                vendaResponse.DataVenda,
                vendaResponse.DataFaturamento,
                vendaResponse.ValorTotal,
                vendaResponse.ItensVenda.Select(item =>
                    new ObterVendaItemDto(item.DescricaoItem, item.Quantidade, item.PrecoUnitario, item.ValorTotal)));

            return Task.FromResult(new CommandResponse(venda, this));
        }
    }
}
