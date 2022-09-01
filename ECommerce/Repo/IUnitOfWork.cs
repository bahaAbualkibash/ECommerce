using ECommerce.Models;

namespace ECommerce.Repo
{
    public interface IUnitOfWork : IDisposable 
    {
        IGenaricRepo<TEntity> Repo<TEntity>() where TEntity : BaseEntity;

        Task<int> Complete();
    }
}
