import { SearchIcon } from "@heroicons/react/solid";
import { Formik, Form, Field } from "formik";
import { GetStaticProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import getPages from "../helpers/getPages";
import removeDupes from "../helpers/removeDupes";

export default function Search(props: { data: any }) {
  const router = useRouter();
  const { q } = router.query;

  if (!q) {
    return (
      <div className="">
        <h1 className="font-extrabold text-4xl mt-24 mb-4">Search anything!</h1>

        <Formik
          initialValues={{ search: "" }}
          onSubmit={(values) => {
            router.push(`/search?q=${values.search}`);
          }}
        >
          <Form>
            <div className="relative w-min">
              <Field
                name="search"
                type="search"
                className="rounded-lg text-sm border-none w-96 shadow-lg"
              />
              <button type="submit">
                <SearchIcon className="absolute right-0 top-2 mr-2 w-5 h-5 text-gray-400" />
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    );
  }

  const data = handler(props.data, q as unknown as string);

  console.log(data);
  return (
    <div className="">
      <h1 className="font-extrabold text-4xl mt-24 mb-4">
        Search results for &#34;{q}&#34;
      </h1>

      <Formik
        initialValues={{ search: "" }}
        onSubmit={(values) => {
          router.push(`/search?q=${values.search}`);
        }}
      >
        <Form>
          <div className="relative w-min">
            <Field
              name="search"
              type="search"
              className="rounded-lg text-sm border-none w-96 shadow-lg"
            />
            <button type="submit">
              <SearchIcon className="absolute right-0 top-2 mr-2 w-5 h-5 text-gray-400" />
            </button>
          </div>
        </Form>
      </Formik>
      <div className="mt-8 flex  divide-y divide-gray-900/20 flex-col">
        {data.data.map(
          (v: {
            title: string;
            description: string;
            slug: string;
            keywords: string[];
          }) => (
            <div className="py-6" key={v.slug}>
              <h2 className="font-extrabold text-2xl mb-2">{v.title}</h2>
              {v.keywords.slice(0, 6).map((keyword) => (
                <span
                  className="inline-block bg-gray-300 rounded-full px-3 py-0.5 text-sm font-semibold text-gray-700 mr-2"
                  key={keyword}
                >
                  {keyword}
                </span>
              ))}
              <p className="text-gray-600 max-w-xl mt-4 mb-6">
                {v.description}
              </p>
              <Link href={`/${v.slug}`}>
                <a>
                  <button className="inline-block text-center rounded-lg px-5 py-2 -translate-y-1.5 hover:-translate-y-2.5 duration-300  text-white bg-accent shadow-md">
                    Read 📜
                  </button>
                </a>
              </Link>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const pages = getPages();
  return {
    props: {
      data: pages,
    },
  };
}

interface Pages {
  slug: string;
  data: {
    [key: string]: any;
  };
}

function handler(
  pages: Pages[],
  query: string
): {
  success: boolean;
  data: Array<{
    title: string;
    description: string;
    slug: string;
    keywords: string[];
  }>;
} {
  pages.unshift({
    slug: "quests",
    data: {
      title: "Quests",
      description:
        "This article will help you understand the quests in the game.",
      keywords: ["quest", "questing", "missions"],
    },
  });
  const searchList: string[] = query
    .normalize()
    .replaceAll("?", "")
    .toLowerCase()
    .split("-");

  //if (search.length > 20)

  let r: Array<{
    title: string;
    description: string;
    slug: string;
    keywords: string[];
  }> = [];
  try {
    pages.map((page) => {
      searchList.map((search: string) => {
        if (page.slug.toLowerCase().includes(search)) {
          r.push({
            title: page.data.title,
            description: page.data.description,
            slug: page.slug,
            keywords: page.data.keywords,
          });
        } else if (page.data.keywords) {
          page.data.keywords.map((keyword: string) => {
            if (keyword.toLowerCase().includes(search)) {
              r.push({
                title: page.data.title,
                description: page.data.description,
                slug: page.slug,
                keywords: page.data.keywords,
              });
            }
          });
        }
      });
    });
  } catch (e) {
    console.log(e);
  }

  return { success: r.length != 0, data: removeDupes(r) };
}
