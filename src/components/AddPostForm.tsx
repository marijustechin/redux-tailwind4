import * as z from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { AddPostSchema } from "../schemas/AddPostSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { addPost } from "../store/features/posts/postsSlice";
import toast from "react-hot-toast";
import { getAllUsers } from "../store/features/users/usersSlice";

export const AddPostForm = () => {
  const users = useSelector(getAllUsers);
  // const [userId, setUserId] = useState<string>();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof AddPostSchema>>({
    resolver: zodResolver(AddPostSchema),
    defaultValues: {
      title: "",
      body: "",
      userId: "",
    },
  });

  const selectUser = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  const onSubmit: SubmitHandler<z.infer<typeof AddPostSchema>> = (formData) => {
    dispatch(addPost(formData.title, formData.body, formData.userId));
    toast.success("Straipsnis sėkmingai pridėtas!");
  };

  return (
    <form
      className="max-w-md mx-auto"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-2">
        <div className="flex flex-col">
          <div className="flex items-center gap-2 p-2 border border-sky-200 rounded-lg">
            <label className="w-36 text-right" htmlFor="title">
              Pavadinimas
            </label>
            <input
              className="w-full bg-sky-50 p-2 rounded-xl"
              id="title"
              type="text"
              autoComplete="off"
              {...register("title")}
            />
          </div>
          {errors.title && (
            <span className="text-rose-500 text-sm">
              {errors.title.message}
            </span>
          )}
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-2 p-2 border border-sky-200 rounded-lg">
            <label className="w-36 text-right" htmlFor="body">
              Tekstas
            </label>
            <textarea
              className="w-full bg-sky-50 p-2 rounded-xl"
              id="body"
              rows={4}
              autoComplete="off"
              {...register("body")}
            />
          </div>
          {errors.body && (
            <span className="text-sm text-rose-500">{errors.body.message}</span>
          )}
        </div>

        <div className="flex flex-col">
          <div className="flex items-center gap-2 p-2 border border-sky-200 rounded-lg">
            <label className="w-36 text-right" htmlFor="body">
              Autorius
            </label>
            <select className="w-full" id="userId" {...register("userId")}>
              <option value={" "} disabled>
                -- Pasirinkite autorių --
              </option>
              {selectUser}
            </select>
          </div>
          {errors.userId && (
            <span className="text-sm text-rose-500">
              {errors.userId.message}
            </span>
          )}
        </div>
        <button className="btn-generic">Pridėti</button>
      </div>
    </form>
  );
};
