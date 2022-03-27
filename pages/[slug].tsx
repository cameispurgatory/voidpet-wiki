import { MDXRemote } from "next-mdx-remote";
import getPage from "../helpers/getPage";
import getPages from "../helpers/getPages";
import { serialize } from "next-mdx-remote/serialize";
import { GetStaticPaths, GetStaticProps } from "next";
import { H2, H3 } from "../components/headings";
import Head from "next/head";

function Post(props: { data: {title: string, description: string}, content: any, page: any }) {
  return (
    <>
    <Head>
      
    </Head>
    <div>
      <h1 className="font-extrabold text-4xl mt-24">{props.data.title}</h1>
      <header className="text-gray-600 text-sm mb-12 max-w-xl mt-4">{props.data.description}</header>
      <p className="prose dark:prose-invert mt-12 prose-a:underline prose-a:underline-offset-2 prose-a:decoration-blue-500 hover:prose-a:decoration-2 prose-a:transition prose-a:cursor-pointer">
        <MDXRemote
        components={{
          h2: H2,
          h3: H3
        }}
         {...props.content} 
         />
      </p>
      <a href={`https://github.com/quick007/voidpet-wiki/blob/main/posts/${props.page}.mdx`} className="rounded-lg bg-gray-50 shadow-md inline-flex px-4 py-2 font-semibold text-gray-800 mt-8 hover:-translate-y-1.5 transition duration-300">Edit on Github</a>
      <div onClick={() => alert("Coming soon:tm:")} className="rounded-lg shadow-md inline-flex px-4 py-2 ml-4 font-semibold  mt-8 bg-accent text-white hover:-translate-y-1.5 transition duration-300">Random Article</div>
    </div>
    </>
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
      page: props.params?.slug
    },
  };
};
