import type { Metadata } from "next";
import BlogContent from "./BlogContent";

export const metadata: Metadata = {
  title: "Jane Finch Cannabis Blog | Cannabis Menu Guides",
  description: "Read Jane Finch Cannabis cannabis menu guides, flower tier notes, and local store checks for North York shoppers.",
  alternates: {
    canonical: "https://www.janefinchcannabis.ca/blog",
  },
};

export default function BlogPage() {
  return <BlogContent />;
}
