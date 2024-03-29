import type {
  LoaderArgs,
  V2_MetaFunction,
  HeadersFunction,
  SerializeFrom,
} from "@vercel/remix";
import { json, redirect } from "@vercel/remix";
import { useLoaderData } from "@remix-run/react";
import { parseISO, format } from "date-fns";

import invariant from "tiny-invariant";

import { MarkdownView } from "~/components/Markdown";
import { parseMarkdown } from "~/utils/markdoc.server";

import { getContent } from "~/utils/blog.server";
import { CacheControl } from "~/utils/cache-control.server";
import { getSeo } from "~/seo";

export const loader = async ({ params }: LoaderArgs) => {
  let path = params["*"];

  invariant(path, "BlogPost: path is required");

  if (!path) {
    throw new Error("path is not defined");
  }

  const files = await getContent(`docs/${path}`);
  let post = files && parseMarkdown(files[0].content);

  //invariant(post, "Not found");
  if (!post) {
    throw json(
      {},
      {
        status: 404,
        headers: {},
      }
    );
  }

  return json(
    { post },
    {
      headers: {
        "Cache-Control": new CacheControl("swr").toString(),
      },
    }
  );
};

export const headers: HeadersFunction = ({ loaderHeaders }) => {
  return {
    "Cache-Control": loaderHeaders.get("Cache-Control")!,
  };
};

export const meta: V2_MetaFunction = ({ data, matches }) => {
  if (!data) return [];

  const parentData = matches.flatMap((match) => match.data ?? []);

  return [
    getSeo({
      title: data.post.frontmatter.meta.title,
      description: data.post.frontmatter.meta.description,
      url: `${parentData[0].requestInfo.url}`,
    }),
  ];
};

export default function BlogPost() {
  const { post } = useLoaderData<typeof loader>();

  return (
    <div className="flex flex-col items-start justify-center w-full max-w-4xl mx-auto mb-16">
      <article className="flex flex-col items-start justify-center w-full max-w-4xl mx-auto mb-16">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-black md:text-5xl dark:text-white">
          {post.frontmatter.meta.title}
        </h1>
        <div className="flex flex-col items-start justify-between w-full mt-2 md:flex-row md:items-center">
          <div className="flex items-center space-x-2"></div>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 min-w-32 md:mt-0">
            {post.readTime.text}
          </p>
        </div>
        <div className="w-full mt-4 prose dark:prose-dark max-w-none">
          {post.body && <MarkdownView content={post.body} />}
        </div>
      </article>
    </div>
  );
}
