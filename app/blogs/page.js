// 'use client'

// import BlogList from '@/Components/BlogList'

// const page = () => {
//   return (
//     <>
//         <BlogHeader />
//         <BlogList />
//         <BlogFooter />
//     </>
//   )
// }

// export default page
import BlogFooter from "@/Components/BlogFooter";
import BlogHeader from "@/Components/BlogHeader";
import React from "react";
import { getAllPosts } from "@/lib/api";
import BlogList from "@/Components/BlogList";

const page = () => {
  const posts = getAllPosts();

  return (
    <div>
      <BlogHeader />
      <BlogList post={posts} />
      <BlogFooter />
    </div>
  );
};

export default page;
