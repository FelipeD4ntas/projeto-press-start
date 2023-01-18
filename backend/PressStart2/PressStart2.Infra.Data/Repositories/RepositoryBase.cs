using Microsoft.EntityFrameworkCore;
using PressStart2.Domain.Entities;
using PressStart2.Domain.Interfaces.Repositories;
using PressStart2.Infra.Data.Context;

namespace PressStart2.Infra.Data.Repositories
{
    public class RepositoryBase<TEntity> : IRepositoryBase<TEntity> where TEntity : EntidadeBase
    {
        protected readonly DbSet<TEntity> _entitySet;
        protected readonly PressStart2Context _context;

        public RepositoryBase(PressStart2Context context)
        {
            _entitySet = context.Set<TEntity>();
            _context = context;
        }

        public TEntity Obter(Guid id)
        {
            return _entitySet.Find(id);
        }

        public IEnumerable<TEntity> Listar()
        {
            return _entitySet.AsEnumerable<TEntity>();
        }

        public void Adicionar(TEntity entity)
        {
            _entitySet.Add(entity);
        }

        public void Atualizar(TEntity entity)
        {
            _entitySet.Update(entity);
        }

        public void Deletar(TEntity entity)
        {
            _entitySet.Remove(entity);
        }

        public void Commit()
        {
            _context.SaveChanges();
        }
    }
}