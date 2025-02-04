import { BrowserRouter, Route, Routes } from "react-router";
import { MainLayout } from "./layouts/MainLayout";
import { HomePage } from "./pages/HomePage";
import { SinglePost } from "./pages/SinglePost";
import { NewPost } from "./pages/NewPost";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="posts/:id" element={<SinglePost />} />
          <Route path="naujas-straipsnis" element={<NewPost />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
