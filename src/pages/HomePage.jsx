import React from "react";
import { useEffect, useState } from "react";
import { PostCard, Container } from "../components/index";
import { useSelector } from "react-redux";

const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const userData = useSelector((state) => state.auth.userData);
  const allPosts = useSelector((state) => state.post.allPosts);

  useEffect(() => {
    setPosts(allPosts);
    setLoading(false);
    console.log(allPosts);
  }, [allPosts]);

  if (!loading && !userData) {
    return (
      <div className="p-2 w-full flex justify-center items-center min-h-[90vh]">
        <h1 className="text-2xl font-bold hover:text-gray-500">
          Login to read posts
        </h1>
      </div>
    );
  } else if (!loading && posts?.length === 0 && userData) {
    return (
      <div className="p-2 w-full flex justify-center items-center min-h-[90vh]">
        <h1 className="text-2xl font-bold hover:text-gray-500">
          There is no post.
        </h1>
      </div>
    );
  }

  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts?.length > 0 &&
            posts.map((post) => (
              <div key={post.$id} className="p-2 w-1/4">
                <PostCard post={post} />
              </div>
            ))}
        </div>
      </Container>
    </div>
  );
};

export default HomePage;
