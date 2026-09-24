import React, { useState } from "react";
import { 
    PhoneCall, Sparkles, Filter, Search, Play, Pause, Volume2, 
    Calendar, CheckCircle2, AlertTriangle, ArrowUpRight, TrendingUp, 
    ShieldAlert, Database, Cpu, FileAudio, RefreshCw, BarChart2, Check
} from "lucide-react";

import VoiceToTextConverter from "./GemmaVoiceToTextConverter";
import LiveCallRecordingsView from "./LiveCallRecordingsView";
import OpportunityFrameworkView from "./OpportunityFrameworkView";
import LoanConversionMLView from "./LoanConversionMLView";
import InquiryScrubView from "./InquiryScrubView";
import MasterRankingView from "./MasterRankingView";

export default function CallAnalysisDashboard({ activeTab }) {
    if (activeTab === "loan-conversion-ml") {
        return <LoanConversionMLView />;
    }
    if (activeTab === "inquiry-scrub") {
        return <InquiryScrubView />;
    }
    if (activeTab === "master-ranking") {
        return <MasterRankingView />;
    }
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
            sentimentColor: "text-amber-800 bg-amber-50 border-amber-200",
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
            sentimentColor: "text-emerald-800 bg-emerald-50 border-emerald-200",
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
            sentimentColor: "text-blue-800 bg-blue-50 border-blue-200",
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
        <div className="flex-1 flex flex-col h-full overflow-y-auto bg-slate-50 text-slate-900 p-6 space-y-6 scrollbar-custom-light font-sans">
            {/* Top Title & Control Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5 bg-white p-5 rounded-xl border shadow-xs">
                <div>
                    <div className="flex items-center gap-2.5">
                        <div className="p-2 rounded-lg bg-cyan-50 border border-cyan-200">
                            <PhoneCall className="h-5 w-5 text-cyan-600" />
                        </div>
                        <h1 className="text-lg font-bold text-slate-900 tracking-tight">
                            Call Centre Voice Analysis
                        </h1>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">
                        Automated Voice-to-Data conversion and conversational loan intent detection
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <button className="px-3.5 py-2 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-all flex items-center gap-2 shadow-xs">
                        <Calendar className="h-4 w-4 text-slate-400" />
                        Last 30 Days
                    </button>

                    <button className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs transition-all flex items-center gap-2">
                        <RefreshCw className="h-3.5 w-3.5" />
                        Run Voice Pipeline
                    </button>
                </div>
            </div>

            {/* Key Metrics Stat Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs relative overflow-hidden group">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Analyzed Calls</span>
                        <div className="p-2 rounded-lg bg-cyan-50 text-cyan-700">
                            <FileAudio className="h-4 w-4" />
                        </div>
                    </div>
                    <div className="mt-3">
                        <span className="text-2xl font-black text-slate-900">1,248</span>
                        <span className="text-xs text-emerald-600 ml-2 font-bold">↑ 14% vs last month</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1">Voice-to-Data Converted</p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs relative overflow-hidden group">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Collection Commitments</span>
                        <div className="p-2 rounded-lg bg-emerald-50 text-emerald-700">
                            <ShieldAlert className="h-4 w-4" />
                        </div>
                    </div>
                    <div className="mt-3">
                        <span className="text-2xl font-black text-slate-900">78.2%</span>
                        <span className="text-xs text-emerald-600 ml-2 font-bold">482 Calls Analyzed</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1">Promise to Pay Secured</p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs relative overflow-hidden group">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Cross-Sell Opportunity</span>
                        <div className="p-2 rounded-lg bg-purple-50 text-purple-700">
                            <TrendingUp className="h-4 w-4" />
                        </div>
                    </div>
                    <div className="mt-3">
                        <span className="text-2xl font-black text-slate-900">356</span>
                        <span className="text-xs text-purple-600 ml-2 font-bold">High Intent Leads</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1">Eligible for New Disbursal</p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs relative overflow-hidden group">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Avg Processing Time</span>
                        <div className="p-2 rounded-lg bg-amber-50 text-amber-700">
                            <Cpu className="h-4 w-4" />
                        </div>
                    </div>
                    <div className="mt-3">
                        <span className="text-2xl font-black text-slate-900">1.8s</span>
                        <span className="text-xs text-emerald-600 ml-2 font-bold">Realtime Gemma AI</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1">Per Call Recording</p>
                </div>
            </div>

            {/* Source Configuration Table */}
            <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <Database className="h-4 w-4 text-indigo-600" />
                        <h3 className="text-sm font-semibold text-slate-800">
                            Call Centre Recordings & Stream Specification
                        </h3>
                    </div>
                    <span className="text-xs text-slate-600 bg-slate-100 px-3 py-1 rounded-full border border-slate-200 font-medium">
                        Active Ingestion
                    </span>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                        <thead>
                            <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider text-[10px]">
                                <th className="py-3 px-4">Source</th>
                                <th className="py-3 px-4">Data / Activity Stream</th>
                                <th className="py-3 px-4">Data Period</th>
                                <th className="py-3 px-4">Analysis Method</th>
                                <th className="py-3 px-4 text-right">Volume</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-slate-700">
                            {dataSourceRows.map((row, idx) => (
                                <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                                    <td className="py-3 px-4 font-medium text-indigo-600 flex items-center gap-2">
                                        <FileAudio className="h-3.5 w-3.5 text-indigo-500" />
                                        {row.source}
                                    </td>
                                    <td className="py-3 px-4 font-semibold text-slate-900">{row.activity}</td>
                                    <td className="py-3 px-4 text-slate-600">
                                        <span className="inline-flex items-center gap-1 bg-slate-100 px-2 py-0.5 rounded text-[11px] border border-slate-200/60">
                                            <Calendar className="h-3 w-3 text-slate-400" />
                                            {row.period}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4">
                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-50 text-purple-700 border border-purple-200 text-[11px] font-medium">
                                            <Sparkles className="h-3 w-3 text-purple-600" />
                                            {row.method}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4 text-right font-mono font-bold text-slate-800">{row.volume}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Call Recordings & AI Insights Stream */}
            <div className="flex-1 flex flex-col space-y-4">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs">
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                        <div className="relative flex-1 sm:w-72">
                            <Search className="h-4 w-4 absolute left-3 top-2.5 text-slate-400" />
                            <input 
                                type="text" 
                                placeholder="Search by Call ID, Customer..." 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <Filter className="h-3.5 w-3.5 text-slate-400" />
                        <button 
                            onClick={() => setFilterCategory("all")}
                            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${filterCategory === "all" ? "bg-indigo-600 text-white shadow-xs" : "text-slate-600 hover:bg-slate-100"}`}
                        >
                            All Calls
                        </button>
                        <button 
                            onClick={() => setFilterCategory("collection")}
                            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${filterCategory === "collection" ? "bg-indigo-600 text-white shadow-xs" : "text-slate-600 hover:bg-slate-100"}`}
                        >
                            Collection
                        </button>
                        <button 
                            onClick={() => setFilterCategory("sales")}
                            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${filterCategory === "sales" ? "bg-indigo-600 text-white shadow-xs" : "text-slate-600 hover:bg-slate-100"}`}
                        >
                            Cross-Sell
                        </button>
                    </div>
                </div>

                {/* Call Cards */}
                <div className="space-y-3">
                    {filteredCalls.map((call) => (
                        <div 
                            key={call.id}
                            className={`p-5 rounded-xl border transition-all duration-200 bg-white hover:border-slate-300 shadow-xs ${
                                selectedCall?.id === call.id ? "border-indigo-500 ring-2 ring-indigo-500/10 shadow-sm" : "border-slate-200"
                            }`}
                        >
                            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                                <div className="space-y-2 flex-1">
                                    <div className="flex items-center gap-3 flex-wrap">
                                        <span className="text-sm font-bold text-slate-900">{call.id}</span>
                                        <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${call.sentimentColor}`}>
                                            {call.sentiment}
                                        </span>
                                        <span className="text-xs text-slate-600 font-medium bg-slate-100 px-2.5 py-0.5 rounded border border-slate-200">
                                            {call.type}
                                        </span>
                                        <span className="text-xs text-slate-400">⏱️ {call.duration}</span>
                                    </div>

                                    <div className="text-xs text-slate-600 flex items-center gap-4 pt-1">
                                        <span>👤 <strong className="text-slate-800">Agent:</strong> {call.agent}</span>
                                        <span>📞 <strong className="text-slate-800">Customer:</strong> {call.customer}</span>
                                        <span className="text-slate-400">📅 {call.date}</span>
                                    </div>

                                    <p className="text-xs text-slate-700 bg-slate-50 p-3.5 rounded-lg border border-slate-200 mt-2 leading-relaxed">
                                        <strong className="text-indigo-700 font-semibold">AI Summary: </strong>
                                        {call.summary}
                                    </p>
                                </div>

                                <div className="flex items-center gap-3">
                                    <button 
                                        onClick={() => {
                                             setSelectedCall(selectedCall?.id === call.id ? null : call);
                                            setIsPlaying(selectedCall?.id === call.id ? !isPlaying : true);
                                        }}
                                        className="px-3.5 py-2 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-700 hover:bg-indigo-100 text-xs font-semibold flex items-center gap-2 transition-all shadow-xs"
                                    >
                                        {selectedCall?.id === call.id && isPlaying ? (
                                            <>
                                                <Pause className="h-3.5 w-3.5 text-indigo-600" />
                                                Pause Audio
                                            </>
                                        ) : (
                                            <>
                                                <Play className="h-3.5 w-3.5 text-indigo-600" />
                                                Play Recording
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Audio Player Bar & Detailed AI Insights */}
                            {selectedCall?.id === call.id && (
                                <div className="mt-4 pt-4 border-t border-slate-200 space-y-4 animate-in fade-in duration-200">
                                    {/* Waveform Player */}
                                    <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 flex items-center gap-4">
                                        <div className="p-2 rounded-full bg-indigo-100 text-indigo-600">
                                            <Volume2 className="h-4 w-4" />
                                        </div>
                                        <div className="flex-1 flex items-center gap-1 h-6">
                                            {[40, 70, 30, 90, 60, 80, 50, 95, 30, 60, 85, 40, 70, 90, 60, 40, 80, 50, 90, 70, 40, 60].map((h, i) => (
                                                <div 
                                                    key={i} 
                                                    className={`w-1 rounded-full transition-all duration-300 ${isPlaying ? "bg-indigo-600 animate-pulse" : "bg-slate-300"}`}
                                                    style={{ height: `${h}%` }}
                                                />
                                            ))}
                                        </div>
                                        <span className="text-xs font-mono text-slate-500">01:24 / {call.duration}</span>
                                    </div>

                                    {/* Voice-to-Data Structured Insights */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                        <div className="p-3.5 rounded-lg bg-white border border-slate-200 shadow-xs">
                                            <span className="text-[10px] font-bold text-purple-700 uppercase tracking-wider block mb-1">
                                                Extracted Commitment
                                            </span>
                                            <p className="text-xs font-semibold text-slate-900">
                                                {call.aiInsights.paymentCommitment || call.aiInsights.interestedProduct}
                                            </p>
                                        </div>

                                        <div className="p-3.5 rounded-lg bg-white border border-slate-200 shadow-xs">
                                            <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider block mb-1">
                                                Sentiment Progression
                                            </span>
                                            <p className="text-xs font-semibold text-slate-900">
                                                {call.aiInsights.sentimentShift}
                                            </p>
                                        </div>

                                        <div className="p-3.5 rounded-lg bg-white border border-slate-200 shadow-xs">
                                            <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider block mb-1">
                                                Key Terms Triggered
                                            </span>
                                            <div className="flex flex-wrap gap-1.5 mt-1">
                                                {call.aiInsights.keyKeywords.map((kw, i) => (
                                                    <span key={i} className="text-[10px] bg-slate-100 text-slate-700 border border-slate-200 px-2 py-0.5 rounded font-medium">
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
