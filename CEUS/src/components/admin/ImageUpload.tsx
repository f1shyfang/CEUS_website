'use client';

import { useState, useRef } from 'react';
import { FiX, FiLoader, FiImage } from 'react-icons/fi';
import { uploadFile, STORAGE_BUCKETS } from '@/lib/supabase';

type BucketName = typeof STORAGE_BUCKETS[keyof typeof STORAGE_BUCKETS];

interface ImageUploadProps {
  id?: string;
  bucket: BucketName;
  folder?: string;
  currentUrl?: string;
  onUpload: (url: string) => void;
  onRemove?: () => void;
  className?: string;
}

export default function ImageUpload({
  id,
  bucket,
  folder,
  currentUrl,
  onUpload,
  onRemove,
  className = '',
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(currentUrl || null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image must be less than 5MB');
      return;
    }

    setError(null);
    setIsUploading(true);

    try {
      // Create a unique filename
      const ext = file.name.split('.').pop();
      const filename = `${Date.now()}-${Math.random().toString(36).substring(7)}.${ext}`;
      const uploadPath = folder ? `${folder}/${filename}` : filename;

      const result = await uploadFile(bucket, uploadPath, file, { upsert: true });
      
      setPreview(result.url);
      onUpload(result.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to upload image');
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
    onRemove?.();
  };

  return (
    <div className={className}>
      {preview ? (
        <div className="relative">
          {/* Preview URL can be a dynamic external source. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={preview}
            alt="Preview"
            className="w-full h-48 object-cover rounded-lg bg-gray-700"
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 p-1 bg-gray-900/80 hover:bg-red-600 text-white rounded-full transition"
          >
            <FiX className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <label
          className={`flex flex-col items-center justify-center w-full h-48 bg-gray-700 border-2 border-dashed rounded-lg cursor-pointer transition ${
            isUploading
              ? 'border-indigo-500 bg-indigo-500/10'
              : 'border-gray-600 hover:border-gray-500 hover:bg-gray-600'
          }`}
        >
          <input
            id={id}
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={isUploading}
            className="hidden"
          />
          {isUploading ? (
            <div className="flex flex-col items-center gap-2 text-indigo-400">
              <FiLoader className="w-8 h-8 animate-spin" />
              <span className="text-sm">Uploading...</span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 text-gray-400">
              <FiImage className="w-8 h-8" />
              <span className="text-sm">Click to upload image</span>
              <span className="text-xs text-gray-500">Max 5MB, PNG/JPG/WebP</span>
            </div>
          )}
        </label>
      )}

      {error && (
        <p className="mt-2 text-sm text-red-400">{error}</p>
      )}
    </div>
  );
}
