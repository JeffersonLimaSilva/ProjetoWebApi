namespace ProjetoWebApi.Features.Login.Validation
{
    public static class LoginValidation
    {
        public static void EmailValidation(List<string> errors, string Email)
        {
            if (string.IsNullOrWhiteSpace(Email))
            {
                errors.Add("É necessário preencher o campo de email.");
            }
        }
        public static void PasswordValidation(List<string> errors, string Password)
        {
            if (string.IsNullOrWhiteSpace(Password))
            {
                errors.Add("É necessário preencher o campo de senha.");
            }
        }
    }
}
