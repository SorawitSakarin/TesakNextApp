import { UserDataType } from "@/app/admin/type";
import React from "react";

interface ModalTableEditProps {
  topicName: string;
  name: string;
  value: string | undefined;
  options: { value: string | undefined; text: string | undefined }[];
  setCurUser: React.Dispatch<React.SetStateAction<UserDataType | null>>;
  required?: boolean | undefined;
}

const ModalTableEditSelect = ({
  topicName,
  name,
  value,
  options,
  setCurUser,
  required = false,
}: ModalTableEditProps) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
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
        <select
          name={name}
          className="select w-full max-w-xs"
          onChange={handleInputChange}
          value={value}
          required={required}
        >
          {options.map((option) => (
            <option value={option.value} key={option.value}>
              {option.text}
            </option>
          ))}
        </select>
      </td>
    </tr>
  );
};

export default ModalTableEditSelect;
