"use client";

import Image from "next/image";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

import { convertFileToUrl } from "@/lib/utils";
import { CloudDownloadIcon } from "lucide-react";

type FileUploaderProps = {
  files: File[] | undefined;
  onChange: (files: File[]) => void;
};
export const FileUploader = ({ files, onChange }: FileUploaderProps) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    onChange(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  return (
    <div {...getRootProps()} className="file-upload">
      <input {...getInputProps()} />
      {files && files?.length > 0 ? (
        <Image
          src={convertFileToUrl(files[0])}
          width={1000}
          height={1000}
          alt="uploaded image"
          className="max-h-[400px] overflow-hidden object-cover"
        />
      ) : (
        <>
          <div className="border-dashed border-2 rounded-md p-2">
            <div className="w-full flex place-content-center">
              <CloudDownloadIcon color="gray" />
            </div>
            <div className="flex w-full place-content-center">
              <p className="text-sm ">
                <span className="text-sky-500 cursor-pointer">
                  Click to upload{" "}
                </span>
                or drag and drop SVG, PNG, JPG or GIF
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
