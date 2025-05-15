import Avatar from "boring-avatars";
import { Image } from "@heroui/react";
import { UserProfile } from "@/type";
export default function AgAvatar({ profile }: { profile: UserProfile | null }) {
  return (
    <div>
      {profile?.profile.avatarUrl ? (
        <Image
          src={profile.profile.avatarUrl}
          alt="头像"
          className="w-18 h-18 rounded-full border"
        />
      ) : (
        <Avatar
          className="w-18 h-18 rounded-full border"
          name={profile?.profile.userId ?? ""}
          variant="beam"
        />
      )}
    </div>
  );
}
