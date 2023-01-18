namespace PressStart2.Domain.Commands.VendaCommands.ListarVenda
{
    public class ListarVendaResponse
    {
        public Guid Id { get; set; }
        public string NomeCliente { get; }
        public Guid ClienteId { get; set; }
        public int QuantidadeItens { get; }
        public DateTime DataVenda { get; }
        public DateTime DataFaturamento { get; }
        public decimal ValorTotal { get; }

        public ListarVendaResponse(Guid id, string nomeCliente, Guid clienteId, int quantidadeItens, DateTime dataVenda, DateTime dataFaturamento, decimal valorTotal)
        {
            Id = id;
            NomeCliente = nomeCliente;
            ClienteId = clienteId;
            QuantidadeItens = quantidadeItens;
            DataVenda = dataVenda;
            DataFaturamento = dataFaturamento;
            ValorTotal = valorTotal;
        }
    }
}
