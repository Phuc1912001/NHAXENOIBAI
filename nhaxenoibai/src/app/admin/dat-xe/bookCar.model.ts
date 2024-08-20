export interface PanelRefFilter {
  handleOpenPanel: () => void;
}

export enum EBookCarStatus {
  PendingGo = 1,
  Complete,
}

export const EBookCarProperties = {
  [EBookCarStatus.PendingGo]: {
    bgColor: "#e8f5ff",
    color: "#0072d0",
    text: "Chờ đi",
    name: "pending-active",
  },

  [EBookCarStatus.Complete]: {
    bgColor: "#f5fff9",
    color: "#00a84e",
    text: "Hoàn thành",
    name: "active",
  },
};

export interface IFilterBookCarValue {
  status: number[];
  dateRange: string[];
}
