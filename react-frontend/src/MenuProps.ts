import { Option } from "./Option";

export interface MenuProps {
    handleButtonClick: (option: Option) => void;
    selectedOption: Option | null;
  }
