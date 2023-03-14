using MediatR;
using PressStart2.Domain.DTOs;
using PressStart2.Domain.Entities;
using PressStart2.Domain.Interfaces.Repositories;
using PressStart2.Infra.CrossCutting.Constants;
using prmToolkit.NotificationPattern;

namespace PressStart2.Domain.Commands.VendaCommands.AdicionarVenda
{
    public class AdicionarVendaHandler : Notifiable, IRequestHandler<AdicionarVendaRequest, CommandResponse>
    {
        private readonly IRepositoryVenda _repositoryVenda;
        private readonly IRepositoryCliente _repositoryCliente;

        public AdicionarVendaHandler(IRepositoryVenda repositoryVenda, IRepositoryCliente repositoryCliente)
        {
            _repositoryVenda = repositoryVenda;
            _repositoryCliente = repositoryCliente;
        }

        public Task<CommandResponse> Handle(AdicionarVendaRequest request, CancellationToken cancellationToken)
        {
            var cliente = _repositoryCliente.Obter(request.ClienteId);

            if (cliente == null)
            {
                AddNotification(Notificacoes.VENDA_MODULO, Notificacoes.CLIENTE_NAO_ENCONTRADO);
                return Task.FromResult(new CommandResponse(this));
            }

            if (request.DataFaturamento.Date < DateTime.Now.Date)
            {
                AddNotification(Notificacoes.VENDA_MODULO, Notificacoes.DATA_FATURAMENTO_INVALIDA);
                return Task.FromResult(new CommandResponse(this));
            }

    
            var venda = new Venda(cliente.Id, cliente.Nome, request.DataFaturamento.Date, request.Itens.Count, request.Itens.Sum(item => item.ValorTotal));

            request.Itens.ForEach(item =>
            {
                var vendaItem = new VendaItem(item.DescricaoItem, item.Quantidade, item.PrecoUnitario, item.ValorTotal);
                venda.AdicionarVendaItem(vendaItem);
            });

            AddNotifications(venda);

            if (IsInvalid())
            {
                return Task.FromResult(new CommandResponse(this));
            }

            _repositoryVenda.Adicionar(venda);
            _repositoryVenda.Commit();

            var adicionarVendaResponse = new AdicionarVendaResponse(venda.Id, Notificacoes.VENDA_REGISTRADA);

            return Task.FromResult(new CommandResponse(adicionarVendaResponse, this));
        }
    }
}
