"use client";
import React, { useEffect, useState } from "react";

interface Address {
  full_address: string;
  // Thêm các thuộc tính khác nếu cần
}

const Booking = () => {
  const [sourch, setSourch] = useState<string>("");
  const [addressList, setAddressList] = useState<Address[]>([]);

  const getAddress = async () => {
    if (!sourch) return;

    try {
      const res = await fetch(`/api/search-address?q=${sourch}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const result = await res.json();
      setAddressList(result.data.suggestions || []);
    } catch (error) {
      console.log("Error fetching address:", error);
    }
  };

  useEffect(() => {
    getAddress();
  }, [sourch]);

  return (
    <div>
      <input
        type="text"
        className="border-[1px] w-full"
        value={sourch}
        onChange={(e) => setSourch(e.target.value)}
      />
      {addressList.map((item, index) => (
        <div key={index}>{item.full_address}</div>
      ))}
      <div>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti
        culpa, a ipsa quaerat officia voluptatibus magni eaque, facilis earum
        minus in aperiam harum repellendus eum! Earum natus consequatur iusto
        nostrum!
      </div>
    </div>
  );
};

export default Booking;
