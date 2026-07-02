import type { Metadata } from "next";
import PostContent from "./PostContent";
import { getStaticPost } from "../staticPosts";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const staticPost = getStaticPost(slug);

  if (staticPost) {
    return {
      title: staticPost.seoTitle,
      description: staticPost.metaDescription,
      alternates: {
        canonical: `https://janefinchcannabis.ca/blog/${slug}`,
      },
    };
  }

  const title = slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return {
    title: `${title} - Blog | Jane Finch Cannabis`,
    description: `Read about ${title.toLowerCase()} and other cannabis guides from Jane Finch Cannabis in North York.`,
    alternates: {
      canonical: `https://janefinchcannabis.ca/blog/${slug}`,
    },
  };
}

export default function BlogPostPage() {
  return <PostContent />;
}
