import { AddPostForm } from '../components/AddPostForm';
import { PostsList } from '../components/PostsList';

export const HomePage = () => {
  return (
    <main className="my-container">
      <h1>Redux pavyzdys</h1>
      <div className="grid grid-cols-2 gap-2">
        <PostsList />
        <AddPostForm />
      </div>
    </main>
  );
};
