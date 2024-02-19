/*
The server side part of our markdoc markdown processing.
*/

import { parse, transform, type Config } from "@markdoc/markdoc";
import { Callout, QuickLink, QuickLinks } from "~/components/Markdown";
import fm from 'front-matter';
import calculateReadingTime from 'reading-time'



export function parseMarkdown(markdown: string, options: Config = {}) {
	const { attributes } = fm(markdown);
	const readTime = calculateReadingTime(markdown)
	const fence = {
		render: "Fence",
		attributes: {
			language: {
				type: String,
			},
		},
	};

	return {
		frontmatter: attributes,
		readTime: readTime,
		body: transform(parse(markdown), {
			tags: {
				callout: Callout.scheme,
				"quick-links": QuickLinks.scheme,
				"quick-link": QuickLink.scheme,
			},
			nodes: {
				fence
			}
		})
	}
}