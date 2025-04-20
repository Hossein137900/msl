"use client";

import { MultiImageDropzone, type FileState } from "./MultiImageDropzone";
import { useEdgeStore } from "@/lib/edgestore";
import { useState } from "react";

interface UploadedFile {
  name: string;
  url: string;
  type: string;
  _id: string;
  __v: number;
  createdAt: string;
  updatedAt: string;
}

interface MultiImageDropzoneUsageProps {
  onUploadComplete?: (files: UploadedFile[]) => void;
}

export default function MultiImageDropzoneUsage({ onUploadComplete }: MultiImageDropzoneUsageProps) {
  const [fileStates, setFileStates] = useState<FileState[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<
    { name: string; url: string }[]
  >([]);
  const { edgestore } = useEdgeStore();

  function updateFileProgress(key: string, progress: FileState["progress"]) {
    setFileStates((fileStates) => {
      const newFileStates = structuredClone(fileStates);
      const fileState = newFileStates.find(
        (fileState) => fileState.key === key
      );
      if (fileState) {
        fileState.progress = progress;
      }
      return newFileStates;
    });
  }

  async function handleSaveToMongoDB() {
    const categorizedFiles = uploadedFiles.map((file) => {
      const type = file.name.split(".")[1];
      return {
        name: file.name,
        url: file.url,
        type,
      };
    });
  
    try {
      const response = await fetch("/api/uploadedFiles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ files: categorizedFiles }),
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log("Files saved to MongoDB:", data.files);
        
        if (onUploadComplete) {
          // If we don't have the full file objects from the response,
          // we can create them from our local state
          const filesWithMetadata = categorizedFiles.map(file => ({
            name: file.name,
            url: file.url,
            type: file.type,
            _id: "", // These might be missing if the API doesn't return them
            __v: 0,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }));
          
          onUploadComplete(data.files || filesWithMetadata);
        }
      }
    } catch (error) {
      console.error("Error saving files to MongoDB:", error);
    }
  }
  

  return (
    <div>
      <MultiImageDropzone
        value={fileStates}
        dropzoneOptions={{
          maxFiles: 6,
        }}
        onChange={(files) => {
          setFileStates(files);
        }}
        onFilesAdded={async (addedFiles) => {
          setFileStates([...fileStates, ...addedFiles]);
          await Promise.all(
            addedFiles.map(async (addedFileState) => {
              try {
                const res = await edgestore.publicFiles.upload({
                  file: addedFileState.file as File,
                  onProgressChange: async (progress) => {
                    updateFileProgress(addedFileState.key, progress);
                    if (progress === 100) {
                      await new Promise((resolve) => setTimeout(resolve, 1000));
                      updateFileProgress(addedFileState.key, "COMPLETE");
                    }
                  },
                });

                setUploadedFiles((prev) => [
                  ...prev,
                  {
                    name:
                      typeof addedFileState.file === "object"
                        ? addedFileState.file.name
                        : "",
                    url: res.url,
                  },
                ]);
              } catch (err) {
                console.log(err);
                updateFileProgress(addedFileState.key, "ERROR");
              }
            })
          );
        }}
      />

      <ul className="mt-4">
        {uploadedFiles.map((file, index) => (
          <li key={index} className="flex items-center gap-2 text-sm text-gray-700">
            <span className="font-bold">Name:</span> {file.name}, <span className="font-bold">URL:</span> 
            <a href={file.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 truncate max-w-xs hover:underline">
              {file.url}
            </a>
          </li>
        ))}
      </ul>

      {/* Button to save the categorized files to MongoDB */}
      {uploadedFiles.length > 0 && (
        <button 
          onClick={handleSaveToMongoDB}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          ذخیره تصاویر
        </button>
      )}
    </div>
  );
}
