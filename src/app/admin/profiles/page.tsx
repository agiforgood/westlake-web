"use client";

import Footer from "@/components/Footer";
import {
  Table,
  TableBody,
  TableHeader,
  TableRow,
  TableCell,
  TableColumn,
  getKeyValue,
  Button,
  addToast,
} from "@heroui/react";
import { useState, useEffect } from "react";
import {
  adminAuditProfile,
  adminGetWaitingProfiles,
} from "@/lib/userProfileApi";

interface Profile {
  userId: string;
  newSnapshot?: object;
}

const columns = [
  {
    key: "userId",
    label: "userId",
  },
  {
    key: "handle",
    label: "handle",
  },
  {
    key: "avatarUrl",
    label: "avatarUrl",
  },
  {
    key: "bannerUrl",
    label: "bannerUrl",
  },
  {
    key: "statusMessage",
    label: "statusMessage",
  },
  {
    key: "expertiseSummary",
    label: "expertiseSummary",
  },
  {
    key: "bio",
    label: "bio",
  },
  {
    key: "backgroundDescription",
    label: "backgroundDescription",
  },
  {
    key: "motivation",
    label: "motivation",
  },
  {
    key: "expectations",
    label: "expectations",
  },
  {
    key: "canOffer",
    label: "canOffer",
  },
  {
    key: "wechat",
    label: "wechat",
  },
  {
    key: "locationVisibility",
    label: "locationVisibility",
  },
  {
    key: "province",
    label: "province",
  },
  {
    key: "city",
    label: "city",
  },
  {
    key: "district",
    label: "district",
  },
  {
    key: "action",
    label: "action",
  },
];

export default function AdminProfilesPage() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [token, setToken] = useState("");
  // const [rows, setRows] = useState<Profile[]>([]);
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken") ?? "";
    setToken(accessToken);
    adminGetWaitingProfiles(accessToken).then((data) => {
      setProfiles(data.profiles);
    });
  }, []);

  if (!profiles)
    return (
      <div className="flex flex-col min-h-screen">
        <div className="flex-grow text-center mt-10">未找到用户信息</div>
        <Footer />
      </div>
    );

  const handleAuditProfile = async (userId: string, isApproved: boolean) => {
    const response = await adminAuditProfile(userId, isApproved, token);
    if (response) {
      addToast({
        title: "审核成功",
        description: "用户信息审核成功",
        color: "success",
      });
      setProfiles(profiles.filter((profile) => profile.userId !== userId));
    } else {
      addToast({
        title: "审核失败",
        description: "用户信息审核失败",
        color: "danger",
      });
    }
  };

  const getValue = (profile: Profile, columnKey: string) => {
    if (columnKey == "userId") {
      return profile.userId;
    }
    if (columnKey == "action") {
      return (
        <>
          <Button
            onPress={() => {
              handleAuditProfile(profile.userId, true);
            }}
          >
            通过
          </Button>
          <Button
            onPress={() => {
              handleAuditProfile(profile.userId, false);
            }}
          >
            拒绝
          </Button>
        </>
      );
    }
    const newSnapshot = profile.newSnapshot as object;
    return getKeyValue(newSnapshot, columnKey);
  };

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <Table>
            <TableHeader columns={columns}>
              {(column) => (
                <TableColumn key={column.key}>{column.label}</TableColumn>
              )}
            </TableHeader>
            <TableBody>
              {profiles.map((profile) => (
                <TableRow key={profile.userId}>
                  {(columnKey) => (
                    <TableCell>
                      {getValue(profile, columnKey as string)}
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <Footer />
      </div>
    </>
  );
}
