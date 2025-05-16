"use client";

import { useHandleSignInCallback } from "@logto/react";
import { useRouter } from "next/navigation";

export default function Callback() {
  const router = useRouter();
  const { isLoading } = useHandleSignInCallback(() => {
    console.log("sign in callback");
    router.push("/profile");
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return null;
}
