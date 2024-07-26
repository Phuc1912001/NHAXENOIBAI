using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NhaXeNoiBai.Model.Entities
{
    public class DocumentEntity:BaseEntity
    {
        [Column("FolderId")]
        public Guid? FolderId { get; set; }
        [Column("DocumentType")]
        public string? DocumentType { get; set; }
        [Column("RecordEntity")]
        public string? RecordEntity { get; set; }
        [Column("SubFolderId")]
        public Guid? SubFolderId { get; set; }
        [Column("RecordId")]
        public Guid? RecordId { get; set; }
        [Column("SubFolder")]
        public string? SubFolder { get; set; }
        [Column("FileName")]
        public string? FileName { get; set; }
        [Column("FileSize")]
        public long? FileSize { get; set; }
        [Column("FileUrl")]
        public string? FileUrl { get; set; }
        [Column("Key")]
        public string? Key { get; set; }
    }
}
