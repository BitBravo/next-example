import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { useMemo, useState } from "react";
import Pagination from "./Pagination";
import { IBlog } from "types/blog";

const Comments = () => {
  const [page, setPage] = useState(1);
  const router = useRouter();
  const { articleId } = router.query;

  const { data } = useQuery(
    ["comments", articleId, page],
    async () => await fetch(`/api/comment?articleId=${articleId}&page=${page - 1}`).then(result => result.json()),
    {
      keepPreviousData: true,
      refetchOnMount: false,
      refetchOnWindowFocus: false
    }
  );

  const handlePaginationChange = (pageNum: number) => {
    setPage(pageNum);
  };

  const { comments, totalPage } = useMemo(() => {
    if (data?.data) {
      return {
        comments: data?.data.data,
        totalPage: data?.data.totalPage,
        currentPage: data?.data.totalPage
      };
    }
    return {
      comments: [],
      totalPage: 0,
      currentPage: 1
    };
  }, [data]);


  return (
    <div className="max-w-7xl	 mx-auto px-4 pt-10 pb-16 sm:px-6 lg:px-8 lg:pt-16 lg:pb-24">
      <h2 className="text-xl">Comments</h2>
      <div>
        {comments?.map((comment: IBlog, index: number) => (
          <div className="bg-gray-50 my-3" key={index}>
            <div className="max-w-4xl py-3 px-4 sm:px-6">
              <h2 className="text-sm font-bold tracking-tight text-gray-900 sm:text-lg">
                {comment?.name} <span className="text-indigo-600">({comment?.random})</span>
              </h2>
              <p className="block text-gray-400">{comment?._id}</p>
              <p className="block text-gray-400">{comment?.description}</p>
            </div>
          </div>
        ))}
      </div>
      <Pagination currentPage={page} totalCount={totalPage} onPageChange={handlePaginationChange} />
    </div>
  );
};

export default Comments;
