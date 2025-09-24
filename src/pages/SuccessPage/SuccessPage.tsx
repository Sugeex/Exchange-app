import { Button } from "antd";
import SUCCESS_ICON from "../../assets/icons/successIcon.svg";
import ARROW_ICON from "../../assets/icons/backBtn.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import MOPED_ICON from "../../assets/icons/moped.svg";
import ATM_ICON from "../../assets/icons/atm.svg";
import CASH_ICON from "../../assets/icons/payments.svg";
import CARD_ICON from "../../assets/icons/card.svg";
import WALLET_ICON from "../../assets/icons/wallet.svg";

const SuccessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { payAmountC, methodC, receiveAmount, receiveCurrency } =
    location.state || {
      payAmountC: "0",
      methodC: "",
      receiveAmount: "0",
      receiveCurrency: "",
    };

  const getIconReceipt = (value: string) => {
    if (value === "Courier")
      return (
        <div className="flex flex-col items-center justify-center rounded-[4px] p-2 border border-[#3D455C]">
          <img src={MOPED_ICON} alt="moped" />
          <span>{value}</span>
        </div>
      );
    if (value === "ATM")
      return (
        <div className="size-[63px] flex flex-col items-center justify-center rounded-[4px] p-2 border border-[#3D455C]">
          <img src={ATM_ICON} alt="atm" />
        </div>
      );
    if (value === "Cash in the office")
      return (
        <div className="size-[63px] flex flex-col items-center justify-center rounded-[4px] p-2 border border-[#3D455C]">
          <img src={CASH_ICON} alt="cash" />
          <span>Cash</span>
        </div>
      );
    if (value === "Transfer to card")
      return (
        <div className="size-[63px] flex flex-col items-center justify-center rounded-[4px] p-2 border border-[#3D455C]">
          <img src={CARD_ICON} alt="cash" />
          <span>Card</span>
        </div>
      );
    if (value === "Transfer to an electronic wallet")
      return (
        <div className="size-[63px] flex flex-col items-center justify-center rounded-[4px] p-2 border border-[#3D455C]">
          <img src={WALLET_ICON} alt="cash" />
          <span>Wallet</span>
        </div>
      );
  };

  return (
    <div className="flex flex-col h-[calc(100vh-90px)] px-4 py-2.5">
      <div className="flex justify-center items-center">
        <span className="text-[#FFFFFFE6] text-[18px] font-medium">
          Transaction info
        </span>
        <img
          onClick={() => navigate(-1)}
          className="absolute left-[15px]"
          src={ARROW_ICON}
          alt="arrow_back"
        />
      </div>
      <div className="flex flex-col gap-6  justify-center items-center grow">
        <motion.img
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="h-[217px]"
          src={SUCCESS_ICON}
          alt="success"
        />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="flex flex-col gap-4"
        >
          <div className="flex flex-col gap-2">
            <span className="text-[#FFFFFFE5] text-[32px] leading-[38px] font-semibold text-center">
              Application sent
            </span>
            <p className="text-[#FFFFFFE5] text-[14px] text-center">
              You have successfully submitted your exchange request. It will be
              reviewed within 1 hour.
            </p>
          </div>
          <div className="flex bg-[#2D344D] rounded-[10px] justify-between items-center px-[14px] py-[15px]">
            <div className="flex flex-col gap-[3px]">
              <span className="text-[14px] text-[#9096A2] leading-[16px]">
                USDT
              </span>
              <span className="text-[16px] text-[#FFFFFFE5] leading-[18px]">
                {payAmountC}
              </span>
            </div>
            <div className="text-[14px] text-[#9096A2]">
              {getIconReceipt(methodC)}
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[14px] text-[#9096A2] leading-[16px]">
                {receiveCurrency || "BTC"}
              </span>
              <span className="text-[16px] text-[#FFFFFFE5] leading-[18px]">
                {receiveAmount || "0"}
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="bg-[#22283A] h-[90px] w-full fixed bottom-0 left-0 p-4 border-t border-[#3D455C]">
        <Button
          onClick={() => navigate("/")}
          className="w-full !h-[48px] rounded-[12px] !bg-[#436FE2] !text-[16px] !text-[#FFFFFFE5] !font-medium !border-none"
        >
          Done
        </Button>
      </div>
    </div>
  );
};

export default SuccessPage;
