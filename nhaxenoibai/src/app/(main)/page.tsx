import { Button, Popover } from "antd";
import Booking from "./components/Booking/Booking";

export default function Home() {
  const text = <span>Title</span>;

  const content = (
    <div>
      <p>Content</p>
      <p>Content</p>
    </div>
  );
  return (
    <div>
      <Booking />
    </div>
  );
}
