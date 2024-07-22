// // 'use client'
// import { assets, blog_data } from '@/Assets/assets';
// import BlogFooter from '@/Components/BlogFooter';
// import Image from 'next/image';
// import Link from 'next/link';
// import React  from 'react'

// import { getPostBySlug } from '@/lib/api';
// import markdownToHtml from '@/lib/markdowntohtml';
// import "./markdownstyling.css";

// export function generateMetadata({ params }) {
//     const post = getPostBySlug(params.slug);

//     if (!post) {
//       return notFound();
//     }

//     const title = post.title;

//     return {
//       title,
//       description: post.description,
//       openGraph: {
//         title: post.ogtitle,
//       },
//     };
//   }

// const page = async ({params}) => {

//     const post = getPostBySlug(params.slug);
//     const content = await markdownToHtml(post.content || "");
//     const faq = post.faq;

//     // const [data,setData] = useState(null);

//     const fetchBlogData = () => {
//         for(let i=0; i<post.length; i++)
//         {
//             if (Number(params.slug) === post[i].slug) {
//                 setData(post[i]);
//                 console.log(post[i]);
//                 break;
//             }
//         }
//     }

//     // useEffect(() => {
//     //     fetchBlogData();
//     // },[])

//   return ( <>
//     <div className='bg-gray-200 py-5 px-5 md:px-12 lg:px-28'>
//         <div className='flex justify-between items-center'>
//             <Link href={'/blogs'}>
//                 <Image src={assets.logo} width={180} alt='' className='w-[130px] sm:w-auto' />
//             </Link>
//             <button className='flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-black shadow-[-7px_7px_0px_#000000]' >   {/* #567655 */}
//                 Get Started <Image src={assets.arrow} alt='' />
//             </button>
//         </div>
//         <div className='text-center my-24'>
//             <h1 className='text-2xl sm:text-5xl font-semibold max-w-[700px] mx-auto'>{post.title}</h1>
//             <Image className='mx-auto mt-6 border border-white rounded-full' src={post.author_img} width={60} height={60} alt='' />
//             <p className='mt-1 pb-2 text-lg max-w-[740px] mx-auto'>{post.author}</p>
//         </div>
//     </div>
//     <div className='mx-5 max-w-[800px] md:mx-auto mt-[-100px] mb-10'>
//         <Image className='border-4 border-white' src={post.image} width={1280} height={720} alt='' />
//         <h1 className='my-8 text-[26px] font-semibold'>Introduction:</h1>
//         <p>{post.description}</p>

//         <h3 className='my-5 text-[18px] font-semibold'>Step 1: Self-Reflection and Goal Setting</h3>
//         <p className='my-3'>
//             Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
//             when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap
//             into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum
//             passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
//         </p>
//         <p className='my-3'>
//             Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
//             when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap
//             into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum
//             passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
//         </p>

//         <h3 className='my-5 text-[18px] font-semibold'>Step 2: Self-Reflection and Goal Setting</h3>
//         <p className='my-3'>
//             Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
//             when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap
//             into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum
//             passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
//         </p>
//         <p className='my-3'>
//             Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
//             when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap
//             into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum
//             passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
//         </p>

//         <h3 className='my-5 text-[18px] font-semibold'>Step 3: Self-Reflection and Goal Setting</h3>
//         <p className='my-3'>
//             Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
//             when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap
//             into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum
//             passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
//         </p>
//         <p className='my-3'>
//             Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
//             when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap
//             into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum
//             passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
//         </p>

//         <h3 className='my-5 text-[18px] font-semibold'>Conclusion:</h3>
//         <p className='my-3'>
//             Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
//             when an unknown printer took a galley of type and scrambled it to make a type specimen book.
//         </p>

//         <div className='my-24'>
//             <p className='text-black font font-semibold my-4'>Share this article on social media</p>
//             <div className='flex'>
//                 <Image src={assets.facebook_icon} width={50} alt='' />
//                 <Image src={assets.twitter_icon} width={50} alt='' />
//                 <Image src={assets.googleplus_icon} width={50} alt='' />
//             </div>
//         </div>
//     </div>

//     <BlogFooter />
//     </>

//   )
// }

// export default page

import { assets } from "@/Assets/assets";
import { getPostBySlug } from "@/lib/api";
import markdownToHtml from "@/lib/markdowntohtml";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import BlogFooter from "@/Components/BlogFooter";

export function generateMetadata({ params }) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return notFound();
  }

  const title = post.title;

  return {
    title,
    description: post.description,
    openGraph: {
      title: post.ogtitle,
    },
  };
}

const page = async ({ params }) => {
  const post = getPostBySlug(params.slug);
  const content = await markdownToHtml(post.content || "");

  return (
    <div>
      <div className="bg-gray-200 py-5 px-5 md:px-12 lg:px-28">
        <div className="flex justify-between items-center">
          <Link href={"/blogs"}>
            <Image
              src={assets.logo}
              width={180}
              alt=""
              className="w-[130px] sm:w-auto"
            />
          </Link>

          <button className="flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-black shadow-[-7px_7px_0px_#000000]">
            Get Started <Image src={assets.arrow} alt="" />
          </button>
        </div>

        <div className="text-center my-24">
          <h1 className="text-2xl sm:text-5xl font-semibold max-w-[700px] mx-auto">
            {post.title}
          </h1>

          <Image
            className="mx-auto mt-6 border border-white rounded-full"
            src={post.author_img}
            width={60}
            height={60}
            alt=""
          />

          <p className="mt-1 pb-2 text-lg max-w-[740px] mx-auto">
            {post.author}
          </p>
        </div>
      </div>

      <div className="mx-5 max-w-[800px] md:mx-auto mt-[-100px] mb-10">
        <Image
          className="border-4 border-white"
          src={post.coverImage}
          width={1280}
          height={720}
          alt=""
        />
        <h1 className="my-8 text-[26px] font-semibold">Introduction:</h1>
        <div class="px-4 lg:px-0 mt-12 text-gray-700 text-lg leading-relaxed w-full lg:w-3/4">
          <div
            className="markdown py-4"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>

        {/* <h3 className="my-5 text-[18px] font-semibold">
          Step 1: Self-Reflection and Goal Setting
        </h3>

        <p className="my-3">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, // when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap // into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum // passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </p>

        <p className="my-3">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, // when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap // into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum // passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </p>

        <h3 className="my-5 text-[18px] font-semibold">
          Step 2: Self-Reflection and Goal Setting
        </h3>

        <p className="my-3">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, // when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap // into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum // passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </p>

        <p className="my-3">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, // when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap // into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum // passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </p>
        <h3 className="my-5 text-[18px] font-semibold">
          Step 3: Self-Reflection and Goal Setting
        </h3>
        <p className="my-3">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, // when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap // into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum // passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </p>

        <p className="my-3">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, // when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap // into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum // passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </p>
        <h3 className="my-5 text-[18px] font-semibold">Conclusion:</h3>

        <p className="my-3">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, // when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </p> */}

        <div className="my-24">
          <p className="text-black font font-semibold my-4">
            Share this article on social media
          </p>

          <div className="flex">
            <Image src={assets.facebook_icon} width={50} alt="" />
            <Image src={assets.twitter_icon} width={50} alt="" />
            <Image src={assets.googleplus_icon} width={50} alt="" />
          </div>
        </div>
      </div>
      <BlogFooter />
    </div>
  );
};

export default page;
