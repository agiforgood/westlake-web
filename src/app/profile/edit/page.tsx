"use client";
import { useEffect, useState } from "react";
import { Card, Divider } from "@heroui/react";
import ProfileForm from "@/components/Profile/ProfileForm";
import ProfileAnchor from "@/components/Profile/ProfileAnchor";
export default function ProfileEditPage() {
  return (
    <div className="flex flex-col items-center bg-gray-50 min-h-screen py-8 px-2 sm:px-0">
      <Card className="w-full max-w-3xl bg-white shadow-lg rounded-3xl mb-10 px-2 sm:px-6 py-6">
        <h1 className="">志愿者说明书</h1>
        <Divider className="bg-primary/50 my-7" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <p className="col-span-2 text-sm leading-7 text-gray-500">
            欢迎加入智能向善社会创新网络！本说明书旨在帮助志同道合的志愿者相互发现和连接，记录您的专业贡献，并让您的价值被看见和激励。通过完善您的信息，您将更容易找到合适的协作伙伴和任务，实现知识的自由流动与认知盈余的有效激活。
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 mt-16">
          <div className="hidden sm:block col-span-3">
            <ProfileAnchor />
          </div>
          <div className="col-span-9">
            <ProfileForm />
          </div>
        </div>
      </Card>
    </div>
  );
}
