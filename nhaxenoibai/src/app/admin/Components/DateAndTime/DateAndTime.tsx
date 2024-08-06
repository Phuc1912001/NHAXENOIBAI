import React, { useState, useEffect } from "react";
import { Row, Col, DatePicker, TimePicker } from "antd";
import { dayjs } from "@/common/date/dayjs";
import { Dayjs } from "dayjs";

export interface DateAndTimeProps {
  value?: { date: string; time: string };
  onChange?: (value: { date: Dayjs | string; time: Dayjs | string }) => void;
  disabled?: boolean;
  disabledDate?: (current: Dayjs) => boolean;
  startDateTime?: string;
  isEdit?: boolean;
  dateStatusError?: boolean;
  timeStatusError?: boolean;
  endDateTime?: { date: string; time: string };
  editType?: number;
  startFllowingDate?: string;
}
const DateAndTime: React.FC<DateAndTimeProps> = ({
  value,
  onChange,
  disabled,
  startDateTime,
  isEdit = false,
  dateStatusError,
  timeStatusError,
  editType,
  startFllowingDate,
}) => {
  const [dateStatus, setDateStatus] = useState<"error" | "warning" | undefined>(
    undefined
  );
  const [timeStatus, setTimeStatus] = useState<"error" | "warning" | undefined>(
    undefined
  );
  let CDate = dayjs(value?.date);
  let CTime = dayjs(value?.time);
  useEffect(() => {
    if (dateStatusError) {
      setDateStatus("error");
    } else {
      //setDateStatus(undefined);
    }
    if (timeStatusError) {
      setTimeStatus("error");
    } else {
      //setTimeStatus(undefined);
    }
  }, [dateStatusError, timeStatusError]);
  const onChangeDate = (date: A, type: string) => {
    if (date) {
      if (type === "date") {
        if (`${CTime.formatTime()}`.length === 0) {
          CTime = "" as unknown as Dayjs;
        }
        CDate = dayjs(date);
        setDateStatus(undefined);
      } else {
        if (`${CDate.formatDay()}`.length === 0) {
          CDate = "" as unknown as Dayjs;
        }
        CTime = dayjs(date);
        setTimeStatus(undefined);
      }
    } else {
      if (type === "date") {
        if (`${CTime.formatTime()}`.length === 0) {
          CTime = "" as unknown as Dayjs;
        } else {
          setTimeStatus(undefined);
        }
        CDate = "" as unknown as Dayjs;
        setDateStatus("error");
      } else {
        if (`${CDate.formatDay()}`.length === 0) {
          CDate = "" as unknown as Dayjs;
        } else {
          setDateStatus(undefined);
        }
        CTime = "" as unknown as Dayjs;
        setTimeStatus("error");
      }
    }
    onChange?.({ date: CDate, time: CTime });
  };
  const handleGetHourDisable = (): number[] => {
    const hours: number[] = [];
    const current = isEdit
      ? editType === 2
        ? new Date(`${startFllowingDate}`).getTime()
        : new Date().getTime()
      : new Date(startDateTime ?? "").getTime();
    for (let i = 0; i < 24; i++) {
      if (
        CDate &&
        current > new Date(`${CDate.formatDay()} ${i}:59`).getTime()
      ) {
        hours.push(i);
      }
    }
    return hours;
  };

  const handleGetMinuteDisable = (currentHour: number): number[] => {
    const minutes: number[] = [];
    const current = isEdit
      ? editType === 2
        ? new Date(`${startFllowingDate}`).getTime()
        : new Date().getTime()
      : new Date(startDateTime ?? "").getTime();
    for (let j = 0; j < 60; j++) {
      if (
        CDate &&
        current > new Date(`${CDate.formatDay()} ${currentHour}:${j}`).getTime()
      ) {
        minutes.push(j);
      }
    }
    return minutes;
  };
  return (
    <span className="datetimepicker-style">
      <Row>
        <Col span={12}>
          <DatePicker
            style={{ width: "98%", marginRight: "4px" }}
            format="DD MMM YYYY"
            className={`full-width border-base ${"datepicker" + dateStatus}`}
            inputReadOnly
            value={value?.date ? dayjs(value?.date) : undefined}
            onChange={(e) => onChangeDate(e, "date")}
            disabled={disabled}
            allowClear={false}
            disabledDate={(current) => {
              return isEdit
                ? editType === 2
                  ? current &&
                    current <
                      dayjs(
                        dayjs(startFllowingDate).format("YYYY-MM-DD 00:00:00")
                      )
                  : current &&
                    current <
                      dayjs(dayjs(new Date()).format("YYYY-MM-DD 00:00:00"))
                : false;
            }}
          />
        </Col>
        <Col span={12} style={{ alignSelf: "flex-start" }}>
          <TimePicker
            style={{ width: "98%", marginLeft: "4px" }}
            format="HH:mm"
            allowClear={false}
            className={`full-width border-base ${"timepicker" + timeStatus}`}
            inputReadOnly
            value={value?.time ? dayjs(value?.time) : undefined}
            onChange={(e) => onChangeDate(e, "time")}
            disabled={disabled}
            // changeOnBlur
            disabledTime={() => ({
              disabledHours() {
                return handleGetHourDisable();
              },
              disabledMinutes(hour) {
                return handleGetMinuteDisable(hour);
              },
            })}
          />
        </Col>
      </Row>
    </span>
  );
};
export default DateAndTime;
