import cloudinary from 'cloudinary';

export const uploadFiles = async (req, res) => {
  try {
    const profilePicture = req.files?.profilePicture || [];
    const resume = req.files?.resume || [];

    let profilePicUrl = "";
    let resumeUrl = "";

    // Handle profile picture upload
    if (profilePicture.length > 0) {
      const profilePicUploadResponse = await cloudinary.uploader.upload(
        profilePicture[0].path,  // Direct file path or buffer
        {
          resource_type: 'image'  // Automatically handles images
        }
      );
      profilePicUrl = profilePicUploadResponse.secure_url;
    }

    // Handle resume upload
    if (resume.length > 0) {
      const resumeUploadResponse = await cloudinary.uploader.upload(
        resume[0].path, // Direct file path or buffer
        { resource_type: 'raw' }  // Use 'raw' for non-image files like PDFs
      );
      resumeUrl = resumeUploadResponse.secure_url;
    }

    // Return response with URLs of uploaded files
    return res.status(200).json({
      success: true,
      profilePicUrl,
      resumeUrl
    });
  } catch (error) {
    console.error("Error during file upload:", error);
    return res.status(500).json({ success: false, message: 'File upload failed' });
  }
};
