import path from "path";
import fs from "fs";
import { cwd } from "process";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";
// Type definitions
export interface Heading {
  level: number;
  text: string;
  id: string;
}

export interface FrontMatter {
  Project?: string;
  Status?: string;
  Priority?: string;
  Tags?: string[];
  "Search-Keywords"?: string[];
  [key: string]: unknown;
}

export interface MarkdownData {
  frontMatter: FrontMatter;
  content: string;
  htmlContent: string;
  headings: Heading[];
}

// Generate unique slug from text for anchor id
function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

// Extract headings from raw markdown content
function extractHeadings(rawContent: string): Heading[] {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  const headings: Heading[] = [];
  let match;

  while ((match = headingRegex.exec(rawContent)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = generateSlug(text);
    headings.push({ level, text, id });
  }

  return headings;
}

function addIdsToHeadings(htmlContent: string): string {
  return htmlContent.replace(
    /<h([1-6])([^>]*)>(.*?)<\/h\1>/g,
    (_, level, attrs, text) => {
      const cleanText = text.replace(/<[^>]*>/g, "").trim();
      const id = generateSlug(cleanText);
      return `<h${level}${attrs} id="${id}">${text}</h${level}>`;
    },
  );
}

async function convertToMarkDown(data: string) {
  const file = await remark().use(remarkHtml).process(data);
  return String(file);
}

export async function extractGrayMatter(data: string): Promise<MarkdownData> {
  const { data: frontMatter, content } = matter(data);
  const headings = extractHeadings(content);
  const htmlContent = await convertToMarkDown(content);
  const htmlContentWithId = addIdsToHeadings(htmlContent); // Add IDs to headings for anchor links

  return {
    frontMatter,
    content,
    htmlContent: htmlContentWithId,
    headings,
  };
}

export async function readMarkdownFile(): Promise<MarkdownData[]> {
  const dirLocation = path.join(cwd(), "content");

  return new Promise<MarkdownData[]>((resolve, reject) => {
    fs.readdir(dirLocation, async (err: Error | null, files: string[]) => {
      if (err) {
        console.error("Error reading directory:", err);
        reject(err);
        return;
      }

      const allMarkdownData: MarkdownData[] = [];

      for (const file of files) {
        if (!file.endsWith(".md")) continue;

        try {
          const data = fs.readFileSync(path.join(dirLocation, file), "utf-8");
          const markdownData = await extractGrayMatter(data);
          allMarkdownData.push(markdownData);
        } catch (error) {
          console.error(`Error processing file ${file}:`, error);
        }
      }

      resolve(allMarkdownData);
    });
  });
}

export async function getMarkdownByProject(
  projectName: string,
): Promise<MarkdownData | null> {
  const allFiles = await readMarkdownFile();
  const found = allFiles.find(
    (file: MarkdownData) => file.frontMatter.Project === projectName,
  );
  return found || null;
}
