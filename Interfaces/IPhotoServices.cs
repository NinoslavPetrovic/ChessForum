using CloudinaryDotNet.Actions;

namespace ChessForumWebApp.Interfaces
{
    public interface IPhotoServices
    {
        Task<ImageUploadResult> AddPhotoAsync(IFormFile file);
        Task<DeletionResult> DeletePhotoAsync(string publicId);
    }
}
