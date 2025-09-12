"use client";

import { AudioManager } from "@/components/AudioManager";
import FileInfo from "@/components/FileInfo";
import Modal from "@/components/modal/Modal";
import Transcript from "@/components/Transcript";
import useGetConvertFiles from "@/hooks/useGetConvertFiles";
import { useTranscriber } from "@/hooks/useTranscriber";
import { queryClient } from "@/providers/query.provider";
import axios from "axios";
import dayjs from "dayjs";

type Props = {
  jwt: string;
};

const ConvertTemplate = ({ jwt }: Props) => {
  const { files } = useGetConvertFiles();
  const transcriber = useTranscriber();

  const uploadFile = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await axios.post(
        `${process.env["NEXT_PUBLIC_API_URL"]}/files/upload?token=${jwt}`,
        formData
      );
      queryClient.invalidateQueries({ queryKey: ["getConvertFiles"] });
    } catch (error) {}
  };

  return (
    <div className="flex flex-1 justify-start overflow-hidden p-4">
      <div className="lg:w-1/4 max-w-80 w-full bg-white rounded-xl shadow-xl border p-4 overflow-auto h-full">
        <h2 className="text-xl font-bold mb-4">Danh sách audio đã tải lên</h2>
        <ul className="space-y-4 overflow-auto">
          {files?.map((file, index) => (
            <FileInfo file={file} key={index} />
          ))}
        </ul>
      </div>
      <div className="flex items-start justify-center flex-1 mt-14 overflow-auto">
        <div className="flex w-full flex-col items-center justify-center max-w-4xl bg-white">
          <div className="flex justify-center items-center mb-2">
            <div className="px-4 mb-5">
              <h1 className="text-5xl font-extrabold tracking-tight sm:text-8xl text-center text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-[#127345]">
                MTA Whisper
              </h1>
              <h2 className="mt-3 px-4 text-xl text-center font-semibold tracking-tight sm:text-4xl">
                Vietnamese Speech-to-Text Solution
              </h2>
            </div>
          </div>
          <h2 className="mb-5 px-4 text-center text-sm font-semibold tracking-tight sm:text-2xl">
            Hệ thống chuyển đổi âm thanh thành văn bản tiếng Việt
          </h2>
          <AudioManager transcriber={transcriber} uploadFile={uploadFile} />
          <Transcript transcribedData={transcriber.output} />
        </div>
      </div>
    </div>
  );
};

export default ConvertTemplate;
