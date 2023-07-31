import React, { useState, useRef } from "react";
import { Loader } from "../components/index";
import axios from "axios";
import { toast } from "react-hot-toast";
import JSZip from "jszip";
import { parse } from "papaparse";
import { AiFillInfoCircle } from "react-icons/ai";

const Upload = ({ accessToken }) => {
  const fileUploadRef = useRef(null);
  const [fileName, setFileName] = useState("");
  const [uploadActive, setUploadActive] = useState(false);
  const [addressGroupId, setAddressGroupId] = useState("");
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState([]);
  const [duration, setDuration] = useState(0);

  const getAddressCount = (file) => {
    return new Promise((resolve, reject) => {
      parse(file, {
        complete: (results) => {
          resolve(results.data.length - 1);
        },
        error: (err) => {
          reject(err);
        },
      });
    });
  };

  const calculateDuration = (addressCount) => {
    const baseDuration = 30;
    const increment = 15;
    return baseDuration + increment * Math.floor(addressCount / 1000);
  };

  const searchAddress = (id, accessToken) => {
    if (id === "" || !id) {
      toast.error("Please enter a valid Address ID");
      return;
    }
    axios
      .get(`https://api.blockway.tech/address-groups/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        toast.success(response?.data?.status_message);
        console.log(response?.data);
      })
      .catch((error) => {
        if (error?.response?.data?.http_code === 500) {
          toast.error("Invalid Address ID, please try again");
          return;
        }
        toast.error(error?.response?.data?.status_message);
        console.error(error?.response?.data?.status_message);
      });
  };

  const handleFileChange = (e) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles.length) {
      return;
    }
    setFiles([...files, ...selectedFiles]);
    Array.from(selectedFiles).forEach(uploadFile);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const selectedFiles = e.dataTransfer.files;
    if (!selectedFiles.length) {
      return;
    }
    setFiles([...files, ...selectedFiles]);
    Array.from(selectedFiles).forEach(uploadFile);
  };

  const uploadFile = async (file) => {
    const addressCount = await getAddressCount(file);
    const duration = calculateDuration(addressCount);
    setDuration(duration);
    // setLoading(true);
    setUploadActive(true);
    const formData = new FormData();

    const fileName = file.name.replace(/\.[^/.]+$/, "");
    const zip = new JSZip();
    zip.file(`${fileName}.csv`, file);
    zip.generateAsync({ type: "blob" }).then((zipFile) => {
      formData.append("zip_file", zipFile, `${fileName}.zip`);
      formData.append("fuid", accessToken);

      axios
        .post("https://api.blockway.tech/address-groups", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          toast.success(response?.data?.status_message);
          const status = response?.data?.status;
          if (status === "SUCCESS") {
            setLoading(true);
          }
        })
        .catch((error) => {
          console.error(error);
          toast.error(error?.response?.data?.status_message);
        });

      setTimeout(() => {
        fileUploadRef.current.value = "";
        setFileName("");
      }, 1500);
    });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div
      className="w-full mx-auto flex flex-col justify-center items-center"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <div className="flex items-center justify-center w-full max-w-[85%] xl:max-w-[90%]">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full p-4 2xl:p-16 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-[#ECECEC]"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <img src="/upload.png" alt="logo" className="w-[64px]" />
            {fileName ? (
              <p className="mt-2 mb-2 text-md text-[#110D1B] font-semibold">
                {fileName}
              </p>
            ) : (
              <p className="mt-2 mb-2 text-md text-[#110D1B] font-semibold">
                Drag & drop CSV files here or{" "}
                <span className="underline text-[#1B0165] font-bold">
                  Browse
                </span>
              </p>
            )}
          </div>
          <input
            id="dropzone-file"
            ref={fileUploadRef}
            type="file"
            className="hidden"
            onChange={handleFileChange}
            multiple
          />
        </label>
      </div>
      {!uploadActive ? (
        <div className="flex flex-col justify-center items-start w-full px-[2.5rem] mt-5">
          <span className="text-[#1B0165] font-bold text-[24px]">
            Or enter the address:
          </span>
          <input
            type="text"
            value={addressGroupId}
            onChange={(e) => setAddressGroupId(e.target.value)}
            placeholder="Add-address-name"
            className="outline-[#473382] w-full h-12 mt-5 px-2 rounded-lg border border-[#c5c4c4] bg-[#ECECEC] placeholder-[#494949] text-black"
          />
          <div className="flex justify-start items-center w-full mt-5 gap-2">
            <AiFillInfoCircle className="text-[#1B0165] text-xl" />
            <span className="text-[#494949] text-[16px]">
              Enter your wallet addresses here seperated by comma.
            </span>
          </div>
          <div
            className=" border border-transparent flex mt-4 mb-2 analyse-btn
        w-full rounded-3xl active:scale-[0.998] transition-all delay-25"
          >
            <button
              className="flex flex-row justify-center items-center w-full h-full text-[16px] text-[#f9f9f9] tracking-wider px-2 py-3 font-bold"
              type="button"
              onClick={() => searchAddress(addressGroupId, accessToken)}
            >
              Analyse
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-start w-full px-[2.2rem] mt-5">
          <span className="text-[#110D1B] font-bold text-[20px]">
            {`Analysing ${files.length > 0 ? 1 : 0}/${files.length} files`}
          </span>
          {files.map((file, index) => (
            <Loader
              loading={loading}
              fileName={file.name}
              key={index}
              duration={duration}
              accessToken={accessToken}
            />
          ))}

          <div className="flex justify-start items-center w-full mt-5 gap-2">
            <AiFillInfoCircle className="text-[#1B0165] text-xl" />
            <span className="text-[#1B0165] text-[16px] font-[500]">
              We'll notify you once the addresses are analyzed!
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Upload;
