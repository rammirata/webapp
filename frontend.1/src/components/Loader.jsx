import React, { useState, useEffect } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Loader = ({ loading, fileName, duration, accessToken }) => {
  const [animatedProgress, setAnimatedProgress] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [processed, setProcessed] = useState(false);
  const [requestId, setRequestId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (loading && startTime === null) {
      setStartTime(Date.now());
    }

    const updateProgress = () => {
      if (!loading || !startTime) return;

      const elapsed = (Date.now() - startTime) / 1000;
      const calculatedProgress = Math.floor((elapsed / duration) * 100);

      if (!processed && calculatedProgress >= 99) {
        setAnimatedProgress(99);
      } else if (!processed && calculatedProgress > animatedProgress) {
        setAnimatedProgress(calculatedProgress);
      }
    };

    const timer = setInterval(updateProgress, 1000);
    return () => clearInterval(timer);
  }, [loading, startTime, duration, animatedProgress, processed]);

  const checkRequestStatus = async () => {
    console.log("Checking request status...");
    try {
      const response = await axios.get(
        `https://api.blockway.tech/address-groups`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const responseData = response.data;

      console.log("data", responseData);

      if (responseData?.data?.addressGroups?.length > 0) {
        const lastRequest =
          responseData.data.addressGroups[
            responseData.data.addressGroups.length - 1
          ];
        console.log("lastRequest", lastRequest);

        if (lastRequest.isProcessed) {
          setRequestId(lastRequest._id);
          setProcessed(true);
          setAnimatedProgress(100);
          return; // test fix
        }
      }
    } catch (error) {
      console.error("Error fetching request status:", error);
    }
  };

  useEffect(() => {
    if (animatedProgress === 99) {
      const interval = setInterval(() => {
        checkRequestStatus();
      }, 30000);

      return () => clearInterval(interval);
    }
  }, [animatedProgress]);

  return (
    <div className="flex justify-center items-center w-full h-[3.2rem] gap-2 my-2">
      <div className="outline-[#473382] w-[93%] flex flex-col justify-between mt-5 h-full rounded-lg border border-[#c5c4c4] bg-[#ECECEC] placeholder-[#494949] text-black">
        <div className="flex w-full h-1/2 justify-between items-center">
          <span className="text-[#110d1b] text-[16px] tracking-wide mx-2">
            {fileName}
          </span>
          <AiFillCloseCircle className="text-[#C9C9C9] text-xl mx-2" />
        </div>
        <div className="flex w-full h-[16px] bg-[#C9C9C9] rounded-full">
          <div
            className="h-full text-center text-xs text-white loader-gradient rounded-full"
            style={{
              width: `${animatedProgress}%`,
              transition: loading ? "width 0.1s linear" : "none",
            }}
          ></div>
        </div>
      </div>
      {animatedProgress < 100 && (
        <div className="flex font-bold justify-center w-[12%] 2xl:w-[7%] items-center mt-5 rounded-md bg-[#A2FF93] text-[#1B0165] border-2 border-[#1B0165] h-full">
          {animatedProgress}%
        </div>
      )}
      {animatedProgress === 100 && (
        <div
          className="flex cursor-pointer font-bold justify-center w-[20%] 2xl:w-[12%] items-center mt-7 rounded-3xl text-[#f9f9f9] border border-transparent mb-2 analyse-btn active:scale-[0.998] transition-all delay-25 px-4 py-2"
          onClick={() => {
            navigate(`/analytics/?id=${requestId}`);
          }}
        >
          Done
        </div>
      )}
    </div>
  );
};

export default Loader;
