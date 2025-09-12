"use client";

import { useState } from "react";

export type MessageEventHandler = (event: MessageEvent) => void;

export function useWorker(
  messageEventHandler: MessageEventHandler
): Worker | null {
  // Create new worker once and never again
  const [worker] = useState(() => createWorker(messageEventHandler));
  return worker;
}

function createWorker(messageEventHandler: MessageEventHandler): Worker | null {
  try {
    const worker = new Worker(new URL("../worker.ts", import.meta.url), {
      type: "module",
    });
    // Listen for messages from the Web Worker
    worker.addEventListener("message", messageEventHandler);
    return worker;
  } catch (error) {
    console.error("Error creating worker:", error);
    return null;
  }
}
