import { UserDataType } from "@/app/admin/type";
import React from "react";

interface ModalTableDatePickerProps {
  topicName: string;
  name: string;
  value: string | undefined;
  setCurUser: React.Dispatch<React.SetStateAction<UserDataType | null>>;
}

const ModalTableDatePicker = ({
  topicName,
  name,
  value,
  setCurUser,
}: ModalTableDatePickerProps) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurUser((prev) => {
      if (prev) {
        return {
          ...prev,
          [name]: value,
        };
      } else {
        return prev;
      }
    });
  };

  return (
    <tr>
      <td className="text-base">
        <div className="flex flex-col gap-1">
          <p className="font-semibold uppercase">{topicName}:</p>
        </div>
      </td>
      <td>
        <input
          type="date" // Changed input type to "date"
          name={name}
          placeholder="Select date"
          className="input w-full max-w-xs"
          onChange={handleInputChange}
          value={value}
        />
      </td>
    </tr>
  );
};

export default ModalTableDatePicker;
