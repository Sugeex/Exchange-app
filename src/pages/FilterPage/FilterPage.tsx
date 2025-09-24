import { useNavigate } from "react-router-dom";
import ARROW_ICON from "../../assets/icons/backBtn.svg";
import RESET_ICON from "../../assets/icons/reset.svg";
import { Button, Input, Modal, Select } from "antd";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { resetFilter, setFilter } from "../../store/slice/filterSlice";

const FilterPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { payAmount: savedAmount, method: savedMethod, coin: savedCoin, network: savedNetwork } = useAppSelector(
    (state) => state.filter
  );

  const [isOpen, setIsOpen] = useState(false);
  const [coin, setCoin] = useState(savedCoin || "");
  const [network, setNetwork] = useState(savedNetwork || "");
  const [amount, setAmount] = useState(savedAmount || "");
  const [method, setMethod] = useState(savedMethod || "Courier");

  const CoinOptions = [{ label: "Tether", value: "USDT" }];

  const ReceiptOptions = [
    { label: "Courier", value: "courier" },
    { label: "ATM", value: "atm" },
    { label: "Cash in the office", value: "cash" },
    { label: "Transfer to card", value: "card" },
    { label: "Transfer to an electronic wallet", value: "electronicW" },
  ];

  const NetworkOptions = [
    { label: "TRC-20", value: "trc20" },
    { label: "BEP-20", value: "bep20" },
    { label: "ERC-20", value: "erc20" },
  ];

  const handleApplyFilter = () => {
    dispatch(setFilter({ payAmount: amount, method, coin, network }));
    navigate("/");
  };

  const handleReset = () => {
    dispatch(resetFilter());
    setAmount("");
    setMethod("Courier");
    setCoin(""); 
    setNetwork(""); 
  }

  return (
    <div className="flex flex-col h-[100vh] px-4 py-2.5">
      <div className="flex justify-between items-center">
        <img onClick={() => navigate(-1)} src={ARROW_ICON} alt="arrow_back" />
        <span className="text-[#FFFFFFE6] text-[18px] font-medium">Filter</span>
        <img
          onClick={handleReset}
          className=" w-[27px] h-[27px]"
          src={RESET_ICON}
          alt="arrow_back"
        />
      </div>

      <div className="flex flex-col h-full overflow-x-auto mt-4 justify-between">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <span className="text-[#FFFFFFE6] text-[18px] font-medium">
              Coin
            </span>
            <Select
              value={coin || undefined}
              onChange={(value) => setCoin(value)}
              options={CoinOptions}
              placeholder="Give"
              className="w-full !h-[40px]"
            />
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-[#FFFFFFE6] text-[18px] font-medium">
              Network
            </span>
            <Select
              value={network || undefined}
              onChange={(value) => setNetwork(value)}
              options={NetworkOptions}
              placeholder="Choose network"
              className="w-full !h-[40px]"
            />
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-[#FFFFFFE6] text-[18px] font-medium">
              Amount to be received
            </span>
            <Input
              type="number"
              placeholder="Enter amount"
              className="w-full !h-[40px]"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-[#FFFFFFE6] text-[18px] font-medium">
              Method of receipt
            </span>
            <Select
              placeholder="Receipt"
              className="w-full !h-[40px]"
              open={false}
              onClick={() => setIsOpen(true)}
              value={method}
            />
          </div>
        </div>
        <Button
          onClick={handleApplyFilter}
          className="w-full !h-[48px] rounded-[12px] !bg-[#436FE2] !text-[16px] !text-[#FFFFFFE5] !font-medium !border-none"
        >
          Apply Filter
        </Button>
      </div>
      <Modal
        open={isOpen}
        centered
        title={
          <span className="text-[#FFFFFFE5] text-[18px]">
            Method of receipt
          </span>
        }
        onCancel={() => setIsOpen(false)}
        footer={null}
        className="custom-modal"
      >
        <div className="flex flex-col gap-2 max-h-[200px] overflow-y-auto [-ms-overflow-style:none] [scrollbar-width:none] [-webkit-scrollbar]:hidden">
          {ReceiptOptions.map((item) => (
            <div
              key={item.value}
              className="cursor-pointer px-4 py-2 rounded-lg bg-[#2D344D] text-[#FFFFFFE6] hover:bg-[#3B425C] transition"
              onClick={() => {
                console.log("Selected:", item.value);
                setMethod(item.label);
                setIsOpen(false);
              }}
            >
              {item.label}
            </div>
          ))}
        </div>
      </Modal>
    </div>
  );
};

export default FilterPage;
