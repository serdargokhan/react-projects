import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

import BlogItems from "./components/BlogItems";
import BlogPage from "./components/BlogPage";
import CreatePost from "./components/CreatePost";
import Navbar from "./components/Navbar";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";

import PageNotFound from "./UI/PageNotFound";

function App() {

  const { token } = useContext(AuthContext);

  return (
    <div className="bg-light-white font-poppins min-h-screen dark:bg-light-dark duration-700">
      <Navbar />
      <Routes>
        <Route index element={<Navigate to="blog" />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="blog" element={<BlogItems />} />
        <Route path="blog-post" element={<BlogPage />}>
          <Route path=":pageId" element={<BlogPage />} />
        </Route>
        {token && <Route path="create-blog-post" element={<CreatePost />} />}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
