import { Progress } from "@chakra-ui/react";

const Card = ({ title, progressValue, progressColor, description }) => {
  return (
    <div className="mb-4 col-md-6 col-lg-3">
      <div className="card h-100">
        <div className="card-body d-flex flex-column">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h5 className="mb-4 text-dark">{title}</h5>
            <div className="d-flex align-items-center justify-content-center">
              <Progress value={progressValue} color={progressColor} />
            </div>
          </div>
          <h6 className="mt-auto text-muted">{description}</h6>
        </div>
      </div>
    </div>
  );
};
export default Progress;
