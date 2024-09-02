using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Options;
using MimeKit;
using NhaXeNoiBai.Model.Helper;
using NhaXeNoiBai.Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NhaXeNoiBai.Repository.Behaviours
{
    public class EmailRepositoryServcie : IEmailRepositoryService
    {
        private readonly EmailSettings emailSettings;

        public EmailRepositoryServcie(IOptions<EmailSettings> options)
        {
            emailSettings = options.Value;
        }

        public async Task<string> SendEmailAsync(Mailrequest mailrequest)
        {
            var email = new MimeMessage();
            email.Sender = new MailboxAddress(emailSettings.Displayname, emailSettings.Email);
            email.From.Add(new MailboxAddress(emailSettings.Displayname, emailSettings.Email));

            email.To.Add(new MailboxAddress(mailrequest.ToEmail, mailrequest.ToEmail));
            email.Subject = mailrequest.Subject;

            var builder = new BodyBuilder();

            builder.HtmlBody = mailrequest.Body;
            email.Body = builder.ToMessageBody();

            using var smtp = new MailKit.Net.Smtp.SmtpClient();

            try
            {
                await smtp.ConnectAsync(emailSettings.Host, emailSettings.Port, SecureSocketOptions.StartTls);
                await smtp.AuthenticateAsync(emailSettings.Email, emailSettings.Password);
                await smtp.SendAsync(email);
            }
            catch (Exception ex)
            {
                return "k gủi dk mail";
            }
            smtp.Disconnect(true);
            return "gui mail thanh cong";

        }
    }
}
