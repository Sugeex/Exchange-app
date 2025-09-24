import { useNavigate } from "react-router-dom";
import ARROW_ICON from "../../assets/icons/backBtn.svg";
import ICON_SEARCH from "../../assets/icons/SearchIcon.svg";
import LONDON from "../../assets/icons/London.webp";
import DUBAI from "../../assets/icons/dubai.webp";
import JAPAN from "../../assets/icons/japan.jpg";
import { useMemo, useState } from "react";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { setLocation } from "../../store/slice/locationSlice";
import type { Location } from "../../store/slice/locationSlice";

const locationMock = [
  {
    id: 1,
    country: "Indonesia - IDN",
    place: "Jakarta",
    img: LONDON,
  },
  {
    id: 2,
    country: "Thailand - THA",
    place: "Bangkok",
    img: DUBAI,
  },
  {
    id: 3,
    country: "Malaysia",
    place: "Kuala Lumpur",
    img: JAPAN,
  },
];

const LocationPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredLocations = useMemo(() => {
    if (!searchQuery.trim()) {
      return locationMock;
    }

    const query = searchQuery.toLowerCase().trim();
    return locationMock.filter(
      (item) =>
        item.country.toLowerCase().includes(query) ||
        item.place.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleLocationSelect = (location: Location) => {
    dispatch(setLocation(location));
    navigate(-1);
  };

  return (
    <div className="h-[100vh] p-5">
      <div className="relative flex gap-2 items-center justify-center">
        <img
          onClick={() => navigate(-1)}
          className="absolute left-0"
          src={ARROW_ICON}
          alt="arrow_back"
        />
        <span className="text-[16px] text-[#FFFFFFE6] font-bold">
          Choose Location
        </span>
      </div>
      <div className="relative w-full mt-6">
        <input
          placeholder="Search"
          value={searchQuery}
          onChange={handleSearchChange}
          className="h-[38px] w-full rounded-[12px] pl-12 pr-4 outline-none bg-[#22283A] placeholder:text-[#3D455C] text-[#FFFFFFE6]"
          type="text"
        />
        <img
          src={ICON_SEARCH}
          alt="search"
          className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5"
        />
      </div>
      <div className="flex flex-col gap-4 overflow-y-auto mt-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {filteredLocations.length > 0 ? (
          filteredLocations.map((item) => (
            <div
              onClick={() => handleLocationSelect(item)}
              className="flex p-3 justify-between items-center rounded-[12px] bg-[#22283A]"
              key={item.id}
            >
              <div className="flex gap-2 items-center">
                <div>
                  <img
                    className="w-[60px] h-[40px] rounded-[10px]"
                    src={item.img}
                    alt={item.country}
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-[#FFFFFFE6] text-[16px] font-semibold">
                    {item.country}
                  </span>
                  <span className="text-[#9096A2] text-[14px]">
                    {item.place}
                  </span>
                </div>
              </div>
              <img
                className="scale-x-[-1] size-[16px]"
                src={ARROW_ICON}
                alt="arrow"
              />
            </div>
          ))
        ) : (
          <div className="text-center text-[#9096A2] py-4">
            No locations found
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationPage;
