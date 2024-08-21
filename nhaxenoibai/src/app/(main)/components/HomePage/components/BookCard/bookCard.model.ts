export enum InputEnum {
  origin = 1,
  destination,
}

export enum TabBookCar {
  airport = 1,
  road,
}
export interface PlaceOption {
  value: {
    place_id: string;
  };
  label: string;
}
