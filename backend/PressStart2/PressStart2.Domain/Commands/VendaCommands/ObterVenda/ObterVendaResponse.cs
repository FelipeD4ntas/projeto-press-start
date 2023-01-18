using PressStart2.Domain.DTOs;
using PressStart2.Domain.Entities;

namespace PressStart2.Domain.Commands.VendaCommands.ObterVenda
{
    public class ObterVendaResponse
    {
        public Guid Id { get; }
        public Guid ClienteId { get; }
        public string ClienteNome { get; }
        public int QuantidadeItens { get; }
        public DateTime DataVenda { get; }
        public DateTime DataFaturamento { get; }
        public decimal ValorTotal { get; }
        public IEnumerable<ObterVendaItemDto> Itens { get; }

        public ObterVendaResponse(
            Guid id, Guid clienteId, string clienteNome, int quantidadeItens,
            DateTime dataVenda, DateTime dataFaturamento,
            decimal valorTotal, IEnumerable<ObterVendaItemDto> vendaItens)
        {
            Id = id;
            ClienteId = clienteId;
            ClienteNome = clienteNome;
            QuantidadeItens = quantidadeItens;
            DataVenda = dataVenda;
            DataFaturamento = dataFaturamento;
            ValorTotal = valorTotal;
            Itens = vendaItens;
        }
    }
}
