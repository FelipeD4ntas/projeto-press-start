using prmToolkit.NotificationPattern;

namespace PressStart2.Domain.Entities.Contracts
{
    static class VendaContract
    {
        public static void AdicionarVendaContract(this Venda venda)
        {
            new AddNotifications<Venda>(venda)
                .IfNull(vend => vend.DataFaturamento)
                .IfLowerOrEqualsThan(vend => vend.QuantidadeItens, 0)
                .IfLowerOrEqualsThan(vend => vend.ValorTotal, new Decimal(0.0), "Confire e valide os campos.");
        }

        public static void AtualizarVendaContract(this Venda venda)
        {
            new AddNotifications<Venda>(venda)
                .IfNull(vend => vend.DataFaturamento)
                .IfLowerOrEqualsThan(vend => vend.QuantidadeItens, 0)
                .IfLowerOrEqualsThan(vend => vend.ValorTotal, new Decimal(0.0), "Confire e valide os campos.");
        }
    }
}
