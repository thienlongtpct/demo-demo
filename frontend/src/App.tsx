"use client";

import { AudioManager } from "./components/AudioManager";
import Transcript from "./components/Transcript";
import { useTranscriber } from "./hooks/useTranscriber";

export default function App() {
  const transcriber = useTranscriber();

  return (
    <div className="flex flex-col space-between items-center min-h-screen h-full">
      <div className="w-full h-20" style={{ backgroundColor: "#127345" }} />

      <div className="flex flex-col items-center justify-center h-full max-w-4xl bg-white">
        <div className="flex justify-center items-center mb-5">
          <img src="/MTA.png" alt="Logo" width={200} height={200} />
          <div className="px-4 mb-5">
            <h1
              className="text-5xl font-extrabold tracking-tight sm:text-8xl text-center"
              style={{ color: "#127345" }}
            >
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
        <AudioManager transcriber={transcriber} uploadFile={() => {}} />
        <Transcript transcribedData={transcriber.output} />
      </div>

      <div
        className="mb-4 py-4 px-16 h-min"
        style={{ borderTop: "4px solid #127345" }}
      >
        <p className="mt-3 text-center font-semibold sm:text-xl">
          Bùi Quốc Khánh - Đại đội 156 - Tiểu đoàn 1
        </p>
        <p className="text-center sm:text-xl">
          0898935043 - khanhbwk56cntt@gmail.com
        </p>
      </div>
    </div>
  );
}
