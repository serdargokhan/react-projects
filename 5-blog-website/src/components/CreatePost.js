import { useCallback, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";
import useFetch from "../hooks/useFetch";

import AuthLayout from "../UI/AuthLayout";
import Button from "../UI/Button";
import Input from "../UI/Input";
import Validation from "../UI/Validation";
import Redirect from "../UI/Redirect";

function CreatePost() {

    const { blogPost, setBlogPost } = useContext(AuthContext);
    const [validate, setValidate] = useState(false);
    const [validation, setValidation] = useState(false);
    const [redirect, setRedirect] = useState(false);

    const navigate = useNavigate();

    const titleIsValid = blogPost.title.length >= 10;
    const descriptionIsValid = blogPost.description.length >= 25;
    const storyIsValid = blogPost.story.length >= 150;
    const validateEvery = useCallback(titleIsValid && descriptionIsValid && storyIsValid);

    function createPostHandler(e) {
        e.preventDefault();
        setValidate(prev => !prev);
        setValidation(true);
        if (validateEvery) {
            setRedirect(true)
            setTimeout(() => {
                navigate("/blog", { replace: true });
            }, 1000);
        };
        delete blogPost.password;
    }

    const options = {
        method: "POST",
        body: {
            ...blogPost,
            created: new Date().toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' }),
            id: Math.floor(Math.random() * 16),
            pageId: Date.now()
        },
        headers: {
            "Content-Type": "application/json"
        }
    }

    useFetch("https://blog-website-ce0dc-default-rtdb.europe-west1.firebasedatabase.app/blogs.json", options, validate, validateEvery);

    useEffect(() => {
        setBlogPost({
            title: "",
            description: "",
            story: "",
        })
    }, [validation]);

    return (
        <AuthLayout>
            {!redirect && <> <h2 className="text-3xl font-bold dark:text-light-white duration-700">Create Your Blog Post<span className="text-light-purple">.</span></h2>
                <form className="flex-col space-y-4" onSubmit={createPostHandler} >

                    <Input type="text" label="Title" id="title" placeholder="Blog title" />
                    {validation && <Validation check={!titleIsValid} message="Title must be at least 10 characters long" />}

                    <Input type="text" label="Description" id="description" placeholder="Blog description" />
                    {validation && <Validation check={!descriptionIsValid} message="Description must be at least 25 characters long" />}

                    <Input label="Your Story" id="story" placeholder="Blog story" />
                    {validation && <Validation check={!storyIsValid} message="Story must be at least 150 characters long" />}

                    <Button title="Submit" />

                </form> </>}

            {redirect && <Redirect description="You are being redirected to the Main page. Please wait..." />}
        </AuthLayout>
    );
}

export default CreatePost;
