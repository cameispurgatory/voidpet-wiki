import { MDXRemote } from "next-mdx-remote";
import getPage from "../helpers/getPage";
import getPages from "../helpers/getPages";
import { serialize } from "next-mdx-remote/serialize";
import { GetStaticPaths, GetStaticProps } from "next";

function Post(props: { data: any, content: any }) {
  return (
    <div>
      <h1 className="font-bold text-7xl mt-24 mb-12">{props.data.title}</h1>
      <p className="prose dark:prose-invert mt-12 prose-a:underline prose-a:underline-offset-2 prose-a:decoration-blue-500 prose-a:hover:decoration-2 prose-a:transition prose-a:cursor-pointer">
        <MDXRemote {...props.content} />
      </p>
    </div>
  );
}

export default Post;

export const getStaticPaths: GetStaticPaths = async () => {
  const pages = await getPages();
  const paths = pages.map((page) => ({ params: { slug: page.slug } }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (props: { params?: any }) => {
  const page = await getPage(props.params?.slug);
  const mdxSource = await serialize(page.content);
  return {
    props: {
      data: page.data,
      content: mdxSource,
    },
  };
};
