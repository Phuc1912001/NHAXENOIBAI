using Amazon.S3;
using Amazon.S3.Model;
using Amazon.S3.Transfer;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NhaXeNoiBai.Model.Entities;
using NhaXeNoiBai.Model.Model;
using NhaXeNoiBai.Service.Interfaces;
using System.Text.RegularExpressions;

namespace NhaXeNoiBai.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FileController : ControllerBase
    {
        private readonly IAmazonS3 _s3Client;
        private readonly IDoccumentService _doccumentService;
        private readonly IDiscountService _discountService;
        public FileController(IAmazonS3 s3Client , IDoccumentService doccumentService , IDiscountService discountService )
        {
            _s3Client = AwsConfiguration.InitializeS3Client();
            _doccumentService = doccumentService;
            _discountService = discountService;
        }
        [HttpPost]
        public async Task<bool> UploadFileAsync([FromForm]UploadFileModel model)
        {
            var file = model.File;
            string bucketName = "nhaxesanbay";
            try
            {
                if (file != null && file.Length > 0)
                {
                    Regex characterRegex = new Regex(@"""|#|%|&|\*|:|<|>|\?|/|\\|{|\||}", RegexOptions.None, new TimeSpan(0, 0, 10));
                    if (characterRegex.IsMatch(file.FileName))
                    {
                        throw new Exception(@"A file name cannot contain any of the following characters: ~ "" # % & * : < > ? / { | }");
                    }

                    var IdFile = Guid.NewGuid();
                    string keyName = $"{model.Entity}/{model.RecordId}/{model.DocumentType}/{IdFile}/{Path.GetExtension(file.FileName)}";
                    string fileUrl = $"https://{bucketName}.s3.amazonaws.com/{keyName}";

                    var checkFile = await _doccumentService.CheckFileInListDocument(model.RecordId);

                    if(checkFile)
                    {
                        await DeleteFileAsync(Guid.Parse(model.RecordId!));
                    }
               
                    var entity = new DocumentEntity()
                    {
                        Id = IdFile,
                        DocumentType = model.DocumentType,
                        RecordId = Guid.Parse(model.RecordId),
                        RecordEntity = model.Entity,
                        FileName = file.FileName,
                        FileSize = file.Length,
                        FileUrl = fileUrl,
                        Key = keyName,
                        CreateAt = DateTime.Now,
                        UpdateAt = DateTime.Now,
                    };
                    await _doccumentService.AddDocument(entity);

                    using (var memoryStream = new MemoryStream())
                    {
                        await file.CopyToAsync(memoryStream);
                        var uploadRequest = new TransferUtilityUploadRequest
                        {
                            InputStream = memoryStream,
                            Key = keyName,
                            BucketName = bucketName,
                            CannedACL = S3CannedACL.PublicRead
                        };

                        var fileTransferUtility = new TransferUtility(_s3Client);
                        await fileTransferUtility.UploadAsync(uploadRequest);
                    }

                    return true;
                }
                return false;
            }
            catch (Exception ex)
            {
                throw new Exception($"Internal server error: {ex.Message}");
            }
        }

        //[HttpPost]
        //public async Task<IActionResult> UploadFileAsync(IFormFile file, string? prefix)
        //{
        //    string bucketName = "nhaxesanbay";
        //    var bucketExists = await Amazon.S3.Util.AmazonS3Util.DoesS3BucketExistV2Async(_s3Client, bucketName);
        //    if (!bucketExists) return NotFound($"Bucket {bucketName} does not exist.");
        //    var request = new PutObjectRequest()
        //    {
        //        BucketName = bucketName,
        //        Key = string.IsNullOrEmpty(prefix) ? file.FileName : $"{prefix?.TrimEnd('/')}/{file.FileName}",
        //        InputStream = file.OpenReadStream()
        //    };
        //    request.Metadata.Add("Content-Type", file.ContentType);
        //    await _s3Client.PutObjectAsync(request);
        //    return Ok($"File {prefix}/{file.FileName} uploaded to S3 successfully!");
        //}



        [HttpGet]
        public async Task<IActionResult> GetAllFilesAsync( string? prefix)
        {
            string bucketName = "nhaxesanbay";
            var bucketExists = await Amazon.S3.Util.AmazonS3Util.DoesS3BucketExistV2Async(_s3Client, bucketName);
            if (!bucketExists) return NotFound($"Bucket {bucketName} does not exist.");
            var request = new ListObjectsV2Request()
            {
                BucketName = bucketName,
                Prefix = prefix
            };
            var result = await _s3Client.ListObjectsV2Async(request);
            var s3Objects = result.S3Objects.Select(s =>
            {
                var urlRequest = new GetPreSignedUrlRequest()
                {
                    BucketName = bucketName,
                    Key = s.Key,
                    Expires = DateTime.UtcNow.AddMinutes(1)
                };
                return new S3ObjectDto()
                {
                    Name = s.Key.ToString(),
                    PresignedUrl = _s3Client.GetPreSignedURL(urlRequest),
                };
            });
            return Ok(s3Objects);
        }

        //[HttpPost("preview")]
        //public async Task<IActionResult> GetFileByKeyAsync(FileInforImage fileInforImage)
        //{
        //    string bucketName = "nhaxesanbay";
        //    var bucketExists = await Amazon.S3.Util.AmazonS3Util.DoesS3BucketExistV2Async(_s3Client, bucketName);
        //    if (!bucketExists) return NotFound($"Bucket {bucketName} does not exist.");
        //    var s3Object = await _s3Client.GetObjectAsync(bucketName, fileInforImage.KeyImage);
        //    return File(s3Object.ResponseStream, s3Object.Headers.ContentType);
        //}

        [HttpGet("preview")]
        public async Task<IActionResult> GetFileByKeyAsync( string key)
        {
            string bucketName = "nhaxesanbay";
            var bucketExists = await Amazon.S3.Util.AmazonS3Util.DoesS3BucketExistV2Async(_s3Client, bucketName);
            if (!bucketExists) return NotFound($"Bucket {bucketName} does not exist.");
            var s3Object = await _s3Client.GetObjectAsync(bucketName, key);
            return File(s3Object.ResponseStream, s3Object.Headers.ContentType);
        }

       


        [HttpDelete]
        public async Task<string> DeleteFileAsync(Guid recordId)
        {
            try
            {
                string bucketName = "nhaxesanbay";
                var document = await _doccumentService.GetInforFileByRecordEntity(recordId);
                var deleteObjectRequest = new DeleteObjectRequest
                {
                    BucketName = bucketName,
                    Key = document.Key,
                };

                await _s3Client.DeleteObjectAsync(deleteObjectRequest);

                await _doccumentService.DeleteDocument(document);
                return "success";
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        [HttpDelete("discount/{id}")]
        public async Task<IActionResult> DeleteDiscount(Guid id)
        {
            try
            {
                await _discountService.DeleteDiscount(id);
                await DeleteFileAsync(id);

                return Ok("Discount deleted successfully.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }


    }
}
