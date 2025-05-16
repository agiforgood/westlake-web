import Avatar from "boring-avatars";
import { Image } from "@heroui/react";
import { UserProfile } from "@/type";
export default function AgAvatar({
  profile,
  width = 18,
  height = 18,
}: {
  profile: UserProfile | null;
  width?: number;
  height?: number;
}) {
  return (
    <div>
      {profile?.profile.avatarUrl ? (
        <Image
          src={profile.profile.avatarUrl}
          alt="头像"
          className={`w-${width} h-${height} rounded-full border`}
        />
      ) : (
        <Avatar
          className={`w-${width} h-${height} rounded-full border`}
          name={profile?.profile.userId ?? ""}
          variant="beam"
        />
      )}
    </div>
  );
}
