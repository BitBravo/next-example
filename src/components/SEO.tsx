import Head from "next/head";
import ISeo from "../types/seo";

const SEO = ({
  title,
  description = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
  imageUrl = "https://media.moddb.com/images/members/5/4550/4549205/duck.jpg"
}: ISeo) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="icon" href="/favicon.ico" />
      <meta property="og:image" content={imageUrl} />
      <meta name="twitter:image" content={imageUrl} />
    </Head>
  );
};

export default SEO;
