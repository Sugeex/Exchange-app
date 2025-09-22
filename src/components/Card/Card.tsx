import Chart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";
import { useState } from "react";
import { motion } from "framer-motion";
import STAR from "../../assets/img/Star-1.svg";
import StarRating from "../StarRaiting/StartRaiting";

interface CardProps {
  name: string;
  img: string;
  status?: string;
}

const Card = ({ name, img, status }: CardProps) => {
  const percent = 0.72;
  const [rating, setRating] = useState(3);
  const [isFavorite, setIsFavorite] = useState(false);

  const series = [
    {
      name: "Price",
      data: [1.1, 1.12, 1.15, 1.13, 1.14, 1.16],
    },
  ];

  const options: ApexOptions = {
    chart: {
      type: "line",
      sparkline: { enabled: true },
    },
    stroke: {
      curve: "smooth",
      width: 1,
    },
    tooltip: {
      enabled: false,
    },
    colors: [percent > 0 ? "#436FE2" : "#F7931A"],
  };

  // const borderClasses =
  //   status === "gold"
  //     ? "rounded-[12px] border-2 border-transparent bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-400 bg-[length:200%_200%] bg-clip-border animate-border-shine"
  //     : status === "silver"
  //     ? "rounded-[12px] border-2 border-transparent bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 bg-[length:200%_200%] bg-clip-border animate-border-shine"
  //     : "rounded-[12px]";

  return (
    <div className="relative w-full font-normal">
      <div className="absolute inset-0 flex items-center justify-end  bg-[#F7931A] rounded-[12px]">
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className="flex flex-col items-center gap-1 text-white font-normal  rounded-md text-sm w-[139px]"
        >
          <img src={STAR} />
          {isFavorite ? "Remove" : "Add to Favorites"}
        </button>
      </div>

      <motion.div
        className={`flex w-full bg-[#22283A] min-h-[76px] items-center py-2 px-2 text-white justify-between relative z-10 
    ${
      status === "gold"
        ? "ring-2 ring-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.7)] rounded-[12px]"
        : status === "silver"
        ? "ring-2 ring-gray-300 shadow-[0_0_10px_rgba(209,213,219,0.7)] rounded-[12px]"
        : "rounded-[12px]"
    }
  `}
        drag="x"
        dragConstraints={{ left: -139, right: 0 }}
        dragElastic={0.1}
      >
        <div className="flex flex-col gap-1 w-1/4">
          {/* <p className="text-sm leading-[18px]">
            EGAME<span className="text-[#9096A2] text-[12px]">/USDT</span>
          </p>
          <p className="text-[10px] leading-[14px]">Vol 7 431 281,89</p> */}

          <div className="flex gap-1 items-center">
            <div className="min-w-8 min-h-8 w-8 h-8">
              <img src={img} className="w-full h-full rounded-[12px]" />
            </div>
            <p className="text-sm leading-[18px]">{name}</p>
          </div>
        </div>

        <div className="flex flex-col items-center text-[10px] leading-[12px]">
          <p>Top price 118,12</p>
          <div className="w-[85px] h-[36px] flex items-center">
            <Chart
              options={options}
              series={series}
              type="line"
              height={30}
              width={85}
            />
          </div>
          <p>Low price 1.115</p>
        </div>

        <div className="text-[14px] leading-[16px]">30,113.80</div>

        <div className="flex flex-col items-center">
          <div
            className={`px-1 py-0.5 rounded-[4px] text-[14px] leading-[16px] font-medium ${
              percent > 0 ? "bg-[#31C451]" : "bg-[#FF6666]"
            }
            `}
          >
            {percent > 0 ? "+" : "-"}
            {percent}%
          </div>
          <StarRating rating={rating} setRating={setRating} />
        </div>
      </motion.div>
    </div>
  );
};

export default Card;
