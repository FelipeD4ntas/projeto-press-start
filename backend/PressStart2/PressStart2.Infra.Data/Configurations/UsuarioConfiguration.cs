using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PressStart2.Domain.Entities;

namespace PressStart2.Infra.Data.Configurations
{
    public class UsuarioConfiguration : IEntityTypeConfiguration<Usuario>
    {
        public void Configure(EntityTypeBuilder<Usuario> builder)
        {
            builder.ToTable(nameof(Usuario));

            builder.HasKey(usuario => usuario.Id);

            builder.Property(usuario => usuario.Nome)
                .IsRequired()
                .HasColumnName("Nome")
                .HasColumnType("VARCHAR")
                .HasMaxLength(80);

            builder.Property(usuario => usuario.Login)
                .IsRequired()
                .HasColumnName("Email")
                .HasColumnType("VARCHAR")
                .HasMaxLength(80);

            builder.Property(usuario => usuario.Senha)
                .IsRequired()
                .HasColumnName("Senha")
                .HasColumnType("VARCHAR")
                .HasMaxLength(255);
        }
    }
}
