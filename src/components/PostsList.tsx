import { useSelector } from "react-redux";
import { Link } from "react-router";
import HelperService from "../services/HelperService";
import { selectAllPosts } from "../store/features/posts/postsSlice";
import { PostAuthor } from "./PostAuthor";
import { TimeAgo } from "./TimeAgo";
import { ReactionButtons } from "./ReactionButtons";

export const PostsList = () => {
  const allPosts = useSelector(selectAllPosts);

  const orderedPosts = allPosts
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div>
      <div className="grid grid-cols-2 gap-2">
        {orderedPosts &&
          orderedPosts.map((post) => (
            <div
              className="flex flex-col gap-2 border border-slate-300 rounded-2xl p-2"
              key={post.id}
            >
              <Link to={`/posts/${post.id}`}>
                <h2>{HelperService.capitalizeFirstLetter(post.title)}</h2>
                <p>{HelperService.capitalizeFirstLetter(post.body)}</p>
                <PostAuthor userId={post.userId} />
                <TimeAgo date={post.date} />
              </Link>
              <ReactionButtons post={post} />
            </div>
          ))}
      </div>
    </div>
  );
};
