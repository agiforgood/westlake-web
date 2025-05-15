"use client";

import { useParams } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import { getChatSessions, getMessages, sendMessage } from "@/lib/chatApi";
import { useLogto } from "@logto/react";
import Link from "next/link";
import { getMyProfile } from "@/lib/userProfileApi";
import { Textarea } from "@heroui/react";
import { formatChatTime } from "@/utils";

interface ChatSession {
  id: string;
  name: string;
  role?: string;
  lastMessage?: string;
  timestamp?: string;
  unread?: boolean;
  updated_at: string;
  sender_id: string;
  receiver_id: string;
  created_at: string;
}

interface Message {
  id: string;
  sender: string;
  content: string;
  createdAt: string;
  receiver_id: string;
  senderId: string;
  updatedAt: string;
}

export default function ChatPage() {
  const { receiverId } = useParams();
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const { isAuthenticated } = useLogto();
  const [profile, setProfile] = useState<any>(null);
  const [token, setToken] = useState(""); // 从你的认证系统获取token
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isAuthenticated) {
      const accessToken = localStorage.getItem("accessToken") ?? "";
      setToken(accessToken);
      getMyProfile(accessToken ?? "").then((data) => {
        setProfile(data.profile);
      });
    }
  }, [isAuthenticated]);

  const loadSessions = async (token: string) => {
    try {
      const { sessions } = await getChatSessions(token);
      //按updated_at排序，最新的在最前面
      setSessions(
        sessions?.sort(
          (a: ChatSession, b: ChatSession) =>
            new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
        ) || []
      );
      setSelectedId(receiverId as string);
    } catch (error) {
      console.error("Failed to load chat sessions:", error);
    }
  };

  // 加载聊天会话列表
  useEffect(() => {
    if (token) {
      loadSessions(token);
    }
  }, [token, receiverId]);

  const loadMessages = async (selectedId: string, token: string) => {
    if (selectedId && token) {
      try {
        const { messages } = await getMessages(token, selectedId);
        setMessages(messages?.reverse() || []);
      } catch (error) {
        console.error("Failed to load messages:", error);
      }
    }
  };

  // 加载选中会话的消息
  useEffect(() => {
    loadMessages(selectedId as string, token);
  }, [selectedId, token]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 发送消息
  const handleSendMessage = async () => {
    if (!selectedId || !newMessage.trim()) return;

    try {
      await sendMessage(token, selectedId, newMessage);
      setNewMessage("");
      await getMessages(token, selectedId);
      loadMessages(selectedId as string, token);
      loadSessions(token);
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div className="h-screen bg-gray-50">
      <Navbar />

      <div className="py-12 max-w-5xl mx-auto">
        {/* 顶部按钮 */}
        <div className="flex justify-end p-4">
          <Link href="/network">
            <button className="px-4 py-2 bg-blue-500 text-white rounded-full">
              + 发起新对话
            </button>
          </Link>
        </div>
        <div className="flex gap-12">
          {/* 左侧会话列表 */}
          <div className="w-80 bg-white flex flex-col rounded-[16px]">
            <div className="flex-1 overflow-y-auto rounded-[16px] max-h-[450px]">
              {sessions?.map((session) => (
                <div
                  key={session.id}
                  className={`flex items-center px-4 py-3 cursor-pointer ${
                    selectedId === session.receiver_id ? "bg-gray-100" : ""
                  }`}
                  onClick={() => {
                    setSelectedId(session.receiver_id);
                    window.history.pushState(
                      {},
                      "",
                      `/chat/${session.receiver_id}`
                    );
                  }}
                >
                  <div className="w-10 h-10 rounded-full bg-gray-200 mr-3" />
                  <div className="flex-1">
                    <div className="font-medium">{session.name}</div>
                    <div className="text-xs text-gray-400">{session.role}</div>
                  </div>
                  <div className="text-xs text-gray-400">
                    {formatChatTime(session.updated_at || "")}
                  </div>
                  {session.updated_at !== session.created_at && (
                    <span className="ml-2 w-2 h-2 bg-blue-500 rounded-full" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* 右侧聊天区 */}
          <div className="flex-1 flex flex-col rounded-[16px] bg-white">
            {/* 聊天内容 */}
            <div className="flex-1 overflow-y-auto p-8 rounded-[16px] max-h-[450px] ">
              {messages.map((msg) => {
                const currentUserId = profile?.userId;
                const isMe = msg.senderId === currentUserId;
                return (
                  <div
                    key={msg.id}
                    className={`mb-8 flex ${
                      isMe ? "justify-end" : "justify-start"
                    }`}
                  >
                    {!isMe && (
                      <div className="w-12 h-12 rounded-full bg-gray-200 mr-4" />
                    )}
                    <div>
                      <div
                        className={`flex items-center mb-1 ${
                          isMe ? "justify-end" : ""
                        }`}
                      >
                        {!isMe && (
                          <span className="font-medium">{msg.sender}</span>
                        )}
                        <span className={`ml-2 text-xs text-gray-400`}>
                          {formatChatTime(msg.updatedAt)}
                        </span>
                      </div>
                      <div
                        className={`rounded-lg p-4 max-w-xl ${
                          isMe
                            ? "bg-blue-100 text-right text-blue-900 break-all"
                            : "bg-gray-100 text-gray-700 break-all"
                        }`}
                      >
                        {msg.content}
                      </div>
                    </div>
                    {isMe && (
                      <div className="w-12 h-12 rounded-full bg-gray-200 ml-4 flex items-center justify-center">
                        Me
                      </div>
                    )}
                  </div>
                );
              })}
              {/* 滚动锚点 */}
              <div ref={messagesEndRef} />
            </div>
            {/* 输入框 */}
            <div className="p-4 bg-white flex items-center rounded-[16px] pb-4">
              <Textarea
                className="flex-1 rounded-[24px] px-4 py-2 placeholder:text-sm"
                placeholder="请输入…"
                maxRows={2}
                variant="faded"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              />
              <button
                className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white cursor-pointer"
                onClick={handleSendMessage}
              >
                <Image src="/send.svg" alt="send" width={20} height={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
