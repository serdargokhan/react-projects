import { useEffect, useContext } from "react";
import { motion } from "framer-motion";

import { AuthContext } from "../context/AuthContext";
import useFetch from "../hooks/useFetch";

import BlogItem from "./BlogItem";
import Footer from "./Footer";
import HeaderImage from "../assets/blog-logo.svg";
import Redirect from "../UI/Redirect";

function BlogItems() {

    const { blogData, setBlogData, setImage } = useContext(AuthContext);

    const { arrivedData, loading } = useFetch("https://61cacaff194ffe0017788942.mockapi.io/blog_images", { method: "GET" });

    useEffect(() => {
        let isCancelled = false;

        async function getBlogPosts() {
            const response = await fetch("https://blog-website-ce0dc-default-rtdb.europe-west1.firebasedatabase.app/blogs.json");
            const data = await response.json();
            if (!isCancelled) setBlogData(Object.entries(data));
        }
        if (!isCancelled) getBlogPosts();

        setImage(arrivedData);

        return () => { isCancelled = true };
    }, []);

    return (
        <>
            <div className="md:bg-top md:bg-140 bg-180 bg-center bg-no-repeat bg-logo-img min-h-screen dark:bg-light-dark duration-700">

                <motion.img
                    initial={{ opacity: 0.2 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 2 }}
                    className="w-11/12 md:w-8/12 mx-auto py-5 border-b-4 mb-5"
                    src={HeaderImage}
                    alt="the-blog-image"
                />

                {loading && <Redirect description="The page is loading..." />}

                {!loading && <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-2 py-8 lg:w-11/12 md:w-9/12 mx-auto">
                    {blogData.reverse().map(item => {
                        let { id } = item[1];
                        return <BlogItem image={arrivedData[id].img} title={item[1].title} description={item[1].description} date={item[1].created} pageId={item[1].pageId} key={item[1].pageId} />
                    })}
                </div>}

            </div>

            <Footer />
        </>
    );
}

export default BlogItems;
