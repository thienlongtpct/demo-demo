import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import "./globals.css";
import type { ReactNode } from "react";
import { Toaster } from "@/components/Sonner";
import { QueryProvider } from "@/providers/query.provider";

const APP_NAME = "MTA-Whisper";
const APP_DEFAULT_TITLE = "MTA Whisper";
const APP_TITLE_TEMPLATE = "%s - MTA Whisper";
const APP_DESCRIPTION =
  "MTA Whisper - Hệ thống chuyển đổi âm thanh thành văn bản tiếng Việt";
const APP_URL = "https://hf.co/spaces/huuquyet/PhoWhisper-next/";
const TWITTER = "@HuuQuyetNg";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body>
        <QueryProvider>
          <div id="root">
            {children}
            <Analytics />
            <Toaster richColors position="top-center" />
          </div>
        </QueryProvider>
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",
  metadataBase: new URL("https://${process.env.VERCEL_URL}"),
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
    url: APP_URL,
    images: ["/icons/MTA.svg"],
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
    site: TWITTER,
  },
  keywords: [
    "PhoWhisper",
    "Transformers.js",
    "Next.js",
    "speech-regconition",
    "vietnamese",
  ],
};
