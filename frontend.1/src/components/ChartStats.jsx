import React, { useState, useEffect } from "react";
import { FaInfoCircle } from "react-icons/fa";
import InfoPopup from "./InfoPopup";

const GreenStat = ({ icon, icon2, text, change, value }) => {
  return (
    <div className="flex flex-col justify-center items-center rounded-2xl shadow-lg pl-4 pt-4 pb-6 pr-10 bg-mint-green-500 min-w-[188px] 2xl:min-w-[300px] cursor-pointer min-h-[162px]">
      <div className="flex justify-end items-center w-full gap-2.5 mb-3">
        <div className="relative group">
          <FaInfoCircle className="text-[#1B0165]" size={20} />
          <InfoPopup />
        </div>
      </div>
      <div className="flex flex-col justify-start items-start w-full gap-2.5">
        <span className="font-[500] text-[24px] text-[#473382] text-center">
          {value}
        </span>
        <span className="font-[500] text-[16px] text-[#473382] text-center uppercase whitespace-nowrap">
          {text}
        </span>
      </div>
    </div>
  );
};

const BlueStat = ({
  icon,
  icon2,
  text,
  change,
  value,
  text2,
  value2,
  text3,
  text4,
  gap,
}) => {
  return (
    <div className="flex flex-col justify-center items-center rounded-2xl shadow-md pl-4 pt-4 pb-6 pr-10 bg-[#1B0165] min-w-[375px] 2xl:min-w-[460px] min-h-[165px] cursor-pointer">
      <div className="flex justify-end items-center w-full gap-2.5 mb-1">
        <div className="relative group">
          <FaInfoCircle className="text-[#A2FF93]" size={20} />
          <InfoPopup />
        </div>
      </div>
      <div
        className={`flex items-center justify-between ${gap} ${
          gap === "gap-[5rem]" ? "pr-4" : "pr-0"
        }`}
      >
        <div className="flex flex-col justify-start items-start w-full">
          <span className="font-[500] text-[24px] text-white text-center">
            {value}
          </span>
          <div className="flex flex-col justify-start items-start">
            <span className="font-[700] text-[16px] text-mint-green-500 text-center uppercase whitespace-nowrap">
              {text}
            </span>
            <span className="font-[500] text-[12px] text-mint-green-500 text-center uppercase">
              {text2}
            </span>
          </div>
        </div>
        <div className="flex flex-col justify-start items-start w-full border-l-2 border-mint-green-500 pl-2">
          <span className="font-[500] text-[24px] text-white text-center">
            {value2}
          </span>
          <div className="flex flex-col justify-start items-start">
            <span className="font-[700] text-[16px] text-mint-green-500 text-center uppercase whitespace-nowrap">
              {text3}
            </span>
            <span className="font-[500] text-[12px] text-mint-green-500 text-center uppercase">
              {text4}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const ChartStats = ({
  data,
  setData1,
  setData2,
  setData3,
  setData4,
  setData5,
  setData6,
  setData7,
  setData8,
  setData9,
  setData10,
  setData11,
}) => {
  const [inactive, setInactive] = useState(null);
  const [avgNetWorth, setAvgNetWorth] = useState(null);
  const [medianNetWorth, setMedianNetWorth] = useState(null);
  const [avgWalletAge, setAvgWalletAge] = useState(null);
  const [medianWalletAge, setMedianWalletAge] = useState(null);
  const [avgAirDrop, setAvgAirDrop] = useState(null);
  const [medianAirDrop, setMedianAirDrop] = useState(null);

  useEffect(() => {
    if (data.length === 0) return;
    // console.log(data);
    console.log("Wallets ->", data.length);

    // calculate active and inactive wallets
    const activeWallets = data.filter((wallet) => wallet.numTx > 0);
    const inactiveWallets = data.length - activeWallets.length;

    // calculate inactive wallets percentage
    const inactiveWalletPercentage = (
      (inactiveWallets / data.length) *
      100
    ).toFixed(2);

    // calculate average net worth
    const totalWorth = data.reduce((acc, wallet) => {
      return acc + wallet.totalWorth;
    }, 0);

    const avgNetWorth = (totalWorth / data.length).toFixed(2);

    // calculate median net worth
    const calcMedianNetWorth = (data) => {
      const totalWorths = data.map((wallet) => wallet.totalWorth);
      const mid = Math.floor(totalWorths.length / 2),
        nums = [...totalWorths].sort((a, b) => a - b);
      return totalWorths.length % 2 !== 0
        ? nums[mid]
        : (nums[mid - 1] + nums[mid]) / 2;
    };

    const medianNetWorth = calcMedianNetWorth(data).toFixed(8);

    // format the data to be at most 6 digits
    const formatToMaxSixDigits = (number) => {
      const integerPart = Math.floor(number);
      const integerString = integerPart.toString();
      const firstFourDigits = integerString.slice(0, 4);
      const decimalPart = number - integerPart;
      const formattedNumber = parseFloat(firstFourDigits) + decimalPart;
      return formattedNumber.toFixed(2);
    };

    // calculate average wallet age
    const calcAvgWalletAge = (data) => {
      const walletAges = data.map((wallet) => wallet.longevity);
      const totalWalletAge = walletAges.reduce((acc, age) => {
        return acc + age;
      }, 0);
      // return (totalWalletAge / data.length).toFixed(2);
      return formatToMaxSixDigits(totalWalletAge / data.length);
    };

    const avgWalletAge = calcAvgWalletAge(data);

    // format the data to be at most 8 digits
    const formatToMaxEightDigits = (number) => {
      const integerPart = Math.floor(number);
      const decimalPart = number % 1;
      const truncatedInteger = parseInt(integerPart.toString().slice(0, 6));
      const finalNumber = truncatedInteger + decimalPart;
      return finalNumber.toFixed(2);
    };

    // calculate median wallet age
    const calcMedianWalletAge = (data) => {
      const walletAges = data.map((wallet) => wallet.longevity);
      const mid = Math.floor(walletAges.length / 2),
        nums = [...walletAges].sort((a, b) => a - b);
      return walletAges.length % 2 !== 0
        ? nums[mid]
        : (nums[mid - 1] + nums[mid]) / 2;
    };

    const medianWalletAge = formatToMaxEightDigits(calcMedianWalletAge(data));

    // calculate average airdrop by dividing numAirdrops by numTx
    const calcAvgAirdrop = (data) => {
      const totalAirdrops = data.reduce((acc, wallet) => {
        return acc + wallet.numAirdrops;
      }, 0);

      const totalTx = data.reduce((acc, wallet) => {
        return acc + wallet.numTx;
      }, 0);

      return totalTx > 0 ? totalAirdrops / totalTx : 0;
    };

    const avgAirdrop = calcAvgAirdrop(data).toFixed(6);

    //calculate median airdrop
    const calcMedianAirdrop = (data) => {
      const airdrops = data.map((wallet) => wallet.numAirdrops);
      const mid = Math.floor(airdrops.length / 2),
        nums = [...airdrops].sort((a, b) => a - b);
      return airdrops.length % 2 !== 0
        ? nums[mid]
        : (nums[mid - 1] + nums[mid]) / 2;
    };

    const medianAirdrop = calcMedianAirdrop(data).toFixed(6);

    //calculate binned total txs
    const calculateTotalTxsBins = (data) => {
      const bins = [-Infinity, 0, 10, 50, 100, 500, 1000, Infinity];
      const binnedTxs = Array(bins.length - 1).fill(0);

      data.forEach((wallet) => {
        for (let i = 0; i < bins.length - 1; i++) {
          if (wallet.numTx > bins[i] && wallet.numTx <= bins[i + 1]) {
            binnedTxs[i]++;
            break;
          }
        }
      });

      return binnedTxs;
    };

    const binnedTotalTxs = calculateTotalTxsBins(data);

    // calculate binned avg net worth
    const calculateAvgNetWorthBins = (data) => {
      const bins = [0, 10, 50, 100, 500, 1000, 5000, 10000];
      const binnedNetWorth = Array(bins.length - 1).fill(0);

      data.forEach((wallet) => {
        for (let i = 0; i < bins.length - 1; i++) {
          if (wallet.totalWorth > bins[i] && wallet.totalWorth <= bins[i + 1]) {
            binnedNetWorth[i]++;
            break;
          }
        }
      });

      return binnedNetWorth;
    };

    const binnedAvgNetWorth = calculateAvgNetWorthBins(data);

    // calculate binned avg wallet age
    const calculateAvgWalletAgeBins = (data) => {
      const bins = [1, 7, 30, 90, 180, 365, 730, Infinity];
      const binnedWalletAge = Array(bins.length - 1).fill(0);

      data.forEach((wallet) => {
        for (let i = 0; i < bins.length - 1; i++) {
          if (wallet.longevity > bins[i] && wallet.longevity <= bins[i + 1]) {
            binnedWalletAge[i]++;
            break;
          }
        }
      });

      return binnedWalletAge;
    };

    const binnedAvgWalletAge = calculateAvgWalletAgeBins(data);

    // calculate binned avg airdrop
    const calculateAvgAirdropBins = (data) => {
      const bins = [-Infinity, 0.1, 1, 5, 10, 25, 50, 75, 100, Infinity];
      const binnedAirdrops = Array(bins.length - 1).fill(0);
      data.forEach((wallet) => {
        const avgAirdropPercentage =
          wallet.numTx > 0 ? (wallet.numAirdrops / wallet.numTx) * 100 : 0;
        for (let i = 0; i < bins.length - 1; i++) {
          if (
            avgAirdropPercentage > bins[i] &&
            avgAirdropPercentage <= bins[i + 1]
          ) {
            binnedAirdrops[i]++;
            break;
          }
        }
      });
      return binnedAirdrops;
    };

    const binnedAvgAirdrop = calculateAvgAirdropBins(data);

    // calculate metaverseInteractions
    const metaverseInteractions = data.reduce((acc, wallet) => {
      return acc + wallet.metaverseInteractions;
    }, 0);

    // calculate defiInteractions
    const defiInteractions = data.reduce((acc, wallet) => {
      return acc + wallet.defiInteractions;
    }, 0);

    // calculate gamingInteractions
    const gamingInteractions = data.reduce((acc, wallet) => {
      return acc + wallet.gamingInteractions;
    }, 0);

    setInactive(inactiveWalletPercentage);
    setAvgNetWorth(avgNetWorth);
    setMedianNetWorth(medianNetWorth);
    setAvgWalletAge(avgWalletAge);
    setMedianWalletAge(medianWalletAge);
    setAvgAirDrop(avgAirdrop);
    setMedianAirDrop(medianAirdrop);

    // pass the data to the parent component
    setData1(inactiveWalletPercentage);
    // setData2(avgNetWorth);
    setData2(binnedAvgNetWorth);
    setData3(medianNetWorth);
    // setData4(avgWalletAge);
    setData4(binnedAvgWalletAge);
    setData5(medianWalletAge);
    // setData6(avgAirdrop);
    setData6(binnedAvgAirdrop);
    setData7(medianAirdrop);
    // setData8(totalTxs);
    setData8(binnedTotalTxs);
    setData9(metaverseInteractions);
    setData10(defiInteractions);
    setData11(gamingInteractions);

    console.log("Active Wallets ->", activeWallets.length);
    console.log("Inactive Wallets ->", inactiveWallets);
    console.log("Inactive Wallets % ->", inactiveWalletPercentage);
    console.log("Total Net Worth ->", totalWorth);
    console.log("Avg Net Worth ->", avgNetWorth);
    console.log("Median Net Worth ->", medianNetWorth);
    console.log("Avg Wallet Age ->", avgWalletAge);
    console.log("Median Wallet Age ->", medianWalletAge);
    console.log("Avg Airdrop ->", avgAirdrop);
    console.log("Median Airdrop ->", medianAirdrop);
  }, [data]);

  return (
    <div className="flex flex-col max-w-[1025px] 2xl:max-w-[1300px]">
      <div className="flex justify-between items-center w-full my-5 gap-10">
        <GreenStat
          icon={"/dark_like.png"}
          change={Math.floor(Math.random() * 100).toFixed(2) + "%"}
          value={inactive ? inactive : "Loading..."}
          text={"Inactive Wallet"}
          icon2={"/dark_up.png"}
        />
        <BlueStat
          icon={"/light_like.png"}
          change={Math.floor(Math.random() * 100).toFixed(2) + "%"}
          value={avgNetWorth ? avgNetWorth : "Loading..."}
          text={"Avg"}
          icon2={"/light_up.png"}
          text2={"Net Worth"}
          value2={medianNetWorth ? medianNetWorth : "Loading..."}
          text3={"Median"}
          text4={"Net Worth"}
          gap={"gap-[5rem]"}
        />
        {/* wallet age here */}
        <BlueStat
          icon={"/light_like.png"}
          change={Math.floor(Math.random() * 100).toFixed(2) + "%"}
          value={avgWalletAge ? avgWalletAge : "Loading..."}
          text={"Avg"}
          icon2={"/light_up.png"}
          text2={"Wallet Age"}
          value2={medianWalletAge ? medianWalletAge : "Loading..."}
          text3={"Median"}
          text4={"Wallet Age"}
          gap={"gap-[5rem]"}
        />
      </div>
      <div className="flex justify-between items-center w-full my-5 gap-10">
        <GreenStat
          icon={"/dark_like.png"}
          change={Math.floor(Math.random() * 100).toFixed(2) + "%"}
          value={Math.floor(Math.random() * 100).toFixed(2) + "%"}
          text={"% Bots"}
          icon2={"/dark_up.png"}
        />
        <BlueStat
          icon={"/light_like.png"}
          change={Math.floor(Math.random() * 100).toFixed(2) + "%"}
          value={Math.floor(Math.random() * 100).toFixed(6)}
          text2={""}
          icon2={"/light_up.png"}
          text={"% Diamond Hands"}
          value2={Math.floor(Math.random() * 100).toFixed(6)}
          text4={""}
          text3={"% Paper Hands"}
          gap={"gap-[2rem]"}
        />
        <BlueStat
          icon={"/light_like.png"}
          change={Math.floor(Math.random() * 100).toFixed(2) + "%"}
          value={avgAirDrop ? avgAirDrop : "Loading..."}
          text={"Avg"}
          icon2={"/light_up.png"}
          text2={"% Airdrop"}
          value2={medianAirDrop ? medianAirDrop : "Loading..."}
          text3={"Median"}
          text4={"% Airdrop"}
          gap={"gap-[5rem]"}
        />
      </div>
    </div>
  );
};

export default ChartStats;
