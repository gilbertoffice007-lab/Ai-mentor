import React from 'react';

/**
 * Tiny dependency-free markdown renderer for mentor chat bubbles.
 * Supports: ### headings, **bold**, *italic*, `inline code`,
 * fenced code blocks, - unordered and 1. ordered lists, line breaks.
 * Builds React nodes only (no innerHTML — XSS safe).
 */

function renderInline(text: string, keyPrefix: string): React.ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*\n]+\*|`[^`]+`)/g);
  return parts.map((part, i) => {
    const key = `${keyPrefix}-${i}`;
    if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
      return (
        <strong key={key} className="font-bold text-white">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith('*') && part.endsWith('*') && part.length > 2 && !part.startsWith('**')) {
      return (
        <em key={key} className="text-cyan-200 not-italic font-medium">
          {part.slice(1, -1)}
        </em>
      );
    }
    if (part.startsWith('`') && part.endsWith('`') && part.length > 2) {
      return (
        <code
          key={key}
          className="px-1.5 py-0.5 rounded-md bg-slate-950/80 border border-slate-700/60 text-cyan-300 font-mono text-[0.92em] whitespace-nowrap"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    return <React.Fragment key={key}>{part}</React.Fragment>;
  });
}

export const Markdown: React.FC<{ text: string }> = ({ text }) => {
  const lines = (text || '').split('\n');
  const blocks: React.ReactNode[] = [];
  let i = 0;
  let listBuf: { ordered: boolean; items: string[] } | null = null;

  const flushList = () => {
    if (!listBuf) return;
    const { ordered, items } = listBuf;
    listBuf = null;
    const cls = ordered ? 'list-decimal' : 'list-disc';
    blocks.push(
      <ul key={`b-${blocks.length}`} className={`${cls} ml-4 sm:ml-5 space-y-1 marker:text-indigo-400`}>
        {items.map((item, j) => (
          <li key={j} className="leading-relaxed">
            {renderInline(item, `li-${blocks.length}-${j}`)}
          </li>
        ))}
      </ul>
    );
  };

  while (i < lines.length) {
    const line = lines[i];

    // Fenced code block
    if (line.trim().startsWith('```')) {
      flushList();
      const codeLines: string[] = [];
      i += 1;
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        codeLines.push(lines[i]);
        i += 1;
      }
      i += 1; // skip closing fence
      blocks.push(
        <pre
          key={`b-${blocks.length}`}
          className="my-1.5 p-2.5 sm:p-3 rounded-xl bg-slate-950/90 border border-slate-700/60 overflow-x-auto font-mono text-[11px] sm:text-xs leading-relaxed text-emerald-300"
        >
          {codeLines.join('\n')}
        </pre>
      );
      continue;
    }

    // Headings
    const heading = line.match(/^(#{1,4})\s+(.*)$/);
    if (heading) {
      flushList();
      const level = heading[1].length;
      const sizes = ['text-sm sm:text-base', 'text-xs sm:text-sm', 'text-xs sm:text-sm', 'text-xs'];
      blocks.push(
        <p key={`b-${blocks.length}`} className={`font-extrabold text-white mt-2 first:mt-0 ${sizes[Math.min(level, 4) - 1]}`}>
          {renderInline(heading[2], `h-${blocks.length}`)}
        </p>
      );
      i += 1;
      continue;
    }

    // Unordered list item
    const ul = line.match(/^\s*[-*•]\s+(.*)$/);
    if (ul) {
      if (!listBuf || listBuf.ordered) {
        flushList();
        listBuf = { ordered: false, items: [] };
      }
      listBuf.items.push(ul[1]);
      i += 1;
      continue;
    }

    // Ordered list item
    const ol = line.match(/^\s*\d+[.)]\s+(.*)$/);
    if (ol) {
      if (!listBuf || !listBuf.ordered) {
        flushList();
        listBuf = { ordered: true, items: [] };
      }
      listBuf.items.push(ol[1]);
      i += 1;
      continue;
    }

    flushList();
    if (line.trim() === '') {
      blocks.push(<div key={`b-${blocks.length}`} className="h-1.5" />);
    } else {
      blocks.push(
        <p key={`b-${blocks.length}`} className="leading-relaxed">
          {renderInline(line, `p-${blocks.length}`)}
        </p>
      );
    }
    i += 1;
  }
  flushList();

  return <div className="space-y-1 min-w-0">{blocks}</div>;
};
