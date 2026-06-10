"use client";

import { useState } from "react";
import { spendingRecords, analyzeSpendingRisk, formatCurrency } from "@/lib/data";
import type { SpendingRecord } from "@/lib/data";
import { AlertTriangle, ChevronDown, ChevronUp, DollarSign, Zap, BookOpen } from "lucide-react";

const statusStyle: Record<
  SpendingRecord["status"],
  { bg: string; border: string; color: string; label: string }
> = {
  escalated:     { bg: "rgba(239,68,68,0.1)",  border: "rgba(239,68,68,0.3)",  color: "#fca5a5", label: "Escalated" },
  flagged:       { bg: "rgba(245,158,11,0.1)", border: "rgba(245,158,11,0.3)", color: "#fcd34d", label: "Flagged" },
  "under-review":{ bg: "rgba(59,130,246,0.1)", border: "rgba(59,130,246,0.3)", color: "#93c5fd", label: "Under Review" },
  cleared:       { bg: "rgba(16,185,129,0.1)", border: "rgba(16,185,129,0.3)", color: "#6ee7b7", label: "Cleared" },
};

function RiskBar({ score }: { score: number }) {
  const color = score >= 85 ? "#ef4444" : score >= 60 ? "#f59e0b" : "#10b981";
  return (
    <div className="flex items-center gap-2">
      <div style={{ flex: 1, height: 5, background: "rgba(255,255,255,0.06)", borderRadius: 3 }}>
        <div style={{ width: `${score}%`, height: "100%", background: color, borderRadius: 3, transition: "width 0.3s" }} />
      </div>
      <span style={{ fontSize: 12, fontWeight: 700, color, minWidth: 28, textAlign: "right" }}>
        {score}
      </span>
    </div>
  );
}

