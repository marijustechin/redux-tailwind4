interface IReactions {
  thumbsUp: number;
  wow: number;
  heart: number;
  rocket: number;
  coffee: number;
}

export interface IPost {
  id: number;
  title: string;
  body: string;
  date: string;
  userId: number;
  reactions: IReactions;
}
