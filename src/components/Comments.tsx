import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import { useQuery } from "react-query";
import Pagination from "./Pagination";
import { IComment } from "types/comment";

const Comments = () => {
  const [page, setPage] = useState(0);
  const router = useRouter();
  const { articleId } = router.query;

  const { data, isLoading } = useQuery(
    ["comments", articleId, page],
    async () => await fetch(`/api/comment?articleId=${articleId}&page=${page}`).then(result => result.json()),
    {
      keepPreviousData: true,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      enabled: !!articleId && page !== 0
    }
  );

  const handlePaginationChange = (pageNum: number) => {
    setPage(pageNum);
  };

  const { comments, totalPage } = useMemo(() => {
    if (data?.data) {
      return {
        comments: data?.data,
        totalPage: data?.totalPage,
        currentPage: data?.totalPage
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
        {comments?.map((comment: IComment, index: number) => (
          <div className="bg-gray-50 my-3" key={index}>
            <div className="max-w-4xl py-3 px-4 sm:px-6">
              <h2 className="text-sm font-bold tracking-tight text-gray-900 sm:text-lg">{comment?.title}</h2>
              <p className="text-indigo-600">Blog Id: ({comment?.blogId})</p>
              <p className="block text-indigo-600">Comment Id: {comment?._id}</p>
              <p className="block text-gray-400 mt-2">{comment?.description}</p>
            </div>
          </div>
        ))}
      </div>
      {isLoading && <div className="center">Loading...</div>}
      <Pagination currentPage={page} totalCount={totalPage} onPageChange={handlePaginationChange} />
    </div>
  );
};

export default Comments;
