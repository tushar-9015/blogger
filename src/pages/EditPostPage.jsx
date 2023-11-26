import React, { useState, useEffect } from "react";
import { PostForm, Container } from "../components";
import postService from "../appwrite/post";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

const EditPostPage = () => {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        if (slug) {
          const dbpost = await postService.getPost(slug);
          if (dbpost) {
            setPost(dbpost);
          }
        } else {
          navigate("/");
        }
      } catch (error) {
        toast.error(error.message);
      }
    })();
  }, [slug, navigate]);

  return post ? (
    <div className="py-8">
      <Container>
        <PostForm post={post} isEdit={true} />
      </Container>
    </div>
  ) : null;
};

export default EditPostPage;
