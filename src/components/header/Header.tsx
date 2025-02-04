import { Link } from "react-router";

export const Header = () => {
  return (
    <header className="my-container">
      <nav className="flex gap-2">
        <Link to={"/"}>Pradžia</Link>
        <Link to={"/naujas-straipsnis"}>Pridėti naują</Link>
      </nav>
    </header>
  );
};
