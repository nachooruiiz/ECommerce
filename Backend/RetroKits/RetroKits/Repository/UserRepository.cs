using Microsoft.EntityFrameworkCore;
using RetroKits.Database;

namespace RetroKits.Repository;

public class UserRepository : Repository<User>
{
    public UserRepository(MyDbContext context) : base(context) 
    {
    }
}
