using MediatR;
using PressStart2.Domain.DTOs;
using PressStart2.Domain.Entities;
using PressStart2.Domain.Interfaces.Repositories;
using PressStart2.Infra.CrossCutting.Constants;
using prmToolkit.NotificationPattern;

namespace PressStart2.Domain.Commands.VendaCommands.AtualizarVenda
{
    public class AtualizarVendaHandler : Notifiable, IRequestHandler<AtualizarVendaRequest, CommandResponse>
    {
        private readonly IRepositoryVenda _repositoryVenda;
        private readonly IRepositoryCliente _repositoryCliente;

        public AtualizarVendaHandler(IRepositoryVenda repositoryVenda, IRepositoryCliente repositoryCliente)
        {
            _repositoryVenda = repositoryVenda;
            _repositoryCliente = repositoryCliente;
        }

        public Task<CommandResponse> Handle(AtualizarVendaRequest request, CancellationToken cancellationToken)
        {
            var venda = _repositoryVenda.ObterComDependencia(request.Id);
            if (venda == null)
            {
                AddNotification(Notificacoes.VENDA_MODULO, Notificacoes.VENDA_NAO_ENCONTRADA);
                return Task.FromResult(new CommandResponse(this));
            }

            var cliente = _repositoryCliente.Obter(request.ClienteId);
            if (cliente == null)
            {
                AddNotification(Notificacoes.VENDA_MODULO, Notificacoes.CLIENTE_NAO_ENCONTRADO);
                return Task.FromResult(new CommandResponse(this));
            }

            var itens = venda.ItensVenda.ToList();

            itens.ForEach(item => venda.RemoverVendaItem(item));

            request.Itens.ForEach(requestItem =>
            {
                venda.AdicionarVendaItem(
                new VendaItem(
                    requestItem.DescricaoItem,
                    requestItem.Quantidade,
                    requestItem.PrecoUnitario,
                    requestItem.ValorTotal));
            });

            venda.Atualizar(cliente.Id, request.DataFaturamento, request.Itens.Count, request.Itens.Sum(item => item.ValorTotal));
            AddNotifications(venda);

            if (IsInvalid())
            {
                return Task.FromResult(new CommandResponse(this));
            }

            _repositoryVenda.Atualizar(venda);
            _repositoryVenda.Commit();

            var clientes = _repositoryCliente.Listar().ToList();

            clientes.ForEach(item =>
            {
                var clientePossuiVendas = _repositoryVenda.VerificarVendasCliente(item.Id);

                if (!clientePossuiVendas)
                {
                    item.Ativar();
                    _repositoryCliente.Atualizar(item);
                    _repositoryCliente.Commit();
                }
            });

            var response = new AtualizarVendaResponse(venda.Id, Notificacoes.VENDA_ATUALIZADA);

            return Task.FromResult(new CommandResponse(response, this));
        }
    }
}
