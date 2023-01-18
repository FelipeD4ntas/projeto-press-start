using PressStart2.Domain.Entities.Contracts;

namespace PressStart2.Domain.Entities
{
    public class Venda : EntidadeBase
    {
        private List<VendaItem> _itensVenda = new();
        public DateTime DataVenda { get; private set; } = DateTime.Now;
        public DateTime DataFaturamento { get; private set; }
        public int QuantidadeItens { get; private set; }
        public decimal ValorTotal { get; private set; }
        public virtual Cliente Cliente { get; private set; }
        public Guid ClienteId { get; private set; }
        public virtual IEnumerable<VendaItem> ItensVenda => _itensVenda;

        protected Venda() { }

        public Venda(Guid clienteId, DateTime dataFaturamento, int quantidadeItens, decimal valorTotal)
        {
            ClienteId = clienteId;
            DataFaturamento = dataFaturamento;
            QuantidadeItens = quantidadeItens;
            ValorTotal = valorTotal;

            this.AdicionarVendaContract();
        }

        public void Atualizar(Guid clienteId, DateTime dataFaturamento, int quantidadeItens, decimal valorTotal)
        {
            ClienteId = clienteId;
            DataFaturamento = dataFaturamento;
            QuantidadeItens = quantidadeItens;
            ValorTotal = valorTotal;

            this.AtualizarVendaContract();
        }

        public void AtualizarVendaItem(VendaItem vendaItem)
        {
            VendaItem item = _itensVenda.SingleOrDefault(it => it.Id == vendaItem.Id);
            item?.Atualizar(vendaItem.DescricaoItem, vendaItem.Quantidade, vendaItem.PrecoUnitario, vendaItem.ValorTotal);
            item?.AtualizarVendaItemContract();
            AddNotifications(item);
        }

        public void AdicionarVendaItem(VendaItem vendaItem)
        {
            _itensVenda.Add(vendaItem);
            AddNotifications(vendaItem);
        }

        public void RemoverVendaItem(VendaItem vendaItem)
        {
            _itensVenda.Remove(vendaItem);
        }
    }
}
