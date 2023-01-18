using Microsoft.EntityFrameworkCore;
using PressStart2.Domain.Entities;
using prmToolkit.NotificationPattern;

namespace PressStart2.Infra.Data.Context
{
    public class PressStart2Context : DbContext
    {
        public DbSet<Cliente> ClienteDbSet { get; set; }
        public DbSet<Venda> VendaDbSet { get; set; }
        public DbSet<VendaItem> VendaItemDbSet { get; set; }
        public DbSet<Usuario> UsuarioDbSet { get; set; }

        public PressStart2Context(DbContextOptions<PressStart2Context> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Ignore<Notification>();

            modelBuilder.ApplyConfigurationsFromAssembly(typeof(PressStart2Context).Assembly);

            base.OnModelCreating(modelBuilder);
        }
    }
}
