import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { IPost } from "../types/PostType";
import axios from "axios";
import HelperService from "../services/HelperService";

export const SinglePost = () => {
  const postId = useParams().id;
  const [post, setPost] = useState<IPost>();

  useEffect(() => {
    if (postId) getSinglePost(postId);
  }, []);

  const getSinglePost = async (postId: string) => {
    try {
      const res = await axios.get(
        `https://jsonplaceholder.typicode.com/posts/${postId}`
      );
      setPost(res.data);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.log(e.response?.data.message);
        return null;
      }

      if (e instanceof Error) console.log(e.message);
    }
  };

  return (
    <main>
      {post && (
        <section>
          <h1>{HelperService.capitalizeFirstLetter(post.title)}</h1>
        </section>
      )}
    </main>
  );
};
