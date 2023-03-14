using PressStart2.Domain.DTOs;

namespace PressStart2.Domain.Commands.VendaCommands.ListarVenda
{
    public class ListarVendaResponse
    {
        public int QuantidadeVendasFiltradas { get; }
        public List<ListarVendasDTO> Vendas { get; set; }

        public ListarVendaResponse(int quantidadeVendasFiltradas, List<ListarVendasDTO> vendas)
        {
            QuantidadeVendasFiltradas = quantidadeVendasFiltradas; 
            Vendas = vendas;
        }
    }
}