function SpendingCard({ record }: { record: SpendingRecord }) {
  const [expanded, setExpanded] = useState(false);
  const s = statusStyle[record.status];
  const analysis = analyzeSpendingRisk(record);

  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{ background: "var(--card-bg)", border: "1px solid var(--border)" }}
    >
      <button className="w-full text-left px-5 py-4" onClick={() => setExpanded(!expanded)}>
        <div className="flex items-start gap-4">
          <div
            className="rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ width: 36, height: 36, background: "rgba(59,130,246,0.1)", marginTop: 2 }}
          >
            <DollarSign size={16} style={{ color: "#60a5fa" }} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <p style={{ fontSize: 14, fontWeight: 600, color: "#f1f5f9" }}>{record.agency}</p>
              <span
                className="rounded px-2 py-0.5"
                style={{ fontSize: 10, fontWeight: 600, background: s.bg, border: `1px solid ${s.border}`, color: s.color }}
              >
                {s.label}
              </span>
            </div>
            <p style={{ fontSize: 12, color: "#64748b", marginTop: 2 }}>{record.program}</p>
            <div className="flex items-center gap-4 mt-3">
              <div>
                <p style={{ fontSize: 10, color: "#4b5563", textTransform: "uppercase", letterSpacing: "0.06em" }}>Amount</p>
                <p style={{ fontSize: 15, fontWeight: 700, color: "#f1f5f9" }}>{formatCurrency(record.amount)}</p>
              </div>
              <div style={{ flex: 1, maxWidth: 180 }}>
                <p style={{ fontSize: 10, color: "#4b5563", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>
                  AI Risk Score
                </p>
                <RiskBar score={record.riskScore} />
              </div>
              <div>
                <p style={{ fontSize: 10, color: "#4b5563", textTransform: "uppercase", letterSpacing: "0.06em" }}>Category</p>
                <p style={{ fontSize: 12, color: "#94a3b8" }}>{record.category}</p>
              </div>
            </div>
          </div>
          <div className="flex-shrink-0">
            {expanded
              ? <ChevronUp size={16} style={{ color: "#4b5563" }} />
              : <ChevronDown size={16} style={{ color: "#4b5563" }} />}
          </div>
        </div>
      </button>

      {expanded && (
        <div style={{ borderTop: "1px solid var(--border)" }}>
          <div className="px-5 py-4 grid grid-cols-2 gap-5">
            {/* Risk Factors */}
            <div>
              <p style={{ fontSize: 11, color: "#6b7280", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>
                Risk Factors
              </p>
              <ul className="space-y-1.5">
                {record.riskFactors.map((f, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <AlertTriangle size={11} style={{ color: "#f59e0b", marginTop: 3, flexShrink: 0 }} />
                    <span style={{ fontSize: 12, color: "#94a3b8", lineHeight: 1.5 }}>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* AI Recommendation */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Zap size={12} style={{ color: "#60a5fa" }} />
                <p style={{ fontSize: 11, color: "#6b7280", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  AI Recommendation
                </p>
              </div>
              <div
                className="rounded-lg p-3 mb-3"
                style={{
                  background: analysis.priority === "immediate" ? "rgba(239,68,68,0.07)" : analysis.priority === "high" ? "rgba(245,158,11,0.07)" : "rgba(16,185,129,0.07)",
                  border: `1px solid ${analysis.priority === "immediate" ? "rgba(239,68,68,0.2)" : analysis.priority === "high" ? "rgba(245,158,11,0.2)" : "rgba(16,185,129,0.2)"}`,
                }}
              >
                <p style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4, color: analysis.priority === "immediate" ? "#fca5a5" : analysis.priority === "high" ? "#fcd34d" : "#6ee7b7" }}>
                  Priority: {analysis.priority}
                </p>
                <p style={{ fontSize: 12, color: "#94a3b8", lineHeight: 1.6 }}>{analysis.recommendation}</p>
                {analysis.estimatedRecovery > 0 && (
                  <p style={{ fontSize: 12, color: "#10b981", marginTop: 6, fontWeight: 500 }}>
                    Est. recoverable: {formatCurrency(analysis.estimatedRecovery)}
                  </p>
                )}
              </div>
              <p style={{ fontSize: 12, color: "#64748b", lineHeight: 1.6 }}>{record.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function SpendingView() {
  const [filter, setFilter] = useState<"all" | SpendingRecord["status"]>("all");
  const filtered =
    filter === "all" ? spendingRecords : spendingRecords.filter((r) => r.status === filter);

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div>
        <h2 style={{ fontSize: 24, fontWeight: 700, color: "#f1f5f9", letterSpacing: "-0.02em" }}>
          Spending Watchdog
        </h2>
        <p style={{ fontSize: 14, color: "#64748b", marginTop: 4 }}>
          AI-powered analysis of government contracts for fraud, waste, and abuse.
        </p>

        {/* Scripture — Proverbs 31:9 */}
        <div
          className="mt-4 flex items-center gap-3 px-4 py-3 rounded-lg"
          style={{ background: "rgba(139,92,246,0.06)", border: "1px solid rgba(139,92,246,0.15)" }}
        >
          <BookOpen size={14} style={{ color: "#a78bfa", flexShrink: 0 }} />
          <div>
            <p style={{ fontSize: 12, color: "#c4b5fd", fontStyle: "italic" }}>
              &ldquo;Speak up and judge fairly; defend the rights of the poor and needy.&rdquo;
            </p>
            <p style={{ fontSize: 10, color: "#7c3aed", fontWeight: 600, marginTop: 2 }}>
              Proverbs 31:9
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        {(["all", "escalated", "flagged", "under-review", "cleared"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
            style={{
              background: filter === f ? "rgba(59,130,246,0.15)" : "rgba(255,255,255,0.04)",
              border: filter === f ? "1px solid rgba(59,130,246,0.4)" : "1px solid var(--border)",
              color: filter === f ? "#60a5fa" : "#6b7280",
              textTransform: "capitalize",
            }}
          >
            {f === "all" ? "All Records" : f.replace("-", " ")}
          </button>
        ))}
      </div>

      {/* Record list */}
      <div className="flex flex-col gap-3">
        {filtered.map((record) => (
          <SpendingCard key={record.id} record={record} />
        ))}
      </div>
    </div>
  );
}
