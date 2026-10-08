import type { SpideyResponse } from "../types/spidey";
import FindingCard from "./FindingCard";

type ResultsPanelProps = {
  result: SpideyResponse | null;
};

export default function ResultsPanel({
  result,
}: ResultsPanelProps) {
  if (!result) {
    return null;
  }

  return (
    <section className="results-section">
      <div className="results-heading">
        <div>
          <p className="eyebrow">SPIDEY ANALYSIS</p>

          <h2>{result.answer}</h2>

          <p className="problem-summary">
            {result.problemSummary}
          </p>
        </div>

        <div
          className={`verification verification-${result.verification.status}`}
        >
          <span className="verification-dot" />

          {result.verification.status.replace(
            /_/g,
            " ",
          )}
        </div>
      </div>

      <div className="interpretation-card">
        <h3>What Spidey found</h3>

        <p>{result.interpretation}</p>
      </div>

      {result.findings.length > 0 && (
        <div className="findings">
          <h3>Findings</h3>

          {result.findings.map((finding, index) => (
            <FindingCard
              key={`${finding.ruleId}-${index}`}
              finding={finding}
            />
          ))}
        </div>
      )}

      <div className="steps-card">
        <h3>What to do next</h3>

        <ol>
          {result.steps.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </div>

      {result.solution && (
        <div className="solution-card">
          <h3>🛠 Suggested Solution</h3>

          <pre>{result.solution}</pre>
        </div>
      )}

      <div className="verification-card">
        <h3>Verification</h3>

        <p>
          {result.verification.explanation}
        </p>

        {result.verification.evidence.length > 0 && (
          <ul>
            {result.verification.evidence.map(
              (evidence, index) => (
                <li key={index}>{evidence}</li>
              ),
            )}
          </ul>
        )}
      </div>
    </section>
  );
}