import React from "react";

interface TrackPrintProps {
  handleTrackPrint: () => void;
}

const TrackPrint: React.FC<TrackPrintProps> = ({ handleTrackPrint }) => {
  return (
    <button onClick={handleTrackPrint} className="print-button">
      <span className="print-icon"></span>
    </button>
  );
};
export default TrackPrint;
