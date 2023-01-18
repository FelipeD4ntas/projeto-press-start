using PressStart2.Domain.Entities;

namespace PressStart2.Domain.Interfaces.Repositories
{
    public interface IRepositoryBase<TEntity> where TEntity : EntidadeBase
    {
        TEntity Obter(Guid id);
        IEnumerable<TEntity> Listar();
        void Adicionar(TEntity entity);
        void Atualizar(TEntity entity);
        void Deletar(TEntity entity);
        void Commit();
    }
}
