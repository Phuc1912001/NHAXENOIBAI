using NhaXeNoiBai.Model.Helper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NhaXeNoiBai.Repository.Interfaces
{
    public interface IEmailRepositoryService
    {
        Task<string> SendEmailAsync(Mailrequest mailrequest);
      
     }
}
