import React, { useState, useRef } from "react";
import { Dialog } from "primereact/dialog";

import { FileText, Download, Upload, X } from "lucide-react";

interface DocumentViewerProps {
  title: string;
  url?: string;
  visible: boolean;
  onHide: () => void;
}

const DocumentViewer: React.FC<DocumentViewerProps> = ({
  title,
  url,
  visible,
  onHide,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  // Handle file selection
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
      const objectUrl = URL.createObjectURL(file);
      setFileUrl(objectUrl);
    } else {
      alert("Please select a PDF file");
    }
  };

  // Clean up object URL when component unmounts or file changes
  React.useEffect(() => {
    return () => {
      if (fileUrl) {
        URL.revokeObjectURL(fileUrl);
      }
    };
  }, [fileUrl]);

  // Custom header
  const headerTemplate = (
    <div className="flex justify-between p-3 items-center w-full bg-white border-b  border-gray-200">
      <span className="text-sm font-semibold text-gray-800">{title}</span>
      <button
        onClick={onHide}
        className=" hover:bg-gray-100 rounded-lg transition-colors"
        style={{ border: "none", background: "transparent" }}
      >
        <X size={20} className="text-gray-600" />
      </button>
    </div>
  );

  // Footer
  const footer = (
    <div className="flex justify-center mt-1 ">
      <button
        className="bg-black text-white  p-2 cursor-pointer    rounded-full border-none hover:bg-gray-800 flex items-center gap-2 transition-all duration-200"
        onClick={() => {
          if (selectedFile) {
            const link = document.createElement("a");
            link.href = fileUrl;
            link.download = selectedFile.name;
            link.click();
          } else if (url) {
            const link = document.createElement("a");
            link.href = url;
            link.download = title || "document.pdf";
            link.target = "_blank";
            link.click();
          }
        }}
        disabled={!selectedFile && !url}
      >
        <Download className="w-[10px] h-[10px]" />
        <p className="text-[10px]"> Download Document</p>
      </button>
      {/* <button
        onClick={() => setIsVisible(true)}
        className="bg-black text-white text-[10px]  p-1 rounded-full"
      >
        Open PDF Viewer
      </button> */}

      {/* DocumentViewer with local upload support */}
      {/* <DocumentViewer
        title="Local PDF Viewer"
        visible={isVisible}
        onHide={() => setIsVisible(false)}
      /> */}
    </div>
  );

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf"
        onChange={handleFileSelect}
        style={{ display: "none" }}
      />
      <Dialog
        header={headerTemplate}
        visible={visible}
        onHide={onHide}
        modal
        closable={false}
        draggable={false}
        resizable={false}
        contentStyle={{
          overflow: "hidden",
          width: "100%",

          background: "#fff",
        }}
        footer={footer}
        className="shadow-3xl no-scrollbar w-[50%]"
      >
        <>
          {fileUrl || url ? (
            <div className="bg-white   rounded-lg overflow-hidden relative border border-gray-300">
              <iframe
                src={`${
                  fileUrl || url
                }#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
                title={title}
                frameBorder="0"
                className="w-[calc(100%+2rem)] h-[calc(100vh-152px)] -m-1 bg-white  "
                style={{ border: "none" }}
              />
            </div>
          ) : (
            <div className="w-full h-full bg-white rounded-lg shadow-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-center p-8">
              <div className="mb-8 ">
                <FileText size={64} className="text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  No Document Selected
                </h3>
                <p className="text-gray-500 mb-6">
                  Please select a PDF document to view
                </p>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-black text-white px-6 py-3 rounded-full border-none hover:bg-gray-800 flex items-center gap-2 transition-all duration-200"
                >
                  <Upload size={16} />
                  Select PDF File
                </button>
              </div>
            </div>
          )}
        </>
      </Dialog>
    </>
  );
};

export default DocumentViewer;
