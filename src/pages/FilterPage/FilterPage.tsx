import { useNavigate } from "react-router-dom";
import ARROW_ICON from "../../assets/icons/backBtn.svg";
import { Button, Input, Modal, Select } from "antd";
import { useState } from "react";

const FilterPage = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [receiptCur, setReceiptCur] = useState("USDT");

  const GiveOptions = [
    { label: "Bitcoin", value: "BTC" },
    { label: "Ethereum", value: "ETH" },
    { label: "Solana", value: "SOL" },
  ];

  const ReceiptOptions = [
    { label: "Crypto wallet address", value: "wallet" },
    { label: "Exchange account", value: "exchange" },
    { label: "Bank card (crypto-to-fiat)", value: "bank" },
    { label: "Payment system (PayPal, Skrill, etc.)", value: "payment" },
    { label: "Cash pickup (OTC)", value: "cash" },
    { label: "Internal wallet balance", value: "internal" },
  ];

  const NetworkOptions = [
  { label: "Bitcoin (BTC)", value: "btc" },
  { label: "Ethereum (ERC-20)", value: "erc20" },
  { label: "Tether (TRC-20)", value: "trc20" },
  { label: "Binance Smart Chain (BEP-20)", value: "bep20" },
];

const CurrencyOptions = [
  { label: "USDT", value: "USDT" },
  { label: "BTC", value: "BTC" },
  { label: "ETH", value: "ETH" },
  { label: "BNB", value: "BNB" },
  { label: "SOL", value: "SOL" },
];

  return (
    <div className="flex flex-col h-[100vh] px-4 py-2.5">
      <div className="flex justify-center items-center">
        <span className="text-[#FFFFFFE6] text-[18px] font-medium">Filter</span>
        <img
          onClick={() => navigate(-1)}
          className="absolute left-[15px]"
          src={ARROW_ICON}
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
              options={GiveOptions}
              placeholder="Give"
              className="w-full !h-[40px]"
            />
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-[#FFFFFFE6] text-[18px] font-medium">
              Network
            </span>
            <Select
              options={NetworkOptions}
              placeholder="Choose network"
              className="w-full !h-[40px]"
            />
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-[#FFFFFFE6] text-[18px] font-medium">
              Amount to be received
            </span>
            <div className="flex items-center bg-[#22283A] pr-[11px] rounded-[10px]">
              <Input placeholder="Enter amount" className="w-full !h-[40px]" />
              <span
                onClick={() => setIsOpen(true)}
                className="text-[#FFFFFFE6] text-[14px]"
              >
                {receiptCur}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-[#FFFFFFE6] text-[18px] font-medium">
              Method of receipt
            </span>
            <Select
              options={ReceiptOptions}
              placeholder="Receipt"
              className="w-full !h-[40px]"
            />
          </div>
        </div>
        <Button className="w-full !h-[48px] rounded-[12px] !bg-[#436FE2] !text-[16px] !text-[#FFFFFFE5] !font-medium !border-none">
          Apply Filter
        </Button>
      </div>
      <Modal
        open={isOpen}
        centered
        title={<span className="text-[#FFFFFFE5] text-[18px]">Receipt currency</span>}
        onCancel={() => setIsOpen(false)}
        footer={null}
        className="custom-modal"
      >
        <div className="flex flex-col gap-2 max-h-[200px] overflow-y-auto">
          {CurrencyOptions.map((item) => (
            <div
              key={item.value}
              className="cursor-pointer px-4 py-2 rounded-lg bg-[#2D344D] text-[#FFFFFFE6] hover:bg-[#3B425C] transition"
              onClick={() => {
                console.log("Selected:", item.value);
                setReceiptCur(item.label)
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
