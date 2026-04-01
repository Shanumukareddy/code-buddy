import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CodeEditor from "@/components/CodeEditor";
import FeatureTabs from "@/components/FeatureTabs";
import ResultPanel from "@/components/ResultPanel";
import {
  ExplainResult,
  DebugResult,
  ComplexityResult,
  ConvertResult,
  ChatResult,
  PracticeResult,
} from "@/components/FeatureResults";
import { analyzeCode, Feature } from "@/lib/api";
import { Code2, Send } from "lucide-react";
import { toast } from "sonner";

const LANGUAGES = ["JavaScript", "TypeScript", "Python", "Java", "C++", "C#", "Go", "Rust", "Ruby", "PHP"];

const Index = () => {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("JavaScript");
  const [feature, setFeature] = useState<Feature>("explain");
  const [userPrompt, setUserPrompt] = useState("");
  const [targetLang, setTargetLang] = useState("Python");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<Record<string, any> | null>(null);
  const [resultFeature, setResultFeature] = useState<Feature | null>(null);

  const handleAnalyze = async () => {
    if (!code.trim()) {
      toast.error("Please enter some code first.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      let prompt = userPrompt;
      if (feature === "convert") {
        prompt = targetLang;
      }

      const response = await analyzeCode({
        code,
        language,
        feature,
        userPrompt: prompt || undefined,
      });

      setResult(response.data);
      setResultFeature(feature);
    } catch (e: any) {
      const msg = e.message || "Something went wrong";
      setError(msg);
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const renderResult = () => {
    if (!result || !resultFeature) return null;
    switch (resultFeature) {
      case "explain": return <ExplainResult data={result} />;
      case "debug": return <DebugResult data={result} />;
      case "complexity": return <ComplexityResult data={result} />;
      case "convert": return <ConvertResult data={result} />;
      case "chat": return <ChatResult data={result} />;
      case "practice": return <PracticeResult data={result} />;
      default: return null;
    }
  };

  const needsPrompt = feature === "chat";
  const needsTargetLang = feature === "convert";

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Code2 className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">AI Code Explainer</h1>
            <p className="text-xs text-muted-foreground">Explain · Debug · Analyze · Convert · Chat · Practice</p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Feature Tabs */}
        <FeatureTabs activeFeature={feature} onFeatureChange={setFeature} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Panel */}
          <div className="space-y-4">
            <div className="flex gap-2">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="px-3 py-2 rounded-lg border border-input bg-background text-foreground text-sm"
              >
                {LANGUAGES.map((l) => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </select>

              {needsTargetLang && (
                <select
                  value={targetLang}
                  onChange={(e) => setTargetLang(e.target.value)}
                  className="px-3 py-2 rounded-lg border border-input bg-background text-foreground text-sm"
                >
                  {LANGUAGES.map((l) => (
                    <option key={l} value={l}>{l}</option>
                  ))}
                </select>
              )}
            </div>

            <CodeEditor
              value={code}
              onChange={setCode}
              language={language}
              placeholder="Paste your code here..."
            />

            {needsPrompt && (
              <div className="flex gap-2">
                <Input
                  value={userPrompt}
                  onChange={(e) => setUserPrompt(e.target.value)}
                  placeholder="Ask a question about the code..."
                  className="flex-1"
                  onKeyDown={(e) => e.key === "Enter" && handleAnalyze()}
                />
              </div>
            )}

            <Button
              onClick={handleAnalyze}
              disabled={isLoading}
              className="w-full"
              size="lg"
            >
              <Send className="h-4 w-4 mr-2" />
              {isLoading ? "Analyzing..." : `Run ${feature.charAt(0).toUpperCase() + feature.slice(1)}`}
            </Button>
          </div>

          {/* Result Panel */}
          <div>
            <ResultPanel isLoading={isLoading} error={error}>
              {result ? (
                renderResult()
              ) : (
                <div className="flex items-center justify-center py-16 text-muted-foreground text-sm">
                  Results will appear here
                </div>
              )}
            </ResultPanel>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
