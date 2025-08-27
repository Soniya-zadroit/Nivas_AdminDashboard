import { Button } from "primereact/button";
import React, { useRef, useState } from "react";
import imageSvg from "../assets/Icons/Image.png";

interface DragAndDropUploadBoxProps {
  label?: string;
  accept?: string;
  required?: boolean;
}

const DropImage: React.FC<DragAndDropUploadBoxProps> = ({
  label,
  accept,
  required = false,
}) => {
  const [isDragActive, setIsDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragActive(false);
  };

  const handleButtonClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <div
        className={`border-dashed border-2 border-gray-300 rounded-lg p-6 text-center shadow-sm transition-colors ${
          isDragActive ? "bg-green-50 border-green-500" : ""
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        {/* Icon + Text/FileName */}
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="bg-[#A3A3A3] p-3 rounded">
            <img src={imageSvg} alt="upload icon" className="w-3 h-3" />
          </div>

          {!selectedFile ? (
            <p className="text-sm text-gray-700 ">
              Drop your logo here or click to browse
            </p>
          ) : (
            <p className="text-sm text-gray-700 font-medium truncate max-w-[200px]">
              {selectedFile.name}
            </p>
          )}
        </div>

        {/* Button */}
        <Button
          type="button"
          rounded
          style={{
            backgroundColor: "black",
            border: "none",
            color: "white",
            marginTop: "10px",
          }}
          onClick={handleButtonClick}
        >
          {selectedFile ? "Change File" : "Choose File"}
        </Button>

        {/* Hidden input */}
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          accept={accept}
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
};

export default DropImage;
