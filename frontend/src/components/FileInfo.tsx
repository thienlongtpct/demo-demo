"use client";

import dayjs from "dayjs";
import Modal from "./modal/Modal";
import { ConvertFilesType } from "@/hooks/useGetConvertFiles";
import useGetFileInfo from "@/hooks/useGetFileInfo";
import { useState } from "react";

type Props = {
  file: ConvertFilesType;
};

const FileInfo = ({ file }: Props) => {
  const [show, setShow] = useState(false);
  const { fileInfo } = useGetFileInfo({ id: file.id, active: show });
  console.log("🚀 ~ FileInfo ~ fileInfo:", fileInfo);

  return (
    <>
      <li
        onClick={() => setShow(!show)}
        className="p-4 bg-gray-100 rounded-lg shadow-sm hover:bg-gray-200 transition-colors duration-200 cursor-pointer selected-history-item"
      >
        <p className="text-sm text-gray-600 mt-1 truncate">{file.file_name}</p>
        <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
          <span>
            {dayjs(file.created_at).add(7, "hour").format("DD/MM/YYYY")}
          </span>
          <span>{dayjs(file.created_at).add(7, "hour").format("HH:mm")}</span>
        </div>
      </li>
      <Modal
        content={
          <div>
            <h4 className="font-medium text-gray-700 text-lg mb-2">
              Thông tin file
            </h4>
            <div>
              <span className="block text-sm text-gray-500">Tên file</span>
              <p
                id="modal-file-name"
                className="text-sm font-semibold truncate"
              >
                {fileInfo?.file_name}
              </p>
            </div>
            <div className="mt-2">
              <span className="block text-sm text-gray-500">
                Thời gian thêm
              </span>
              <p id="modal-created-at" className="text-sm font-semibold">
                {dayjs(fileInfo?.created_at)
                  .add(7, "hour")
                  .format("DD/MM/YYYY HH:mm")}
              </p>
            </div>
            <div className="mt-10">
              <h4 className="font-medium text-gray-700 text-lg mb-2">
                Người tải lên
              </h4>
              <ul className="space-y-2 text-gray-600">
                <li>
                  <span className="font-medium">Tên đăng nhập:</span>{" "}
                  <span id="modal-username">{fileInfo?.owner?.username}</span>
                </li>
                <li>
                  <span className="font-medium">Email:</span>{" "}
                  <span id="modal-email">{fileInfo?.owner?.email}</span>
                </li>
                <li>
                  <span className="font-medium">Số điện thoại:</span>{" "}
                  <span id="modal-phone">{fileInfo?.owner?.phone_number}</span>
                </li>
              </ul>
            </div>
          </div>
        }
        onClose={() => setShow(false)}
        onSubmit={() => {}}
        show={show}
        title={""}
      />
    </>
  );
};

export default FileInfo;
