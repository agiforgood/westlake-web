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
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { isAuthenticated, getAccessToken } = useLogto();

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (isAuthenticated) {
      if (isAuthenticated) {
        getAccessToken("https://api.westlakeaiforgood.com").then((token) => {
          localStorage.setItem("accessToken", token ?? "");

          getMyProfile(token ?? "")
            .then((data) => {
              localStorage.setItem("userId", data.profile?.userId || "");
              setProfile(data);
              setLoading(false);
            })
            .catch((ex) => {
              console.error("loading profile failed", ex);
            });
        });
      }
    }
  }, [isAuthenticated, router]);

  return (
    <ProfileContext.Provider value={{ profile, setProfile, loading, error }}>
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
