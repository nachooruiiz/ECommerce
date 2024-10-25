using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using RetroKits.Database;

namespace RetroKits.Repository;

public class Repository<TEntity> : IRepository<TEntity> where TEntity : class
{
    protected MyDbContext Context { get; init; }

    public Repository(MyDbContext context)
    {
        Context = context;
    }

    public async Task<ICollection<TEntity>> GetAllAsync()
    {
        return await Context.Set<TEntity>().ToListAsync();
    }

    public IQueryable<TEntity> GetQueryable(bool asNoTracking = true)
    {
        DbSet<TEntity> entities = Context.Set<TEntity>();
        return asNoTracking ? entities.AsNoTracking() : entities;
    }

    public async Task<TEntity> GetByIdAsync(int Id)
    {
        return await Context.Set<TEntity>().FindAsync(Id);
    }

    public async Task<TEntity> InsertAsync(TEntity entity)
    {
        EntityEntry<TEntity> entry = await Context.Set<TEntity>().AddAsync(entity);
        await Context.SaveChangesAsync();
        return entry.Entity;
    }

    public async Task<bool> SaveAsync()
    {
        return await Context.SaveChangesAsync() > 0;
    }
}