using Microsoft.EntityFrameworkCore;
using NhaXeNoiBai.Model.Entities;
using NhaXeNoiBai.Model.Model;
using NhaXeNoiBai.Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Amazon.S3.Util.S3EventNotification;

namespace NhaXeNoiBai.Repository.Behaviours
{
    public class DoccumentRepositoryService : IDoccumentRepositoryService
    {
        private readonly TranportDBContext _context;

        public DoccumentRepositoryService(TranportDBContext context)
        {
            _context = context;
        }
        public async Task<Guid> AddDocument(DocumentEntity document)
        {
            if (document.Id == Guid.Empty)
            {
                document.Id = Guid.NewGuid();
            }
            _context.DocumentEntities.Add(document);
            await _context.SaveChangesAsync();

            return document.Id;
        }

        public async Task<Guid> DeleteDocument(DocumentEntity document)
        {
           var entity = await _context.DocumentEntities.FindAsync(document.Id); 
            if (entity == null) {
               return Guid.Empty;
            }
            _context.DocumentEntities.Remove(entity);
            await _context.SaveChangesAsync();  
            return entity.Id;
        }

        public async Task<DocumentEntity> GetInforFileByRecordEntity(Guid recordId)
        {
            var entity = await _context.DocumentEntities
                                       .Where(d => d.RecordId == recordId)
                                       .FirstOrDefaultAsync();
            if (entity == null)
            {
                throw new Exception($"No document found for RecordEntity {recordId}");
            }
            return entity;
        }

    }
}
