namespace RetroKits.Repository;

public interface IRepository<TEntity> where TEntity : class
{
    Task<ICollection<TEntity>> GetAllAsync();
    IQueryable<TEntity> GetQueryable(bool asNoTracking = true);
    Task<TEntity> InsertAsync(TEntity entity);
    Task<bool> SaveAsync();
}
