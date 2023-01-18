using PressStart2.Domain.Entities;

namespace PressStart2.Domain.Interfaces.Repositories
{
    public interface IRepositoryVenda : IRepositoryBase<Venda>
    {
        IEnumerable<Venda> ListarComDependecia();
        Venda ObterComDependencia(Guid id);
        bool VerificarVendasCliente(Guid clienteId);
    }
}
