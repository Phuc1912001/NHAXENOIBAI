import { createContext } from "react";

interface OriginContextType {
  origin: A;
  setOrigin: (value: A) => void;
  destination: A;
  setDestination: (value: A) => void;
  distance: A;
  setDistance: (value: A) => void;
  duration: A;
  setDuration: (value: A) => void;
  activeTab: A;
  setActiveTab: (value: A) => void;
}

// Create the context with a default value
export const OriginContext = createContext<OriginContextType>({
  origin: null,
  setOrigin: () => {},
  destination: null,
  setDestination: () => {},
  distance: null,
  setDistance: () => {},
  duration: null,
  setDuration: () => {},
  activeTab: 1,
  setActiveTab: () => {},
});
