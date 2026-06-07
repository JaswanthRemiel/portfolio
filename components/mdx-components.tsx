import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import Image from "next/image";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="text-3xl font-sf-bold text-foreground mt-8 mb-4">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-sf-medium text-foreground mt-8 mb-3">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-sf-medium text-foreground mt-6 mb-2">{children}</h3>
    ),
    p: ({ children }) => (
      <p className="text-muted-foreground leading-relaxed mb-4 font-sf-regular">{children}</p>
    ),
    a: ({ href, children }) => (
      <Link
        href={href || "#"}
        className="text-orange-500 hover:text-orange-400 underline underline-offset-4 transition-colors"
        target={href?.startsWith("http") ? "_blank" : undefined}
        rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
      >
        {children}
      </Link>
    ),
    ul: ({ children }) => (
      <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground ml-4">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal list-inside space-y-2 mb-4 text-muted-foreground ml-4">
        {children}
      </ol>
    ),
    li: ({ children }) => <li className="text-muted-foreground">{children}</li>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-orange-500 pl-4 my-4 italic text-muted-foreground">
        {children}
      </blockquote>
    ),
    code: ({ children, className }) => {
      const isInline = !className;
      if (isInline) {
        return (
          <code className="bg-card text-orange-400 px-1.5 py-0.5 rounded text-sm font-mono">
            {children}
          </code>
        );
      }
      return (
        <code className={`${className} font-mono`}>{children}</code>
      );
    },
    pre: ({ children }) => (
      <pre className="bg-card border border-border rounded-lg p-4 overflow-x-auto mb-4 text-sm max-w-full">
        {children}
      </pre>
    ),
    img: ({ src, alt }) => (
      <Image
        src={src || ""}
        alt={alt || ""}
        width={800}
        height={400}
        className="rounded-lg my-6 w-full max-w-full h-auto"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 800px"
        quality={80}
      />
    ),
    hr: () => <hr className="border-border my-8" />,
    table: ({ children }) => (
      <div className="overflow-x-auto mb-4">
        <table className="min-w-full border border-border rounded-lg">
          {children}
        </table>
      </div>
    ),
    th: ({ children }) => (
      <th className="border border-border px-4 py-2 bg-card text-left text-foreground font-sf-medium">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="border border-border px-4 py-2 text-muted-foreground">
        {children}
      </td>
    ),
    ...components,
  };
}

// Custom components for MDX
export const Callout = ({
  children,
  type = "info",
}: {
  children: React.ReactNode;
  type?: "info" | "warning" | "error";
}) => {
  const colors = {
    info: "bg-blue-500/10 border-blue-500 text-blue-400",
    warning: "bg-yellow-500/10 border-yellow-500 text-yellow-400",
    error: "bg-red-500/10 border-red-500 text-red-400",
  };

  return (
    <div className={`border-l-4 p-4 my-4 rounded-r-lg ${colors[type]}`}>
      {children}
    </div>
  );
};
