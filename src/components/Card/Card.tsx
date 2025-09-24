import Chart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";
import { useState } from "react";
import { motion, useAnimation, useMotionValue } from "framer-motion";
import STAR from "../../assets/img/Star-1.svg";
import StarRating from "../StarRaiting/StartRaiting";

interface CardProps {
  name: string;
  img: string;
  status?: string;
  currency: string;
}

const Card = ({ name, img, status, currency }: CardProps) => {
  const percent = 0.72;
  const [rating, setRating] = useState(3);
  const [isFavorite, setIsFavorite] = useState(false);

  const x = useMotionValue(0);
  const controls = useAnimation();
  const [isOpen, setIsOpen] = useState(false);

  const dragThreshold = 60; // минимальный свайп для открытия
  const closeThreshold = 30;

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
      <div className="absolute inset-0 flex items-center justify-end  bg-[#436FE2] rounded-[12px]">
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className="flex flex-col items-center gap-1 text-white font-normal  rounded-md text-sm w-[139px]"
        >
          <img src={STAR} />
          {isFavorite ? "Remove" : "Add to Favorites"}
        </button>
      </div>

      <motion.div
        className={`relative p-[2px] rounded-[12px] 
    ${
      status === "gold"
        ? "bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-500 bg-[length:300%_300%] animate-border-shine"
        : status === "silver"
        ? "bg-gradient-to-r from-gray-400 via-gray-200 to-gray-500 bg-[length:300%_300%] animate-border-shine"
        : "bg-[#22283A]"
    }
  `}
        drag="x"
        dragConstraints={{ left: -139, right: 0 }}
        dragElastic={0.2}
        dragMomentum={false}
        style={{ x }}
        animate={controls}
        onDragEnd={(_, info) => {
          if (!isOpen && info.offset.x < -dragThreshold) {
            // свайп влево — открываем
            controls.start({
              x: -139,
              transition: { type: "spring", stiffness: 300, damping: 30 },
            });
            setIsOpen(true);
          } else if (isOpen && info.offset.x > closeThreshold) {
            // свайп вправо — закрываем
            controls.start({
              x: 0,
              transition: { type: "spring", stiffness: 300, damping: 30 },
            });
            setIsOpen(false);
          } else {
            // иначе оставляем текущее состояние (чтобы не дергалось)
            controls.start({
              x: isOpen ? -139 : 0,
              transition: { type: "spring", stiffness: 300, damping: 30 },
            });
          }
        }}
      >
        {/* Внутренний слой с тёмным фоном */}
        <div className="bg-[#22283A] rounded-[10px] flex w-full min-h-[76px] items-center py-2 px-2 text-white justify-between">
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

          <div className="flex flex-col text-[14px] leading-[16px]">
            <span>30,113.80</span>
            <span className="text-[12px]">{currency}</span>
          </div>

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
        </div>
      </motion.div>
    </div>
  );
};

export default Card;
