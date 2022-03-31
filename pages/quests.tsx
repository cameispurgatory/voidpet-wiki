import { CashIcon, LocationMarkerIcon, SearchIcon, UserIcon } from "@heroicons/react/solid";
import { Formik, Form, Field, useFormik } from "formik";
import { GetStaticProps } from "next";
import Link from "next/link";
import { useState } from "react";
import getPages from "../helpers/getPages";

export default function Search(props: { data: any }) {
  const [data, setData] = useState(handler(props.data, ""));
  const formik = useFormik({
    initialValues: { filter: "" },

    onSubmit: (values) => {
      setData(handler(props.data, values.filter));
    },
  });
  return (
    <div className="">
      <h1 className="font-extrabold text-4xl mt-24 mb-4">Filter by Name</h1>

      <form onSubmit={formik.handleSubmit}>
        <div className="relative w-min">
          <input
            id="filter"
            name="filter"
            type="search"
            onChange={(e) => {
              formik.handleChange(e);
              setData(handler(props.data, e.target.value));
            }}
            onBlur={formik.handleBlur}
            value={formik.values.filter}
            className="rounded-lg text-base border-none w-96 shadow-lg !pr-10"
          />
          <button type="submit">
            <SearchIcon className="absolute right-0 top-2 mr-2 w-5 h-5 text-gray-400" />
          </button>
        </div>
      </form>
      <div className="mt-8 flex  divide-y divide-gray-900/20 flex-col">
        {data.data.map((v) => (
          <div className="py-6" key={v.slug}>
            <h2 className="font-extrabold text-2xl mb-2">{v.title}</h2>

            <p className="text-gray-600 max-w-xl mb-4 truncate">
              {v.description}
            </p>
            <div className="flex space-x-4 mb-6">
              <div className=" bg-gray-300 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 flex items-center">
                <CashIcon className="w-5 h-5 text-gray-600 mr-2" />
                {v.sidebar.reward}
              </div>
              <div className=" bg-gray-300 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 flex items-center">
                <LocationMarkerIcon className="w-5 h-5 text-gray-600 mr-2" />
                {v.sidebar.location}
              </div>
              <div className=" bg-gray-300 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 flex items-center">
                <UserIcon className="w-5 h-5 text-gray-600 mr-2" />
                {v.sidebar.starterNPC}
              </div>
            </div>
            <Link href={`/${v.slug}`}>
              <a>
                <button className="inline-block text-center rounded-lg px-5 py-2 -translate-y-1.5 hover:-translate-y-2.5 duration-300  text-white bg-accent shadow-md">
                  Explore 🌎
                </button>
              </a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const pages = getPages();
  let r: any[] = [];
  pages.map((page) => {
    if (page.data.category) {
      if ((page.data.category as string).includes("quest")) {
        r.push(page);
      }
    }
  });
  return {
    props: {
      data: r,
    },
  };
};

interface Pages {
  slug: string;
  data: {
    [key: string]: any;
  };
}

export interface MainData {
  title: string;
  description: string;
  slug: string;
  category: string;
  sidebar: {
    type: string;
    name: string;
    length: string;
    location: string;
    starterNPC: string;
    reward: string;
  };
}

function handler(
  pages: Pages[],
  query: string
): {
  success: boolean;
  data: MainData[];
} {
  const searchList: string[] = query
    .normalize()
    .replace("?", "")
    .toLowerCase()
    .split("-");

  //if (search.length > 20)

  let r: MainData[] = [];
  try {
    pages.map((page) => {
      searchList.map((search: string) => {
        if (page.slug.toLowerCase().includes(search)) {
          r.push({
            title: page.data.title,
            description: page.data.description,
            slug: page.slug,
            category: page.data.category,
            sidebar: page.data.sidebar,
          });
        }
      });
    });
  } catch (e) {
    console.log(e);
  }

  return { success: r.length != 0, data: r };
}
