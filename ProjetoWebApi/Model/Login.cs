using Newtonsoft.Json;
using System;
using System.IO;
using System.Xml.Linq;
using System.Collections.Generic;
using System.Linq;

namespace ProjetoWebApi.Model
{
    public class Login
    {
        public Guid Id { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }

        public Login() { }
        public Login(Guid id, string email, string password)
        {
            Id = id;
            Email = email;
            Password = password;
        }

        
    }
}
