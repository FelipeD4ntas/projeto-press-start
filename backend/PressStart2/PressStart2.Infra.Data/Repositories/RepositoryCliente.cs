using Microsoft.EntityFrameworkCore;
using PressStart2.Domain.Entities;
using PressStart2.Domain.Interfaces.Repositories;
using PressStart2.Infra.Data.Context;

namespace PressStart2.Infra.Data.Repositories
{
    public class RepositoryCliente : RepositoryBase<Cliente>, IRepositoryCliente
    {
        public RepositoryCliente(PressStart2Context context) : base(context)
        {
        }

        public bool CpfJaExistente(string cpf, Guid clienteId)
        {
            return _context.ClienteDbSet.Any(cliente => cliente.CPF == cpf && cliente.Id != clienteId);
        }

        public bool CpfJaExistente(string cpf)
        {
            return _context.ClienteDbSet.Any(cliente => cliente.CPF == cpf);
        }
    }
}
