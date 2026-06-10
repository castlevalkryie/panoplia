// ─── Types ────────────────────────────────────────────────────────────────────

export interface SpendingRecord {
  id: string;
  agency: string;
  program: string;
  amount: number;
  fiscalYear: number;
  category: string;
  riskScore: number;
  riskFactors: string[];
  status: "flagged" | "under-review" | "cleared" | "escalated";
  description: string;
}

export interface CrimeDataPoint {
  id: string;
  district: string;
  city: string;
  crimeType: string;
  incidents: number;
  trend: "rising" | "falling" | "stable";
  riskLevel: "critical" | "high" | "medium" | "low";
  predictedNextMonth: number;
  coordinates: { lat: number; lng: number };
  topFactors: string[];
}

export interface CitizenReport {
  id: string;
  title: string;
  description: string;
  category: string;
  submittedAt: string;
  status: "pending" | "verified" | "investigating" | "resolved" | "rejected";
  factCheckScore: number;
  factCheckNotes: string;
  location: string;
  upvotes: number;
  anonymous: boolean;
}

export interface DashboardStats {
  totalFlagged: number;
  totalSaved: number;
  activeInvestigations: number;
  citizenReports: number;
  aiAnalyses: number;
  riskAlerts: number;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

export const dashboardStats: DashboardStats = {
  totalFlagged: 347,
  totalSaved: 2_840_000_000,
  activeInvestigations: 89,
  citizenReports: 1_204,
  aiAnalyses: 15_832,
  riskAlerts: 23,
};

export const recentAlerts = [
  {
    id: "a1",
    type: "spending",
    severity: "critical" as const,
    message: "DoD contractor overbilling detected — $4.2M anomaly",
    time: "12 min ago",
  },
  {
    id: "a2",
    type: "crime",
    severity: "high" as const,
    message: "Violent crime spike predicted in SE District 4 (72% confidence)",
    time: "1 hr ago",
  },
  {
    id: "a3",
    type: "report",
    severity: "medium" as const,
    message: "Citizen report verified: infrastructure contract irregularities",
    time: "3 hr ago",
  },
  {
    id: "a4",
    type: "spending",
    severity: "high" as const,
    message: "EPA no-bid contract pattern flagged — 3rd occurrence this year",
    time: "5 hr ago",
  },
  {
    id: "a5",
    type: "report",
    severity: "low" as const,
    message: "New batch of 14 citizen reports queued for analysis",
    time: "8 hr ago",
  },
];

export const spendingRecords: SpendingRecord[] = [
  {
    id: "s1",
    agency: "Department of Defense",
    program: "F-35 Maintenance Contract — Lockheed Martin",
    amount: 4_200_000,
    fiscalYear: 2024,
    category: "Defense Procurement",
    riskScore: 94,
    riskFactors: [
      "Sole-source contract (no competitive bidding)",
      "Cost overrun pattern detected across 6 prior contracts",
      "Invoice timing anomaly: billed before delivery milestone",
      "Contractor political donations above threshold",
    ],
    status: "escalated",
    description:
      "Recurring maintenance contract exhibiting classic overbilling signatures. AI model detected invoice-to-delivery timing irregularities consistent with fraud patterns in 2019 DoD IG report.",
  },
  {
    id: "s2",
    agency: "Dept. of Transportation",
    program: "I-95 Bridge Repair — Southeast Corridor",
    amount: 87_500_000,
    fiscalYear: 2024,
    category: "Infrastructure",
    riskScore: 71,
    riskFactors: [
      "Cost per linear foot 340% above national median",
      "Environmental impact study skipped",
      "Prime contractor subcontracting 94% to single firm",
    ],
    status: "flagged",
    description:
      "Bridge repair project shows inflated unit costs and unusual subcontracting structure. Environmental review bypass may violate federal statute. Proverbs 31:9 — 'Defend the rights of the poor and needy.'",
  },
  {
    id: "s3",
    agency: "Dept. of Health & Human Services",
    program: "COVID-19 PPE Stockpile Replenishment",
    amount: 122_000_000,
    fiscalYear: 2023,
    category: "Healthcare",
    riskScore: 88,
    riskFactors: [
      "Vendor incorporated 3 weeks before contract award",
      "No prior government contract history",
      "Pricing 280% above market rate for N95s",
      "Delivery shortfall: 60% of contracted quantity received",
    ],
    status: "under-review",
    description:
      "Shell-company pattern consistent with pandemic-era fraud schemes. IG referral pending. Delivery records show significant shortfall vs. contractual obligations.",
  },
  {
    id: "s4",
    agency: "General Services Administration",
    program: "Federal Building HVAC Modernization — Region 6",
    amount: 34_750_000,
    fiscalYear: 2024,
    category: "Facilities",
    riskScore: 42,
    riskFactors: [
      "Minor cost overrun (8% above baseline)",
      "Schedule slippage — 4 months behind",
    ],
    status: "cleared",
    description:
      "Standard facilities upgrade. Minor overruns within acceptable variance. Competitive bidding process followed correctly.",
  },
  {
    id: "s5",
    agency: "Environmental Protection Agency",
    program: "Superfund Site Remediation — Lake Erie Basin",
    amount: 56_000_000,
    fiscalYear: 2024,
    category: "Environmental",
    riskScore: 67,
    riskFactors: [
      "No-bid emergency contract — 3rd consecutive year",
      "Progress reports inconsistent with site inspections",
      "Prime contractor has $2.1M in unresolved EPA fines",
    ],
    status: "flagged",
    description:
      "Repeated emergency no-bid awards to same contractor despite evidence remediation goals are not being met. Pattern suggests intentional delay to sustain contract revenue.",
  },
  {
    id: "s6",
    agency: "Dept. of Education",
    program: "Title I School Technology Grants — FY2024",
    amount: 215_000_000,
    fiscalYear: 2024,
    category: "Education",
    riskScore: 29,
    riskFactors: ["Reporting compliance rate 91% (below 95% threshold)"],
    status: "cleared",
    description:
      "Generally well-administered grant program. Minor reporting gaps in 3 state sub-grantees. Recommend follow-up audit of Mississippi allocation.",
  },
];

export const crimeData: CrimeDataPoint[] = [
  {
    id: "c1",
    district: "Southeast District 4",
    city: "Washington, D.C.",
    crimeType: "Violent Crime",
    incidents: 143,
    trend: "rising",
    riskLevel: "critical",
    predictedNextMonth: 178,
    coordinates: { lat: 38.85, lng: -76.99 },
    topFactors: [
      "Unemployment spike (+3.2% in 90 days)",
      "Community center closure — April 2024",
      "Gang territory dispute (intelligence sourced)",
      "Reduced patrol frequency since budget cuts",
    ],
  },
  {
    id: "c2",
    district: "Westside Corridor",
    city: "Chicago, IL",
    crimeType: "Property Crime",
    incidents: 312,
    trend: "rising",
    riskLevel: "high",
    predictedNextMonth: 345,
    coordinates: { lat: 41.87, lng: -87.73 },
    topFactors: [
      "Retail corridor shift leaving vacant storefronts",
      "School closure affecting 2,400 youth",
      "Historical recidivism cluster",
    ],
  },
  {
    id: "c3",
    district: "Downtown Arts District",
    city: "Los Angeles, CA",
    crimeType: "Drug Offenses",
    incidents: 89,
    trend: "stable",
    riskLevel: "medium",
    predictedNextMonth: 91,
    coordinates: { lat: 34.04, lng: -118.24 },
    topFactors: ["Fentanyl supply route active", "Inadequate shelter capacity"],
  },
  {
    id: "c4",
    district: "North River Ward",
    city: "Detroit, MI",
    crimeType: "Violent Crime",
    incidents: 67,
    trend: "falling",
    riskLevel: "medium",
    predictedNextMonth: 54,
    coordinates: { lat: 42.38, lng: -83.1 },
    topFactors: [
      "Community policing initiative (month 6)",
      "New youth employment program",
    ],
  },
  {
    id: "c5",
    district: "Harbor View",
    city: "Baltimore, MD",
    crimeType: "Homicide",
    incidents: 28,
    trend: "rising",
    riskLevel: "critical",
    predictedNextMonth: 35,
    coordinates: { lat: 39.28, lng: -76.6 },
    topFactors: [
      "Ongoing gang conflict — 3 factions",
      "Witness intimidation pattern",
      "Evidence of organized trafficking network",
    ],
  },
  {
    id: "c6",
    district: "Midtown Financial",
    city: "New York, NY",
    crimeType: "White-Collar Crime",
    incidents: 14,
    trend: "rising",
    riskLevel: "high",
    predictedNextMonth: 22,
    coordinates: { lat: 40.75, lng: -73.98 },
    topFactors: [
      "Securities fraud cases up 40% YoY",
      "3 active FBI investigations",
    ],
  },
];

export const citizenReports: CitizenReport[] = [
  {
    id: "r1",
    title: "Water Treatment Plant Contract Given to Mayor's Brother-in-Law",
    description:
      "The city awarded a $14M water treatment contract to a company co-owned by the mayor's brother-in-law without competitive bidding. I have documentation showing the RFP was written specifically to exclude other bidders. Will upload evidence.",
    category: "Corruption",
    submittedAt: "2024-11-14T09:22:00Z",
    status: "investigating",
    factCheckScore: 84,
    factCheckNotes:
      "Corporate registry confirms family connection. Contract language analysis shows 3 unusual specificity clauses favoring single vendor. Procurement records requested from city clerk.",
    location: "Phoenix, AZ",
    upvotes: 312,
    anonymous: false,
  },
  {
    id: "r2",
    title: "Road Resurfacing Work Being Done Twice on Same Street",
    description:
      "County repaved Oak Street in March 2024. By October, a different contractor was repaving it again. Both invoices were paid. I have photos showing new asphalt being torn up.",
    category: "Waste",
    submittedAt: "2024-10-28T14:05:00Z",
    status: "verified",
    factCheckScore: 96,
    factCheckNotes:
      "County payment records confirm two separate contracts for identical street segment within 8 months. GIS imagery corroborates double-paving. Estimated waste: $340,000.",
    location: "Fulton County, GA",
    upvotes: 847,
    anonymous: false,
  },
  {
    id: "r3",
    title: "School Security Guards Not Showing Up for Shifts",
    description:
      "At least 3 security guards at Jefferson High are being paid but rarely appear. I'm a teacher and have documented 22 no-show days over 2 months. Principal appears to be covering for them.",
    category: "Fraud",
    submittedAt: "2024-11-01T11:30:00Z",
    status: "verified",
    factCheckScore: 79,
    factCheckNotes:
      "Badge swipe records obtained via FOIA confirm absences consistent with report. Payroll records show full compensation. Matter referred to district inspector general.",
    location: "Memphis, TN",
    upvotes: 204,
    anonymous: false,
  },
  {
    id: "r4",
    title: "EPA Inspector Accepting Gifts from Industrial Facility",
    description:
      "I witnessed the EPA regional inspector receiving what appeared to be a large gift package from the Riverside Chemical plant manager after an inspection. The plant has had no violations in 5 years despite visible emissions.",
    category: "Corruption",
    submittedAt: "2024-11-10T16:45:00Z",
    status: "investigating",
    factCheckScore: 61,
    factCheckNotes:
      "Single witness account. Emission monitoring data shows facility operating above permitted thresholds on 4 dates since last inspection. Corroborating physical evidence needed.",
    location: "Baton Rouge, LA",
    upvotes: 156,
    anonymous: true,
  },
  {
    id: "r5",
    title: "City Councilman Falsifying Expense Reports",
    description:
      "Councilman Torres has been submitting mileage reimbursements for official trips he didn't take. I cross-referenced his claimed travel dates with his social media posts showing him in a different city.",
    category: "Fraud",
    submittedAt: "2024-11-08T08:10:00Z",
    status: "pending",
    factCheckScore: 72,
    factCheckNotes:
      "Social media timestamps partially corroborate claimed discrepancies. Expense records under FOIA request. Geolocation verification in progress.",
    location: "San Antonio, TX",
    upvotes: 289,
    anonymous: false,
  },
  {
    id: "r6",
    title: "Park Maintenance Funds Diverted to Private Events",
    description:
      "Documents I obtained show $180,000 in park maintenance funds were used for private political fundraisers hosted by the parks commissioner. Invoices show catering and venue costs billed as 'equipment maintenance.'",
    category: "Corruption",
    submittedAt: "2024-10-20T13:00:00Z",
    status: "resolved",
    factCheckScore: 91,
    factCheckNotes:
      "Invoices verified. Commissioner resigned November 3rd. District attorney opened criminal investigation. Case referred to state ethics board.",
    location: "Cleveland, OH",
    upvotes: 1203,
    anonymous: false,
  },
];

// ─── AI Mock Functions ─────────────────────────────────────────────────────────

export function analyzeSpendingRisk(record: SpendingRecord): {
  recommendation: string;
  priority: "immediate" | "high" | "routine";
  estimatedRecovery: number;
} {
  if (record.riskScore >= 85) {
    return {
      recommendation:
        "Immediate referral to Inspector General and Department of Justice. Suspend contract payments pending audit. Preserve all documentation.",
      priority: "immediate",
      estimatedRecovery: Math.round(record.amount * 0.65),
    };
  } else if (record.riskScore >= 60) {
    return {
      recommendation:
        "Flag for congressional oversight committee review. Request full audit within 30 days. Issue cure notice to contractor.",
      priority: "high",
      estimatedRecovery: Math.round(record.amount * 0.3),
    };
  } else {
    return {
      recommendation:
        "Add to quarterly monitoring queue. Routine compliance check sufficient. No immediate action required.",
      priority: "routine",
      estimatedRecovery: 0,
    };
  }
}

export function predictCrimeEscalation(data: CrimeDataPoint): {
  confidence: number;
  interventions: string[];
  timeframe: string;
} {
  const interventions: string[] = [];
  if (data.riskLevel === "critical") {
    interventions.push(
      "Deploy targeted patrol surge (recommended: 48hr immediate)",
      "Activate community violence intervention team",
      "Coordinate with DA office for rapid prosecution priority",
      "Notify federal task force if cross-jurisdictional factors present"
    );
  } else if (data.riskLevel === "high") {
    interventions.push(
      "Increase patrol frequency 40% for 30-day window",
      "Community liaison outreach to at-risk demographics",
      "Social services referral coordination"
    );
  } else {
    interventions.push(
      "Continue monitoring with monthly data review",
      "Maintain current resource allocation"
    );
  }

  const confidence =
    data.riskLevel === "critical"
      ? 87
      : data.riskLevel === "high"
      ? 74
      : data.riskLevel === "medium"
      ? 61
      : 48;

  return {
    confidence,
    interventions,
    timeframe:
      data.riskLevel === "critical"
        ? "24–72 hours"
        : data.riskLevel === "high"
        ? "2–4 weeks"
        : "1–3 months",
  };
}

export function factCheckReport(report: CitizenReport): {
  verdict: "credible" | "unverified" | "disputed" | "confirmed";
  summary: string;
  nextSteps: string[];
} {
  const verdict =
    report.factCheckScore >= 85
      ? ("confirmed" as const)
      : report.factCheckScore >= 65
      ? ("credible" as const)
      : report.factCheckScore >= 45
      ? ("unverified" as const)
      : ("disputed" as const);

  const nextSteps: string[] =
    verdict === "confirmed" || verdict === "credible"
      ? [
          "Notify relevant oversight authority",
          "Request official response from named parties",
          "Publish summary to public transparency ledger",
        ]
      : [
          "Request additional corroborating evidence",
          "Cross-reference with existing databases",
          "Mark as unverified pending further investigation",
        ];

  return { verdict, summary: report.factCheckNotes, nextSteps };
}

export function formatCurrency(amount: number): string {
  if (amount >= 1_000_000_000) return `$${(amount / 1_000_000_000).toFixed(1)}B`;
  if (amount >= 1_000_000) return `$${(amount / 1_000_000).toFixed(1)}M`;
  if (amount >= 1_000) return `$${(amount / 1_000).toFixed(0)}K`;
  return `$${amount.toLocaleString()}`;
}
