import type { GetStaticProps, NextPage } from "next";
import { useMemo } from "react";
import { dehydrate, QueryClient, useInfiniteQuery } from "react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import SEO from "components/SEO";
import TechnologyCard from "components/Card";
import { loadBlogs } from "@utils/blogs";
import { IBlog, IBlogPagination } from "types/blog";


const Home: NextPage = () => {
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery(
    "blogs",
    async ({ pageParam = 0 }) => await fetch(`/api/blog?page=${pageParam}`).then(result => result.json()),
    {
      getNextPageParam: (lastPage: IBlogPagination) => {
        if (!lastPage.isLast) {
          return lastPage.page;
        }
      }
    }
  );

  const blogList = useMemo(() => {
    if (!data?.pages) return [];
    return data?.pages?.reduce((list: IBlog[], cur: IBlogPagination) => list.concat(cur.data), []);
  }, [data]);

  return (
    <>
      <SEO title="TEST GRID" />
      <main className="container mx-auto flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-5xl md:text-[5rem] leading-normal font-extrabold text-gray-700">Blogs</h1>
        <p className="text-2xl text-gray-700">This stack uses:</p>

        <InfiniteScroll
          dataLength={blogList.length ?? 0}
          next={fetchNextPage}
          hasMore={!!hasNextPage}
          loader={<h3 className="mt-5 mx-auto text-center"> Loading...</h3>}
          endMessage={<h4 className="mt-5 mx-auto text-center">Nothing more to show</h4>}
        >
          <div className="grid gap-3 pt-3 mt-3 mx-auto text-center md:grid-cols-3 lg:w-2/3 margin">
            {blogList?.map(blog => (
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
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery(["blogs"], async () => await loadBlogs({ page: 0 }));
    return { props: { dehydratedState: dehydrate(queryClient) }, revalidate: 60 };
  } catch (error) {
    console.error(error);
    return { notFound: true };
  }
};

export default Home;
