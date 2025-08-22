import { Button } from "primereact/button";
import React, { useRef, useState } from "react";
import imageSvg from "../assets/Icons/Image.png";
 
interface DragAndDropUploadBoxProps {
  label?: string;
  // icon: React.ComponentType<{ className?: string; size?: number }>;
  // buttonLabel?: string;
  // side: string; // Replace with: side: Side; if you have a Side type
  // onFilesSelected: (files: FileList, side: string) => void; // Replace string with Side
  accept?: string;
  // multiple?: boolean;
  // fileInputRef?: React.RefObject<HTMLInputElement>;
  required?: boolean;
}
 
const DropzoneUpload: React.FC<DragAndDropUploadBoxProps> = ({label, accept, required = false}) => {
  const [isDragActive, setIsDragActive] = useState(false);
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
      {/* Icon */}
      <div className="bg-[#A3A3A3] p-4 mx-auto w-fit rounded">
        <img src={imageSvg} alt="upload icon" className="w-6 h-6" />
      </div>
 
      {/* Label */}
      <p className="text-sm text-gray-700 mt-2">
        Drop your logo here or click to browse
      </p>
 
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
        Choose File
      </Button>
 
      {/* Hidden input */}
      <input ref={inputRef} type="file" className="hidden" accept={accept}
      // required={required}
      />
    </div>
    </div>
   
  );
};
 
export default DropzoneUpload;