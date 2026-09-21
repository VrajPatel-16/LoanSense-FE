import React, { useState } from "react";
import { 
    PhoneCall, Sparkles, Filter, Search, Play, Pause, Volume2, 
    Calendar, CheckCircle2, AlertTriangle, ArrowUpRight, TrendingUp, 
    ShieldAlert, Database, Cpu, FileAudio, RefreshCw, BarChart2, Check
} from "lucide-react";

import VoiceToTextConverter from "./GemmaVoiceToTextConverter";
import LiveCallRecordingsView from "./LiveCallRecordingsView";
import OpportunityFrameworkView from "./OpportunityFrameworkView";

export default function CallAnalysisDashboard({ activeTab }) {
    if (activeTab === "voice-to-data") {
        return <VoiceToTextConverter />;
    }
    if (activeTab === "live-recordings") {
        return <LiveCallRecordingsView />;
    }
    if (activeTab === "opportunity-framework") {
        return <OpportunityFrameworkView />;
    }

    const [selectedCall, setSelectedCall] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [filterCategory, setFilterCategory] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");

    // Data Sources Table (Matching User's Specs)
    const dataSourceRows = [
        {
            source: "Source 1 – Call Centre Recordings",
            activity: "Collection-related calls",
            period: "Last 30 days",
            method: "Voice-to-Data conversion (AI Engine)",
            volume: "482 Calls",
            status: "Completed"
        },
        {
            source: "Source 1 – Call Centre Recordings",
            activity: "Cross-selling / Up-Sell / Sales calls",
            period: "Last 30 days",
            method: "Voice-to-Data conversion (AI Engine)",
            volume: "356 Calls",
            status: "Completed"
        },
        {
            source: "Source 1 – Call Centre Recordings",
            activity: "All remaining calls (Customer Support & General)",
            period: "Last 30 days",
            method: "Voice-to-Data conversion (AI Engine)",
            volume: "410 Calls",
            status: "Processing"
        }
    ];

    // Sample Call Recording Insights
    const sampleCalls = [
        {
            id: "CALL-89421",
            agent: "Ramesh Sharma (AG-104)",
            customer: "Amit Verma (Cust #49201)",
            type: "Collection-related",
            duration: "04m 12s",
            date: "2026-08-20 14:32",
            sentiment: "Risk / Overdue Promise",
            sentimentColor: "text-amber-400 bg-amber-500/10 border-amber-500/30",
            summary: "Customer agreed to pay overdue EMI amount ₹8,500 by August 25th after collection officer explained repayment terms.",
            aiInsights: {
                paymentCommitment: "₹8,500 by 25-Aug-2026",
                intentScore: 88,
                complianceStatus: "Compliant",
                sentimentShift: "Frustrated → Agreeable",
                keyKeywords: ["EMI", "Grace Period", "Pay Later", "Branch Visit"]
            }
        },
        {
            id: "CALL-89422",
            agent: "Priya Singh (AG-208)",
            customer: "Sunita Devi (Cust #18239)",
            type: "Cross-selling / Up-Sell",
            duration: "06m 45s",
            date: "2026-08-20 15:10",
            sentiment: "Positive / High Intent",
            sentimentColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
            summary: "Customer inquired about top-up loan scheme during routine follow-up. Agent pitched micro-enterprise expansion loan.",
            aiInsights: {
                interestedProduct: "Micro-Enterprise Expansion Loan",
                upsellScore: 94,
                complianceStatus: "Compliant",
                sentimentShift: "Neutral → Interested",
                keyKeywords: ["Top-up Loan", "Interest Rate", "Document Requirement"]
            }
        },
        {
            id: "CALL-89423",
            agent: "Vikas Kumar (AG-112)",
            customer: "Rajesh Gupta (Cust #50211)",
            type: "General Support",
            duration: "02m 50s",
            date: "2026-08-20 16:05",
            sentiment: "Neutral",
            sentimentColor: "text-blue-400 bg-blue-500/10 border-blue-500/30",
            summary: "Customer checked balance status for recent center collection transaction.",
            aiInsights: {
                paymentCommitment: "N/A",
                intentScore: 60,
                complianceStatus: "Compliant",
                sentimentShift: "Neutral → Neutral",
                keyKeywords: ["Receipt", "Transaction Status", "Center ID"]
            }
        }
    ];

    const filteredCalls = sampleCalls.filter(c => {
        if (filterCategory === "collection" && c.type !== "Collection-related") return false;
        if (filterCategory === "sales" && c.type !== "Cross-selling / Up-Sell") return false;
        if (searchTerm && !c.id.toLowerCase().includes(searchTerm.toLowerCase()) && !c.customer.toLowerCase().includes(searchTerm.toLowerCase())) return false;
        return true;
    });

    return (
        <div className="flex-1 flex flex-col h-full overflow-y-auto bg-zinc-950 p-6 space-y-6 scrollbar-custom-dark">
            {/* Top Title & Control Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800 pb-5">
                <div>
                    <div className="flex items-center gap-2.5">
                        <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30">
                            <PhoneCall className="h-5 w-5 text-cyan-400" />
                        </div>
                        <h1 className="text-xl font-bold text-zinc-100 tracking-tight">
                            Call Centre Voice Analysis Dashboard
                        </h1>
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gradient-to-r from-purple-500/20 to-indigo-500/20 text-purple-300 border border-purple-500/30 flex items-center gap-1">
                            <Sparkles className="h-3 w-3 text-purple-400" />
                            Voice AI Pipeline Active
                        </span>
                    </div>
                    <p className="text-xs text-zinc-400 mt-1">
                        Automated Voice-to-Data conversion and AI data insights for call centre recordings (Last 30 Days)
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <button className="px-3.5 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-medium text-zinc-300 hover:text-white hover:bg-zinc-800 transition-all flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-zinc-400" />
                        Last 30 Days
                    </button>

                    <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-semibold shadow-lg shadow-cyan-500/20 transition-all flex items-center gap-2">
                        <RefreshCw className="h-3.5 w-3.5" />
                        Run Voice AI Pipeline
                    </button>
                </div>
            </div>

            {/* Key Metrics Stat Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-sm relative overflow-hidden group hover:border-cyan-500/40 transition-all">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-zinc-400">Total Analyzed Calls</span>
                        <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
                            <FileAudio className="h-4 w-4" />
                        </div>
                    </div>
                    <div className="mt-3">
                        <span className="text-2xl font-bold text-zinc-100">1,248</span>
                        <span className="text-xs text-emerald-400 ml-2 font-medium">↑ 14% vs last month</span>
                    </div>
                    <p className="text-[11px] text-zinc-400 mt-1">Voice-to-Data Converted</p>
                </div>

                <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-sm relative overflow-hidden group hover:border-emerald-500/40 transition-all">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-zinc-400">Collection Commitments</span>
                        <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                            <ShieldAlert className="h-4 w-4" />
                        </div>
                    </div>
                    <div className="mt-3">
                        <span className="text-2xl font-bold text-zinc-100">78.2%</span>
                        <span className="text-xs text-emerald-400 ml-2 font-medium">482 Calls Analyzed</span>
                    </div>
                    <p className="text-[11px] text-zinc-400 mt-1">Promise to Pay Secured</p>
                </div>

                <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-sm relative overflow-hidden group hover:border-purple-500/40 transition-all">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-zinc-400">Cross-Sell Opportunity</span>
                        <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
                            <TrendingUp className="h-4 w-4" />
                        </div>
                    </div>
                    <div className="mt-3">
                        <span className="text-2xl font-bold text-zinc-100">34.5%</span>
                        <span className="text-xs text-purple-400 ml-2 font-medium">356 Sales Calls</span>
                    </div>
                    <p className="text-[11px] text-zinc-400 mt-1">High Intent Customers Identified</p>
                </div>

                <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-sm relative overflow-hidden group hover:border-blue-500/40 transition-all">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-zinc-400">AI Accuracy Score</span>
                        <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                            <Cpu className="h-4 w-4" />
                        </div>
                    </div>
                    <div className="mt-3">
                        <span className="text-2xl font-bold text-zinc-100">99.4%</span>
                        <span className="text-xs text-blue-400 ml-2 font-medium">Zero Error Rate</span>
                    </div>
                    <p className="text-[11px] text-zinc-400 mt-1">NLP Extraction Confidence</p>
                </div>
            </div>

            {/* Source Configuration Table (Matching Provided Requirements Image) */}
            <div className="p-5 rounded-xl bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-md">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <Database className="h-4 w-4 text-cyan-400" />
                        <h3 className="text-sm font-semibold text-zinc-200">
                            Source 1 – Call Centre Recordings & Conversion Spec
                        </h3>
                    </div>
                    <span className="text-xs text-zinc-400 bg-zinc-800/70 px-3 py-1 rounded-full border border-zinc-700/50">
                        Voice-to-Data Method Active
                    </span>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                        <thead>
                            <tr className="border-b border-zinc-800 bg-zinc-900/90 text-zinc-400 font-semibold uppercase tracking-wider text-[10px]">
                                <th className="py-3 px-4">Source</th>
                                <th className="py-3 px-4">Data / Activity Stream</th>
                                <th className="py-3 px-4">Data Period</th>
                                <th className="py-3 px-4">Analysis Method</th>
                                <th className="py-3 px-4 text-right">Volume</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
                            {dataSourceRows.map((row, idx) => (
                                <tr key={idx} className="hover:bg-zinc-800/40 transition-colors">
                                    <td className="py-3 px-4 font-medium text-cyan-300 flex items-center gap-2">
                                        <FileAudio className="h-3.5 w-3.5 text-cyan-400" />
                                        {row.source}
                                    </td>
                                    <td className="py-3 px-4 font-semibold text-zinc-100">{row.activity}</td>
                                    <td className="py-3 px-4 text-zinc-400">
                                        <span className="inline-flex items-center gap-1 bg-zinc-800 px-2 py-0.5 rounded text-[11px]">
                                            <Calendar className="h-3 w-3 text-zinc-400" />
                                            {row.period}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4">
                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/30 text-[11px] font-medium">
                                            <Sparkles className="h-3 w-3 text-purple-400" />
                                            {row.method}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4 text-right font-mono font-bold text-zinc-200">{row.volume}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Call Recordings & AI Insights Stream */}
            <div className="flex-1 flex flex-col space-y-4">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-zinc-900/40 p-3 rounded-lg border border-zinc-800/60">
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                        <div className="relative flex-1 sm:w-64">
                            <Search className="h-4 w-4 absolute left-3 top-2.5 text-zinc-500" />
                            <input 
                                type="text" 
                                placeholder="Search by Call ID, Customer..." 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-zinc-200 focus:outline-none focus:border-cyan-500"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <Filter className="h-3.5 w-3.5 text-zinc-400" />
                        <button 
                            onClick={() => setFilterCategory("all")}
                            className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${filterCategory === "all" ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40" : "text-zinc-400 hover:bg-zinc-800"}`}
                        >
                            All Calls
                        </button>
                        <button 
                            onClick={() => setFilterCategory("collection")}
                            className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${filterCategory === "collection" ? "bg-amber-500/20 text-amber-300 border border-amber-500/40" : "text-zinc-400 hover:bg-zinc-800"}`}
                        >
                            Collection
                        </button>
                        <button 
                            onClick={() => setFilterCategory("sales")}
                            className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${filterCategory === "sales" ? "bg-purple-500/20 text-purple-300 border border-purple-500/40" : "text-zinc-400 hover:bg-zinc-800"}`}
                        >
                            Cross-Sell
                        </button>
                    </div>
                </div>

                {/* Call Cards */}
                <div className="space-y-4">
                    {filteredCalls.map((call) => (
                        <div 
                            key={call.id}
                            className={`p-5 rounded-xl border transition-all duration-300 bg-zinc-900/50 hover:bg-zinc-900/90 ${
                                selectedCall?.id === call.id ? "border-cyan-500 shadow-lg shadow-cyan-500/10" : "border-zinc-800/80"
                            }`}
                        >
                            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                                <div className="space-y-1.5 flex-1">
                                    <div className="flex items-center gap-3 flex-wrap">
                                        <span className="text-sm font-bold text-zinc-100">{call.id}</span>
                                        <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${call.sentimentColor}`}>
                                            {call.sentiment}
                                        </span>
                                        <span className="text-xs text-zinc-400 font-medium bg-zinc-800/60 px-2.5 py-0.5 rounded">
                                            {call.type}
                                        </span>
                                        <span className="text-xs text-zinc-400">⏱️ {call.duration}</span>
                                    </div>

                                    <div className="text-xs text-zinc-300 flex items-center gap-4 pt-1">
                                        <span>👤 <strong>Agent:</strong> {call.agent}</span>
                                        <span>📞 <strong>Customer:</strong> {call.customer}</span>
                                        <span className="text-zinc-400">📅 {call.date}</span>
                                    </div>

                                    <p className="text-xs text-zinc-300 bg-zinc-950/70 p-3 rounded-lg border border-zinc-800/60 mt-2">
                                        <strong className="text-cyan-400 font-semibold">AI Summary: </strong>
                                        {call.summary}
                                    </p>
                                </div>

                                <div className="flex items-center gap-3">
                                    <button 
                                        onClick={() => {
                                            setSelectedCall(selectedCall?.id === call.id ? null : call);
                                            setIsPlaying(selectedCall?.id === call.id ? !isPlaying : true);
                                        }}
                                        className="px-3.5 py-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/20 text-xs font-semibold flex items-center gap-2 transition-all"
                                    >
                                        {selectedCall?.id === call.id && isPlaying ? (
                                            <>
                                                <Pause className="h-3.5 w-3.5 text-cyan-400" />
                                                Pause Audio
                                            </>
                                        ) : (
                                            <>
                                                <Play className="h-3.5 w-3.5 text-cyan-400" />
                                                Play Recording
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Audio Player Bar & Detailed AI Insights */}
                            {selectedCall?.id === call.id && (
                                <div className="mt-4 pt-4 border-t border-zinc-800 space-y-4 animate-in fade-in duration-300">
                                    {/* Waveform Player */}
                                    <div className="p-3 bg-zinc-950 rounded-lg border border-zinc-800 flex items-center gap-4">
                                        <div className="p-2 rounded-full bg-cyan-500/20 text-cyan-400">
                                            <Volume2 className="h-4 w-4" />
                                        </div>
                                        <div className="flex-1 flex items-center gap-1 h-6">
                                            {[40, 70, 30, 90, 60, 80, 50, 95, 30, 60, 85, 40, 70, 90, 60, 40, 80, 50, 90, 70, 40, 60].map((h, i) => (
                                                <div 
                                                    key={i} 
                                                    className={`w-1 rounded-full transition-all duration-300 ${isPlaying ? "bg-cyan-400 animate-pulse" : "bg-zinc-700"}`}
                                                    style={{ height: `${h}%` }}
                                                />
                                            ))}
                                        </div>
                                        <span className="text-xs font-mono text-zinc-400">01:24 / {call.duration}</span>
                                    </div>

                                    {/* Voice-to-Data Structured Insights */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                        <div className="p-3 rounded-lg bg-zinc-950/80 border border-zinc-800/80">
                                            <span className="text-[10px] font-bold text-purple-400 uppercase tracking-wider block mb-1">
                                                Extracted Commitment
                                            </span>
                                            <p className="text-xs font-semibold text-zinc-100">
                                                {call.aiInsights.paymentCommitment || call.aiInsights.interestedProduct}
                                            </p>
                                        </div>

                                        <div className="p-3 rounded-lg bg-zinc-950/80 border border-zinc-800/80">
                                            <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider block mb-1">
                                                Sentiment Progression
                                            </span>
                                            <p className="text-xs font-semibold text-zinc-100">
                                                {call.aiInsights.sentimentShift}
                                            </p>
                                        </div>

                                        <div className="p-3 rounded-lg bg-zinc-950/80 border border-zinc-800/80">
                                            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block mb-1">
                                                Key Terms Triggered
                                            </span>
                                            <div className="flex flex-wrap gap-1 mt-1">
                                                {call.aiInsights.keyKeywords.map((kw, i) => (
                                                    <span key={i} className="text-[10px] bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded">
                                                        {kw}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
