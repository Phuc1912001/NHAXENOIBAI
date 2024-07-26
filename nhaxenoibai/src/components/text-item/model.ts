export interface IProps {
  label?: string;
  children?: A;
  textItemProps?: ITextItemProps;
  className?: string;
  greyedOut?: boolean;
  style?: React.CSSProperties;
}

export interface ITextItemProps {
  isCol?: boolean;
  spanNumber?: number;
  spanMobNumber?: number;
}