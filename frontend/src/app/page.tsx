"use client";

import { useState } from "react";

import Header from "../components/Header";
import CodeEditor from "../components/CodeEditor";
import AnalyzeButton from "../components/AnalyzeButton";
import ResultsPanel from "../components/ResultsPanel";

import { analyzeCode } from "../lib/api";

import type {
  SpideyResponse,
} from "../types/spidey";

export default function Home() {
  const [code, setCode] = useState("");

  const [language, setLanguage] =
    useState("javascript");

  const [result, setResult] =
    useState<SpideyResponse | null>(null);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  async function handleAnalyze() {
    if (!code.trim()) {
      setError(
        "Paste some code before asking Spidey to analyze it.",
      );

      setResult(null);

      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await analyzeCode({
        question:
          "Find the bug in this code and explain what is wrong.",
        code,
        language,
        revealSolution: true,
      });

      setResult(response);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong while analyzing the code.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="app">
      <div className="container">
        <Header />

        <div className="hero">
          <p className="hero-label">
            DEBUG WITH CONFIDENCE
          </p>

          <h2>
            Find the bug.
            <br />
            <span>Understand the fix.</span>
          </h2>

          <p>
            Paste your code, choose a language, and let
            FINDspidey analyze the problem with technical
            evidence.
          </p>
        </div>

        <CodeEditor
          code={code}
          language={language}
          onCodeChange={setCode}
          onLanguageChange={setLanguage}
        />

        <div className="action-row">
          <AnalyzeButton
            loading={loading}
            disabled={
              loading || code.trim().length === 0
            }
            onClick={handleAnalyze}
          />

          <span className="action-hint">
            Your code stays in this debugging session.
          </span>
        </div>

        {error && (
          <div className="error-card">
            <strong>⚠️ Something went wrong</strong>
            <p>{error}</p>
          </div>
        )}

        <ResultsPanel result={result} />

        <footer className="footer">
          <p>
            FINDspidey · AI-powered debugging assistant
          </p>
        </footer>
      </div>
    </main>
  );
}