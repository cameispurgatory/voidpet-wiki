import { SearchIcon } from "@heroicons/react/solid";
import { Formik, Form, Field } from "formik";
import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import { isContext } from "vm";
import getPages from "../helpers/getPages";
import removeDupes from "../helpers/removeDupes";

export default function Search(props: { data: any }) {
  console.log(props.data);
  return (
    <div className="mt-24">
      <h1 className="font-extrabold text-4xl ">Quests</h1>
      <header className="text-gray-600 text-sm mb-12 max-w-xl mt-4">
        This article will help you understand the quests in the game.
      </header>
      <div className="prose">
        {props.data.map(
          (page: {
            slug: string;
            data: {
              title: string;
              description: string;
              slug: string;
              keywords: string[];
            };
          }) => (
            <>
              
                <table className="w-min">
									<tr>
											<th>Test</th>
											<th>Test</th>
											<th>Test</th>
										</tr>
									<tbody>
										<tr>
											<td>Test</td>
											<td>Test</td>
											<td>Test</td>
										</tr>
									</tbody>

								</table>
								<div className="grid grid-flow-col auto-cols-max gap-8">
									<div>
											<h4>Test</h4>
											<p>Contet here</p>
									</div>
									<div>
											<h4>Test</h4>
											<p>More Content here</p>
									</div>
									<div>
											<h4>Test</h4>
											<p>less</p>
									</div>
									<div>
											<h4>Test</h4>
											<p>More Content here</p>
									</div>
									<div>
											<h4>Test</h4>
											<p>More Content here</p>
									</div>
								</div>
              
            </>
          )
        )}
      </div>
      <a
        href=""
        className="rounded-lg shadow-md inline-flex px-4 py-2 font-semibold  mt-8 bg-accent text-white hover:-translate-y-1.5 transition duration-300"
      >
        See All Categories
      </a>
      <div
        onClick={() => alert("Coming soon:tm:")}
        className="rounded-lg bg-gray-50 shadow-md inline-flex px-4 py-2 font-semibold text-gray-800 mt-8 hover:-translate-y-1.5 transition duration-300 ml-4 cursor-pointer"
      >
        Random Article
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const pages = getPages();
	let r: any[] = [];
	pages.map((page) => {
		console.log(page.data.keywords)
		if (page.data.category) {
			if ((page.data.category as string).includes("quest")) {
				r.push(page);
			}
		}
	})
  return {
    props: {
      data: r,
    },
  };
};
