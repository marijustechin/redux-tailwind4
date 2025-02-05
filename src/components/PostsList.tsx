import { useSelector } from 'react-redux';
import { Link } from 'react-router';
import HelperService from '../services/HelperService';
import { selectAllPosts } from '../store/features/posts/postsSlice';

export const PostsList = () => {
  const allPosts = useSelector(selectAllPosts);

  return (
    <div>
      <div className="grid grid-cols-2 gap-2">
        {allPosts &&
          allPosts.map((post) => (
            <div key={post.title}>
              <Link to={`/posts/${post.id}`}>
                <h2>{HelperService.capitalizeFirstLetter(post.title)}</h2>
                <img
                  className="rounded-lg"
                  src={'https://picsum.photos/350/200/?blur=5'}
                  alt={post.title}
                />
                <p>{HelperService.capitalizeFirstLetter(post.body)}</p>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};
