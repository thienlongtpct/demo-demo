import Link from "next/link";

const HomeTemplate = () => {
  return (
    <div className="min-h-screen flex flex-col items-center">
      <main className="w-full">
        <section className="hero-bg py-20 md:py-32 flex flex-col items-center text-center px-4">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-4 tracking-tight leading-tight">
            Chuyển giọng nói thành văn bản <br className="hidden sm:inline" />
            chỉ trong nháy mắt
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mb-8 font-light">
            MTA Whisper sử dụng công nghệ tiên tiến nhất để mang lại độ chính
            xác cao và trải nghiệm người dùng tuyệt vời.
          </p>
          <a
            href="/convert"
            className="btn-gradient-green text-white text-xl font-bold py-4 px-10 rounded-full shadow-lg transition duration-300 transform hover:scale-105"
          >
            Bắt đầu ngay
          </a>
        </section>

        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto bg-white p-8 md:p-12 text-center">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="md:w-1/2 md:text-left mb-8 md:mb-0">
                <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
                  Tăng tốc công việc của bạn với MTA Whisper
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Sử dụng công nghệ AI tiên tiến để chuyển đổi chính xác giọng
                  nói của bạn thành văn bản. Cho dù bạn là sinh viên, nhà báo
                  hay chuyên gia, MTA Whisper giúp bạn ghi lại ý tưởng nhanh
                  chóng và hiệu quả hơn bao giờ hết.
                </p>
                <Link
                  href="/convert"
                  className="btn-gradient-green text-white font-semibold py-3 px-8 rounded-full shadow-lg inline-block hover:scale-105 transform transition duration-300"
                >
                  Thử ngay miễn phí
                </Link>
              </div>
              <div className="md:w-1/2 flex justify-center md:justify-end">
                <img
                  src="https://placehold.co/500x300/F0F4F8/A0A0A0?text=image"
                  alt=""
                  className="rounded-2xl shadow-lg w-full md:w-auto"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 px-4" id="features">
          <div className="mx-auto max-w-6xl text-center">
            <h2 className="text-4xl font-bold text-gray-800 mb-12">
              Tính năng vượt trội
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="col-span-1 md:col-span-2 lg:col-span-1 flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow-md transition-transform hover:scale-105">
                <svg
                  className="w-16 h-16 text-green-500 mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                <h3 className="text-2xl font-semibold mb-2">
                  Tốc độ siêu nhanh
                </h3>
                <p className="text-gray-600">
                  Chuyển đổi âm thanh thành văn bản trong thời gian thực, tiết
                  kiệm tối đa thời gian của bạn.
                </p>
              </div>
              <div className="col-span-1 md:col-span-2 lg:col-span-1 flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow-md transition-transform hover:scale-105">
                <svg
                  className="w-16 h-16 text-green-500 mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="text-2xl font-semibold mb-2">
                  Độ chính xác cao
                </h3>
                <p className="text-gray-600">
                  Sử dụng AI tiên tiến để nhận diện giọng nói chính xác, ngay cả
                  trong môi trường ồn ào.
                </p>
              </div>
              <div className="col-span-1 md:col-span-2 lg:col-span-1 flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow-md transition-transform hover:scale-105">
                <svg
                  className="w-16 h-16 text-green-500 mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 6.253v13m0-13C10.832 5.484 9.49 5 8 5c-4 0-4 6-4 6v5a2 2 0 002 2h4l-3 4v-4h3.582M20 18a2 2 0 002-2v-5c0-6-4-6-4-6s-4 .5-4 6v5a2 2 0 002 2h4l3 4v-4h3.582"
                  />
                </svg>
                <h3 className="text-2xl font-semibold mb-2">
                  Giao diện thân thiện
                </h3>
                <p className="text-gray-600">
                  Thiết kế tối giản, dễ dàng sử dụng cho mọi đối tượng người
                  dùng.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="bg-[#127345] text-white py-16 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-4xl font-bold mb-4">
              Bạn đã sẵn sàng để trải nghiệm chưa?
            </h2>
            <p className="text-xl mb-8">
              Chuyển đổi các cuộc họp, bài giảng, và phỏng vấn thành văn bản
              ngay hôm nay.
            </p>
            <Link
              href="/convert"
              className="bg-white text-[#127345] font-bold py-4 px-10 rounded-full shadow-lg transition duration-300 transform hover:scale-105"
            >
              Thử ngay miễn phí
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
};
export default HomeTemplate;
