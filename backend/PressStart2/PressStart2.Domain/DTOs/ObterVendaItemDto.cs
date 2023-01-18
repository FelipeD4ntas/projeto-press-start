using PressStart2.Domain.Entities;

namespace PressStart2.Domain.DTOs
{
    public class ObterVendaItemDto
    {
        public string DescricaoItem { get; set; }
        public int Quantidade { get; set; }
        public decimal PrecoUnitario { get; set; }
        public decimal ValorTotal { get; set; }

        public ObterVendaItemDto(string descricaoItem, int quantidade, decimal precoUnitario, decimal valorTotal)
        {
            DescricaoItem = descricaoItem;
            Quantidade = quantidade;
            PrecoUnitario = precoUnitario;
            ValorTotal = valorTotal;
        }
    }
}
