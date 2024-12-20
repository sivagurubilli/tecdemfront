import { CircularProgress, CircularProgressLabel } from "@chakra-ui/react";

const Progress = ({ value, color }) => {
  return (
    <div className="d-flex align-items-start justify-content-start mb-1">
      <CircularProgress
        value={value}
        color={color}
        size="60px"
        thickness="17px"
      />
      <CircularProgressLabel
        style={{
          fontSize: "32px",
          color,
          textAlign: "start",
          marginLeft: "13px",
          fontWeight: "700",
        }}
      >
        {value}%
      </CircularProgressLabel>
    </div>
  );
};
export default Progress;
