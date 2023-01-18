using prmToolkit.NotificationPattern;

namespace PressStart2.Domain.Entities.Contracts
{
    static class VendaItemContract
    {
        public static void AdicionarVendaItemContract(this VendaItem vendaItem)
        {
            new AddNotifications<VendaItem>(vendaItem) 
                .IfNullOrInvalidLength(vendItem => vendaItem.DescricaoItem, 1, 150)
                .IfLowerOrEqualsThan(vendItem => vendItem.Quantidade, 0)
                .IfLowerOrEqualsThan(vendItem => vendItem.PrecoUnitario, new Decimal(0.0))
                .IfLowerOrEqualsThan(vendItem => vendItem.ValorTotal, new Decimal(0.0));
        }
        
        public static void AtualizarVendaItemContract(this VendaItem vendaItem)
        {
            new AddNotifications<VendaItem>(vendaItem)
                .IfNullOrInvalidLength(vendItem => vendaItem.DescricaoItem, 1, 150)
                .IfLowerOrEqualsThan(vendItem => vendItem.Quantidade, 0)
                .IfLowerOrEqualsThan(vendItem => vendItem.PrecoUnitario, new Decimal(0.0))
                .IfLowerOrEqualsThan(vendItem => vendItem.ValorTotal, new Decimal(0.0));
        }
    }
}
