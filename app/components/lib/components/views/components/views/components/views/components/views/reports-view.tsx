"use client";

import { useState } from "react";
import { citizenReports, factCheckReport } from "@/lib/data";
import type { CitizenReport } from "@/lib/data";
import {
  FileText,
  ThumbsUp,
  MapPin,
  User,
  EyeOff,
  Zap,
  CheckCircle,
  Clock,
  Search,
  XCircle,
} from "lucide-react";

const statusStyle: Record<
  CitizenReport["status"],
  {
    bg: string;
    border: string;
    color: string;
    icon: React.ComponentType<{ size?: number; style?: React.CSSProperties }>;
  }
> = {
  verified:     { bg: "rgba(16,185,129,0.1)",  border: "rgba(16,185,129,0.3)",  color: "#6ee7b7", icon: CheckCircle },
  investigating:{ bg: "rgba(59,130,246,0.1)",  border: "rgba(59,130,246,0.3)",  color: "#93c5fd", icon: Search      },
  pending:      { bg: "rgba(107,114,128,0.1)", border: "rgba(107,114,128,0.3)", color: "#9ca3af", icon: Clock       },
  resolved:     { bg: "rgba(139,92,246,0.1)",  border: "rgba(139,92,246,0.3)",  color: "#c4b5fd", icon: CheckCircle },
  rejected:     { bg: "rgba(239,68,68,0.1)",   border: "rgba(239,68,68,0.3)",   color: "#fca5a5", icon: XCircle     },
};

const verdictStyle = {
  confirmed:  { color: "#10b981", label: "Confirmed"  },
  credible:   { color: "#60a5fa", label: "Credible"   },
  unverified: { color: "#f59e0b", label: "Unverified" },
  disputed:   { color: "#ef4444", label: "Disputed"   },
};

const categoryColor: Record<string, string> = {
  Corruption: "#ef4444",
  Waste:      "#f59e0b",
  Fraud:      "#8b5cf6",
  Safety:     "#06b6d4",
  Other:      "#6b7280",
};

function FactCheckMeter({ score }: { score: number }) {
  const color =
    score >= 80 ? "#10b981" : score >= 60 ? "#60a5fa" : score >= 40 ? "#f59e0b" : "#ef4444";
  const label =
    score >= 80 ? "High Confidence" : score >= 60 ? "Moderate" : score >= 40 ? "Low" : "Disputed";
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <p style={{ fontSize: 10, color: "#4b5563", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600 }}>
          AI Fact-Check Score
        </p>
        <span style={{ fontSize: 11, color, fontWeight: 600 }}>{label}</span>
      </div>
      <div style={{ height: 5, background: "rgba(255,255,255,0.06)", borderRadius: 3 }}>
        <div
          style={{ width: `${score}%`, height: "100%", background: color, borderRadius: 3, transition: "width 0.3s" }}
        />
      </div>
      <p style={{ fontSize: 11, color, textAlign: "right", marginTop: 2 }}>{score}/100</p>
    </div>
  );
}

