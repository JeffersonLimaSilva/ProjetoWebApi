using Microsoft.Win32;
using Newtonsoft.Json;
using ProjetoWebApi.Model;

namespace ProjetoWebApi.Infrastructure
{
    public class ContextConnection : IContextConnection
    {
        private readonly string path = "C:/Users/JeffersonLimaSilva/OneDrive/Documentos/ProjetoWebApi/ProjetoWebApi/FileBase/BaseRegister.txt";
        public List<Register> GetAll()
        {
            List<Register> list = new List<Register>();
            File.AppendAllText(path, "");
            using (StreamReader sr = new StreamReader(path))
            {
                string line;
                while ((line = sr.ReadLine()) != null)
                {
                    try
                    {
                        Register registerL = JsonConvert.DeserializeObject<Register>(line);
                        list.Add(registerL);
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine($"Erro:{ex.Message}");
                    }
                }
            }
            return list;
        }

        public void SaveAll(List<Register> registersL)
        {
            File.WriteAllText(path, "");
            foreach (Register register in registersL)
            {
                string json = JsonConvert.SerializeObject(register, Formatting.Indented);

                using (StreamWriter sw = new StreamWriter(path, true))
                {
                    sw.WriteLine(json.Replace(Environment.NewLine, ""));
                }
            }
        }
    }
}
