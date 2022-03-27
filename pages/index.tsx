import { GetStaticProps } from "next";
import Link from "next/link";
import PostCard from "../components/PostCard";
import getPages from "../helpers/getPages";

export default function Home(props: { pages: [key: string] }) {
  return (
    <div className="mt-16 text-gray-800 flex">
      {/*Left Side*/}

      <div>
        {/**/}
        <h1 className="font-bold text-3xl text-gray-900 mb-2">Welcome</h1>
        <p>
          Welcome to the Voidpet Wiki! After many google docs, google docs
          linking to other google docs, and another{" "}
          <a
            className="link"
            target="_blank"
            href="https://docs.google.com/document/d/1jegHrtkwL5z7BnJm-T9Zbl3iNKi8p6qhoLWPMM0whUs/edit"
            rel="nooppener noreferrer"
          >
            google doc
          </a>{" "}
          linking to all of those google docs, I decided to make this wiki. If
          you have the time, please{" "}
          <Link href="/contribute">
            <a className="link">contribute</a>
          </Link>
          ! No coding experiance required. Voidpet is very new and this wiki
          will probably need constant updates, so all help is appreciated.{" "}
        </p>
        <h1 className="mt-8 font-bold text-3xl mb-2">What is Voidpet</h1>
        <p className="">
          Voidpet (otherwise known as the old name nightmares) is a
          Pokemon-inspired game that bases itself around emotions! Just like
          Pokemon, Voidpets evolve into bigger creatures. It's to help make
          people aware of others' situations and how they deal with mental
          issues and trauma.
        </p>

        {/*Featured Pages! Feel free to insert your article here (make sure it's interesting!)
        
        You can copy one of the already added `Featured` components and rewrite it to bge your own. 
        Please keep descriptions short and to the point.
        */}

        <h1 className="mt-8 font-bold text-3xl mb-2">Featured Pages</h1>

        {/*posts.map((post) => (
        <PostCard
          key={post.slug}
          title={post.data.title}
          date={post.data.date}
          description={post.data.description}
          slug={post.slug}
        />
      ))*/}
      </div>

      {/*Right side*/}

      <div className="max-w-xs w-full ml-10 space-y-10">
        {/*First Box*/}
        <div className="rounded-lg p-4 bg-gray-50 flex flex-col shadow-lg">
          <h2 className="text-2xl text-gray-800 text-center font-semibold">
            Latest Update
          </h2>
          <hr className="w-10 mx-auto mt-1 mb-4" />
          <ul className="list-disc list-inside mb-8 text-gray-700">
            <li>You can complete your first quest</li>
            <li>You can increase your skills</li>
            <li>You can obtain void matter by killing &gt;1 level opponents</li>
            <li>
              Giga is a way to support the devs and get ingame items such as
              wings, void matter, and boucing pets
            </li>
          </ul>
          <button className="inline-block text-center rounded-lg px-5 py-2 -translate-y-1.5 hover:-translate-y-2.5 duration-300  text-white bg-accent shadow-md">
            Learn More 📚
          </button>
        </div>
        {/*Second Box*/}
        <div className="rounded-lg p-4 bg-gray-50 flex flex-col shadow-lg">
          <h2 className="text-2xl text-gray-800 text-center font-semibold">
            Starter Guide
          </h2>
          <hr className="w-10 mx-auto mt-1 mb-4" />
          <p className="mb-8 text-gray-700">
            Voidpet is full of mysteries and fun mechanics. While this guide
            won't divulge the details of the secret, it will give you a wealth
            of knowladge every earlygame player should know.
            <div className=" italic text-xs text-gray-600">
              to find the secret you must search for the secret
            </div>
          </p>
          <button className="inline-block text-center rounded-lg px-5 py-2 -translate-y-1.5 hover:-translate-y-2.5 duration-300  text-white bg-accent shadow-md">
            Get Started 🚀
          </button>
        </div>
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps = () => {
  const pages = getPages();

  return {
    props: {
      pages,
    },
  };
};

function Featured(props: { name: string; description: string; link: string }) {
  return <></>;
}
