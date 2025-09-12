import LogoutButton from "@/components/LogoutButton";
import { pageList } from "@/configs/routes";
import { cookies } from "next/headers";
import Link from "next/link";

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
  const jwt = (await cookies()).get("jwt")?.value;

  return (
    <div className="flex flex-col h-screen">
      <header className="w-full bg-white flex justify-between items-center py-4 px-6 border-b border-gray-200">
        <Link href="/convert" className="flex items-center space-x-2">
          <img src="/MTA.png" alt="Logo" width={60} height={60} />
          <span className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-[#127345] tracking-wide">
            MTA Whisper
          </span>
        </Link>
        <nav className="hidden md:flex space-x-8">
          <Link
            href="/"
            className="text-gray-600 hover:text-green-600 transition duration-300 font-medium"
          >
            Giới thiệu
          </Link>
          <Link
            href="/#features"
            className="text-gray-600 hover:text-green-600 transition duration-300 font-medium"
          >
            Tính năng
          </Link>
        </nav>
        <div className="space-x-2">
          {jwt ? (
            <>
              <LogoutButton />
            </>
          ) : (
            <>
              <Link href={pageList.login.href}>
                <button className="px-4 py-2 border rounded-full text-gray-700 hover:bg-gray-200">
                  Đăng nhập
                </button>
              </Link>
              <Link href={pageList.register.href}>
                <button className="px-4 py-2 rounded-full btn-gradient-green text-white">
                  Đăng ký
                </button>
              </Link>
            </>
          )}
        </div>
      </header>
      {children}
    </div>
  );
};

export default MainLayout;
