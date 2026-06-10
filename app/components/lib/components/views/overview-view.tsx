"use client";

import { dashboardStats, recentAlerts, formatCurrency } from "@/lib/data";
import {
  AlertTriangle,
  DollarSign,
  Search,
  FileText,
  Brain,
  Bell,
  TrendingUp,
  Shield,
} from "lucide-react";

const severityColor = {
  critical: { bg: "rgba(239,68,68,0.1)", border: "rgba(239,68,68,0.3)", dot: "#ef4444", text: "#fca5a5" },
  high:     { bg: "rgba(245,158,11,0.1)", border: "rgba(245,158,11,0.3)", dot: "#f59e0b", text: "#fcd34d" },
  medium:   { bg: "rgba(59,130,246,0.1)", border: "rgba(59,130,246,0.3)", dot: "#3b82f6", text: "#93c5fd" },
  low:      { bg: "rgba(107,114,128,0.1)", border: "rgba(107,114,128,0.3)", dot: "#6b7280", text: "#9ca3af" },
};

const statCards = [
  { label: "Flagged Items",          value: dashboardStats.totalFlagged.toLocaleString(),        icon: AlertTriangle, color: "#f59e0b", bg: "rgba(245,158,11,0.08)",  border: "rgba(245,158,11,0.2)",  sub: "+14 this week" },
  { label: "Taxpayer Savings",       value: formatCurrency(dashboardStats.totalSaved),            icon: DollarSign,    color: "#10b981", bg: "rgba(16,185,129,0.08)",  border: "rgba(16,185,129,0.2)",  sub: "Recovered via AI flags" },
  { label: "Active Investigations",  value: dashboardStats.activeInvestigations.toString(),       icon: Search,        color: "#3b82f6", bg: "rgba(59,130,246,0.08)",  border: "rgba(59,130,246,0.2)",  sub: "Across 12 agencies" },
  { label: "Citizen Reports",        value: dashboardStats.citizenReports.toLocaleString(),       icon: FileText,      color: "#8b5cf6", bg: "rgba(139,92,246,0.08)",  border: "rgba(139,92,246,0.2)",  sub: "47 pending review" },
  { label: "AI Analyses Run",        value: dashboardStats.aiAnalyses.toLocaleString(),           icon: Brain,         color: "#06b6d4", bg: "rgba(6,182,212,0.08)",   border: "rgba(6,182,212,0.2)",   sub: "Last 30 days" },
  { label: "Risk Alerts",            value: dashboardStats.riskAlerts.toString(),                 icon: Bell,          color: "#ef4444", bg: "rgba(239,68,68,0.08)",   border: "rgba(239,68,68,0.2)",   sub: "Requires immediate action" },
];

export default function OverviewView() {
  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div>
        <div className="flex items-start justify-between">
          <div>
            <h2 style={{ fontSize: 24, fontWeight: 700, color: "#f1f5f9", letterSpacing: "-0.02em" }}>
              Intelligence Dashboard
            </h2>
            <p style={{ fontSize: 14, color: "#64748b", marginTop: 4 }}>
              Real-time oversight across government spending, public safety, and citizen accountability.
            </p>
          </div>
          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded-full"
            style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)" }}
          >
            <TrendingUp size={13} style={{ color: "#10b981" }} />
            <span style={{ fontSize: 12, color: "#10b981", fontWeight: 500 }}>Live</span>
          </div>
        </div>

        {/* Scripture — John 8:32 */}
        <div
          className="mt-5 px-5 py-4 rounded-xl"
          style={{ background: "rgba(59,130,246,0.05)", border: "1px solid rgba(59,130,246,0.15)" }}
        >
          <div className="flex items-center gap-3">
            <Shield size={18} style={{ color: "#60a5fa", flexShrink: 0 }} />
            <div>
              <p style={{ fontSize: 13, color: "#93c5fd", fontStyle: "italic" }}>
                &ldquo;And you will know the truth, and the truth will set you free.&rdquo;
              </p>
              <p style={{ fontSize: 11, color: "#3b82f6", marginTop: 2, fontWeight: 600 }}>
                John 8:32
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-3 gap-4">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.label}
              className="rounded-xl px-5 py-4"
              style={{ background: card.bg, border: `1px solid ${card.border}` }}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p style={{ fontSize: 11, color: "#6b7280", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                    {card.label}
                  </p>
                  <p className="mt-1" style={{ fontSize: 28, fontWeight: 700, color: card.color, letterSpacing: "-0.03em", lineHeight: 1 }}>
                    {card.value}
                  </p>
                  <p style={{ fontSize: 11, color: "#4b5563", marginTop: 6 }}>{card.sub}</p>
                </div>
                <div
                  className="rounded-lg flex items-center justify-center"
                  style={{ width: 36, height: 36, background: `${card.color}18`, flexShrink: 0 }}
                >
                  <Icon size={16} style={{ color: card.color }} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Alerts */}
      <div>
        <h3 style={{ fontSize: 15, fontWeight: 600, color: "#cbd5e1", marginBottom: 12 }}>
          Recent Alerts
        </h3>
        <div className="flex flex-col gap-2">
          {recentAlerts.map((alert) => {
            const colors = severityColor[alert.severity];
            return (
              <div
                key={alert.id}
                className="flex items-center gap-4 px-4 py-3 rounded-lg"
                style={{ background: colors.bg, border: `1px solid ${colors.border}` }}
              >
                <span
                  className="rounded-full flex-shrink-0"
                  style={{ width: 8, height: 8, background: colors.dot }}
                />
                <p style={{ fontSize: 13, color: "#cbd5e1", flex: 1 }}>{alert.message}</p>
                <span style={{ fontSize: 11, color: "#4b5563", whiteSpace: "nowrap" }}>
                  {alert.time}
                </span>
                <span
                  className="rounded px-2 py-0.5 uppercase"
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    background: `${colors.dot}22`,
                    color: colors.text,
                    letterSpacing: "0.05em",
                  }}
                >
                  {alert.severity}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* AI Engine Status */}
      <div
        className="rounded-xl px-5 py-4 flex items-center justify-between"
        style={{ background: "rgba(15,23,42,0.6)", border: "1px solid var(--border)" }}
      >
        <div>
          <p style={{ fontSize: 13, fontWeight: 600, color: "#94a3b8" }}>
            AI Analysis Engine — Active
          </p>
          <p style={{ fontSize: 12, color: "#475569", marginTop: 2 }}>
            Processing 15,832 transactions &bull; 3 models running &bull; Last sync: 4 minutes ago
          </p>
        </div>
        <div className="flex gap-2">
          {["NLP", "Risk-ML", "GeoStat"].map((model) => (
            <span
              key={model}
              className="px-2 py-1 rounded text-xs font-mono"
              style={{ background: "rgba(16,185,129,0.1)", color: "#10b981", border: "1px solid rgba(16,185,129,0.2)" }}
            >
              {model}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
