using ECommerce.Models;
using ECommerce.Specifications;
using Microsoft.EntityFrameworkCore;

namespace ECommerce.Data
{
    public class SpecificationEvaluator<TEntity> where TEntity : BaseEntity
    {
        public static IQueryable<TEntity> GetQuery(IQueryable<TEntity> inputQuery,
            ISpecification<TEntity> spec)
        {
            var query = inputQuery;

            if(spec.Criteria != null)
            {
                query = query.Where(spec.Criteria);
            }
            // add Include to the query like forEach

          query = spec.Includes.Aggregate(query,(current,include) => current.Include(include));

            if(spec.OrderBy != null)
            {
                query = query.OrderBy(spec.OrderBy);
            }

            if(spec.OrderByDescending != null)
            {
              query = query.OrderByDescending(spec.OrderByDescending);
            }

            if (spec.IsPaginationActivated)
            {
                query = query.Skip(spec.Skip).Take(spec.Take);
            }
            //spec.Includes.ForEach(a =>
            //{
            //    query = query.Include(a);
            //});
            
            return query;
        }
    }
}
