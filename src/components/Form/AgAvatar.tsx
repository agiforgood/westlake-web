import Avatar from "boring-avatars";
import { Image } from "@heroui/react";
import { UserProfile } from "@/type";
export default function AgAvatar({
  profile,
  width = 80,
  height = 80,
}: {
  profile: UserProfile | null;
  width?: number;
  height?: number;
}) {
  return (
    <div>
      {profile?.profile.avatarUrl ? (
        <Image
          width={width}
          height={height}
          src={profile.profile.avatarUrl}
          alt="头像"
          className={`rounded-full border`}
        />
      ) : (
        <Avatar
          width={width}
          height={height}
          className={`rounded-full border`}
          name={profile?.profile.userId ?? ""}
          variant="beam"
        />
      )}
    </div>
  );
}
