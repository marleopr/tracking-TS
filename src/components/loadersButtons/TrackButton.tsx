import React, { ReactNode, MouseEventHandler, CSSProperties } from "react";
import "./styled.css";

interface SvgIconProps {
  icon: ReactNode;
  color: string;
}
interface TrackButtonProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
  label: string;
  iconSvg: ReactNode;
  style?: CSSProperties;
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

const TrackButton: React.FC<TrackButtonProps> = ({
  onClick,
  label,
  iconSvg,
  style,
}) => {
  const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    onClick(event);
  };

  return (
    <button className="contactButton" onClick={handleClick} style={style}>
      {label}
      <div className="iconButton">
        <SvgIcon icon={iconSvg} color="#ffffff" />
      </div>
    </button>
  );
};
export default TrackButton;
