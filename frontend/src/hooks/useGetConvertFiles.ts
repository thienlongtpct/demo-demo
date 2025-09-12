import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { getCookie } from "cookies-next/client";

export type ConvertFilesType = {
  id: number;
  owner_id: number;
  file_name: string;
  file_path: string;
  file_text_content: string | null;
  created_at: string;
};

const useGetConvertFiles = () => {
  const jwt = getCookie("jwt");

  const { data } = useQuery({
    queryKey: ["getConvertFiles"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${process.env["NEXT_PUBLIC_API_URL"]}/files?token=${jwt}`
      );
      return data;
    },
    enabled: !!jwt,
  });

  return {
    files: data as ConvertFilesType[],
  };
};

export default useGetConvertFiles;
