import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import postService from "../../appwrite/post";
import fileService from "../../appwrite/file";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { upsertPost } from "../../store/slices/postSlice";

export default function PostForm({ post, isEdit = false }) {
  let defaults = {
    title: post?.title || "",
    slug: post?.$id || "",
    content: post?.content || "",
    status: post?.status || "active",
  };
  const { register, handleSubmit, watch, reset, setValue, control, getValues } =
    useForm({
      defaultValues: defaults,
    });
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const dispatch = useDispatch();

  useEffect(() => {
    reset(defaults);
  }, [post, reset]);

  const submit = async (data) => {
    if (submitting) {
      return;
    }
    setSubmitting(true);
    console.log(data);
    if (post) {
      const file = data.image[0]
        ? await fileService.uploadFile(data.image[0])
        : null;

      if (file) {
        fileService.deleteFile(post.featuredImage);
      }

      const dbPost = await postService.updatePost(post.$id, {
        ...data,
        userId: userData.$id,
        featuredImage: file ? file.$id : undefined,
      });

      if (dbPost) {
        dispatch(upsertPost({ post: dbPost }));
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      const file = await fileService.uploadFile(data.image[0]);

      if (file) {
        const fileId = file.$id;
        data.featuredImage = fileId;
        const dbPost = await postService.createPost({
          ...data,
          userId: userData.$id,
        });

        if (dbPost) {
          dispatch(upsertPost({ post: dbPost }));
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }
    setSubmitting(false);
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

    return "";
  }, []);

  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title" && !isEdit) {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="flex flex-wrap"
      disabled={submitting}
    >
      <div className="w-2/3 px-2">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          name="title"
          {...register("title", { required: true })}
        />
        {/* <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          name="slug"
          disabled={isEdit}
          {...register("slug", { required: true })}
          onInput={(e) => {
            console.log(e);
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        /> */}
        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>
      <div className="w-1/3 px-2">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />
        {post && (
          <div className="w-full mb-4">
            <img
              src={fileService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />
        <Button
          disabled={submitting}
          type="submit"
          bgColor={post ? "bg-green-500" : undefined}
          className="w-full"
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}
