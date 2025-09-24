import { useNavigate, useParams } from "react-router-dom";
import ARROW_ICON from "../../assets/icons/backBtn.svg";
import ARROW_PAY from "../../assets/icons/arrow_forward.svg";
import EDIT_ICON from "../../assets/icons/edit.svg";
import { Button, Modal, Select } from "antd";
import { useState } from "react";
import NumberInputModal from "../../components/NumberInputModal";
import { useAppSelector } from "../../hooks/reduxHooks";

const ReceiptOptions = [
  { label: "Courier", value: "courier" },
  { label: "ATM", value: "atm" },
  { label: "Cash in the office", value: "cash" },
  { label: "Transfer to card", value: "card" },
  { label: "Transfer to an electronic wallet", value: "electronicW" },
];

const mocks = [
    {
      id: "1",
      name: "Insight",
      receiveCurrency: "IDR",
      rate: 16670,
    },
    {
      id: "2",
      name: "East",
      receiveCurrency: "THB",
      rate: 32,
    },
    {
      id: "3",
      name: "BitOkk",
      receiveCurrency: "SGD",
      rate: 1.3,
    },
    {
      id: "4",
      name: "East",
      receiveCurrency: "MYR",
      rate: 4.2,
    },
    {
      id: "5",
      name: "BitOkk",
      receiveCurrency: "AUD",
      rate: 1.51,
    },
  ];


const DetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { payAmount, method } = useAppSelector((state) => state.filter);
  const [isOpen, setIsOpen] = useState(false);
  const [methodC, setMethodC] = useState(method);
  const [isNumberModalOpen, setIsNumberModalOpen] = useState(false);
  const [payAmountC, setPayAmountC] = useState(payAmount || "0");

  
  const getMockById = (id: string | undefined) => {
    return mocks.find((item) => item.id === id);
  };

  const mock = getMockById(id);
  const receiveAmount = mock
  ? (parseFloat(payAmountC || "0") * mock.rate).toLocaleString()
  : "0";

  const tabsTotal = [
    { label: "Pay", value: payAmount },
    { label: "Receive", value: `${mock?.receiveCurrency} ${receiveAmount}` },
    { label: "Method of receipt", value: methodC },
  ];

  return (
    <div className="flex flex-col gap-6 h-[100vh] px-4 py-2.5">
      <div className="flex justify-center items-center">
        <span className="text-[#FFFFFFE6] text-[18px] font-medium">
          {mock?.name ?? ""}
        </span>
        <img
          onClick={() => navigate(-1)}
          className="absolute left-[15px]"
          src={ARROW_ICON}
          alt="arrow_back"
        />
      </div>

      <div className="flex flex-col gap-6 overflow-y-auto pb-[90px]">
        <div className="flex flex-col gap-1 relative">
          <div className="flex flex-col bg-[#22283A] rounded-t-[10px] p-4">
            <div className="flex justify-between items-center w-full">
              <div className="flex gap-2">
                <div className="flex justify-center items-center rounded-full bg-[#436FE2] size-[20px]">
                  <img
                    className="w-[16px] h-[16px] -rotate-45"
                    src={ARROW_PAY}
                    alt="arrow"
                  />
                </div>
                <span className="text-[14px] text-[#FFFFFFE6] font-medium">
                  Pay
                </span>
              </div>
              <div className="flex gap-1 items-center text-[14px] text-[#FFFFFFE6] font-medium">
                Amount
                <img className="w-[14px] h-[14px]" src={EDIT_ICON} alt="edit" />
              </div>
            </div>

            <div className="flex justify-between items-center w-full">
              <span className="text-[#FFFFFFE6] text-[16px] font-medium">
                USDT
              </span>
              <span
                onClick={() => setIsNumberModalOpen(true)}
                className="text-[#FFFFFFE6] text-[28px] font-semibold"
              >
                {payAmountC || "0"}
              </span>
            </div>
          </div>

          <div className="flex justify-center items-center rotate-90 bg-[#436FE2] rounded-full size-[40px] absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 6L4 10H20M16 19L20 15H3"
                stroke="#ffff"
                stroke-width="1.6"
                stroke-linecap="round"
              />
            </svg>
          </div>

          <div className="flex flex-col bg-[#22283A] rounded-b-[10px] p-4">
            <div className="flex justify-between items-center w-full">
              <div className="flex gap-2">
                <div className="flex justify-center items-center rounded-full bg-[#436FE2] size-[20px]">
                  <img
                    className="w-[16px] h-[16px] rotate-45"
                    src={ARROW_PAY}
                    alt="arrow"
                  />
                </div>
                <span className="text-[14px] text-[#FFFFFFE6] font-medium">
                  Receive
                </span>
              </div>
              <span className="text-[14px] text-[#FFFFFFE6] font-medium">
                Amount
              </span>
            </div>

            <div className="flex justify-between items-center w-full">
              <span className="text-[#FFFFFFE6] text-[16px] font-medium">
                {mock?.receiveCurrency ?? "BTC"}
              </span>
              <span className="text-[#FFFFFFE6] text-[28px] font-semibold">
                {receiveAmount}
              </span>
            </div>
          </div>
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
            value={methodC}
          />
        </div>

        <div className="flex flex-col">
          {tabsTotal.map((item, index) => (
            <div key={index} className="flex justify-between">
              <span className="text-[#9096A2]">{item.label}</span>
              <span className="text-[#FFFFFFE6]">{item.value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-[#22283A] h-[90px] w-full fixed bottom-0 left-0 p-4 border-t border-[#3D455C]">
        <Button
          onClick={() =>
            navigate("/success", {
              state: {
                payAmountC,
                methodC,
                receiveAmount,
                receiveCurrency: mock?.receiveCurrency,
              },
            })
          }
          className="w-full !h-[48px] rounded-[12px] !bg-[#436FE2] !text-[16px] !text-[#FFFFFFE5] !font-medium !border-none"
        >
          Change
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
                setMethodC(item.label);
                setIsOpen(false);
              }}
            >
              {item.label}
            </div>
          ))}
        </div>
      </Modal>

      <NumberInputModal
        open={isNumberModalOpen}
        value={payAmountC}
        onChange={setPayAmountC}
        onClose={() => setIsNumberModalOpen(false)}
      />
    </div>
  );
};

export default DetailsPage;
