using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NhaXeNoiBai.Model.Model
{
    public class UploadFileModel
    {
        public IFormFile File { set; get; }

        public string? DocumentType { get; set; }
        public string? Entity { get; set; }
        public string? RecordId { get; set; }
    }
}
