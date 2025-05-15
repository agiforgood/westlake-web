"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import Image from "next/image";
import { getChatSessions, getMessages, sendMessage } from "@/lib/chatApi";
import { useLogto } from "@logto/react";
import Link from "next/link";
import { getMyProfile, getAllProfiles } from "@/lib/userProfileApi";
import { Spinner, Textarea } from "@heroui/react";
import { formatChatTime } from "@/utils";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  useDisclosure,
} from "@heroui/react";
import Avatar from "boring-avatars";
import { useSearchParams } from "next/navigation";
import Footer from "@/components/Footer";

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

function ChatPageContent() {
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");

  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const { isAuthenticated } = useLogto();
  const [token, setToken] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isMobile, setIsMobile] = useState(false);
  const MAX_MESSAGE_LENGTH = 1000;
  const [userProfiles, setUserProfiles] = useState([]);
  const [isSending, setIsSending] = useState(false);
  const [loggedInUserId, setLoggedInUserId] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loggedInUserId = localStorage.getItem("userId");
    if (loggedInUserId) {
      setLoggedInUserId(loggedInUserId);
    }
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      const accessToken = localStorage.getItem("accessToken") ?? "";
      setToken(accessToken);
      getAllProfiles(accessToken).then((data) => {
        setUserProfiles(data.profiles || []);
        setLoading(false);
      });
    }
  }, [isAuthenticated]);

  const loadSessions = async (token: string) => {
    try {
      const { sessions } = await getChatSessions(token);
      //按updated_at排序，最新的在最前面
      const newSessions =
        sessions?.sort(
          (a: ChatSession, b: ChatSession) =>
            new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
        ) || [];

      //如果newSessions中receiver_id和sender_id没有userId，则将userId添加到newSessions中。放在最前面
      if (
        newSessions.filter(
          (session: ChatSession) =>
            session.receiver_id !== userId || session.sender_id !== userId
        ).length === 0
      ) {
        const userProfile = userProfiles.find(
          (profile: any) => profile?.profile?.userId === userId
        );
        newSessions.unshift({
          id: userId as string,
          //@ts-ignore
          name: userProfile?.profile?.name || "",
          updated_at: new Date().toISOString(),
          created_at: new Date().toISOString(),
          sender_id: loggedInUserId as string,
          receiver_id: userId as string,
        });
      }

      setSessions(newSessions);

      setSelectedId(userId as string);
    } catch (error) {
      console.error("Failed to load chat sessions:", error);
    }
  };

  // 加载聊天会话列表
  useEffect(() => {
    if (token) {
      loadSessions(token);
    }
  }, [token, userId]);

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
    if (
      !selectedId ||
      !newMessage.trim() ||
      newMessage.length > MAX_MESSAGE_LENGTH
    )
      return;
    setIsSending(true);

    try {
      await sendMessage(token, selectedId, newMessage);
      setNewMessage("");
      await getMessages(token, selectedId);
      loadMessages(selectedId as string, token);
      loadSessions(token);
    } catch (error) {
      console.error("Failed to send message:", error);
    } finally {
      setIsSending(false);
    }
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= MAX_MESSAGE_LENGTH) {
      setNewMessage(value);
    }
  };

  // 获取用户信息的辅助函数
  const getUserProfile = (userId: string): any => {
    const profile = userProfiles.find(
      (profile: any) => profile?.profile?.userId === userId
    );
    //@ts-ignore
    return profile?.profile || {};
  };

  if (loading)
    return (
      <div className="flex flex-col min-h-screen">
        <div className="flex-grow text-center mt-10">
          <Spinner label="加载中..." />
        </div>
        <Footer />
      </div>
    );

  return (
    <div className="h-screen bg-gray-50">
      <div className="py-12 max-w-5xl mx-auto px-4">
        {/* 顶部按钮 */}
        <div className="flex justify-between items-center p-4">
          {isMobile ? (
            <button
              onClick={onOpen}
              className="p-2 rounded-full hover:bg-gray-100"
              aria-label="打开聊天列表"
            >
              Chat list
            </button>
          ) : (
            <div></div>
          )}
          <Link href="/network">
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-full"
              aria-label="发起新对话"
            >
              + 发起新对话
            </button>
          </Link>
        </div>

        <div className="flex gap-6">
          {/* 左侧会话列表 - 桌面端 */}
          {!isMobile && (
            <div className="w-80 bg-white flex flex-col rounded-[16px]">
              <div className="flex-1 overflow-y-auto rounded-[16px] max-h-[450px] min-h-[450px]">
                {sessions
                  ?.filter(
                    (session) => session.receiver_id !== session?.sender_id
                  )
                  ?.filter((session) => !!session.receiver_id)
                  //不能出现重复的receiver_id
                  .filter(
                    (session, index, self) =>
                      index ===
                      self.findIndex(
                        (t) => t.receiver_id === session.receiver_id
                      )
                  )
                  .map((session) => {
                    const targetId =
                      session.receiver_id === loggedInUserId
                        ? session.sender_id
                        : session.receiver_id;

                    const userProfile = getUserProfile(targetId);

                    return (
                      <div
                        key={session.id}
                        className={`flex items-center px-4 py-3 cursor-pointer ${
                          selectedId === targetId ? "bg-gray-100" : ""
                        }`}
                        onClick={() => {
                          setSelectedId(targetId);
                          window.history.pushState(
                            {},
                            "",
                            `/chat?userId=${targetId}`
                          );
                        }}
                      >
                        <div className="mr-3 overflow-hidden">
                          {userProfile?.avatar ? (
                            <Image
                              src={userProfile.avatar}
                              alt={userProfile.name}
                              width={40}
                              height={40}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Avatar
                                className="w-8 h-8"
                                name={userProfile?.userId ?? ""}
                                variant="beam"
                              />
                            </div>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium">
                            {userProfile?.name ||
                              session.name ||
                              userProfile?.userId}
                          </div>
                          <div className="text-xs text-gray-400">
                            {userProfile?.role || session.role}
                          </div>
                        </div>
                        <div className="text-xs text-gray-400">
                          {formatChatTime(
                            session.updated_at
                              .replace(" ", "T")
                              .replace(/(\.\d{3})\d{3}$/, "$1") + "Z"
                          )}
                        </div>
                        {session.updated_at === session.created_at &&
                          loggedInUserId !== session.sender_id && (
                            <span className="ml-2 w-2 h-2 bg-blue-500 rounded-full" />
                          )}
                      </div>
                    );
                  })}
              </div>
            </div>
          )}

          {/* 右侧聊天区 */}
          <div className="flex-1 flex flex-col rounded-[16px] bg-white">
            {/* 聊天内容 */}
            <div className="flex-1 overflow-y-auto p-4 md:p-8 rounded-[16px] max-h-[450px] min-h-[450px]">
              {!selectedId ? (
                <div className="flex items-center justify-center h-full text-gray-400 text-sm">
                  您尚未选择联系人
                </div>
              ) : (
                <>
                  {messages.map((msg) => {
                    const isMe = msg.senderId === loggedInUserId;
                    const senderProfile = getUserProfile(msg.senderId);

                    return (
                      <div
                        key={msg.id}
                        className={`mb-8 flex ${
                          isMe ? "justify-end" : "justify-start"
                        }`}
                      >
                        {!isMe && (
                          <div className="mr-2 md:mr-4 overflow-hidden">
                            {senderProfile?.avatar ? (
                              <Image
                                src={senderProfile.avatar}
                                alt={senderProfile.name}
                                width={48}
                                height={48}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-start justify-center">
                                <Avatar
                                  className="w-8 h-8"
                                  name={senderProfile?.userId ?? ""}
                                  variant="beam"
                                />
                              </div>
                            )}
                          </div>
                        )}
                        <div>
                          <div
                            className={`flex items-center mb-1 ${
                              isMe ? "justify-end" : ""
                            }`}
                          >
                            {!isMe && (
                              <span className="font-medium">
                                {senderProfile?.name ||
                                  msg.sender ||
                                  senderProfile?.userId}
                              </span>
                            )}
                            <span className={`ml-2 text-xs text-gray-400`}>
                              {formatChatTime(msg.updatedAt)}
                            </span>
                          </div>
                          <div
                            className={`rounded-lg p-3 md:p-4 ${
                              isMe
                                ? "bg-blue-100 text-right text-blue-900 break-all"
                                : "bg-gray-100 text-gray-700 break-all"
                            }`}
                          >
                            {msg.content}
                          </div>
                        </div>
                        {isMe && (
                          <div className="mr-2 md:mr-4 overflow-hidden ml-2">
                            {senderProfile?.avatar ? (
                              <Image
                                src={senderProfile.avatar}
                                alt={senderProfile.name}
                                width={48}
                                height={48}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <Avatar
                                  className="w-8 h-8"
                                  name={senderProfile?.userId ?? ""}
                                  variant="beam"
                                />
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* 输入框 */}
            <div className="p-4 bg-white flex flex-col rounded-[16px] pb-4">
              <div className="flex items-center w-full">
                <Textarea
                  className="flex-1 rounded-[24px] px-4 py-2 placeholder:text-sm"
                  placeholder="请输入…"
                  maxRows={2}
                  variant="faded"
                  value={newMessage}
                  onChange={handleMessageChange}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  disabled={isSending}
                  aria-label="消息输入框"
                />
                <button
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-white cursor-pointer ml-2 ${
                    newMessage.length > MAX_MESSAGE_LENGTH
                      ? "bg-gray-400"
                      : "bg-blue-500"
                  }`}
                  onClick={handleSendMessage}
                  disabled={newMessage.length > MAX_MESSAGE_LENGTH || isSending}
                  aria-label="发送消息"
                >
                  {isSending ? (
                    <Spinner size="sm" />
                  ) : (
                    <Image src="/send.svg" alt="send" width={20} height={20} />
                  )}
                </button>
              </div>
              <div className="text-xs text-gray-400 mt-1 pl-4">
                {newMessage.length}/{MAX_MESSAGE_LENGTH}
              </div>
            </div>
          </div>
        </div>

        {/* 移动端抽屉 */}
        <Drawer isOpen={isOpen} onOpenChange={onOpenChange} placement="left">
          <DrawerContent>
            {(onClose) => (
              <>
                <DrawerHeader className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold">会话列表</h2>
                </DrawerHeader>
                <DrawerBody>
                  <div className="overflow-y-auto">
                    {sessions
                      ?.filter(
                        (session) => session.receiver_id !== session?.sender_id
                      )
                      ?.filter((session) => !!session.receiver_id)
                      //不能出现重复的receiver_id
                      .filter(
                        (session, index, self) =>
                          index ===
                          self.findIndex(
                            (t) => t.receiver_id === session.receiver_id
                          )
                      )
                      .map((session) => {
                        const targetId =
                          session.receiver_id === loggedInUserId
                            ? session.sender_id
                            : session.receiver_id;
                        const userProfile = getUserProfile(targetId);
                        return (
                          <div
                            key={session.id}
                            className={`flex items-center px-4 py-3 cursor-pointer ${
                              selectedId === session.receiver_id
                                ? "bg-gray-100"
                                : ""
                            }`}
                            onClick={() => {
                              setSelectedId(targetId);
                              window.history.pushState(
                                {},
                                "",
                                `/chat?chatId=${targetId}`
                              );
                            }}
                          >
                            <div className="mr-3 overflow-hidden">
                              {userProfile?.avatar ? (
                                <Image
                                  src={userProfile.avatar}
                                  alt={userProfile.name}
                                  width={40}
                                  height={40}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                  <Avatar
                                    className="w-8 h-8"
                                    name={userProfile?.userId ?? ""}
                                    variant="beam"
                                  />
                                </div>
                              )}
                            </div>
                            <div className="flex-1">
                              <div className="font-medium">
                                {userProfile?.name ||
                                  session.name ||
                                  userProfile?.userId}
                              </div>
                              <div className="text-xs text-gray-400">
                                {userProfile?.role || session.role}
                              </div>
                            </div>
                            <div className="text-xs text-gray-400">
                              {formatChatTime(
                                session.updated_at
                                  .replace(" ", "T")
                                  .replace(/(\.\d{3})\d{3}$/, "$1") + "Z"
                              )}
                            </div>
                            {session.updated_at === session.created_at &&
                              loggedInUserId !== session.sender_id && (
                                <span className="ml-2 w-2 h-2 bg-blue-500 rounded-full" />
                              )}
                          </div>
                        );
                      })}
                  </div>
                </DrawerBody>
              </>
            )}
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
}

export default function ChatPage() {
  return (
    <Suspense
      fallback={
        <div className="flex flex-col min-h-screen">
          <div className="flex-grow text-center mt-10">
            <Spinner label="加载中..." />
          </div>
          <Footer />
        </div>
      }
    >
      <ChatPageContent />
    </Suspense>
  );
}
