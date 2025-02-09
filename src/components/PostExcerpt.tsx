import { Link } from 'react-router';
import { IPost } from '../types/PostType';
import HelperService from '../services/HelperService';
import { PostAuthor } from './PostAuthor';
import { TimeAgo } from './TimeAgo';
import { ReactionButtons } from './ReactionButtons';

export const PostExcerpt = ({ post }: { post: IPost }) => {
  return (
    <article className="flex flex-col gap-2 border border-slate-300 rounded-2xl p-2">
      <Link to={`/posts/${post.id}`}>
        <h2>{HelperService.capitalizeFirstLetter(post.title)}</h2>
        <p>
          {HelperService.capitalizeFirstLetter(post.body).substring(0, 100)}
        </p>
        <PostAuthor userId={post.userId} />
        <TimeAgo date={post.date} />
      </Link>
      <ReactionButtons post={post} />
    </article>
  );
};
