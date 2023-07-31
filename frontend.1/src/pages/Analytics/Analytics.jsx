import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Sidebar,
  Header,
  PrivateRoutes,
  ChartHeader,
  ChartStats,
  Charts,
} from "../../components";
import { useUser } from "../../context/UserContext";
import { useLocation } from "react-router-dom";

const Analytics = () => {
  const { accessToken } = useUser();
  const [addressGroupId, setAddressGroupId] = useState(null);
  const [data, setData] = useState([]);
  const location = useLocation();

  // data from chartStats
  const [inactive, setInactive] = useState(null);
  const [avgNetWorth, setAvgNetWorth] = useState(null);
  const [medianNetWorth, setMedianNetWorth] = useState(null);
  const [avgWalletAge, setAvgWalletAge] = useState(null);
  const [medianWalletAge, setMedianWalletAge] = useState(null);
  const [avgAirdrop, setAvgAirdrop] = useState(null);
  const [medianAirdrop, setMedianAirdrop] = useState(null);
  const [totalTxs, setTotalTxs] = useState(null);
  const [metaverseInteractions, setMetaverseInteractions] = useState(0);
  const [defiInteractions, setDefiInteractions] = useState(0);
  const [gamingInteractions, setGamingInteractions] = useState(0);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const addressGroupId = searchParams.get("id");

    if (addressGroupId) {
      setAddressGroupId(addressGroupId);
    } else {
      console.log("No Address Group ID");
    }
  }, [location]);

  useEffect(() => {
    if (!addressGroupId) return;
    console.log("AGD", addressGroupId);

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `https://api.blockway.tech/address-analytics/${addressGroupId}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    };

    axios
      .request(config)
      .then((res) => {
        console.log("look here", res?.data?.data?.addressGroupAnalytics);
        setData(res?.data?.data?.addressGroupAnalytics);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [addressGroupId, accessToken]);

  return (
    <div className="flex w-full">
      <Sidebar activeTab="home" variant={"analytics"} />
      <div className="flex bg-[#eee] w-full justify-center">
        <div className="w-full flex flex-col items-center">
          <Header title={"Analytics - Charts"} />
          <div className="flex-1 flex justify-center items-center w-full h-full py-4 pl-4 pr-10 2xl:pr-20">
            <div className="flex flex-col items-center w-full h-full mt-5">
              <ChartHeader addressGroupId={addressGroupId} />
              <ChartStats
                data={data}
                setData1={setInactive}
                setData2={setAvgNetWorth}
                setData3={setMedianNetWorth}
                setData4={setAvgWalletAge}
                setData5={setMedianWalletAge}
                setData6={setAvgAirdrop}
                setData7={setMedianAirdrop}
                setData8={setTotalTxs}
                setData9={setMetaverseInteractions}
                setData10={setDefiInteractions}
                setData11={setGamingInteractions}
              />
              <Charts
                inactive={inactive}
                avgNetWorth={avgNetWorth}
                medianNetWorth={medianNetWorth}
                avgWalletAge={avgWalletAge}
                medianWalletAge={medianWalletAge}
                avgAirdrop={avgAirdrop}
                medianAirdrop={medianAirdrop}
                totalTxs={totalTxs}
                metaverseInteractions={metaverseInteractions}
                defiInteractions={defiInteractions}
                gamingInteractions={gamingInteractions}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivateRoutes(Analytics);
