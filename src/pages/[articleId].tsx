import { useEffect } from "react";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import SEO from "components/SEO";
// import Comments from "components/Comments";
import { IBlog } from "types/blog";

interface BlogProps {
  blog: IBlog;
  digit: number;
}

const Blog: NextPage<BlogProps> = ({ blog }) => {
  useEffect(() => {
    console.log(blog);
  }, [blog]);
  return (
    <>
      <SEO title={blog?.name} description={blog?.description} />
      <div className="mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pt-16 lg:pb-24">
        <div className="mt-4 lg:row-span-3 lg:mt-0">
          <div className="aspect-w-3 aspect-h-4 hidden overflow-hidden rounded-lg lg:block">
            <Image
              src="https://media.moddb.com/images/members/5/4550/4549205/duck.jpg"
              width="500"
              height="500"
              alt=""
            />
          </div>
        </div>

        <div className="lg:col-span-2 lg:border-l lg:border-gray-200 lg:pr-8 pl-12">
          <h2>Article</h2>
          <p className="text-3xl tracking-tight text-gray-900">{blog?.name}</p>
          <h3 className="text-lg text-red-700 mt-3">Random Number: {blog?.random}</h3>

          <h3 className="text-sm text-red-400 mb-5">Updating every 10s</h3>
          <p className="text-lg text-gray-600 my-8 max-w-md">{blog?.description}</p>
          <Link href="/">
            <button className="max-w-xs  w-full rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-center font-medium text-white hover:bg-indigo-700">
              Go Back
            </button>
          </Link>
        </div>
      </div>
      {/* <Comments /> */}
    </>
  );
};

export const getStaticPaths: GetStaticPaths = () => {
  return { paths: [], fallback: true };
};

export const getStaticProps: GetStaticProps = async context => {
  try {
    const articleId = context.params?.articleId;
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/blog/${articleId}`);
    const { data } = await res.json();

    return {
      props: { blog: data },
      revalidate: 10
    };
  } catch (error) {
    console.error(error);
    return { notFound: true };
  }
};

export default Blog;
