// Simple file upload service
// For now, we'll use a placeholder service that returns a URL
// In production, you would integrate with Cloudinary, AWS S3, or similar

export const uploadImage = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    // For demo purposes, we'll use a placeholder URL
    // In production, you would upload to Cloudinary or similar service
    
    // Simulate upload delay
    setTimeout(() => {
      // Generate a unique placeholder URL based on file name
      const placeholderUrl = `https://images.unsplash.com/photo-${Date.now()}?w=400&h=400&fit=crop&crop=face`;
      resolve(placeholderUrl);
    }, 1000);
    
    // TODO: Implement real upload service
    /*
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'developer_avatars');
    
    try {
      const response = await fetch('https://api.cloudinary.com/v1_1/your_cloud_name/image/upload', {
        method: 'POST',
        body: formData
      });
      
      if (!response.ok) {
        throw new Error('Upload failed');
      }
      
      const data = await response.json();
      resolve(data.secure_url);
    } catch (error) {
      reject(error);
    }
    */
  });
};

export const validateImageFile = (file: File): string | null => {
  // Check file size (max 5MB)
  if (file.size > 5 * 1024 * 1024) {
    return 'Image must be less than 5MB';
  }
  
  // Check file type
  if (!file.type.startsWith('image/')) {
    return 'Please select a valid image file';
  }
  
  // Check file extensions
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
  if (!validTypes.includes(file.type)) {
    return 'Only JPEG, PNG, GIF, and WebP images are allowed';
  }
  
  return null; // No error
};
