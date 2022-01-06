import { motion } from "framer-motion";
import { Link, Outlet } from "react-router-dom";

function BlogItem({ image, title, date, description, pageId }) {

    return (
        <motion.div initial={{ scale: 0.5 }} animate={{ scale: 1 }} whileTap={{ scale: 0.95 }}>
            <Link to={`/blog-post/${pageId}`} key={pageId} >
                <section className="flex-col w-11/12 mx-auto space-y-2 mt-7 hover:cursor-pointer" >
                    <motion.img
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className=" rounded-2xl shadow-xl"
                        src={image}
                        alt={title}
                    />
                    <p className="text-sm text-light-gray dark:text-white duration-700">{date}</p>
                    <h3 className="font-bold text-2xl dark:text-light-white duration-700">{title}</h3>
                    <p className="text-light-gray dark:text-white duration-700">{description.slice(0, 180)}...</p>
                </section>
            </Link>
            <Outlet />
        </motion.div>
    );
}

export default BlogItem;
