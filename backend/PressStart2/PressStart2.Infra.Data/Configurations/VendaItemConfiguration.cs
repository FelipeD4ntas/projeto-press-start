using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PressStart2.Domain.Entities;

namespace PressStart2.Infra.Data.Configurations
{
    public class VendaItemConfiguration : IEntityTypeConfiguration<VendaItem>
    {
        public void Configure(EntityTypeBuilder<VendaItem> builder)
        {
            builder.HasKey(item => item.Id);

            builder.ToTable(nameof(VendaItem));

            builder.Property(item => item.DescricaoItem)
                .IsRequired();

            builder.Property(item => item.Quantidade)
                .IsRequired();

            builder.Property(item => item.PrecoUnitario)
                .HasPrecision(18, 2)
                .IsRequired();

            builder.Property(item => item.ValorTotal)
                .HasPrecision(18, 2)
                .IsRequired();
        }
    }
}
