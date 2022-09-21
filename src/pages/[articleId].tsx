import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useEffect } from "react";
import SEO from "../components/SEO";
import IBlog from "../types/blog";

interface BlogProps {
  blog: IBlog;
}

const Blog: NextPage<BlogProps> = ({ blog }) => {
  useEffect(() => {
    console.log(blog);
  }, [blog]);
  return (
    <>
      <SEO title={blog?.name} description={blog?.description} />
      <main className="container max-w-md	mx-auto flex flex-col items-center justify-center min-h-screen p-4">
        <h2 className="text-2xl text-gray-700">{blog?.name}</h2>
        <p className="text-sm text-gray-600 mt-5">{blog?.description}</p>
      </main>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = () => {
  return { paths: [], fallback: true };
};

export const getStaticProps: GetStaticProps = async ({ params: { articleId } }: any) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/blog/${articleId}`);
    const { data } = await res.json();
    return {
      props: { blog: data },
      revalidate: 60
    };
  } catch (error) {
    console.error(error);
    return { notFound: true };
  }
};

export default Blog;
