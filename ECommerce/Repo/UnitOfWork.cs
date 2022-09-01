using ECommerce.Data;
using ECommerce.Models;
using System.Collections;

namespace ECommerce.Repo
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly StoreContext context;
        private Hashtable _repos;
        public UnitOfWork(StoreContext context)
        {
            this.context = context;
        }
        public IGenaricRepo<TEntity> Repo<TEntity>() where TEntity : BaseEntity
        {
            if (_repos == null) _repos = new Hashtable();

            var type = typeof(TEntity).Name;

            if (!_repos.ContainsKey(type))
            {
                var repoType = typeof(GenaricRepo<>);
                var repoInstance = Activator.CreateInstance(repoType.MakeGenericType(typeof(TEntity)),context);

                _repos.Add(type, repoInstance);
            }

            return (IGenaricRepo<TEntity>)_repos[type];
        }

        public async Task<int> Complete()
        {
            return await context.SaveChangesAsync();
        }

        public void Dispose()
        {
            context.Dispose();
        }


    }
}
