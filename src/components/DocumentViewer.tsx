import React from "react";
import { Dialog } from "primereact/dialog";
import { Download, X, FileText } from "lucide-react";

interface DocumentViewerProps {
  title: string;
  url?: string; // remote PDF URL
  downloadUrl?: string; // presigned download URL for automatic download
  visible: boolean;
  onHide: () => void;
}

const DocumentViewer: React.FC<DocumentViewerProps> = ({
  title,
  url,
  downloadUrl,
  visible,
  onHide,
}) => {
  // Header template
  const headerTemplate = (
    <div className="flex justify-between p-3 items-center w-full bg-white border-b border-gray-200">
      <span className="text-sm font-semibold text-gray-800">{title}</span>
      <button
        onClick={onHide}
        className="hover:bg-gray-100 rounded-lg transition-colors"
        style={{ border: "none", background: "transparent" }}
      >
        <X size={20} className="text-gray-600" />
      </button>
    </div>
  );

  // Footer template with download button
  const footer = (
    <div className="flex justify-center mt-1 gap-4">
      <button
        className="bg-black text-white  p-2 cursor-pointer rounded-full border-none hover:bg-gray-800 flex items-center gap-2 transition-all duration-200"
        onClick={() => {
          const finalUrl = downloadUrl ?? url;
          const fileName = title ?? "document.pdf";

          if (!finalUrl) return;

          const link = document.createElement("a");
          link.href = finalUrl;
          link.download = fileName;
          link.click();
        }}
        disabled={!url && !downloadUrl}
      >
        <Download size={"1rem"} />
        <p className="text-[]">Download Document</p>
      </button>
    </div>
  );

  return (
    <Dialog
      header={headerTemplate}
      visible={visible}
      onHide={onHide}
      modal
      closable={false}
      draggable={false}
      resizable={false}
      contentStyle={{ overflow: "hidden", background: "#fff" }}
      footer={footer}
      className="shadow-3xl no-scrollbar w-[90%] max-w-[85vw] "
    >
      {url || downloadUrl ? (
        <div
          style={{
            width: "100%", // full dialog width
            maxHeight: "80vh", // max height for dialog
            overflowY: "auto", // vertical scroll if content too tall
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          {(url ?? downloadUrl)?.endsWith(".pdf") ? (
            <iframe
              src={`${
                url ?? downloadUrl
              }#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
              title={title}
              style={{
                width: "100%", // full width
                minHeight: "100%", // allow full height
                border: "none",
                display: "block",
              }}
            />
          ) : (
            <img
              src={url ?? downloadUrl}
              alt={title}
              style={{
                width: "100%", // fit full width
                height: "auto", // maintain aspect ratio
                display: "block",
              }}
            />
          )}
        </div>
      ) : (
        <div className="w-full h-full bg-white rounded-lg shadow-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-center p-8">
          <div className="mb-8">
            <FileText size={64} className="text-gray-400 mx-[100%] mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No Document Available
            </h3>
            <p className="text-gray-500 mb-6">
              Document not found or unavailable.
            </p>
          </div>
        </div>
      )}
    </Dialog>
  );
};

export default DocumentViewer;
