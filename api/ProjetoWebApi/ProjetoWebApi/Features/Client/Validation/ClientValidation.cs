using System.Text.RegularExpressions;
using System.Xml.Linq;

namespace ProjetoWebApi.Features.Client.Validation
{
    public static class ClientValidation 
    {
        
        public static void NameValidation(List<string> errors, string Name)
        {
            if (string.IsNullOrWhiteSpace(Name))
            {
                errors.Add("O nome do cliente é obrigatório.");
            }
            else if(Name.Length < 5)
            {
                errors.Add("O nome do cliente deve conter no mínimo 5 caracteres.");
            }
            else if (Name.Length > 50)
            {
                errors.Add("O nome do cliente não pode exceder 50 caracteres.");
            } 
        }
        public static void EmailValidation(List<string> errors, string Email)
        {
            if (string.IsNullOrWhiteSpace(Email))
            {
                errors.Add("O email do cliente é obrigatório.");
            }
            else if (!Regex.IsMatch(Email, @"^[^@\s]+@[^@\s]+\.[^@\s]+$"))
            {
                errors.Add("Formato de email inválido.");
            }
            else if (Email.Length > 200)
            {
                errors.Add("O email do cliente não pode exceder 200 caracteres.");
            }
        }
        public static void AgeValidation(List<string> errors, string Age)
        {
            int age;
            if (string.IsNullOrWhiteSpace(Age) || !int.TryParse(Age, out age))
            {
                errors.Add("A idade do cliente é obrigatório e deve ser um valor inteiro");
            }
            else if (age < 18 || age > 120)
            {
                errors.Add("A idade do cliente deve ser um valor entre 18 e 120");
            }
        }
        public static void AddressValidation(List<string> errors, string Address)
        {
            if (Address.Length > 150)
            {
                errors.Add("O endereço não pode exceder 150 caracteres.");
            }
        }
        public static void SmallTextValidation(List<string> errors, string text, string dataName)
        {
            if (text.Length > 1500)
            {
                errors.Add($"O campo {dataName} não pode exceder 1500 caracteres.");
            }
        }
    }
}
