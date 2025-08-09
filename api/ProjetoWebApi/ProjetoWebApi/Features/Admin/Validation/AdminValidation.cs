using System.Text.RegularExpressions;

namespace ProjetoWebApi.Features.Admin.Validation
{
    public static class AdminValidation
    {
        public static void NameValidation(List<string> errors, string Name)
        {
            if (string.IsNullOrWhiteSpace(Name))
            {
                errors.Add("É necessário preencher o campo de nome.");
            }
            else if (Name.Length < 5)
            {
                errors.Add("O campo nome deve conter no mínimo 5 caracteres.");
            }
            else if (Name.Length > 50)
            {
                errors.Add("O campo nome não deve exceder 50 caracteres.");
            }
        }
        public static void EmailValidation(List<string> errors, string Email)
        {
            if (string.IsNullOrWhiteSpace(Email))
            {
                errors.Add("É necessário preencher o campo de email.");
            }
            else if (!Regex.IsMatch(Email, @"^[^@\s]+@[^@\s]+\.[^@\s]+$"))
            {
                errors.Add("Formato de email inválido.");
            }
            else if (Email.Length > 200)
            {
                errors.Add("O campo email não deve exceder 200 caracteres.");
            }
        }
        public static void PasswordValidation(List<string> errors, string Password)
        {
            if (string.IsNullOrWhiteSpace(Password))
            {
                errors.Add("É necessário preencher o campo de senha.");
            }
            else if (Password.Length < 5)
            {
                errors.Add("O campo senha deve conter no mínimo 5 caracteres.");
            }
            else if (Password.Length > 50)
            {
                errors.Add("O campo senha não deve exceder 50 caracteres.");
            }
        }
    }
}
