using Newtonsoft.Json;
using ProjetoWebApi.Common.Model;

namespace ProjetoWebApi.Infrastructure
{
    public class ContextConnection : IContextConnection
    {
        public async Task<List<TList>> GetAll<TList>(string file)
        {
            var path = $"C:/Users/JeffersonLimaSilva/OneDrive/Documentos/ProjetoWebApi/ProjetoWebApi/FileBase/{file}";

            List<TList> list = new List<TList>();

            using (StreamReader sr = new StreamReader(path))
            {
                string line;
                while ((line = sr.ReadLine()) != null)
                {
                    try
                    {
                        TList item = JsonConvert.DeserializeObject<TList>(line);
                        list.Add(item);
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine($"Erro:{ex.Message}");
                    }
                }
            }
            return list;
        }

        public async Task SaveAll<TList>(IEnumerable<TList> list, string file)
        {
            var path = $"C:/Users/JeffersonLimaSilva/OneDrive/Documentos/ProjetoWebApi/ProjetoWebApi/FileBase/{file}";

            File.WriteAllText(path, "");
            foreach (var item in list)
            {
                string json = JsonConvert.SerializeObject(item, Formatting.Indented);

                using (StreamWriter sw = new StreamWriter(path, true))
                {
                    sw.WriteLine(json.Replace(Environment.NewLine, ""));
                }
            }
        }
    }
}