function ReportCard({ report }: { report: CitizenReport }) {
  const [showAnalysis, setShowAnalysis] = useState(false);
  const s = statusStyle[report.status];
  const StatusIcon = s.icon;
  const analysis = factCheckReport(report);
  const verdict = verdictStyle[analysis.verdict];
  const catColor = categoryColor[report.category] ?? "#6b7280";
  const date = new Date(report.submittedAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{ background: "var(--card-bg)", border: "1px solid var(--border)" }}
    >
      <div className="px-5 py-4">
        {/* Header */}
        <div className="flex items-start gap-3 mb-3">
          <div
            className="rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ width: 36, height: 36, background: `${catColor}18`, border: `1px solid ${catColor}30`, marginTop: 2 }}
          >
            <FileText size={15} style={{ color: catColor }} />
          </div>
          <div className="flex-1 min-w-0">
            <p style={{ fontSize: 14, fontWeight: 600, color: "#f1f5f9", lineHeight: 1.4 }}>
              {report.title}
            </p>
            <div className="flex items-center gap-3 mt-1 flex-wrap">
              <span
                className="rounded px-2 py-0.5"
                style={{ fontSize: 10, fontWeight: 600, background: `${catColor}15`, color: catColor, border: `1px solid ${catColor}30` }}
              >
                {report.category}
              </span>
              <span
                className="flex items-center gap-1 rounded px-2 py-0.5"
                style={{ fontSize: 10, fontWeight: 600, background: s.bg, color: s.color, border: `1px solid ${s.border}` }}
              >
                <StatusIcon size={9} style={{ color: s.color }} />
                {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
              </span>
              <span className="flex items-center gap-1" style={{ fontSize: 11, color: "#4b5563" }}>
                <MapPin size={10} />
                {report.location}
              </span>
            </div>
          </div>
        </div>

        <p style={{ fontSize: 12, color: "#64748b", lineHeight: 1.7, marginBottom: 12 }}>
          {report.description}
        </p>

        <FactCheckMeter score={report.factCheckScore} />

        {/* Meta row */}
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1" style={{ fontSize: 11, color: "#4b5563" }}>
              {report.anonymous ? <EyeOff size={11} /> : <User size={11} />}
              {report.anonymous ? "Anonymous" : "Named Reporter"}
            </span>
            <span style={{ fontSize: 11, color: "#374151" }}>{date}</span>
          </div>
          <div className="flex items-center gap-1" style={{ fontSize: 12, color: "#6b7280", fontWeight: 500 }}>
            <ThumbsUp size={12} />
            {report.upvotes.toLocaleString()}
          </div>
        </div>

        {/* AI Analysis toggle */}
        <button
          onClick={() => setShowAnalysis(!showAnalysis)}
          className="flex items-center gap-2 mt-3 px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
          style={{
            background: showAnalysis ? "rgba(59,130,246,0.15)" : "rgba(255,255,255,0.04)",
            border: "1px solid rgba(59,130,246,0.25)",
            color: "#60a5fa",
          }}
        >
          <Zap size={11} />
          {showAnalysis ? "Hide" : "View"} AI Analysis
        </button>

        {showAnalysis && (
          <div
            className="mt-3 rounded-lg p-4"
            style={{ background: "rgba(59,130,246,0.05)", border: "1px solid rgba(59,130,246,0.15)" }}
          >
            <div className="flex items-center gap-3 mb-3">
              <p style={{ fontSize: 11, color: "#60a5fa", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                AI Verdict:
              </p>
              <span
                className="rounded px-2 py-0.5 font-bold uppercase"
                style={{ fontSize: 11, color: verdict.color, background: `${verdict.color}15`, border: `1px solid ${verdict.color}30` }}
              >
                {verdict.label}
              </span>
            </div>
            <p style={{ fontSize: 12, color: "#94a3b8", lineHeight: 1.7, marginBottom: 10 }}>
              {analysis.summary}
            </p>
            <div>
              <p style={{ fontSize: 10, color: "#4b5563", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>
                Recommended Next Steps
              </p>
              <ul className="space-y-1.5">
                {analysis.nextSteps.map((step, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span
                      className="rounded-full flex-shrink-0 flex items-center justify-center"
                      style={{ width: 16, height: 16, background: "rgba(59,130,246,0.2)", fontSize: 9, color: "#60a5fa", fontWeight: 700, marginTop: 2 }}
                    >
                      {i + 1}
                    </span>
                    <span style={{ fontSize: 12, color: "#94a3b8" }}>{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ReportsView() {
  const [filter, setFilter] = useState<"all" | CitizenReport["status"]>("all");
  const filtered =
    filter === "all" ? citizenReports : citizenReports.filter((r) => r.status === filter);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 style={{ fontSize: 24, fontWeight: 700, color: "#f1f5f9", letterSpacing: "-0.02em" }}>
          Citizen Reports
        </h2>
        <p style={{ fontSize: 14, color: "#64748b", marginTop: 4 }}>
          Crowdsourced accountability — every report AI fact-checked and routed to relevant authorities.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: "Total Reports",  value: citizenReports.length,                                            color: "#94a3b8" },
          { label: "Verified",       value: citizenReports.filter((r) => r.status === "verified").length,     color: "#10b981" },
          { label: "Investigating",  value: citizenReports.filter((r) => r.status === "investigating").length, color: "#60a5fa" },
          { label: "Resolved",       value: citizenReports.filter((r) => r.status === "resolved").length,     color: "#a78bfa" },
        ].map((s) => (
          <div
            key={s.label}
            className="rounded-xl px-4 py-3"
            style={{ background: `${s.color}0d`, border: `1px solid ${s.color}30` }}
          >
            <p style={{ fontSize: 10, color: "#4b5563", textTransform: "uppercase", letterSpacing: "0.08em" }}>
              {s.label}
            </p>
            <p style={{ fontSize: 26, fontWeight: 700, color: s.color, marginTop: 4 }}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        {(["all", "pending", "investigating", "verified", "resolved", "rejected"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all capitalize"
            style={{
              background: filter === f ? "rgba(59,130,246,0.15)" : "rgba(255,255,255,0.04)",
              border: filter === f ? "1px solid rgba(59,130,246,0.4)" : "1px solid var(--border)",
              color: filter === f ? "#60a5fa" : "#6b7280",
            }}
          >
            {f === "all" ? "All Reports" : f}
          </button>
        ))}
      </div>

      {/* Cards */}
      <div className="flex flex-col gap-3">
        {filtered.map((report) => (
          <ReportCard key={report.id} report={report} />
        ))}
      </div>
    </div>
  );
}
