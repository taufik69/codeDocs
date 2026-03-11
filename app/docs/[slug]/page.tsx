import Content from "@/components/Content";
import { readMarkdownFile } from "@/utils/markdown";

import React from "react";

const page = async ({ params }: { params: { slug: string } }) => {
  const { slug } = await params;
  const markdownFiles = await readMarkdownFile();
  const matter = markdownFiles.filter(
    (file) => file.frontMatter.Project === slug,
  );

  return (
    <div>
      <Content htmlContent={matter[0].htmlContent} />
    </div>
  );
};

export default page;
