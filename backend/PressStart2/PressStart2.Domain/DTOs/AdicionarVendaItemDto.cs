namespace PressStart2.Domain.DTOs
{
    public class AdicionarVendaItemDto
    {
        public string DescricaoItem { get; set; }
        public int Quantidade { get; set; }
        public decimal PrecoUnitario { get; set; }
        public decimal ValorTotal { get; }

        public AdicionarVendaItemDto(string descricaoItem, int quantidade, decimal precoUnitario)
        {
            DescricaoItem = descricaoItem;
            Quantidade = quantidade;
            PrecoUnitario = precoUnitario;
            ValorTotal = Quantidade * PrecoUnitario;
        }
    }
}
