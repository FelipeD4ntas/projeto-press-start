using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PressStart2.Domain.Entities;

namespace PressStart2.Infra.Data.Configurations
{
    public class VendaConfiguration : IEntityTypeConfiguration<Venda>
    {
        public void Configure(EntityTypeBuilder<Venda> builder)
        {
            builder.ToTable(nameof(Venda));

            builder.HasKey(venda => venda.Id);

            builder.Property(venda => venda.DataVenda)
                .HasColumnName("DataVenda")
                .IsRequired();

            builder.Property(venda => venda.DataFaturamento)
                .HasColumnName("DataFaturamento")
                .IsRequired();

            builder.Property(venda => venda.QuantidadeItens)
                .HasColumnName("QuantidadeItens")
                .IsRequired();

            builder.Property(venda => venda.ValorTotal)
                .HasColumnName("ValorTotal")
                .HasPrecision(18, 2)
                .IsRequired();
        }
    }
}


