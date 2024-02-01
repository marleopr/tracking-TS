import React, { ReactNode, MouseEvent } from "react";
import "./styled.css";

interface SvgIconProps {
  icon: ReactNode;
  color: string;
}

const SvgIcon: React.FC<SvgIconProps> = ({ icon, color }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="1em"
      viewBox="0 0 640 512"
      fill={color}
    >
      {icon}
    </svg>
  );
};

interface TrackButtonV2Props {
  onClick: () => void;
  label: string;
  disabled: boolean;
  iconSvg: ReactNode;
}

const TrackButtonV2: React.FC<TrackButtonV2Props> = ({
  onClick,
  label,
  disabled,
  iconSvg,
}) => {
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    onClick();
  };

  return (
    <button onClick={handleClick} disabled={disabled} className="track-button">
      <div className="track-button">
        <div className="track-button">
          <SvgIcon icon={iconSvg} color="#ffffff" />
        </div>
      </div>
      <span>{label}</span>
    </button>
  );
};
export default TrackButtonV2;
