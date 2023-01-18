using Microsoft.EntityFrameworkCore;
using PressStart2.Domain.Entities;
using PressStart2.Domain.Interfaces.Repositories;
using PressStart2.Infra.Data.Context;

namespace PressStart2.Infra.Data.Repositories
{
    public class RepositoryVenda : RepositoryBase<Venda>, IRepositoryVenda
    {
        public RepositoryVenda(PressStart2Context context) : base(context)
        {
        }

        public Venda ObterComDependencia(Guid id)
        {
           return _entitySet.Include(venda => venda.Cliente).Include(venda => venda.ItensVenda).Where(venda => venda.Id == id).FirstOrDefault();
        }

        public IEnumerable<Venda> ListarComDependecia()
        {
            return _entitySet.AsNoTracking().Include(venda => venda.Cliente).ToList();
        }

        public bool VerificarVendasCliente(Guid clienteId)
        {
            return _entitySet.Any(venda => venda.ClienteId == clienteId);
        }
    }
}
