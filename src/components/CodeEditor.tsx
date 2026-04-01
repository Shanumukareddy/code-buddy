import React from "react";
import { cn } from "@/lib/utils";

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  language: string;
  placeholder?: string;
  readOnly?: boolean;
  className?: string;
  minHeight?: string;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  value,
  onChange,
  placeholder = "Paste your code here...",
  readOnly = false,
  className,
  minHeight = "300px",
}) => {
  return (
    <div className={cn("relative rounded-lg overflow-hidden border border-border", className)}>
      <div className="flex items-center gap-2 px-4 py-2 bg-muted border-b border-border">
        <span className="w-3 h-3 rounded-full bg-destructive/60" />
        <span className="w-3 h-3 rounded-full bg-warning/60" />
        <span className="w-3 h-3 rounded-full bg-success/60" />
        <span className="ml-2 text-xs text-muted-foreground font-mono">
          {readOnly ? "Output" : "Editor"}
        </span>
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        readOnly={readOnly}
        placeholder={placeholder}
        spellCheck={false}
        className={cn(
          "w-full font-mono text-sm p-4 bg-code text-code-foreground resize-none focus:outline-none",
          readOnly && "cursor-default"
        )}
        style={{ minHeight }}
      />
    </div>
  );
};

export default CodeEditor;
