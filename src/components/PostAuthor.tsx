import { useSelector } from "react-redux";
import { getAllUsers } from "../store/features/users/usersSlice";

export const PostAuthor = ({ userId }: { userId: string }) => {
  const users = useSelector(getAllUsers);
  const author = users.find((user) => user.id === userId);

  return (
    <p className="text-sm text-sky-300">
      Autorius: {author ? author.name : "Nežinomas autorius"}
    </p>
  );
};
