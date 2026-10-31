interface ContentItem {
  title: string;
  lines: string[];
  format: 'comment' | 'list' | 'text';
}

interface TabContentProps {
  content: ContentItem;
}

export function TabContent({ content }: TabContentProps) {
  return (
    <div className="font-['Fira_Code',sans-serif] text-sm sm:text-base">
      {content.format === 'comment' && (
        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-[#f8fafc] text-lg">/**</h3>
            {content.lines.map((line, i) => (
              <p key={i} className="text-[#aeb9d0] leading-relaxed">
                {line}
              </p>
            ))}
            <h3 className="text-[#f8fafc] text-lg">*/</h3>
          </div>
        </div>
      )}
      {content.format === 'list' && (
        <div className="space-y-4">
          <p className="text-[#aeb9d0] leading-relaxed">{content.title}</p>
          <ul className="space-y-2 text-[#aeb9d0]">
            {content.lines.map((line, i) => (
              <li key={i}>{`\u2022 ${line}`}</li>
            ))}
          </ul>
        </div>
      )}
      {content.format === 'text' && (
        <div className="space-y-4">
          <p className="text-[#aeb9d0] leading-relaxed">{content.title}</p>
          {content.lines.map((line, i) => (
            <p key={i} className="text-[#aeb9d0] leading-relaxed">
              {line}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
