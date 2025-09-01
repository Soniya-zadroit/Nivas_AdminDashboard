import { Button } from "primereact/button";
import React, { useRef, useState, useEffect } from "react";
import imageSvg from "../assets/Icons/Image.png";
import axios from "axios";

export interface DragAndDropUploadBoxProps {
  label?: string;
  accept?: string;
  required?: boolean;
  value?: string | null; // final uploaded URL
  onChange?: (
    fileUrl: string | null,
    brandName?: string,
    filePath?: string
  ) => void; // returns uploaded file URL
  showPreview?: boolean;
  error?: string;
  brandName?: string; // new prop
}

const DropImage: React.FC<DragAndDropUploadBoxProps> = ({
  label,
  accept,
  required = false,
  value,
  onChange,
  // showPreview = true,
  error,
  brandName, // receive from parent
}) => {
  const [isDragActive, setIsDragActive] = useState(false);
  // const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [filePath, setFilePath] = useState<string>();

  // useEffect(() => {
  //   if (typeof value === "string" && value) {
  //     setPreview(value);
  //   } else {
  //     setPreview(null);
  //   }
  // }, [value]);

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
      await uploadFile(file);
    }
  };

  const uploadFile = async (file: File) => {
    if (!brandName) {
      console.error("Brand name is required to upload the file");
      return;
    }

    try {
      setUploading(true);

      const response = await axios.post(
        `${
          import.meta.env.VITE_API_URL
        }/brand/registerFormDocument/generateUploadUrl`,
        {
          fileName: file.name,
          brandName, // use prop from parent
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

      const oldFile = filePath;
      setFilePath(data.filePath);

      await axios.put(data.uploadUrl, file, {
        headers: { "Content-Type": file.type },
      });

      if (oldFile) {
        const response = await axios.post(
          `${
            import.meta.env.VITE_API_URL
          }/brand/registerFormDocument/DeleteDocument`,
          {
            oldFile: oldFile,
          },
          {
            headers: {
              Authorization: localStorage.getItem("token") || "",
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.data.data.status) {
          console.log(
            "DropImage.tsx -------------------------- >  117  Error in deleting old FIle"
          );
        }
      }

      onChange?.(data.fileUrl, brandName, filePath);
    } catch (err) {
      console.error("❌ Upload failed:", err);
      onChange?.(null, brandName);
    } finally {
      setUploading(false);
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
        <div className="flex flex-col items-center justify-center gap-2">
          {!filePath ? (
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
                {filePath.split("/").pop()}
              </p>
            </div>
          )}
        </div>

        <Button
          type="button"
          rounded
          disabled={uploading}
          style={{
            backgroundColor: "black",
            border: "none",
            color: "white",
            marginTop: "10px",
          }}
          onClick={handleButtonClick}
        >
          {uploading ? "Uploading..." : value ? "Change File" : "Choose File"}
        </Button>

        <input
          ref={inputRef}
          type="file"
          className="hidden"
          accept={accept}
          onChange={handleFileChange}
        />
      </div>

      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
    // <div className="flex flex-col gap-1 w-full">
    //   <label className="text-sm font-medium text-gray-700">
    //     {label} {required && <span className="text-red-500">*</span>}
    //   </label>

    //   <div
    //     className={`border-dashed border-2 border-gray-300 rounded-lg p-6 text-center shadow-sm transition-colors ${
    //       isDragActive ? "bg-green-50 border-green-500" : ""
    //     }`}
    //     onDragOver={handleDragOver}
    //     onDragLeave={handleDragLeave}
    //     onClick={handleButtonClick} // allow click anywhere
    //   >
    //     {!filePath ? (
    //       <div className="flex flex-col items-center justify-center gap-2">
    //         <div className="bg-gray-300 p-3 rounded">
    //           <img src={imageSvg} alt="upload icon" className="w-6 h-6" />
    //         </div>
    //         <p className="text-sm text-gray-700">
    //           Drop your file here or click to browse
    //         </p>
    //       </div>
    //     ) : (
    //       <div className="flex items-center justify-center gap-2">
    //         <div className="bg-gray-500 p-2 rounded">
    //           <img src={imageSvg} alt="file icon" className="w-4 h-4" />
    //         </div>
    //         <p className="text-sm text-gray-700 font-medium truncate max-w-[300px]">
    //           {filePath.split("/").pop()}
    //         </p>
    //       </div>
    //     )}

    //     <Button
    //       type="button"
    //       rounded
    //       disabled={uploading}
    //       className="mt-4 bg-black text-white border-none"
    //     >
    //       {uploading
    //         ? "Uploading..."
    //         : filePath
    //         ? "Change File"
    //         : "Choose File"}
    //     </Button>

    //     <input
    //       ref={inputRef}
    //       type="file"
    //       className="hidden"
    //       accept={accept}
    //       onChange={handleFileChange}
    //     />
    //   </div>

    //   {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    // </div>
  );
};

export default DropImage;
