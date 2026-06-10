"use client";

import { useState } from "react";
import { crimeData, predictCrimeEscalation } from "@/lib/data";
import type { CrimeDataPoint } from "@/lib/data";
import { MapPin, TrendingUp, TrendingDown, Minus, Zap } from "lucide-react";

const riskStyle: Record<
  CrimeDataPoint["riskLevel"],
  { bg: string; border: string; color: string; dot: string }
> = {
  critical: { bg: "rgba(239,68,68,0.1)",  border: "rgba(239,68,68,0.3)",  color: "#fca5a5", dot: "#ef4444" },
  high:     { bg: "rgba(245,158,11,0.1)", border: "rgba(245,158,11,0.3)", color: "#fcd34d", dot: "#f59e0b" },
  medium:   { bg: "rgba(59,130,246,0.1)", border: "rgba(59,130,246,0.3)", color: "#93c5fd", dot: "#3b82f6" },
  low:      { bg: "rgba(16,185,129,0.1)", border: "rgba(16,185,129,0.3)", color: "#6ee7b7", dot: "#10b981" },
};

const trendIcon = { rising: TrendingUp, falling: TrendingDown, stable: Minus };
const trendColor = { rising: "#ef4444", falling: "#10b981", stable: "#6b7280" };

function CrimeCard({ point }: { point: CrimeDataPoint }) {
  const [showPrediction, setShowPrediction] = useState(false);
  const r = riskStyle[point.riskLevel];
  const prediction = predictCrimeEscalation(point);
  const TrendIcon = trendIcon[point.trend];
  const pctChange = (
    ((point.predictedNextMonth - point.incidents) / point.incidents) * 100
  ).toFixed(0);

  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{ background: "var(--card-bg)", border: "1px solid var(--border)" }}
    >
      <div className="px-5 py-4">
        {/* Top row */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start gap-3">
            <div
              className="rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ width: 36, height: 36, background: r.bg, border: `1px solid ${r.border}`, marginTop: 2 }}
            >
              <MapPin size={16} style={{ color: r.dot }} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <p style={{ fontSize: 14, fontWeight: 600, color: "#f1f5f9" }}>{point.district}</p>
                <span
                  className="rounded px-2 py-0.5 uppercase"
                  style={{ fontSize: 10, fontWeight: 700, background: r.bg, border: `1px solid ${r.border}`, color: r.color }}
                >
                  {point.riskLevel}
                </span>
              </div>
              <p style={{ fontSize: 12, color: "#64748b" }}>
                {point.city} &bull; {point.crimeType}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <TrendIcon size={13} style={{ color: trendColor[point.trend] }} />
            <span style={{ fontSize: 11, color: trendColor[point.trend], textTransform: "capitalize", fontWeight: 500 }}>
              {point.trend}
            </span>
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          {[
            { label: "Current (30d)",  val: point.incidents,           color: "#f1f5f9" },
            { label: "Predicted (30d)",val: point.predictedNextMonth,  color: point.predictedNextMonth > point.incidents ? "#ef4444" : "#10b981" },
            { label: "Change",         val: `${Number(pctChange) > 0 ? "+" : ""}${pctChange}%`, color: Number(pctChange) > 0 ? "#ef4444" : "#10b981" },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-lg px-3 py-2"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid var(--border)" }}
            >
              <p style={{ fontSize: 10, color: "#4b5563", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                {s.label}
              </p>
              <p style={{ fontSize: 22, fontWeight: 700, color: s.color, marginTop: 2 }}>{s.val}</p>
            </div>
          ))}
        </div>

        {/* Contributing factors */}
        <div className="mb-3">
          <p style={{ fontSize: 10, color: "#4b5563", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600, marginBottom: 6 }}>
            Top Contributing Factors
          </p>
          <div className="flex flex-wrap gap-1.5">
            {point.topFactors.map((f, i) => (
              <span
                key={i}
                className="rounded px-2 py-1"
                style={{ fontSize: 11, color: "#94a3b8", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border)" }}
              >
                {f}
              </span>
            ))}
          </div>
        </div>

        {/* AI intervention toggle */}
        <button
          onClick={() => setShowPrediction(!showPrediction)}
          className="flex items-center gap-2 mt-3 px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
          style={{
            background: showPrediction ? "rgba(59,130,246,0.15)" : "rgba(255,255,255,0.04)",
            border: "1px solid rgba(59,130,246,0.25)",
            color: "#60a5fa",
          }}
        >
          <Zap size={11} />
          {showPrediction ? "Hide" : "Show"} AI Intervention Plan ({prediction.confidence}% confidence)
        </button>

        {showPrediction && (
          <div
            className="mt-3 rounded-lg p-4"
            style={{ background: "rgba(59,130,246,0.05)", border: "1px solid rgba(59,130,246,0.15)" }}
          >
            <div className="flex items-center justify-between mb-3">
              <p style={{ fontSize: 11, color: "#60a5fa", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                Recommended Interventions
              </p>
              <span style={{ fontSize: 11, color: "#3b82f6" }}>
                Timeframe: {prediction.timeframe}
              </span>
            </div>
            <ul className="space-y-2">
              {prediction.interventions.map((intervention, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span
                    className="rounded-full flex-shrink-0 flex items-center justify-center"
                    style={{ width: 18, height: 18, background: "rgba(59,130,246,0.2)", fontSize: 10, color: "#60a5fa", fontWeight: 700, marginTop: 1 }}
                  >
                    {i + 1}
                  </span>
                  <span style={{ fontSize: 12, color: "#94a3b8", lineHeight: 1.6 }}>{intervention}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default function CrimeView() {
  const [filter, setFilter] = useState<"all" | CrimeDataPoint["riskLevel"]>("all");
  const filtered = filter === "all" ? crimeData : crimeData.filter((d) => d.riskLevel === filter);
  const criticalCount = crimeData.filter((d) => d.riskLevel === "critical").length;
  const highCount = crimeData.filter((d) => d.riskLevel === "high").length;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 style={{ fontSize: 24, fontWeight: 700, color: "#f1f5f9", letterSpacing: "-0.02em" }}>
          Crime Pattern Analyzer
        </h2>
        <p style={{ fontSize: 14, color: "#64748b", marginTop: 4 }}>
          Predictive hotspot modeling with AI-driven intervention recommendations.
        </p>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: "Total Hotspots", value: crimeData.length,                                          color: "#94a3b8", bg: "rgba(148,163,184,0.08)", border: "rgba(148,163,184,0.2)" },
          { label: "Critical",       value: criticalCount,                                             color: "#ef4444", bg: "rgba(239,68,68,0.08)",   border: "rgba(239,68,68,0.2)"   },
          { label: "High Risk",      value: highCount,                                                 color: "#f59e0b", bg: "rgba(245,158,11,0.08)",  border: "rgba(245,158,11,0.2)"  },
          { label: "Rising Trend",   value: crimeData.filter((d) => d.trend === "rising").length,      color: "#ef4444", bg: "rgba(239,68,68,0.08)",   border: "rgba(239,68,68,0.2)"   },
        ].map((s) => (
          <div
            key={s.label}
            className="rounded-xl px-4 py-3"
            style={{ background: s.bg, border: `1px solid ${s.border}` }}
          >
            <p style={{ fontSize: 10, color: "#4b5563", textTransform: "uppercase", letterSpacing: "0.08em" }}>
              {s.label}
            </p>
            <p style={{ fontSize: 26, fontWeight: 700, color: s.color, marginTop: 4 }}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        {(["all", "critical", "high", "medium", "low"] as const).map((f) => (
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
            {f === "all" ? "All Areas" : f}
          </button>
        ))}
      </div>

      {/* Cards */}
      <div className="grid grid-cols-2 gap-4">
        {filtered.map((point) => (
          <CrimeCard key={point.id} point={point} />
        ))}
      </div>
    </div>
  );
}
