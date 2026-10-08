import type { Finding } from "../types/spidey";

type FindingCardProps = {
  finding: Finding;
};

export default function FindingCard({
  finding,
}: FindingCardProps) {
  return (
    <article
      className={`finding-card severity-${finding.severity}`}
    >
      <div className="finding-top">
        <div>
          <span
            className={`severity-badge severity-${finding.severity}`}
          >
            {finding.severity}
          </span>

          <h3>{finding.title}</h3>
        </div>

        {finding.line !== undefined && (
          <span className="line-badge">
            Line {finding.line}
          </span>
        )}
      </div>

      <p className="finding-message">
        {finding.message}
      </p>

      <div className="finding-meta">
        <span>
          Rule: <strong>{finding.ruleId}</strong>
        </span>

        <span>
          Source: <strong>{finding.source}</strong>
        </span>
      </div>

      {finding.suggestedFix && (
        <div className="suggested-fix">
          <div className="fix-title">
            💡 Suggested Fix
          </div>

          <p>{finding.suggestedFix}</p>
        </div>
      )}
    </article>
  );
}