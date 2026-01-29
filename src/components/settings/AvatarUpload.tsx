import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { uploadImage, validateImageFile, removeImage } from '@/services/upload.service';
import { authService } from '@/services/auth.service';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const AvatarUpload: React.FC = () => {
  const { user, refreshUser } = useAuth();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(user?.avatar || null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] || null;
    if (!f) return;

    const err = validateImageFile(f);
    if (err) {
      toast.error(err);
      return;
    }

    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const handleUpload = async () => {
    if (!file) return toast.error('Please choose an image to upload');
    if (!user) return toast.error('You must be signed in to upload an avatar');
    setIsUploading(true);
    try {
      // Use Supabase storage upload
      const { publicUrl, path } = await uploadImage(file, user.id);

      // Remove previous avatar file if available (best-effort)
      if ((user as any).avatar_path) {
        try {
          await removeImage((user as any).avatar_path);
        } catch (err) {
          console.warn('Failed to remove previous avatar', err);
        }
      }

      // Update user profile avatar and record storage path
      const { user: updated, error } = await authService.updateProfile({ avatar: publicUrl, avatar_path: path });
      if (error) {
        toast.error('Failed to update avatar');
      } else {
        toast.success('Avatar updated');
        await refreshUser();
        setPreview(url);
        setFile(null);
      }
    } catch (err: any) {
      console.error(err);
      toast.error(err?.message || 'Upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div id="avatar" className="space-y-3">
      <h3 className="text-lg font-semibold">Avatar</h3>
      <p className="text-sm text-muted-foreground">Upload a profile image (max 5MB). This will be shown in the header.</p>

      <div className="flex items-center gap-4">
        {preview ? (
          <img src={preview} alt="avatar preview" className="h-20 w-20 rounded-full object-cover" />
        ) : (
          <div className="h-20 w-20 rounded-full bg-muted-foreground flex items-center justify-center text-lg font-medium">{user?.full_name ? user.full_name.split(' ').map(n=> n[0]).slice(0,2).join('') : user?.email?.split('@')[0].slice(0,2).toUpperCase()}</div>
        )}

        <div className="space-y-2">
          <input type="file" accept="image/*" onChange={handleFileChange} />
          <div className="flex gap-2">
            <Button onClick={handleUpload} disabled={!file || isUploading}>{isUploading ? 'Uploading...' : 'Upload'}</Button>
            <Button variant="ghost" onClick={() => { setFile(null); setPreview(user?.avatar || null); }}>Cancel</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvatarUpload;
