using AspNetCore.IQueryable.Extensions;
using AspNetCore.IQueryable.Extensions.Filter;
using MediatR;
using PressStart2.Domain.DTOs;
using PressStart2.Domain.Interfaces.Repositories;
using prmToolkit.NotificationPattern;

namespace PressStart2.Domain.Commands.VendaCommands.ListarVenda
{
    public class ListarVendaHandler : Notifiable, IRequestHandler<ListarVendaRequest, CommandResponse>
    {
        private readonly IRepositoryVenda _repositoryVenda;

        public ListarVendaHandler(IRepositoryVenda repositoryVenda)
        {
            _repositoryVenda = repositoryVenda;
        }

        public Task<CommandResponse> Handle(ListarVendaRequest request, CancellationToken cancellationToken)
        {
            var vendas = _repositoryVenda.ListarComDependecia().Apply(request).ToList().Select(venda =>
                new ListarVendasDTO(venda.Id, venda.Cliente.Nome, venda.Cliente.Id, venda.QuantidadeItens, venda.DataVenda, venda.DataFaturamento, venda.ValorTotal));

            var totalVendasFiltradas = _repositoryVenda.ListarComDependecia().Filter(request);
            var listaVendas = new ListarVendaResponse(totalVendasFiltradas.Count(), vendas.ToList());

            return Task.FromResult(new CommandResponse(listaVendas, this));
        }
    }
}
