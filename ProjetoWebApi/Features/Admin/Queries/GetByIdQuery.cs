using ProjetoWebApi.Common.Interfaces;

namespace ProjetoWebApi.Features.Admin.Queries
{
    public class GetByIdQuery : IQuery<Model.Admin>
    {
        public GetByIdQuery(Guid idAdmin)
        {
            IdAdmin = idAdmin;
        }
        public Guid IdAdmin { get; set; }

    }
}
