﻿using Microsoft.EntityFrameworkCore;

namespace RetroKits.Database;
//[Index(nameof(Name), IsUnique = true)]
public class Product
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Price { get; set; }
    public string Description { get; set; }
    public string ImageUrl { get; set; }
}
