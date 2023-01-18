using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PressStart2.Domain.Entities;

namespace PressStart2.Infra.Data.Configurations
{
    public class ClienteConfiguration : IEntityTypeConfiguration<Cliente>
    {
        public void Configure(EntityTypeBuilder<Cliente> builder)
        {
            builder.ToTable(nameof(Cliente));

            builder.HasKey(cliente => cliente.Id);

            builder.Property(cliente => cliente.Nome)
                .IsRequired()
                .HasColumnName("Nome")
                .HasColumnType("VARCHAR")
                .HasMaxLength(80);

            builder.Property(cliente => cliente.Email)
                .IsRequired()
                .HasColumnName("Email")
                .HasColumnType("VARCHAR")
                .HasMaxLength(80);

            builder.Property(cliente => cliente.Telefone)
                .IsRequired()
                .HasColumnName("Telefone")
                .HasColumnType("VARCHAR")
                .HasMaxLength(20);

            builder.Property(cliente => cliente.CPF)
                .IsRequired()
                .HasColumnName("CPF")
                .HasColumnType("VARCHAR")
                .HasMaxLength(20);

            builder.Property(cliente => cliente.Inativo)
                .IsRequired()
                .HasColumnName("Inativo");
        }
    }
}
