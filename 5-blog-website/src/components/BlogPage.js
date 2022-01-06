import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

import { AuthContext } from "../context/AuthContext";
import useFetch from "../hooks/useFetch";

import Footer from "./Footer";

function BlogPage() {

    let params = useParams();

    const { blogData, setBlogData } = useContext(AuthContext);

    const [blogPostLoading, setBlogPostLoading] = useState(true);
    const [bgImage, setBgImage] = useState();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        let isCancelled = false;

        async function getBlogPosts() {
            const response = await fetch("https://blog-website-ce0dc-default-rtdb.europe-west1.firebasedatabase.app/blogs.json");
            const data = await response.json();
            if (!isCancelled) setBlogData(Object.entries(data));
            setBlogPostLoading(false);
        }
        if (!isCancelled) getBlogPosts();

        return () => { isCancelled = true };
    }, []);

    const { arrivedData, loading } = useFetch("https://61cacaff194ffe0017788942.mockapi.io/blog_svg", { method: "GET" }, params);

    let singleBlogPost;
    if (!blogPostLoading) {
        [singleBlogPost] = blogData.filter(item => {
            return (item[1].pageId == params.pageId)
        });
    }

    let { id } = !loading ? singleBlogPost[1] : 2;

    useEffect(() => {
        setBgImage(!loading ? arrivedData[id].img : "");
    }, [arrivedData]);


    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mx-auto md:bg-140 bg-180 bg-top bg-no-repeat min-h-screen "
            style={{ backgroundImage: `url(${bgImage})` }}
            transition={{ duration: 1 }}
        >
            {!blogPostLoading && <><div className="min-h-screen w-1/2 mx-auto md:ml-12">
                <h1 className="font-extrabold md:leading-extra md:text-10xl text-3xl text-left md:pt-24 mt-8 w-full mx-auto tracking-wider dark:text-light-white duration-700">{singleBlogPost[1].title}</h1>
                <p className="text-center mt-8 font-bold italic dark:text-light-white duration-700">{singleBlogPost[1].created}</p>
            </div>
                <p className="font-semibold text-2xl mt-12 text-justify lg:w-1/2 md:mx-auto md:w-9/12 mx-8 dark:text-white duration-700">{singleBlogPost[1].description}</p>
                <p className="text-xl text-justify mt-24 lg:w-1/2 md:mx-auto md:w-9/12 mx-8 pb-12 tracking-wider dark:text-white duration-700">{singleBlogPost[1].story}</p>
            </>}
            <Footer />
        </motion.div>
    );
}

export default BlogPage;
