using NhaXeNoiBai.Model.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NhaXeNoiBai.Service.Interfaces
{
    public interface IDoccumentService
    {
        Task<Guid> AddDocument(DocumentEntity document);
        Task<Guid> DeleteDocument(DocumentEntity document);
        Task<DocumentEntity> GetInforFileByRecordEntity(Guid recordId);
        Task<bool> CheckFileInListDocument(string? recordId);


    }
}
