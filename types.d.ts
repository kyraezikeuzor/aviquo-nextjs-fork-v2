type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Object;
};

type Post = {
  userId: number;
  id: number;
  type: string;
  title: string;
  body: string;
  views: number;
  upvotes: string[];
  downvotes: string[];
  comments: number;
  tags: any[];
  date: string;
};
