import { useDispatch, useSelector } from 'react-redux';
import {
  getPosts,
  getPostsError,
  getPostsStatus,
  selectAllPosts,
} from '../store/features/posts/postsSlice';
import { useEffect } from 'react';
import { PostExcerpt } from './PostExcerpt';

export const PostsList = () => {
  const dispatch = useDispatch<any>();

  const allPosts = useSelector(selectAllPosts);
  const postsStatus = useSelector(getPostsStatus);
  const postsError = useSelector(getPostsError);

  useEffect(() => {
    if (postsStatus === 'idle') {
      dispatch(getPosts());
    }
  }, [postsStatus, dispatch]);

  let content;
  if (postsStatus === 'loading') {
    content = <p>Minutėlę...</p>;
  } else if (postsStatus === 'succeeded') {
    const orderedPosts = allPosts
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date));
    content =
      orderedPosts &&
      orderedPosts.map((post) => <PostExcerpt key={post.id} post={post} />);
  } else if (postsStatus === 'failed') {
    content = <p>{postsError}</p>;
  }

  return <section className="grid grid-cols-2 gap-2">{content}</section>;
};
