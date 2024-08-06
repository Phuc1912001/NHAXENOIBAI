import dayjs, { Dayjs } from "dayjs";

const customPlugins = (option: A, c: typeof Dayjs, d: typeof dayjs) => {
  const proto = c.prototype;

  proto.formatDay = function () {
    return this.isValid() ? this.format("DD MMMM YYYY") : "";
  };
  proto.formatMMMDay = function () {
    return this.isValid() ? this.format("DD MMM YYYY") : "";
  };
  proto.formatDayAndTime = function () {
    return this.isValid() ? this.format("DD MMM YYYY HH:mm") : "";
  };

  proto.formatDayAndTimeWith12h = function () {
    return this.isValid() ? this.format("DD MMMM YYYY hh:mm A") : "";
  };

  proto.formatTime = function () {
    return this.isValid() ? this.format("HH:mm") : "";
  };

  proto.formatTime12h = function () {
    return this.isValid() ? this.format("hh:mm A") : "";
  };

  proto.formatToRequestDate = function () {
    return this.utc().format();
  };

  proto.getWeekFirstDayByDate = function (startWeek = 0) {
    const currentDate = d(this);
    const cureentDay: number = currentDate.day();
    const dayIndexArray: number[] = [];
    for (let i = startWeek; i < startWeek + 7; i++) {
      dayIndexArray.push(i % 7);
    }
    const dayIndex = dayIndexArray.indexOf(cureentDay);
    if (dayIndex === 0) {
      return currentDate;
    } else {
      return currentDate.subtract(dayIndex, "day");
    }
  };

  proto.getWeekLastDayByDate = function getWeekLastDayMomentByDate(
    startWeek = 0
  ) {
    const currentDate = d(this);
    const cureentDay: number = currentDate.day();
    const dayIndexArray: number[] = [];
    for (let i = startWeek; i < startWeek + 7; i++) {
      dayIndexArray.push(i % 7);
    }
    const dayIndex = dayIndexArray.indexOf(cureentDay);
    if (dayIndex === 6) {
      return currentDate;
    } else {
      return currentDate.add(6 - dayIndex, "day");
    }
  };

  proto.setCurrentDayjs = function () {
    const todayOffset = dayjs().utcOffset();
    const currentOffset = this.utcOffset();
    return this.add(todayOffset - currentOffset, "m");
  };

  proto.getCurrentDayjs = function () {
    return dayjs(this.format("YYYY-MM-DD"), "YYYY-MM-DD");
  };
  proto.getCurrentMinuteDayjs = function () {
    return dayjs(this.format("YYYY-MM-DD HH:mm"), "YYYY-MM-DD HH:mm");
  };
  proto.isSameOrBefore = function (
    date: Dayjs,
    unit?: dayjs.OpUnitType | undefined
  ) {
    return this.isSame(date, unit) || this.isBefore(date, unit);
  };

  proto.isSameOrAfter = function (
    date: Dayjs,
    unit?: dayjs.OpUnitType | undefined
  ) {
    return this.isSame(date, unit) || this.isAfter(date, unit);
  };

  proto.getDayRangeList = function (end?: Dayjs) {
    const currentDate = dayjs(this).getCurrentDayjs();
    const endDate = dayjs(end).getCurrentDayjs();
    if (!endDate) return [currentDate];
    if (currentDate.formatDay() === endDate.formatDay()) return [currentDate];
    const resultList: Dayjs[] = [];
    const isEndAfterStart = currentDate.isBefore(endDate, "day");
    const diffDay = Math.abs(currentDate.diff(endDate, "day"));
    const startForeachDate = isEndAfterStart ? currentDate : endDate;
    for (let i = 0; i <= diffDay; i++) {
      resultList.push(startForeachDate.add(i, "day"));
    }
    return resultList;
  };
};

export default customPlugins;
