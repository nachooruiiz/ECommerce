using F23.StringSimilarity;
using F23.StringSimilarity.Interfaces;
using RetroKits.Database;
using System.Globalization;
using System.Text;
using System.Linq;
using System.Collections.Generic;

namespace RetroKits.Services
{
    public class SmartSearchService
    {
        private readonly MyDbContext _dbContext;
        private const double THRESHOLD = 0.75;
        private readonly INormalizedStringSimilarity _stringSimilarityComparer;

        public SmartSearchService(MyDbContext dbContext)
        {
            _dbContext = dbContext;
            _stringSimilarityComparer = new JaroWinkler();
        }

        public IEnumerable<Product> Search(string query, string option, int page, int pageSize)
        {
            List<Product> items = _dbContext.Products.ToList();
            FilterService filterService = new FilterService();
            IEnumerable<Product> result;

            // Si la consulta está vacía o solo tiene espacios en blanco, devolvemos todos los items
            if (string.IsNullOrWhiteSpace(query))
            {
                result = items;
            }
            else
            {
                // Limpiamos la query y la separamos por espacios
                string[] queryKeys = GetKeys(ClearText(query));
                List<Product> matches = new List<Product>();

                // Filtramos los productos que coincidan con la consulta
                foreach (Product item in items)
                {
                    string[] itemKeys = GetKeys(ClearText(item.Name));
                    if (IsMatch(queryKeys, itemKeys))
                    {
                        matches.Add(item);
                    }
                }

                result = matches;
            }
            result = filterService.SortProducts(result, option);

            result = result.Skip((page - 1) * pageSize).Take(pageSize);

            // Aplicar ordenación si es necesario
            return result;
        }

        private bool IsMatch(string[] queryKeys, string[] itemKeys)
        {
            bool isMatch = false;

            // Comprobamos si alguna palabra del item coincide con las palabras de la query
            for (int i = 0; !isMatch && i < itemKeys.Length; i++)
            {
                string itemKey = itemKeys[i];

                for (int j = 0; !isMatch && j < queryKeys.Length; j++)
                {
                    string queryKey = queryKeys[j];
                    isMatch = IsMatch(itemKey, queryKey);
                }
            }

            return isMatch;
        }

        // Hay coincidencia si las palabras son iguales, si el item contiene la query o si son similares
        private bool IsMatch(string itemKey, string queryKey)
        {
            return itemKey == queryKey
                || itemKey.Contains(queryKey)
                || _stringSimilarityComparer.Similarity(itemKey, queryKey) >= THRESHOLD;
        }

        // Separa las palabras de la consulta o del nombre del producto
        private string[] GetKeys(string query)
        {
            return query.Split(' ', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries);
        }

        // Normaliza el texto quitando tildes y pasándolo a minúsculas
        private string ClearText(string text)
        {
            return RemoveDiacritics(text.ToLower());
        }

        // Quita las tildes a un texto
        private string RemoveDiacritics(string text)
        {
            string normalizedString = text.Normalize(NormalizationForm.FormD);
            StringBuilder stringBuilder = new StringBuilder(normalizedString.Length);

            for (int i = 0; i < normalizedString.Length; i++)
            {
                char c = normalizedString[i];
                UnicodeCategory unicodeCategory = CharUnicodeInfo.GetUnicodeCategory(c);
                if (unicodeCategory != UnicodeCategory.NonSpacingMark)
                {
                    stringBuilder.Append(c);
                }
            }

            return stringBuilder.ToString().Normalize(NormalizationForm.FormC);
        }
    }
}
