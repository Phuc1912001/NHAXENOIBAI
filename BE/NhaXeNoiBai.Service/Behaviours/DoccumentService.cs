using AutoMapper;
using Microsoft.Extensions.Logging;
using NhaXeNoiBai.Model.Entities;
using NhaXeNoiBai.Repository.Interfaces;
using NhaXeNoiBai.Service.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NhaXeNoiBai.Service.Behaviours
{
    public class DoccumentService : IDoccumentService
    {
        private readonly ILogger<PriceService> _logger;
        private readonly IDoccumentRepositoryService _doccumentRepositoryService;
        private readonly IMapper _mapper;
        public DoccumentService(ILogger<PriceService> logger, IDoccumentRepositoryService doccumentRepositoryService, IMapper mapper)
        {
            this._logger = logger;
            this._doccumentRepositoryService = doccumentRepositoryService;
            this._mapper = mapper;
        }
        public async Task<Guid> AddDocument(DocumentEntity document)
        {
            var result = await _doccumentRepositoryService.AddDocument(document);
            return result;
        }

        public async Task<Guid> DeleteDocument(DocumentEntity document)
        {
            var result = await _doccumentRepositoryService.DeleteDocument(document);    
            return result;
        }

        public async Task<DocumentEntity> GetInforFileByRecordEntity(Guid recordId)
        {
            var result = await _doccumentRepositoryService.GetInforFileByRecordEntity(recordId);
            return result;  
        }
    }
}
