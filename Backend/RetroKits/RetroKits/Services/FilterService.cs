﻿using RetroKits.Database;
using System.Collections.Generic;
using System.Linq;

namespace RetroKits.Services
{
    public class FilterService
    {
        // Método para ordenar productos
        public IEnumerable<Product> SortProducts(IEnumerable<Product> products, string option)
        {
            return option switch
            {
                "PriceAsc" => products.OrderBy(p => decimal.Parse(p.Price)),  // Ordenar por precio ascendente
                "PriceDesc" => products.OrderByDescending(p => decimal.Parse(p.Price)),  // Ordenar por precio descendente
                "NameAsc" => products.OrderBy(p => p.Name),  // Ordenar por nombre ascendente
                "NameDesc" => products.OrderByDescending(p => p.Name),  // Ordenar por nombre descendente
                _ => products // Si no hay opción, no se ordena
            };
        }
    }
}
