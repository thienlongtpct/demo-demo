"use client";

import { pageList } from "@/configs/routes";
import { deleteCookie } from "cookies-next/client";

const LogoutButton = () => {
  const logout = async () => {
    deleteCookie("jwt");
    window.location.href = pageList.home.href;
  };
  return (
    <button
      onClick={logout}
      className="px-4 py-2 border rounded-full text-gray-700 hover:bg-gray-200"
    >
      Đăng xuất
    </button>
  );
};

export default LogoutButton;
