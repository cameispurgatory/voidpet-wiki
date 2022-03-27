import { SearchIcon } from "@heroicons/react/solid";
import { Formik, Form, Field } from "formik";
import { useRouter } from "next/router";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Search(props: { content: string }) {
  const router = useRouter();
  const { q } = router.query;
  

  const { data, error } = useSWR("/api/search?search=" + q, fetcher);

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

  if (!data) {
    return <h1 className="font-extrabold text-4xl mt-24">Awaiting Data...</h1>;
  }

  if (error) {
    console.log(error);
    return (
      <h1 className="font-extrabold text-4xl mt-24">
        An unknown error occurred.
      </h1>
    );
  }

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
              {v.keywords.map((keyword) => (
                <span className="inline-block bg-gray-300 rounded-full px-3 py-0.5 text-sm font-semibold text-gray-700 mr-2" key={keyword}>
                  {keyword}
                </span>
              ))}
              <p className="text-gray-600 max-w-xl mt-4 mb-6">{v.description}</p>
              <button className="inline-block text-center rounded-lg px-5 py-2 -translate-y-1.5 hover:-translate-y-2.5 duration-300  text-white bg-accent shadow-md">
                Read 📜
              </button>
            </div>
          )
        )}
      </div>
    </div>
  );
}
