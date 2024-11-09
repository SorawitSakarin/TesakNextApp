import React from "react";
import { UserDataType } from "@/app/admin/type";
import VerifiedCard from "@/app/admin/components/adminManager/VerifiedCard";
import PreverifiedCard from "@/app/admin/components/adminManager/PreverifiedCard";

interface UserManagerProps {
  users: UserDataType[] | null;
  lines: Record<"topic" | "message" | "description", string>[];
  refreshData: () => void;
}

const UserManager: React.FC<UserManagerProps> = ({ users, lines, refreshData }) => {
  return (
    <div id="user" className="flex flex-col gap-4">
      <h1 className="text-3xl">User Manager (จัดการผู้ใช้งาน)</h1>
      <div role="tablist" className="tabs tabs-boxed tabs-lg">
        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab text-sm whitespace-nowrap mx-1"
          aria-label="ผู้สมัครใหม่ยังไม่ยืนยัน"
          defaultChecked
        />
        <div
          role="tabpanel"
          className="tab-content bg-base-100 border-base-300 rounded-box p-6"
        >
          <h3 className="text-xl mb-4">
            ผู้ใช้ที่ลงทะเบียนแล้ว แต่ยังไม่ได้ตรวจสอบ จำนวน{" "}
            {users
              ?.filter((user: UserDataType) => user.userTier == "preVerified")
              .length.toString()}{" "}
            คน
          </h3>
          {users &&
            users.map((user: UserDataType, index: number) => {
              if (user.userTier == "preVerified") {
                return (
                  <PreverifiedCard
                    user={user}
                    key={index}
                    index={index}
                    lines={lines}
                  />
                );
              }
            })}
        </div>

        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab text-sm whitespace-nowrap mx-1"
          aria-label="เกษตรกร 1 ปี"
        />
        <div
          role="tabpanel"
          className="tab-content bg-base-100 border-base-300 rounded-box p-6"
        >
          <h3 className="text-xl mb-4">
            เกษตรกร 1 ปี จำนวน{" "}
            {users
              ?.filter((user: UserDataType) => user.userTier == "farmerOneYear")
              .length.toString()}{" "}
            คน
          </h3>
          <div className="overflow-x-auto">
            {users && <VerifiedCard users={users} userTier="farmerOneYear" refreshData={refreshData} />}
          </div>
        </div>

        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab text-sm whitespace-nowrap mx-1"
          aria-label="เกษตรกร 3 ปี"
        />
        <div
          role="tabpanel"
          className="tab-content bg-base-100 border-base-300 rounded-box p-6"
        >
          <h3 className="text-xl mb-4">
            เกษตรกร 3 ปี จำนวน{" "}
            {users
              ?.filter(
                (user: UserDataType) => user.userTier == "farmerThreeYear"
              )
              .length.toString()}{" "}
            คน
          </h3>
          {users && <VerifiedCard users={users} userTier="farmerThreeYear" refreshData={refreshData} />}
        </div>

        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab text-sm whitespace-nowrap mx-1"
          aria-label="เกษตรกร 10 ปี"
        />
        <div
          role="tabpanel"
          className="tab-content bg-base-100 border-base-300 rounded-box p-6"
        >
          <h3 className="text-xl mb-4">
            เกษตรกร 10 ปี จำนวน{" "}
            {users
              ?.filter((user: UserDataType) => user.userTier == "farmerTenYear")
              .length.toString()}{" "}
            คน
          </h3>
          {users && <VerifiedCard users={users} userTier="farmerTenYear" refreshData={refreshData} />}
        </div>

        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab text-sm whitespace-nowrap mx-1"
          aria-label="เกษตรกร 100 ปี"
        />
        <div
          role="tabpanel"
          className="tab-content bg-base-100 border-base-300 rounded-box p-6"
        >
          <h3 className="text-xl mb-4">
            เกษตรกร 100 ปี จำนวน{" "}
            {users
              ?.filter(
                (user: UserDataType) => user.userTier == "farmerHundredYear"
              )
              .length.toString()}{" "}
            คน
          </h3>
          {users && <VerifiedCard users={users} userTier="farmerHundredYear" refreshData={refreshData} />}
        </div>
      </div>
    </div>
  );
};

export default UserManager;
