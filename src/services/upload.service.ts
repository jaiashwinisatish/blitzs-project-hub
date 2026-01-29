import { supabase } from '@/lib/supabase';

// Upload an image to Supabase Storage (bucket: 'avatars') and return the public URL
export const uploadImage = async (file: File, userId?: string): Promise<{ publicUrl: string; path: string }> => {
  // Construct a safe path
  const uid = userId || 'anonymous';
  const safeName = file.name.replace(/\s+/g, '_');
  const path = `${uid}/${Date.now()}_${safeName}`;

  // Upload to 'avatars' bucket. Ensure the bucket exists and is public or generate signed URLs if private
  const { data, error } = await supabase.storage.from('avatars').upload(path, file, {
    cacheControl: '3600',
    upsert: false,
  });

  if (error) {
    throw error;
  }

  // Get public URL
  const { data: urlData } = supabase.storage.from('avatars').getPublicUrl(path);
  return { publicUrl: urlData.publicUrl, path };
};

export const removeImage = async (path: string) => {
  if (!path) return;
  try {
    const { error } = await supabase.storage.from('avatars').remove([path]);
    if (error) throw error;
  } catch (err) {
    // Log but don't throw - cleanup is best-effort
    console.warn('Failed to remove image:', err);
  }
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
