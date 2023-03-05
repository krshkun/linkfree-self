export interface UserProfile {
  username: string;
  name: string;
  displayStatsPublic?: Boolean;
  type?: "personal" | "community";
  bio: string;
  avatar: string;
  tags?: string[];
  links: Array<{
    name: string;
    url: string;
    icon: string;
    color?: string;
  }>;
  testimonials?: string[];
  views: number;
}
