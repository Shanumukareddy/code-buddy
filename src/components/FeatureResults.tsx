import React from "react";

interface ExplainResultProps {
  data: Record<string, any>;
}

const ExplainResult: React.FC<ExplainResultProps> = ({ data }) => (
  <div className="space-y-4">
    {data.summary && (
      <div className="rounded-lg border border-border bg-card p-4">
        <h3 className="text-sm font-semibold text-foreground mb-2">📝 Summary</h3>
        <p className="text-sm text-muted-foreground whitespace-pre-wrap">{data.summary}</p>
      </div>
    )}
    {data.explanation && (
      <div className="rounded-lg border border-border bg-card p-4">
        <h3 className="text-sm font-semibold text-foreground mb-2">📖 Line-by-Line Explanation</h3>
        <pre className="text-sm text-muted-foreground whitespace-pre-wrap font-mono">{data.explanation}</pre>
      </div>
    )}
    {data.rawResponse && (
      <div className="rounded-lg border border-border bg-card p-4">
        <pre className="text-sm text-muted-foreground whitespace-pre-wrap">{data.rawResponse}</pre>
      </div>
    )}
  </div>
);

interface DebugResultProps {
  data: Record<string, any>;
}

const DebugResult: React.FC<DebugResultProps> = ({ data }) => (
  <div className="space-y-4">
    {data.issues && (
      <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4">
        <h3 className="text-sm font-semibold text-destructive mb-2">🐛 Issues Found</h3>
        <p className="text-sm text-foreground whitespace-pre-wrap">{data.issues}</p>
      </div>
    )}
    {data.fixedCode && (
      <div className="rounded-lg border border-success/30 bg-success/5 p-4">
        <h3 className="text-sm font-semibold text-foreground mb-2">✅ Fixed Code</h3>
        <pre className="text-sm text-foreground whitespace-pre-wrap font-mono bg-code text-code-foreground p-3 rounded">{data.fixedCode}</pre>
      </div>
    )}
    {data.explanation && (
      <div className="rounded-lg border border-border bg-card p-4">
        <h3 className="text-sm font-semibold text-foreground mb-2">💡 Explanation</h3>
        <p className="text-sm text-muted-foreground whitespace-pre-wrap">{data.explanation}</p>
      </div>
    )}
    {data.rawResponse && (
      <div className="rounded-lg border border-border bg-card p-4">
        <pre className="text-sm text-muted-foreground whitespace-pre-wrap">{data.rawResponse}</pre>
      </div>
    )}
  </div>
);

interface ComplexityResultProps {
  data: Record<string, any>;
}

const ComplexityResult: React.FC<ComplexityResultProps> = ({ data }) => (
  <div className="space-y-4">
    <div className="grid grid-cols-2 gap-4">
      {data.timeComplexity && (
        <div className="rounded-lg border border-primary/30 bg-primary/5 p-4 text-center">
          <p className="text-xs text-muted-foreground mb-1">⏱️ Time</p>
          <p className="text-xl font-bold text-primary font-mono">{data.timeComplexity}</p>
        </div>
      )}
      {data.spaceComplexity && (
        <div className="rounded-lg border border-accent/30 bg-accent/5 p-4 text-center">
          <p className="text-xs text-muted-foreground mb-1">💾 Space</p>
          <p className="text-xl font-bold text-accent font-mono">{data.spaceComplexity}</p>
        </div>
      )}
    </div>
    {data.explanation && (
      <div className="rounded-lg border border-border bg-card p-4">
        <h3 className="text-sm font-semibold text-foreground mb-2">📊 Explanation</h3>
        <p className="text-sm text-muted-foreground whitespace-pre-wrap">{data.explanation}</p>
      </div>
    )}
    {data.rawResponse && (
      <div className="rounded-lg border border-border bg-card p-4">
        <pre className="text-sm text-muted-foreground whitespace-pre-wrap">{data.rawResponse}</pre>
      </div>
    )}
  </div>
);

interface ConvertResultProps {
  data: Record<string, any>;
}

const ConvertResult: React.FC<ConvertResultProps> = ({ data }) => (
  <div className="space-y-4">
    {data.convertedCode && (
      <div className="rounded-lg border border-border bg-card p-4">
        <h3 className="text-sm font-semibold text-foreground mb-2">🔄 Converted Code</h3>
        <pre className="text-sm whitespace-pre-wrap font-mono bg-code text-code-foreground p-3 rounded">{data.convertedCode}</pre>
      </div>
    )}
    {data.notes && (
      <div className="rounded-lg border border-border bg-card p-4">
        <h3 className="text-sm font-semibold text-foreground mb-2">📝 Notes</h3>
        <p className="text-sm text-muted-foreground whitespace-pre-wrap">{data.notes}</p>
      </div>
    )}
    {data.rawResponse && (
      <div className="rounded-lg border border-border bg-card p-4">
        <pre className="text-sm text-muted-foreground whitespace-pre-wrap">{data.rawResponse}</pre>
      </div>
    )}
  </div>
);

interface ChatResultProps {
  data: Record<string, any>;
}

const ChatResult: React.FC<ChatResultProps> = ({ data }) => (
  <div className="space-y-4">
    {data.answer && (
      <div className="rounded-lg border border-border bg-card p-4">
        <h3 className="text-sm font-semibold text-foreground mb-2">💬 Answer</h3>
        <p className="text-sm text-muted-foreground whitespace-pre-wrap">{data.answer}</p>
      </div>
    )}
    {data.rawResponse && (
      <div className="rounded-lg border border-border bg-card p-4">
        <pre className="text-sm text-muted-foreground whitespace-pre-wrap">{data.rawResponse}</pre>
      </div>
    )}
  </div>
);

interface PracticeResultProps {
  data: Record<string, any>;
}

const PracticeResult: React.FC<PracticeResultProps> = ({ data }) => (
  <div className="space-y-4">
    {data.questions?.map((q: any, i: number) => (
      <div key={i} className="rounded-lg border border-border bg-card p-4">
        <h3 className="text-sm font-semibold text-foreground mb-2">🏋️ Question {i + 1}</h3>
        <p className="text-sm text-foreground mb-3 whitespace-pre-wrap">{q.question}</p>
        <details className="group">
          <summary className="text-xs text-primary cursor-pointer font-medium">Show Solution</summary>
          <pre className="mt-2 text-sm whitespace-pre-wrap font-mono bg-code text-code-foreground p-3 rounded">{q.solution}</pre>
        </details>
      </div>
    ))}
    {data.rawResponse && (
      <div className="rounded-lg border border-border bg-card p-4">
        <pre className="text-sm text-muted-foreground whitespace-pre-wrap">{data.rawResponse}</pre>
      </div>
    )}
  </div>
);

export { ExplainResult, DebugResult, ComplexityResult, ConvertResult, ChatResult, PracticeResult };
