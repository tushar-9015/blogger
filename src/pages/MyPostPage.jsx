import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Container, PostCard } from "../components";

const MyPostPage = () => {
  const [myPosts, setMyPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const userData = useSelector((state) => state.auth.userData);
  const allPosts = useSelector((state) => state.post.allPosts);

  useEffect(() => {
    if (allPosts) {
      const filteredPost = allPosts.filter(
        (post) => post.userId === userData.$id
      );
      setMyPosts(filteredPost);
      console.log(allPosts);
      console.log(filteredPost);
      setLoading(false);
    }
  }, [allPosts]);
  return (
    <div className="w-full py-8">
      <Container>
        {myPosts.length === 0 && !loading && (
          <div className="flex w-full h-[80vh] text-lg justify-center items-center">
            Not created any post{" "}
            <Link to={"/add-post"} className="text-blue-500 ml-2">
              Create Post
            </Link>
          </div>
        )}
        <div className="grid sm:grid-cols-2 grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 md:gap-5 gap-12 max-lg:place-items-center">
          {myPosts.length !== 0 &&
            myPosts.map((post) => (
              <div key={post.$id} className="p-2 md:w-[310px]">
                <PostCard post={post} />
              </div>
            ))}
        </div>
      </Container>
    </div>
  );
};

export default MyPostPage;
