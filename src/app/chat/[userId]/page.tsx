"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Image from "next/image";

const conversations = [
  {
    id: "1",
    name: "Ethan",
    role: "产品经理",
    time: "10:16",
    date: "2025/5/7",
    avatar: "", // 头像URL
    unread: true,
    messages: [
      {
        id: "m1",
        sender: "Ethan",
        avatar: "",
        time: "2025/5/15 10:16",
        content:
          "我相信技术与人文的结合能创造真正的社会价值。齐家项目将AI与家庭心理学完美融合，既有技术创新性，又有明确的社会意义。我希望与志同道合者一起，探索AI向善的边界，并将理论研究落地为能帮助普通家庭的实用工具。",
      },
      {
        id: "m2",
        sender: "AI伦理研究者",
        avatar: "",
        time: "2025/5/14 10:45",
        content:
          "AI伦理研究者，致力于将人工智能与家庭心理学结合，创造有温度的技术，让每个家庭都能获得高质量的心理健康支持。",
      },
    ],
  },
  // 可添加更多会话
];

export default function ChatPage() {
  const { userId } = useParams();
  const [selectedId, setSelectedId] = useState(conversations[0].id);

  const selectedConversation = conversations.find((c) => c.id === selectedId);

  return (
    <div className="h-screen bg-gray-50">
      <Navbar />

      <div className="py-12 max-w-5xl mx-auto ">
        {/* 顶部按钮 */}
        <div className="flex justify-end p-4">
          <button className="px-4 py-2 bg-blue-500 text-white rounded-full">
            + 发起新对话
          </button>
        </div>
        <div className="flex gap-12">
          {/* 左侧会话列表 */}
          <div className="w-80 bg-white flex flex-col rounded-[16px]">
            <div className="flex-1 overflow-y-auto  rounded-[16px]">
              {conversations.map((conv) => (
                <div
                  key={conv.id}
                  className={`flex items-center px-4 py-3 cursor-pointer ${
                    selectedId === conv.id ? "bg-gray-100" : ""
                  }`}
                  onClick={() => setSelectedId(conv.id)}
                >
                  <div className="w-10 h-10 rounded-full bg-gray-200 mr-3" />
                  <div className="flex-1">
                    <div className="font-medium">{conv.name}</div>
                    <div className="text-xs text-gray-400">{conv.role}</div>
                  </div>
                  <div className="text-xs text-gray-400">
                    {conv.time || conv.date}
                  </div>
                  {conv.unread && (
                    <span className="ml-2 w-2 h-2 bg-blue-500 rounded-full" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* 右侧聊天区 */}
          <div className="flex-1 flex flex-col rounded-[16px] bg-white">
            {/* 聊天内容 */}
            <div className="flex-1 overflow-y-auto p-8 rounded-[16px]">
              {selectedConversation?.messages.map((msg) => (
                <div key={msg.id} className="mb-8 flex">
                  <div className="w-12 h-12 rounded-full bg-gray-200 mr-4" />
                  <div>
                    <div className="flex items-center mb-1">
                      <span className="font-medium">{msg.sender}</span>
                      <span className="ml-2 text-xs text-gray-400">
                        {msg.time}
                      </span>
                    </div>
                    <div className="bg-gray-100 rounded-lg p-4 text-gray-700 max-w-xl">
                      {msg.content}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* 输入框 */}
            <div className="p-4 bg-white flex items-center rounded-[16px] pb-4">
              <input
                className="flex-1 border border-gray-100 rounded-full px-4 py-2 mr-4 placeholder:text-sm bg-gray-100"
                placeholder="请输入…"
              />
              <button className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white cursor-pointer">
                <Image src="/send.svg" alt="send" width={20} height={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
