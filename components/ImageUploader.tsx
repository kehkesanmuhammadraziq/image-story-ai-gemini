
import React, { useCallback, useState } from 'react';

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
  imageUrl: string | null;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload, imageUrl }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (files: FileList | null) => {
    if (files && files[0]) {
      onImageUpload(files[0]);
    }
  };

  const onDragEnter = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);
  
  const onDragLeave = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);
  
  const onDragOver = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);
  
  const onDrop = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    handleFileChange(e.dataTransfer.files);
  }, [handleFileChange]);

  const uploaderContent = imageUrl ? (
    <div className="relative w-full h-full">
      <img src={imageUrl} alt="Uploaded preview" className="w-full h-full object-contain rounded-lg" />
      <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-lg">
        <span className="text-white font-bold text-lg">Change Image</span>
      </div>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center text-center text-slate-400">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      <p className="font-semibold text-slate-300">
        <span className="text-indigo-400">Click to upload</span> or drag and drop
      </p>
      <p className="text-xs">PNG, JPG, GIF up to 10MB</p>
    </div>
  );

  return (
    <label
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDragOver={onDragOver}
      onDrop={onDrop}
      className={`relative block w-full h-64 cursor-pointer rounded-lg border-2 border-dashed border-slate-600 hover:border-indigo-500 transition-colors duration-300 flex items-center justify-center ${isDragging ? 'border-indigo-500 bg-slate-700/50' : ''}`}
    >
      <input
        type="file"
        accept="image/png, image/jpeg, image/gif, image/webp"
        onChange={(e) => handleFileChange(e.target.files)}
        className="absolute w-0 h-0 opacity-0"
      />
      {uploaderContent}
    </label>
  );
};
