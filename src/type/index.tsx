interface UserProfile {
  profile: Profile;
  tags: UserTag[];
  availability: UserAvailability[];
}

interface Profile {
  userId: string;
  handle: string;
  name: string;
  gender: number;
  avatarUrl?: string;
  bannerUrl?: string;
  statusMessage?: string;
  expertiseSummary?: string;
  bio?: string;
  backgroundDescription?: string;
  motivation?: string;
  expectations?: string;
  canOffer?: string;
  wechat?: string;
  locationVisibility?: number;
  province?: string;
  city?: string;
  district?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: string | number | any;
}

interface UserTag {
  id: string;
  content: string;
  category: string;
}

interface UserAvailability {
  weekDay: number;
  timeSlot: number;
}

interface Tag {
  id: string;
  content: string;
  category: string;
}

export type { UserProfile, Profile, UserTag, UserAvailability, Tag };
