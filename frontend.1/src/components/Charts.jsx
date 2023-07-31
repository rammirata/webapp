import React, { useEffect, useState } from "react";
import { GRADIENTS, GRADIENTS2, GRADIENTS3 } from "./Gradients";
import { pieChart_1, pieChart_2 } from "./PieCharts";
import { barChart_1, barChart_2, barChart_3, barChart_4 } from "./BarCharts";
import { data2 } from "./Data"; // static data for piechart 2
import InfoPopup from "./InfoPopup";

const ChartBox = ({ text, height, chart }) => {
  return (
    <div
      className={`flex flex-col justify-start items-center rounded-2xl shadow-md pl-4 pt-4 pb-6 pr-10 bg-white border-1 border-[#C9C9C9] w-full ${height}`}
    >
      <div className="flex justify-between items-center w-full gap-2.5 mb-1">
        <span className="font-[700] text-[24px] text-[#1B0165] uppercase">
          {text}
        </span>
        <div className="relative group">
          <img
            src="/info_vector.png"
            alt="info"
            className="cursor-pointer w-5 h-5 active:scale-[0.97]"
          />
          <InfoPopup />
        </div>
      </div>
      <div className="flex justify-center items-center h-full flex-grow gap-2.5 w-full">
        {chart}
      </div>
    </div>
  );
};

/* 
  @param {object} data - data from chartStats
  @param {number} data.inactive - number of inactive addresses
  @param {number} data.avgNetWorth - average net worth
  @param {number} data.medianNetWorth - median net worth
  @param {number} data.avgWalletAge - average wallet age
  @param {number} data.medianWalletAge - median wallet age
  @param {number} data.avgAirdrop - average airdrop
  @param {number} data.medianAirdrop - median airdrop
  @param {number} data.totalTxs - total transactions
  @param {number} data.metaverseInteractions - metaverse interactions
  @param {number} data.defiInteractions - defi interactions
  @param {number} data.gamingInteractions - gaming interactions
  @param {string} _d - data to be displayed
*/

const Charts = ({
  inactive,
  avgNetWorth,
  medianNetWorth,
  avgWalletAge,
  medianWalletAge,
  avgAirdrop,
  medianAirdrop,
  totalTxs,
  metaverseInteractions,
  defiInteractions,
  gamingInteractions,
}) => {
  const [totalTxs_d, settotalTxs_d] = useState(0);
  const [avgNetWorth_d, setavgNetWorth_d] = useState(0);
  const [avgWalletAge_d, setavgWalletAge_d] = useState(0);
  const [avgAirdrop_d, setavgAirdrop_d] = useState(0);

  const p_data_1 = [
    { name: "Gaming %", value: "loading" },
    { name: "Defi %", value: "loading" },
    { name: "Metaverse %", value: "loading" },
  ];

  const b_data1 = [
    { name: "0-10", value: totalTxs_d[1] },
    { name: "10-50", value: totalTxs_d[0] },
    { name: "50-100", value: totalTxs_d[2] },
    { name: "100", value: totalTxs_d[3] },
    { name: "500", value: totalTxs_d[4] },
    { name: "500+", value: totalTxs_d[6] },
    { name: "1000+", value: totalTxs_d[5] },
  ];

  const b_data2 = [
    { name: "0-10", value: avgNetWorth_d[1] },
    { name: "10-50", value: avgNetWorth_d[0] },
    { name: "50-100", value: avgNetWorth_d[2] },
    { name: "100", value: avgNetWorth_d[3] },
    { name: "500", value: avgNetWorth_d[4] },
    { name: "500+", value: avgNetWorth_d[6] },
    { name: "1000+", value: avgNetWorth_d[5] },
  ];

  const b_data3 = [
    { name: "0-10", value: avgWalletAge_d[1] },
    { name: "10-50", value: avgWalletAge_d[0] },
    { name: "50-100", value: avgWalletAge_d[2] },
    { name: "100", value: avgWalletAge_d[3] },
    { name: "500", value: avgWalletAge_d[4] },
    { name: "500+", value: avgWalletAge_d[6] },
    { name: "1000+", value: avgWalletAge_d[5] },
  ];

  const b_data4 = [
    { name: "0-10", value: avgAirdrop_d[1] },
    { name: "10-50", value: avgAirdrop_d[0] },
    { name: "50-100", value: avgAirdrop_d[2] },
    { name: "100", value: avgAirdrop_d[3] },
    { name: "500", value: avgAirdrop_d[4] },
    { name: "500+", value: avgAirdrop_d[6] },
    { name: "1000+", value: avgAirdrop_d[5] },
  ];

  const sortDescending = (array) => {
    return array.sort((a, b) => b - a);
  };

  // set the data for the charts
  useEffect(() => {
    if (!totalTxs || !avgNetWorth || !avgWalletAge || !avgAirdrop) return;
    settotalTxs_d(sortDescending(totalTxs));
    setavgNetWorth_d(sortDescending(avgNetWorth));
    setavgWalletAge_d(sortDescending(avgWalletAge));
    setavgAirdrop_d(sortDescending(avgAirdrop));
  }, [totalTxs, avgNetWorth, avgWalletAge, avgAirdrop]);

  if (metaverseInteractions && defiInteractions && gamingInteractions) {
    p_data_1[0].value = metaverseInteractions;
    p_data_1[1].value = defiInteractions;
    p_data_1[2].value = gamingInteractions;
  }

  return (
    <div className="flex flex-col min-w-[1025px] 2xl:min-w-[1300px]">
      <div className="flex justify-between items-center w-full my-5 gap-10">
        <ChartBox
          text={"Industry Interest"}
          height={"h-[440px]"}
          chart={pieChart_1({
            p_data_1: p_data_1,
            GRADIENTS: GRADIENTS,
          })}
        />
        <ChartBox
          text={"Ranking"}
          height={"h-[440px]"}
          chart={pieChart_2({
            data2: data2,
            GRADIENTS2: GRADIENTS2,
          })}
        />
      </div>
      <div className="flex justify-between items-center w-full my-5 gap-10">
        <ChartBox
          text={"Transaction Count"}
          height={"h-[630px]"}
          chart={barChart_1({
            b_data1: b_data1,
            GRADIENTS3: GRADIENTS3,
          })}
        />
        <ChartBox
          text={"Net Worth"}
          height={"h-[630px]"}
          chart={barChart_2({
            b_data2: b_data2,
            GRADIENTS3: GRADIENTS3,
          })}
        />
      </div>
      <div className="flex justify-between items-center w-full my-5 gap-10">
        <ChartBox
          text={"Wallet Age"}
          height={"h-[630px]"}
          chart={barChart_3({
            b_data3: b_data3,
            GRADIENTS3: GRADIENTS3,
          })}
        />
        <ChartBox
          text={"% Airdrop out of all TXS"}
          height={"h-[630px]"}
          chart={barChart_4({
            b_data4: b_data4,
            GRADIENTS3: GRADIENTS3,
          })}
        />
      </div>
    </div>
  );
};

export default Charts;
