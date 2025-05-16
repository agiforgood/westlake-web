import { useState, useEffect } from "react";

import { Checkbox, addToast } from "@heroui/react";
import { useLogto } from "@logto/react";
import { UserProfile } from "@/type";

import { useProfile } from "@/app/providers/ProfileProvider";
import {
  deleteMyAvailability,
  updateMyAvailability,
} from "@/lib/userProfileApi";

export default function AgWeekCheckBox({ profile }: { profile: UserProfile }) {
  const { updateProfile } = useProfile();

  const { isAuthenticated } = useLogto();

  const [token, setToken] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      const accessToken = localStorage.getItem("accessToken") ?? "";
      setToken(accessToken);
    }
  }, [isAuthenticated]);

  const getWeekdayText = (weekday: number) => {
    return ["周日", "周一", "周二", "周三", "周四", "周五", "周六"][weekday];
  };

  const getTimeSlotText = (timeSlot: number) => {
    return ["上午", "下午", "晚上"][timeSlot];
  };

  const handleAvailabilityChange = async (
    weekday: number,
    timeSlot: number,
    isSelected: boolean
  ) => {
    if (isSelected) {
      const response = await updateMyAvailability(
        {
          timeSlots: [
            {
              weekDay: weekday,
              timeSlot: timeSlot,
            },
          ],
        },
        token
      );
      if (response) {
        // updateProfile();
        addToast({
          title: "保存成功",
          description: "可参与时间已更新",
          color: "success",
        });
      } else {
        addToast({
          title: "保存失败",
          description: response.message,
          color: "danger",
        });
      }
    } else {
      const response = await deleteMyAvailability(weekday, timeSlot, token);
      if (response) {
        addToast({
          title: "保存成功",
          description: "可参与时间已更新",
          color: "success",
        });
      } else {
        addToast({
          title: "保存失败",
          description: response.message,
          color: "danger",
        });
      }
    }
  };
  return (
    <div className="w-full">
      <div className="text-sm mb-2">可参与时间</div>
      <div className="grid grid-cols-2 w-full gap-4">
        {Array.from({ length: 7 }, (_, i) => (
          <div key={i} className="flex flex-row gap-6">
            <p>{getWeekdayText(i)}</p>
            <div className="flex flex-row gap-2">
              {Array.from({ length: 3 }, (_, j) => (
                <Checkbox
                  key={j}
                  defaultSelected={profile.availability.some(
                    (availability) =>
                      availability.weekDay === i && availability.timeSlot === j
                  )}
                  onValueChange={(isSelected) => {
                    handleAvailabilityChange(i, j, isSelected);
                  }}
                >
                  {getTimeSlotText(j)}
                </Checkbox>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
