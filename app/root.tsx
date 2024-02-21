import type {
  HeadersFunction,
  LinksFunction,
  LoaderFunction,
  V2_MetaFunction,
} from "@vercel/remix";
import { json } from "@vercel/remix";
import {
  Links,
  useLoaderData,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
} from "@remix-run/react";

import { ThemeBody, ThemeHead, ThemeProvider } from "~/utils/theme-provider";
import { Theme } from "~/utils/theme-provider";
import { getThemeSession } from "~/utils/theme.server";

import { CacheControl } from "~/utils/cache-control.server";
import ErrorPage from "~/components/ErrorPage";

import tailwindStyles from "./styles/tailwind.css";
import fontStyles from "./styles/fonts.css";
import highlightingStyles from "prismjs/themes/prism-tomorrow.css";
//import type {SideBarItem, SidebarGroup} from '~/utils/docs.server';
import Container from "~/components/layout/Container";

import { getDomainUrl, removeTrailingSlash } from "~/utils";

import config from "~/docs.config";
import { getSeo } from "~/seo";

export const meta: V2_MetaFunction = ({ data, matches }) => {
  if (!data) return [];

  return [
    getSeo({
      title: config.title,
      description: config.description,
      url: data.canonical ? data.canonical : "",
    }),
  ];
};

export const handle = {
  id: "root",
};

export type LoaderData = {
  theme: Theme | null;
  canonical?: string;
  requestInfo: {
    url: string;
    origin: string;
    path: string;
  } | null;
};

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: fontStyles },
  { rel: "stylesheet", href: tailwindStyles },
  { rel: "stylesheet", href: highlightingStyles },
];

export const headers: HeadersFunction = () => {
  return { "Cache-Control": new CacheControl("swr").toString() };
};

export const loader: LoaderFunction = async ({ request }) => {
  const themeSession = await getThemeSession(request);

  const url = getDomainUrl(request);
  const path = new URL(request.url).pathname;

  return json(
    {
      theme: themeSession.getTheme(),
      canonical: removeTrailingSlash(`${url}${path}`),
      requestInfo: {
        url: removeTrailingSlash(`${url}${path}`),
        origin: url,
        path: new URL(request.url).pathname,
      },
    },
    {
      headers: {
        "Set-Cookie": await themeSession.commit(),
      },
    }
  );
};
function App() {
  const data = useLoaderData<LoaderData>();
  const { theme } = data;
  return (
    <html
      lang="en"
      className={theme ?? ""}
    >
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1"
        />
        <meta
          content="Well-organized and comprehensive documentation for Shelf which is a free open source asset management software that makes it easy to track, label, and maintain all your company's equipment and inventory in one place."
          name="description"
        />
        <meta
          content="Docs for Shelf - Free Open Source Asset Management Software"
          property="og:title"
        />
        <meta
          content="Well-organized and comprehensive documentation for Shelf which is a free open source asset management software that makes it easy to track, label, and maintain all your company's equipment and inventory in one place."
          property="og:description"
        />
        <meta
          content="https://assets-global.website-files.com/64186faca4f0a0ec048fb2dd/64257e8ed4819a22217e0504_open-graph-default.jpg"
          property="og:image"
        />
        <meta
          content="Docs for Shelf - Free Open Source Asset Management Software"
          property="twitter:title"
        />
        <meta
          content="Well-organized and comprehensive documentation for Shelf which is a free open source asset management software that makes it easy to track, label, and maintain all your company's equipment and inventory in one place."
          property="twitter:description"
        />
        <meta
          content="https://assets-global.website-files.com/64186faca4f0a0ec048fb2dd/64257e8ed4819a22217e0504_open-graph-default.jpg"
          property="twitter:image"
        />
        <meta
          property="og:type"
          content="website"
        />
        <meta
          content="summary_large_image"
          name="twitter:card"
        />
        <meta
          content="width=device-width, initial-scale=1"
          name="viewport"
        />
        <Meta />
        {data.requestInfo && (
          <link
            rel="canonical"
            href={removeTrailingSlash(
              `${data.requestInfo.origin}${data.requestInfo.path}`
            )}
          />
        )}
        <Links />
        <ThemeHead ssrTheme={Boolean(data.theme)} />
      </head>
      <body>
        <Container>
          <Outlet />
        </Container>
        <ThemeBody ssrTheme={Boolean(data.theme)} />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export default function AppWithProviders() {
  const data = useLoaderData<LoaderData>();

  return (
    <ThemeProvider specifiedTheme={data.theme}>
      <App />
    </ThemeProvider>
  );
}

export function ErrorBoundary() {
  let error = useRouteError();
  let status = "500";
  let message = "";
  let stacktrace;

  // when true, this is what used to go to `CatchBoundary`
  if (error.status === 404) {
    status = 404;
    message = "Page Not Found";
  } else if (error instanceof Error) {
    status = "500";
    message = error.message;
    stacktrace = error.stack;
  } else {
    status = "500";
    message = "Unknown Error";
  }
  return (
    <ErrorDocument title="Error!">
      <ErrorPage
        code={status}
        title={`There was an error`}
        message={message}
      />
    </ErrorDocument>
  );
}

function ErrorDocument({
  children,
  title,
}: {
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <html
      className="h-full"
      lang="en"
    >
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1"
        />
        {title ? <title>{title}</title> : null}
        <Meta />
        <Links />
      </head>
      <body className="h-full">
        {children}
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}
