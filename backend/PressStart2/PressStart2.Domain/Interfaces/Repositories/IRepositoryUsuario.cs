using PressStart2.Domain.Entities;

namespace PressStart2.Domain.Interfaces.Repositories
{
    public interface IRepositoryUsuario : IRepositoryBase<Usuario>
    {
        Usuario Autenticar(string login);
        bool EmailjaCadastrado(string email);
    }
}
