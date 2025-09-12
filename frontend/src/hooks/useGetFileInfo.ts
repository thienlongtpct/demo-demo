import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { getCookie } from "cookies-next/client";

const useGetFileInfo = ({ id, active }: { id: number; active: boolean }) => {
  const jwt = getCookie("jwt");

  const { data } = useQuery({
    queryKey: ["getFileInfo", id],
    queryFn: async () => {
      const { data } = await axios.get(
        `${process.env["NEXT_PUBLIC_API_URL"]}/files/${id}?token=${jwt}`
      );
      return data;
    },
    enabled: !!jwt && !!id && active,
  });

  return {
    fileInfo: data,
  };
};

export default useGetFileInfo;
