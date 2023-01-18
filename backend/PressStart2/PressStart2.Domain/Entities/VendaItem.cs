using PressStart2.Domain.Entities.Contracts;

namespace PressStart2.Domain.Entities
{
    public class VendaItem : EntidadeBase
    {
        public string DescricaoItem { get; private set; }
        public int Quantidade { get; private set; } 
        public decimal PrecoUnitario { get; private set; }  
        public decimal ValorTotal { get; private set; }
        public Guid VendaId { get; private set; }

        protected VendaItem() { }

        public VendaItem(string descricaoItem, int quantidade, decimal precoUnitario, decimal valorTotal)
        {
            DescricaoItem = descricaoItem;
            Quantidade = quantidade;
            PrecoUnitario = precoUnitario;
            ValorTotal = valorTotal;

            this.AdicionarVendaItemContract();
        }

        public void Atualizar(string descricaoItem, int quantidade, decimal precoUnitario, decimal valorTotal)
        {
            DescricaoItem = descricaoItem;
            Quantidade = quantidade;
            PrecoUnitario = precoUnitario;
            ValorTotal = valorTotal;
        }
    }
}
