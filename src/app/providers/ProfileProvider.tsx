"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

import { useLogto } from "@logto/react";
import { useRouter } from "next/navigation";

import { getMyProfile } from "@/lib/userProfileApi";

import { UserProfile } from "@/type";

interface ProfileContextType {
  profile: UserProfile | null;
  setProfile: (profile: UserProfile | null) => void;
  loading: boolean;
  error: Error | null;
  updateProfile: () => Promise<void>;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { isAuthenticated, getAccessToken } = useLogto();

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const updateProfile = async () => {
    try {
      setLoading(true);
      const token = await getAccessToken("https://api.westlakeaiforgood.com");
      localStorage.setItem("accessToken", token ?? "");

      const data = await getMyProfile(token ?? "");
      localStorage.setItem("userId", data.profile?.userId || "");
      setProfile(data);
      setError(null);
    } catch (ex) {
      console.error("updating profile failed", ex);
      setError(ex as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      updateProfile();
    }
  }, [isAuthenticated, router]);

  return (
    <ProfileContext.Provider
      value={{ profile, setProfile, loading, error, updateProfile }}
    >
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
}
