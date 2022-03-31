import { GetServerSideProps } from "next"
import getPages from "../helpers/getPages"
import { MainData } from "./quests"

const EXTERNAL_DATA_URL = 'https://wiki.voidpet.io'

function generateSiteMap(posts: {
	slug: string;
	data: {
			[key: string]: any;
	};
}[]) {
	let newPosts: String[] = [];
	posts.map((post) => {
		newPosts.push(post.slug)
	})
	const pages = ["", "quests", "search"]
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     ${newPosts.concat(pages)
       .map((slug) => {
         return `
       <url>
           <loc>${`${EXTERNAL_DATA_URL}/${slug}`}</loc>
       </url>
     `
       })
       .join('')}
   </urlset>
 `
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const pages = getPages();
	const sitemap = generateSiteMap(pages)

	res.setHeader('Content-Type', 'text/xml')
  // we send the XML to the browser
  res.write(sitemap)
  res.end()

  return {
    props: {
      data: pages,
    },
  };
}

export default SiteMap;