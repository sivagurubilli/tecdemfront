import { Popover, PopoverTrigger } from "@chakra-ui/react";
import { Button } from "antd";
import { Wheel } from "react-custom-roulette";

const WheelComponent = ({ isSpinning, handleMouseOver, prize }) => {
  return (
    <div className="mb-4 col-md-6 col-lg-3">
      <div className="card h-150">
        <div className="card-body">
          <img
            src={Wheel}
            style={{
              width: "75px",
              height: "75px",
              borderRadius: "50%",
              zIndex: 15,
              cursor: "pointer",
              animation: isSpinning ? "spin 0.9s linear infinite" : "none",
              marginLeft: "200px",
            }}
            alt=""
            onMouseOver={handleMouseOver}
          />
          {isSpinning && (
            <Button style={{ fontSize: "30px", color: "blue" }} disabled>
              <i class="fas fa-gifts"></i>
              <i class="fas fa-gifts"></i>...
            </Button>
          )}
          {prize && (
            <Popover>
              <PopoverTrigger>
                <Button variant="ghost" style={{ color: "blue" }}>
                  View Prize ..<i class="fas fa-gifts"></i>
                </Button>
              </PopoverTrigger>
              {/* PopoverContent goes here */}
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default WheelComponent;
