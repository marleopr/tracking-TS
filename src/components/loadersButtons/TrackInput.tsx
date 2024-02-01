import React, { ChangeEvent } from "react";

interface TrackInputProps {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

const TrackInput: React.FC<TrackInputProps> = ({
  value,
  onChange,
  placeholder,
}) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      name="text"
      className="input"
      value={value}
      onChange={onChange}
    ></input>
  );
};

export default TrackInput;
