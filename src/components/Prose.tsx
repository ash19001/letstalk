import { MDXRemote } from "next-mdx-remote/rsc";

/** Renders a Markdown/MDX body from the content folder in the page's text style. */
export function Prose({ source, className }: { source: string; className?: string }) {
  return (
    <div className={["prose-lt", className].filter(Boolean).join(" ")}>
      <MDXRemote source={source} />
    </div>
  );
}
