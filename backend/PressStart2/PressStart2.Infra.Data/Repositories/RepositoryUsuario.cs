using Microsoft.EntityFrameworkCore;
using PressStart2.Domain.Entities;
using PressStart2.Domain.Interfaces.Repositories;
using PressStart2.Infra.Data.Context;
using SecureIdentity.Password;

namespace PressStart2.Infra.Data.Repositories
{
    public class RepositoryUsuario : RepositoryBase<Usuario>, IRepositoryUsuario
    {
        public RepositoryUsuario(PressStart2Context context) : base(context)
        {
        }

        public Usuario Autenticar(string login)
        {
            return _entitySet.FirstOrDefault(usuario => usuario.Login == login);
        }
        public bool EmailjaCadastrado(string login)
        {
            return _context.UsuarioDbSet.Any(usuario => usuario.Login == login);
        }

    }
}
