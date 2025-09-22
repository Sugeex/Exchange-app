import { useState } from "react";
import Card from "../Card/Card";
import LOGO1 from "../../assets/img/0b0ac6ee9fc74705997f856765c84b10.webp";
import LOGO2 from "../../assets/img/a5b0c77f7ee4430cbd2e6a775cbdbe95.webp";
import LOGO3 from "../../assets/img/dabd207d1f724db99929568ed7c64dbe.webp";

const MOCK_DATA = [
  { id: 1, img: LOGO1, name: "Insight", status: "gold" },
  { id: 2, img: LOGO2, name: "EastChange", status: "silver" },
  { id: 3, img: LOGO3, name: "BitOkk" },
  { id: 4, img: LOGO2, name: "EastChange", status: "silver" },
  { id: 5, img: LOGO3, name: "BitOkk" },
];

const ListCard = () => {
  const [data, setData] = useState(MOCK_DATA);
  const [sortAsc, setSortAsc] = useState(true);

  const handleSortByName = () => {
    const sorted = [...data].sort((a, b) => {
      if (a.name < b.name) return sortAsc ? -1 : 1;
      if (a.name > b.name) return sortAsc ? 1 : -1;
      return 0;
    });
    setData(sorted);
    setSortAsc(!sortAsc);
  };

  return (
    <div className="w-full overflow-hidden">
      <div className="flex items-center px-[30px] gap-8 text-sm leading-[16px] font-normal">
        <div className="flex flex-col items-start flex-1">
          <p
            className="w-[50px] text-center cursor-pointer"
            onClick={handleSortByName}
          >
            Pair
          </p>
          <div
            className="w-[50px] justify-center flex items-center gap-1 cursor-pointer"
            onClick={handleSortByName}
          >
            USDT{" "}
            <div className="flex flex-col text-[6px] leading-[7px]">
              <span>▲</span>
              <span>▼</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center ">
          <p>Last</p>
          <div>Price</div>
        </div>
        <div className="flex flex-col items-center ">
          <p>24H</p>
          <div className="w-[50px] justify-center flex items-center gap-1 cursor-pointer">
            Change{" "}
            <div className="flex flex-col text-[6px] leading-[7px]">
              <span>▲</span>
              <span>▼</span>
            </div>
          </div>
        </div>
      </div>
      <hr className="h-[1px] bg-[#3D455C] border-0 my-1" />
      <div className="px-4 py-2 w-full flex flex-col gap-2.5">
        {data.map(({ id, img, name, status }) => (
          <Card name={name} key={id} img={img} status={status} />
        ))}
      </div>
    </div>
  );
};

export default ListCard;
