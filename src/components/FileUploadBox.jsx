/* FileUploadBox.jsx */

import { useRef, useState } from 'react';
import './FileUploadBox.css'

export default function FileUploadBox({ onFileUpload, uploadedFile }) {
    const fileInputRef = useRef();
    const [dragActive, setDragActive] = useState(false);

    const handleChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            onFileUpload(file);
        }
    };

    const handleDragOver = (e) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(true);
  };

  const handleDragLeave = (e) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);
  };

  const handleDrop = (e) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);

      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
          const file = e.dataTransfer.files[0];
          onFileUpload(file);
      }
  };

    return (
      <div
          className={`file-upload-box ${dragActive ? 'drag-active' : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
      >
        <label htmlFor="file-upload" className="upload-label">
          {uploadedFile ? `Uploaded ${uploadedFile.name}` : 'Drag and drop your instagram .zip file or click to select a file'}
        </label>
        <input
          id="file-upload"
          type="file"
          accept=".zip"
          onChange={handleChange}
          ref={fileInputRef}
          className="upload-input"
        />
      </div>
    );
}
