import { Button } from "antd";
import { useRef } from "react";

interface NumberInputModalProps {
  open: boolean;
  value: string;
  onChange: (val: string) => void;
  onClose: () => void;
}

const NumberInputModal = ({
  open,
  value,
  onChange,
  onClose,
}: NumberInputModalProps) => {
  const originalValueRef = useRef(value);

  const handleNumberClick = (num: string) => {
    if (num === "clear") {
      onChange("");
    } else if (num === "backspace") {
      onChange(value.slice(0, -1));
    } else if (num === ".") {
      if (!value.includes(".")) {
        onChange(value + ".");
      }
    } else {
      if (value.replace(".", "").length < 10) {
        onChange(value + num);
      }
    }
  };

  const handleDone = () => {
    if (value.endsWith(".")) {
      onChange(value.slice(0, -1));
    }
    onClose();
  };

  const handleClose = () => {
    onChange(originalValueRef.current);
    onClose();
  };

  //   className="fixed inset-0 flex items-end justify-center z-50 backdrop-blur-[4px]"

  return (
    <div
      onClick={handleClose}
      className={`fixed inset-0 flex items-end justify-center z-50 backdrop-blur-[4px] transition-opacity duration-300 ${
        open ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col bg-[#121212] rounded-[10px] w-full gap-4 border-t border-[#3D455C]"
      >
        <div className="flex flex-col gap-6 px-5 pt-5">
          <div className="flex flex-col">
            <span className="text-[#9096A2] text-[16px] font-semibold">
              Type Amount
            </span>
            <div className="border-b border-[#9096A2] flex items-center justify-between pb-[7px]">
              <div className="text-[#FFFFFFE6] text-2xl font-semibold">
                {value || "0"}
              </div>
              <span
                onClick={() => handleNumberClick("clear")}
                className="text-[#9096A2] text-[11px] font-semibold"
              >
                Clear
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col pb-4 px-[15px] gap-4">
          <div className="grid grid-cols-3 gap-[5px]">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, ".", 0, "←"].map((item) => (
              <button
                key={item}
                className={`h-[50px] ${
                  item === "←"
                    ? "bg-transparent"
                    : "bg-[#22283A] shadow shadow-[#1C2730]/50 active:!bg-[#436FE2] active:bg-none hover:bg-none"
                } text-white rounded-[5px] flex items-center justify-center text-[22px] transition-colors active:!bg-[#436FE2]`}
                onClick={() =>
                  handleNumberClick(item === "←" ? "backspace" : String(item))
                }
              >
                {item === "←" ? "⌫" : item}
              </button>
            ))}
          </div>
          <Button
            onClick={handleDone}
            className="w-full !h-[48px] rounded-[12px] !bg-[#436FE2] !text-[16px] !text-[#FFFFFFE5] !font-medium !border-none"
          >
            Apply
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NumberInputModal;
