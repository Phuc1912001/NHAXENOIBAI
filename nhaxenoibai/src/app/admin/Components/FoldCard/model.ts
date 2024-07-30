export interface IProps {
  title?: string;
  tagName?: React.ReactNode;
  children?: React.ReactNode;
  operate?: React.ReactNode;
  className?: string;
  cardClass?: string;
  titleIcon?: React.ReactNode;
  defaultDisplay?: "block" | "none";
  noDisplayBorder?: boolean;
  open?: boolean;
  onChange?: (open?: boolean) => void;
}
