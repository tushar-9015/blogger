import React from "react";
import fileService from "../appwrite/file";
import { Link } from "react-router-dom";
import { convert } from "html-to-text";
import { format } from "date-fns";

const PostCard = ({ post }) => {
  return (
    <div className="w-full bg-gray-100 rounded-xl p-4">
      <Link to={`/post/${post.$id}`}>
        <div className="w-full justify-center mb-4">
          <img
            src={fileService.getFilePreview(post.featuredImage)}
            alt={post.title}
            className="rounded-xl object-cover object-center"
          />
        </div>
        <h2 className="text-xl font-bold">{post.title}</h2>
        <p className=" text-gray-700 text-base mb-2">
          {format(new Date(post.$createdAt), "MMMM d, yyy")}
        </p>
        <p className=" text-gray-700 text-base line-clamp-3">
          {convert(post.content).substring(0, 10)}
        </p>
      </Link>
    </div>
  );
};

export default PostCard;
