import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  EDeviceOrientation,
  EDeviceType,
  EDeviceOs,
} from "@/common/enum/EDevice";

interface IDevice {
  mobile: () => boolean;
  tablet: () => boolean;
  desktop: () => boolean;
  ios: () => boolean;
  macos: () => boolean;
  ipad: () => boolean;
  iphone: () => boolean;
  ipod: () => boolean;
  android: () => boolean;
  androidPhone: () => boolean;
  androidTablet: () => boolean;
  blackberry: () => boolean;
  blackberryPhone: () => boolean;
  blackberryTablet: () => boolean;
  windows: () => boolean;
  windowsPhone: () => boolean;
  windowsTablet: () => boolean;
  fxos: () => boolean;
  fxosPhone: () => boolean;
  fxosTablet: () => boolean;

  landscape: () => boolean;
  portrait: () => boolean;
}

interface IContext {
  type: EDeviceType;
  orientation: EDeviceOrientation;
  os: EDeviceOs;
  scrollSelectChangeStaticScroll: (isopen?: boolean) => void;
}

interface IProps {
  children?: React.ReactNode;
}

const DeviceContext = createContext<IContext>({
  orientation: EDeviceOrientation.Landscape,
  os: EDeviceOs.Windows,
  type: EDeviceType.Desktop,
  scrollSelectChangeStaticScroll: () => undefined,
});

export const DeviceProvider = (props: IProps) => {
  const [type, setType] = useState<EDeviceType>(EDeviceType.Desktop);
  const [orientation, setOrientation] = useState<EDeviceOrientation>(
    EDeviceOrientation.Landscape
  );
  const [os, setOs] = useState<EDeviceOs>(EDeviceOs.Windows);
  const userAgent = window.navigator.userAgent.toLowerCase();
  let orientationEvent = "resize";
  if (Object.prototype.hasOwnProperty.call(window, "onorientationchange")) {
    orientationEvent = "orientationchange";
  }
  const orientationRef = useRef<EDeviceOrientation>(
    EDeviceOrientation.Landscape
  );

  const includes = useCallback((haystack: string, needle: string) => {
    return haystack.indexOf(needle) !== -1;
  }, []);
  const find = useCallback(
    (needle: string) => {
      return includes(userAgent, needle);
    },
    [userAgent]
  );
  const getDevice = useCallback(() => {
    const device: A = {};
    device.macos = function () {
      return find("mac");
    };
    device.ios = function () {
      return device.iphone() || device.ipod() || device.ipad();
    };
    device.iphone = function () {
      return !device.windows() && find("iphone");
    };
    device.ipod = function () {
      return find("ipod");
    };
    device.ipad = function () {
      const iPadOS13Up =
        navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1;
      return find("ipad") || iPadOS13Up;
    };
    device.android = function () {
      return !device.windows() && find("android");
    };
    device.androidPhone = function () {
      return device.android() && find("mobile");
    };
    device.androidTablet = function () {
      return device.android() && !find("mobile");
    };
    device.blackberry = function () {
      return find("blackberry") || find("bb10");
    };
    device.blackberryPhone = function () {
      return device.blackberry() && !find("tablet");
    };
    device.blackberryTablet = function () {
      return device.blackberry() && find("tablet");
    };
    device.windows = function () {
      return find("windows");
    };
    device.windowsPhone = function () {
      return device.windows() && find("phone");
    };
    device.windowsTablet = function () {
      return device.windows() && find("touch") && !device.windowsPhone();
    };
    device.fxos = function () {
      return (find("(mobile") || find("(tablet")) && find(" rv:");
    };
    device.fxosPhone = function () {
      return device.fxos() && find("mobile");
    };
    device.fxosTablet = function () {
      return device.fxos() && find("tablet");
    };
    device.mobile = function () {
      return (
        device.androidPhone() ||
        device.iphone() ||
        device.ipod() ||
        device.windowsPhone() ||
        device.blackberryPhone() ||
        device.fxosPhone()
      );
    };
    device.tablet = function () {
      return (
        device.ipad() ||
        device.androidTablet() ||
        device.blackberryTablet() ||
        device.windowsTablet() ||
        device.fxosTablet()
      );
    };

    device.desktop = function () {
      return !device.tablet() && !device.mobile();
    };

    device.portrait = function () {
      if (
        device.ios() &&
        Object.prototype.hasOwnProperty.call(window, "orientation")
      ) {
        return Math.abs(window.orientation) !== 90;
      }
      return window.innerHeight / window.innerWidth > 1;
    };

    device.landscape = function () {
      if (
        device.ios() &&
        Object.prototype.hasOwnProperty.call(window, "orientation")
      ) {
        return Math.abs(window.orientation) === 90;
      }
      return window.innerHeight / window.innerWidth < 1;
    };
    return device as IDevice;
  }, [find, includes]);

  const setOrientationCache = () => {
    const device = getDevice();
    let tempValue: EDeviceOrientation;
    if (device?.portrait()) {
      tempValue = EDeviceOrientation.Portrait;
    } else {
      tempValue = EDeviceOrientation.Landscape;
    }
    if (tempValue !== orientationRef.current) {
      orientationRef.current = tempValue;
      setOrientation(tempValue);
    }
  };
  useEffect(() => {
    const device = getDevice();
    let tempType: EDeviceType;
    let tempOs: EDeviceOs;
    if (device?.mobile()) {
      tempType = EDeviceType.Mobile;
    } else if (device?.tablet()) {
      tempType = EDeviceType.Tablet;
    } else {
      tempType = EDeviceType.Desktop;
    }

    if (device?.ios()) {
      tempOs = EDeviceOs.Ios;
    } else if (device?.iphone()) {
      tempOs = EDeviceOs.Iphone;
    } else if (device?.ipad()) {
      tempOs = EDeviceOs.Ipad;
    } else if (device?.ipod()) {
      tempOs = EDeviceOs.Ipod;
    } else if (device?.android()) {
      tempOs = EDeviceOs.Android;
    } else if (device?.blackberry()) {
      tempOs = EDeviceOs.Blackberry;
    } else if (device?.macos()) {
      tempOs = EDeviceOs.Macos;
    } else if (device?.fxos()) {
      tempOs = EDeviceOs.Fxos;
    } else {
      tempOs = EDeviceOs.Windows;
    }

    if (tempType !== type) {
      setType(tempType);
    }
    if (tempOs !== os) {
      setOs(tempOs);
    }

    setOrientationCache();
    window.addEventListener(orientationEvent, setOrientationCache, false);
    return () => {
      window.removeEventListener(orientationEvent, setOrientationCache);
    };
  }, []);

  const scrollSelectChangeStaticScroll = (open?: boolean) => {
    if (type !== EDeviceType.Desktop) {
      if (open) {
        document.body.classList.add("hcis-hidden-y");
      } else {
        document.body.classList.remove("hcis-hidden-y");
      }
    }
  };

  return (
    <DeviceContext.Provider
      value={{
        orientation,
        os,
        type,
        scrollSelectChangeStaticScroll,
      }}
    >
      {props.children}
    </DeviceContext.Provider>
  );
};

export const useDevice = () => useContext(DeviceContext);
