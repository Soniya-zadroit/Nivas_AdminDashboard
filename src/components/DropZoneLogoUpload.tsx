import { Button } from "primereact/button";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import imageSvg from "../assets/Icons/Image.png";

interface DragAndDropUploadBoxProps {
  label?: string;
  accept?: string;
  required?: boolean;
  brandName?: string; // required for upload
  filePath?: string; // old file path
  value?: string;
  onChange?: (
    fileUrl: string | null,
    brandName?: string,
    filePath?: string
  ) => void;
}

const DropzoneLogoUpload: React.FC<DragAndDropUploadBoxProps> = ({
  label,
  accept,
  required = false,
  brandName,
  filePath,
  onChange,
  value,
}) => {
  // console.log(
  //   "DropZoneFileUpload.tsx / brandName / 122 -------------------  ",
  //   brandName
  // );
  console.log(
    "DropZoneLogoUpload.tsx / value / 27 -------------------  ",
    value
  );
  const [isDragActive, setIsDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [newFilePath, setNewFilePath] = useState<string>();

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

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setSelectedFile(file);

      if (!brandName) {
        console.error("Brand name is required to upload the file");
        return;
      }

      setUploading(true);

      try {
        // Step 1: Get upload URL from server
        const response = await axios.post(
          `${
            import.meta.env.VITE_API_URL
          }/brand/registerFormDocument/generateUploadUrl`,
          {
            fileName: file.name,
            brandName,
          },
          {
            headers: {
              Authorization: localStorage.getItem("token") || "",
              "Content-Type": "application/json",
            },
          }
        );

        const data = response.data.data;
        if (!data?.uploadUrl || !data?.fileUrl) {
          throw new Error("Upload URL not received");
        }

        setNewFilePath(data.filePath);
        const oldFile = filePath;

        // Step 2: Upload the file to the generated URL
        await axios.put(data.uploadUrl, file, {
          headers: { "Content-Type": file.type },
        });

        // Step 3: Delete old file if it exists
        if (oldFile) {
          const deleteResponse = await axios.post(
            `${
              import.meta.env.VITE_API_URL
            }/brand/registerFormDocument/DeleteDocument`,
            { oldFile },
            {
              headers: {
                Authorization: localStorage.getItem("token") || "",
                "Content-Type": "application/json",
              },
            }
          );

          if (!deleteResponse.data.data.status) {
            console.warn("Error deleting old file");
          }
        }

        // Step 4: Call parent callback
        onChange?.(data.fileUrl, brandName, data.filePath);
      } catch (err) {
        console.error("❌ Upload failed:", err);
        onChange?.(null, brandName);
      } finally {
        setUploading(false);
      }
    }
  };

  useEffect(() => {
    console.log(
      "DropZoneLogoUpload.tsx / value changed / -------------------  ",
      value
    );

    if (value) {
      setNewFilePath(value);
    } else {
      setNewFilePath(undefined);
    }
  }, [value]);

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
          {/* <div className="bg-[#A3A3A3] p-3 rounded">
            <img src={imageSvg} alt="upload icon" className="w-3 h-3" />
          </div>

          {!selectedFile ? (
            <p className="text-[10px] text-gray-700">
              Upload a scanned copy of your {label}
            </p>
          ) : (
            <p className="text-sm text-gray-700 font-medium truncate max-w-[200px]">
              {newFilePath}
            </p>
          )} */}

          {!newFilePath ? (
            <>
              <div className="bg-[#A3A3A3] p-3 rounded">
                <img src={imageSvg} alt="upload icon" className="w-3 h-3" />
              </div>
              <p className="text-sm text-gray-700">
                Drop your logo here or click to browse
              </p>
            </>
          ) : (
            <div className="flex items-center justify-center gap-2">
              <div className="bg-gray-500 p-2 rounded">
                <img src={imageSvg} alt="file icon" className="w-4 h-4" />
              </div>
              <p className="text-sm text-gray-700 font-medium truncate max-w-[300px]">
                {newFilePath}
              </p>
            </div>
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
          disabled={uploading} // prevent multiple uploads
        >
          {uploading
            ? "Uploading..."
            : selectedFile
            ? "Change File"
            : "Choose File"}
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

export default DropzoneLogoUpload;
