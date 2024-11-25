import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, AlertCircle } from 'lucide-react';

interface ContentUploaderProps {
  onUpload: (files: File[]) => void;
  onClose: () => void;
  isUploading: boolean;
  error: string | null;
}

const ContentUploader: React.FC<ContentUploaderProps> = ({
  onUpload,
  onClose,
  isUploading,
  error
}) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    onUpload(acceptedFiles);
  }, [onUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'video/*': ['.mp4', '.mov', '.avi'],
      'audio/*': ['.mp3', '.wav', '.m4a'],
      'image/*': ['.jpg', '.jpeg', '.png', '.gif'],
      'application/pdf': ['.pdf'],
      'text/plain': ['.txt'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    multiple: true
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-lg w-full m-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Upload Content</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 mb-4 text-center transition-colors ${
            isDragActive ? 'border-navy-blue bg-navy-blue/5' : 'border-gray-300'
          }`}
        >
          <input {...getInputProps()} />
          <Upload size={48} className="mx-auto mb-4 text-gray-400" />
          <p className="text-lg mb-2">
            {isDragActive ? 'Drop files here' : 'Drag and drop your files here'}
          </p>
          <p className="text-gray-500 mb-4">or</p>
          <button className="bg-navy-blue text-white px-6 py-2 rounded-full hover:bg-opacity-90">
            Browse Files
          </button>
          <p className="mt-4 text-sm text-gray-500">
            Supported formats: Video, Audio, Images, PDF, DOC, DOCX, TXT
          </p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-500 p-3 rounded-lg mb-4 flex items-center">
            <AlertCircle size={20} className="mr-2" />
            {error}
          </div>
        )}

        {isUploading && (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-navy-blue"></div>
            <span className="ml-2">Uploading...</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentUploader;