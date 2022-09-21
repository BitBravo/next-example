import Link from "next/link";
import IBlog from "../types/blog";

const TechnologyCard = ({ _id, name, description }: IBlog) => {
  return (
    <section className="flex flex-col justify-center p-6 duration-500 border-2 border-gray-500 rounded shadow-xl motion-safe:hover:scale-105">
      <h2 className="text-2xl text-gray-700">{name}</h2>
      <p className="text-sm text-gray-600 mt-2">{description}</p>
      <Link className="mt-3 text-sm underline text-green-500 decoration-dotted underline-offset-2" href={`/${_id}/`}>
        <button className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 mt-8">
          Documentation
        </button>
      </Link>
    </section>
  );
};

export default TechnologyCard;
