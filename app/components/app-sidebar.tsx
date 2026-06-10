"use client";

import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  DollarSign,
  MapPin,
  FileText,
  Shield,
  ChevronRight,
} from "lucide-react";

export type View = "overview" | "spending" | "crime" | "reports";

interface NavItem {
  id: View;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }>;
  description: string;
  badge?: number;
}

const navItems: NavItem[] = [
  {
    id: "overview",
    label: "Dashboard Overview",
    icon: LayoutDashboard,
    description: "Live risk intelligence feed",
  },
  {
    id: "spending",
    label: "Spending Watchdog",
    icon: DollarSign,
    description: "AI contract & fraud analysis",
    badge: 12,
  },
  {
    id: "crime",
    label: "Crime Pattern Analyzer",
    icon: MapPin,
    description: "Predictive hotspot modeling",
    badge: 3,
  },
  {
    id: "reports",
    label: "Citizen Reports",
    icon: FileText,
    description: "Crowdsourced accountability",
    badge: 47,
  },
];

interface AppSidebarProps {
  activeView: View;
  onViewChange: (view: View) => void;
}

export default function AppSidebar({ activeView, onViewChange }: AppSidebarProps) {
  return (
    <aside
      className="flex flex-col h-full"
      style={{
        background: "var(--sidebar-bg)",
        borderRight: "1px solid var(--border)",
        width: "260px",
        flexShrink: 0,
      }}
    >
      {/* Logo */}
      <div className="px-6 py-6" style={{ borderBottom: "1px solid var(--border)" }}>
        <div className="flex items-center gap-3 mb-1">
          <div
            className="flex items-center justify-center rounded-lg"
            style={{
              width: 36,
              height: 36,
              background: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
            }}
          >
            <Shield size={18} style={{ color: "#fff" }} />
          </div>
          <div>
            <h1
              className="font-bold tracking-tight"
              style={{ fontSize: 18, color: "#f1f5f9", letterSpacing: "-0.02em" }}
            >
              Panoplia
            </h1>
            <p
              style={{
                fontSize: 10,
                color: "#64748b",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              The Full Armor of Truth
            </p>
          </div>
        </div>
      </div>

      {/* Status bar */}
      <div className="px-4 py-3" style={{ borderBottom: "1px solid var(--border)" }}>
        <div
          className="flex items-center gap-2 px-3 py-2 rounded-md"
          style={{
            background: "rgba(16,185,129,0.08)",
            border: "1px solid rgba(16,185,129,0.2)",
          }}
        >
          <span
            className="rounded-full animate-pulse"
            style={{ width: 7, height: 7, background: "#10b981", flexShrink: 0 }}
          />
          <span style={{ fontSize: 11, color: "#10b981", fontWeight: 500 }}>
            AI Systems Operational
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        <p
          style={{
            fontSize: 10,
            color: "#4b5563",
            fontWeight: 600,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            padding: "0 12px 8px",
          }}
        >
          Intelligence Modules
        </p>
        <ul className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            return (
              <li key={item.id}>
                <button
                  onClick={() => onViewChange(item.id)}
                  className="w-full text-left rounded-lg px-3 py-3 flex items-center gap-3 group transition-all"
                  style={{
                    background: isActive ? "rgba(59,130,246,0.12)" : "transparent",
                    border: isActive
                      ? "1px solid rgba(59,130,246,0.25)"
                      : "1px solid transparent",
                    color: isActive ? "#60a5fa" : "#94a3b8",
                  }}
                >
                  <Icon
                    size={16}
                    className="flex-shrink-0"
                    style={{ color: isActive ? "#60a5fa" : "#6b7280" }}
                  />
                  <div className="flex-1 min-w-0">
                    <div
                      style={{
                        fontSize: 13,
                        fontWeight: isActive ? 600 : 400,
                        color: isActive ? "#f1f5f9" : "#94a3b8",
                        lineHeight: 1.3,
                      }}
                    >
                      {item.label}
                    </div>
                    <div style={{ fontSize: 10, color: "#4b5563", marginTop: 1 }}>
                      {item.description}
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {item.badge !== undefined && (
                      <span
                        className="rounded-full px-1.5 py-0.5"
                        style={{
                          fontSize: 10,
                          fontWeight: 600,
                          background: isActive
                            ? "rgba(59,130,246,0.3)"
                            : "rgba(75,85,99,0.5)",
                          color: isActive ? "#93c5fd" : "#9ca3af",
                          minWidth: 20,
                          textAlign: "center",
                        }}
                      >
                        {item.badge}
                      </span>
                    )}
                    <ChevronRight
                      size={12}
                      style={{
                        color: isActive ? "#60a5fa" : "#374151",
                        opacity: isActive ? 1 : 0,
                        transition: "opacity 0.15s",
                      }}
                    />
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="px-4 py-5" style={{ borderTop: "1px solid var(--border)" }}>
        <div className="text-center mb-3">
          <p style={{ fontSize: 11, color: "#374151", fontStyle: "italic", lineHeight: 1.5 }}>
            &ldquo;Put on the full armor of God, so that you can take your stand against
            the devil&rsquo;s schemes.&rdquo;
          </p>
          <p style={{ fontSize: 10, color: "#1f2937", marginTop: 4, fontWeight: 600 }}>
            Ephesians 6:11
          </p>
        </div>
        <div
          className="flex items-center justify-between px-3 py-2 rounded-md"
          style={{ background: "rgba(15,23,42,0.6)", border: "1px solid var(--border)" }}
        >
          <div>
            <p style={{ fontSize: 11, color: "#64748b" }}>Data updated</p>
            <p style={{ fontSize: 11, color: "#475569", fontWeight: 500 }}>
              Real-time feed active
            </p>
          </div>
          <div
            className="rounded-full"
            style={{ width: 8, height: 8, background: "#10b981" }}
          />
        </div>
      </div>
    </aside>
  );
}
