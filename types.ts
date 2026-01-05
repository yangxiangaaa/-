
export interface Post {
  id: string;
  images: string[];
  title: string;
  content: string;
  author: {
    name: string;
    avatar: string;
    isFollowing?: boolean;
  };
  stats: {
    likes: number;
    comments: number;
    shares: number;
  };
  timestamp: string;
  tags: string[];
}

export interface Category {
  id: string;
  label: string;
}
