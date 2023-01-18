using PressStart2.Domain.Entities;

namespace PressStart2.Domain.Interfaces.Repositories
{
    public interface IRepositoryCliente : IRepositoryBase<Cliente>
    {
        bool CpfJaExistente(string cpf, Guid clienteId);
        bool CpfJaExistente(string cpf);
    }
}
