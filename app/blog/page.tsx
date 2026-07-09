import type { Metadata } from "next";
import BlogContent from "./BlogContent";

export const metadata: Metadata = {
  title: "Cannabis Blog & Guides — Jane Finch Cannabis | North York",
  description: "Read the latest strain reviews, dosing guides, and cannabis news from Jane Finch Cannabis in North York.",
  alternates: {
    canonical: "https://www.janefinchcannabis.ca/blog",
  },
};

export default function BlogPage() {
  return <BlogContent />;
}
