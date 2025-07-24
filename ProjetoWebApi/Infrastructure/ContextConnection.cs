using Microsoft.Win32;
using Newtonsoft.Json;
using ProjetoWebApi.Model;

namespace ProjetoWebApi.Infrastructure
{
    public class ContextConnection : IContextConnection
    {
        private readonly string path = "C:/Users/JeffersonLimaSilva/OneDrive/Documentos/ProjetoWebApi/ProjetoWebApi/FileBase/BaseRegister.txt";

        public List<Admin> GetAll()
        {

            List<Admin> list = new List<Admin>();
            
            using (StreamReader sr = new StreamReader(path))
            {
                string line;
                while ((line = sr.ReadLine()) != null)
                {
                    try
                    {
                        Admin item = JsonConvert.DeserializeObject<Admin>(line);
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

        public void SaveAll<TList>(IEnumerable<TList> list)
        {
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
