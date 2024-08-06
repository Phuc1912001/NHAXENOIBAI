import dayjs from "dayjs";
import utcPluginFunc from "dayjs/plugin/utc";
import customPlugins from "./customPlugins";

declare module "dayjs" {
  export interface Dayjs {
    getCurrentDayjs: () => Dayjs;
    getCurrentMinuteDayjs: () => Dayjs;
    formatDay: () => string;
    formatMMMDay: () => string;
    formatDayAndTime: () => string;
    formatDayAndTimeWith12h: () => string;
    formatTime: () => string;
    formatTime12h: () => string;
    formatToRequestDate: () => string;
    getWeekFirstDayByDate: (startWeek: number) => Dayjs;
    getWeekLastDayByDate: (startWeek: number) => Dayjs;
    getDayRangeList: (end?: Dayjs) => Dayjs[];
    setCurrentDayjs: () => Dayjs;
    isSameOrBefore: (
      date: Dayjs,
      unit?: dayjs.OpUnitType | undefined
    ) => boolean;
    isSameOrAfter: (
      date: Dayjs,
      unit?: dayjs.OpUnitType | undefined
    ) => boolean;
  }
}
dayjs.extend(utcPluginFunc);
dayjs.extend(customPlugins);

export { dayjs };
