import { useNavigate } from "react-router-dom";
import FILTER_ICON from "../../assets/icons/filterIcon.svg";
import LOC_ICON from "../../assets/icons/loc.svg";
import ListCard from "../../components/ListCard/ListCard";

const MainPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-[16px] h-[100vh]  py-2.5">
      <h1 className="text-[#FFFFFFE6] text-[18px] text-center font-medium px-4">
        Exchage App
      </h1>

      <div className="flex justify-between px-4">
        <div onClick={() => navigate("/location")} className="flex gap-2.5">
          <div className="flex justify-center items-center w-[40px] h-[40px] rounded-[12px] border border-[#808080] bg-[rgba(216,216,216,0.05)]">
            <img src={LOC_ICON} alt="ICON_LOC" />
          </div>
          <div className="flex flex-col">
            <span className="text-[#9096A2] text-[12px]">Your location</span>
            <span className="text-[16px] text-[#FFFFFFE6] font-bold">
              Norvey, USA
            </span>
          </div>
        </div>
        <img
          onClick={() => navigate("/filter")}
          src={FILTER_ICON}
          alt="filter"
        />
      </div>
      <ListCard />
    </div>
  );
};

export default MainPage;
