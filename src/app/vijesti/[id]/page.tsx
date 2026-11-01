import React from "react";
import { allNewsArticles } from "@/lib/newsData";
import SingleNewsClient from "./SingleNewsClient";

export async function generateStaticParams() {
  return allNewsArticles.map((article) => ({
    id: String(article.id),
  }));
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function SingleNewsPage({ params }: PageProps) {
  const resolvedParams = await params;
  const idNum = Number(resolvedParams.id);
  const article = allNewsArticles.find((a) => a.id === idNum) || allNewsArticles[0];

  const related = allNewsArticles
    .filter((a) => a.id !== article.id && a.category === article.category)
    .slice(0, 3);

  return <SingleNewsClient article={article} related={related} />;
}
