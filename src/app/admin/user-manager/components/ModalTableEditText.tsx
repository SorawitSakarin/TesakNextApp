import { UserDataType } from "@/app/admin/type";
import React from "react";

interface ModalTableEditProps {
  topicName: string;
  name: string;
  value: string | undefined;
  placeholder?: string | undefined;
  type?: string | undefined;
  setCurUser: React.Dispatch<React.SetStateAction<UserDataType | null>>;
  required?: boolean | undefined;
}
const ModalTableEditText = ({
  topicName,
  name,
  value,
  placeholder,
  type,
  required,
  setCurUser,
}: ModalTableEditProps) => {
  const handleInputChange = (e: any) => {
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
          type={type ? type : "text"}
          name={name}
          placeholder={placeholder ? placeholder : "Type here"}
          className="input w-full max-w-xs"
          onChange={handleInputChange}
          value={value}
          required={required}
        />
      </td>
    </tr>
  );
};

export default ModalTableEditText;
