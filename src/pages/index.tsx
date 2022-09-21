import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import SEO from "../components/SEO";
import TechnologyCard from "../components/Card";
import IBlog from "../types/blog";

interface HomeProps {
  data: IBlog[];
  isLast: boolean;
  page: number;
  totalPage: number;
}

const Home: NextPage<HomeProps> = ({ data: blogs, isLast, page }) => {
  const [posts, setPosts] = useState(blogs);
  const [pageNum, setPage] = useState(page);
  const [hasMore, setHasMore] = useState(!isLast);

  const getMorePost = async () => {
    const res = await fetch(`/api/blog?page=${pageNum}`);
    const { data: newPosts, page, isLast: isFinal } = await res.json();

    setHasMore(!isFinal);
    setPage(page);

    const uniqueList = [...posts, ...newPosts].reduce((a: any[], nft: any) => {
      if (!a.find((el: any) => el._id === nft._id)) {
        a.push(nft);
      }
      return a;
    }, []);
    setPosts(uniqueList);
  };

  return (
    <>
      <SEO title="TEST GRID" />
      <main className="container mx-auto flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-5xl md:text-[5rem] leading-normal font-extrabold text-gray-700">Blogs</h1>
        <p className="text-2xl text-gray-700">This stack uses:</p>
        <InfiniteScroll
          dataLength={posts.length}
          next={getMorePost}
          hasMore={hasMore}
          loader={<h3 className="mt-5 mx-auto text-center"> Loading...</h3>}
          endMessage={<h4 className="mt-5 mx-auto text-center">Nothing more to show</h4>}
        >
          <div className="grid gap-3 pt-3 mt-3 mx-auto text-center md:grid-cols-3 lg:w-2/3 margin">
            {posts?.map(blog => (
              <TechnologyCard key={blog._id} {...blog} />
            ))}
          </div>
        </InfiniteScroll>
      </main>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/blog`);
    const data = await response.json();
    return {
      props: data,
      revalidate: 60
    };
  } catch (error) {
    console.error(error);
    return { notFound: true };
  }
};

export default Home;
