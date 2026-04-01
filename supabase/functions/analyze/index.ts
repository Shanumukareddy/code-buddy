import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPTS: Record<string, string> = {
  explain:
    "You are a code explanation assistant. Given code, provide a line-by-line explanation and a simple summary. Return JSON with keys: explanation (string with line-by-line breakdown), summary (string).",
  debug:
    "You are a code debugging assistant. Given code, detect errors, return fixed code, and explain the issues. Return JSON with keys: issues (string describing problems found), fixedCode (string with corrected code), explanation (string explaining fixes).",
  complexity:
    "You are an algorithm complexity analyst. Given code, analyze time and space complexity. Return JSON with keys: timeComplexity (string like 'O(n)'), spaceComplexity (string like 'O(1)'), explanation (string explaining in simple terms).",
  convert:
    "You are a code conversion assistant. Convert the given code to the target language specified in the user prompt. Return JSON with keys: convertedCode (string), notes (string with any conversion notes).",
  chat:
    "You are a helpful coding assistant. Answer the user's question about the provided code clearly and concisely. Return JSON with keys: answer (string).",
  practice:
    "You are a coding practice generator. Based on the code's concepts, generate 3 practice questions with solutions. Return JSON with keys: questions (array of objects with 'question' and 'solution' string fields).",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { code, language, feature, userPrompt } = await req.json();

    if (!code || !feature) {
      return new Response(
        JSON.stringify({ success: false, error: "Code and feature are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const validFeatures = ["explain", "debug", "complexity", "convert", "chat", "practice"];
    if (!validFeatures.includes(feature)) {
      return new Response(
        JSON.stringify({ success: false, error: "Invalid feature" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const systemPrompt = SYSTEM_PROMPTS[feature] + "\nIMPORTANT: Return ONLY valid JSON, no markdown fences.";

    let userMessage = `Language: ${language || "auto-detect"}\n\nCode:\n\`\`\`\n${code}\n\`\`\``;
    if (feature === "convert" && userPrompt) {
      userMessage += `\n\nConvert to: ${userPrompt}`;
    } else if (feature === "chat" && userPrompt) {
      userMessage += `\n\nUser question: ${userPrompt}`;
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userMessage },
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ success: false, error: "Rate limited. Please try again shortly." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ success: false, error: "AI credits exhausted. Please add funds." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error("AI gateway error");
    }

    const result = await response.json();
    const content = result.choices?.[0]?.message?.content || "";

    let parsed: any;
    try {
      const cleaned = content.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
      parsed = JSON.parse(cleaned);
    } catch {
      parsed = { rawResponse: content };
    }

    return new Response(
      JSON.stringify({ success: true, feature, data: parsed }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (e) {
    console.error("analyze error:", e);
    return new Response(
      JSON.stringify({ success: false, error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
