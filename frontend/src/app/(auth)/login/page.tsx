"use client";

import axios, { AxiosError } from "axios";
import { setCookie } from "cookies-next/client";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

type FormData = {
  username: string;
  password: string;
};

const LoginPage = () => {
  const defaultValues: FormData = {
    username: "",
    password: "",
  };
  const { control, handleSubmit } = useForm<FormData>({ defaultValues });
  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    try {
      const loginResponse = await axios.post(
        `${process.env["NEXT_PUBLIC_API_URL"]}/auth/login?identifier=${data.username}&password=${data.password}`
      );
      if (loginResponse.status === 200) {
        setCookie("jwt", loginResponse.data.access_token);
        router.push("/convert");
      }
    } catch (error) {
      if (
        error instanceof AxiosError &&
        typeof error.response?.data?.detail === "string"
      ) {
        toast.error(error.response?.data?.detail);
        return;
      }
      toast.error("Đã xảy ra lỗi trong khi đăng nhập");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-[#D1FAE5] to-[#F3F4F6]">
      <div className="login-card w-full max-w-md mx-auto text-center">
        <div className="flex flex-col items-center mb-6">
          <img src="/MTA.png" alt="Logo" width={100} height={100} />
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Đăng nhập
          </h1>
          <p className="text-gray-500 mt-2">
            Chào mừng bạn quay trở lại với MTA Whisper
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Controller
              control={control}
              name="username"
              rules={{ required: true }}
              render={({ field }) => (
                <input
                  type="text"
                  id="username"
                  placeholder="Tên đăng nhập"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  {...field}
                />
              )}
            />
          </div>

          <div>
            <Controller
              control={control}
              name="password"
              rules={{ required: true }}
              render={({ field }) => (
                <input
                  type="password"
                  id="password"
                  placeholder="Mật khẩu"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  {...field}
                />
              )}
            />
          </div>

          <div>
            <button
              type="submit"
              className="btn-gradient-green text-white font-semibold py-3 px-6 rounded-full w-full shadow-lg transition duration-300 transform hover:scale-105"
            >
              Đăng nhập
            </button>
          </div>
        </form>

        <p className="mt-4 text-sm text-gray-600">
          Bạn chưa có tài khoản?{" "}
          <a
            href="/register"
            className="text-green-600 font-medium hover:underline"
          >
            Đăng ký ngay
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
