import { useDispatch } from "react-redux";
import { addReaction } from "../store/features/posts/postsSlice";
import { IPost } from "../types/PostType";

export const ReactionButtons = ({ post }: { post: IPost }) => {
  const dispatch = useDispatch();

  const reactionEmoji = {
    thumbsUp: "👍",
    wow: "😮",
    heart: "💙",
    rocket: "🚀",
    coffee: "☕",
  };

  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    return (
      <button
        className="cursor-pointer"
        key={name}
        type="button"
        onClick={() =>
          dispatch(addReaction({ postId: post.id, reaction: name }))
        }
      >
        {emoji}
        <span className="text-xs">{post.reactions[name]}</span>
      </button>
    );
  });

  return (
    <div className="flex gap-2 justify-around border-t border-sky-500 mt-2">
      {reactionButtons}
    </div>
  );
};
