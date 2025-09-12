import ConvertTemplate from "@/modules/convert/ConvertTemplate";
import { cookies } from "next/headers";

const ConvertPage = async () => {
  const jwt = (await cookies()).get("jwt")?.value;

  return <ConvertTemplate jwt={jwt || ""} />;
};

export default ConvertPage;
