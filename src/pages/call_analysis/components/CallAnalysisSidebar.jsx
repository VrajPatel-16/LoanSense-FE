import React from "react";
import { 
    Cpu, PhoneCall, Search, Award, Layers, Database, ShieldAlert, 
    TrendingUp, Mic, Sparkles, BarChart2, FileText, ChevronRight, 
    Activity, Zap, ShieldCheck
} from "lucide-react";

export default function CallAnalysisSidebar({ activeTab, setActiveTab }) {
    // 1. Primary Pillar: New Loan Intent
    const newLoanIntentTabs = [
        { id: "loan-conversion-ml", label: "ML Model", icon: Cpu },
        { id: "call-analysis", label: "Call Analysis", icon: PhoneCall },
        { id: "inquiry-scrub", label: "Inquiry Scrub Calculation", icon: Search },
        { id: "master-ranking", label: "Disbursal Master Ranking", icon: Award },
    ];

    // 2. Call Streams & Operations
    const callStreamTabs = [
        { id: "live-recordings", label: "Live Call Recordings", icon: Database },
        { id: "collection-calls", label: "Collection Calls", icon: ShieldAlert },
        { id: "sales-calls", label: "Cross-Sell / Sales Calls", icon: TrendingUp },
        { id: "all-recordings", label: "All Call Archives", icon: Mic },
    ];

    // 3. AI Insights & Tools
    const insightTabs = [
        { id: "voice-to-data", label: "Voice-to-Data AI", icon: Sparkles },
        { id: "opportunity-framework", label: "Disbursal Framework", icon: Layers },
        { id: "call-insights", label: "Intelligence Reports", icon: FileText },
    ];

    return (
        <aside className="w-68 bg-white border-r border-slate-200 flex flex-col h-full select-none shadow-sm">
            {/* Brand Header */}
            <div className="p-4 border-b border-slate-100 flex items-center gap-3 bg-gradient-to-r from-slate-50 to-white">
                <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-indigo-600 to-blue-600 flex items-center justify-center shadow-md shadow-indigo-600/20">
                    <Zap className="h-5 w-5 text-white" />
                </div>
                <div>
                    <h2 className="text-sm font-bold text-slate-900 tracking-tight flex items-center gap-1.5">
                        LoanSense AI
                        <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.2 rounded bg-indigo-100 text-indigo-800">
                            PRO
                        </span>
                    </h2>
                    <p className="text-[11px] text-slate-500 font-medium">Credit & Call Intelligence</p>
                </div>
            </div>

            {/* Menu Sections */}
            <div className="flex-1 overflow-y-auto p-3 space-y-6 scrollbar-custom-light">
                {/* SECTION 1: PRIMARY MODULE - NEW LOAN INTENT */}
                <div>
                    <div className="px-3 mb-2">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                            <Activity className="h-3.5 w-3.5 text-indigo-500" />
                            New Loan Intent
                        </span>
                    </div>
                    <nav className="space-y-1">
                        {newLoanIntentTabs.map((tab) => {
                            const Icon = tab.icon;
                            const isActive = activeTab === tab.id;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`w-full flex items-center px-3 py-2.5 rounded-lg text-xs font-medium transition-all duration-150 group ${
                                        isActive
                                            ? "bg-indigo-50 text-indigo-900 border border-indigo-200/80 shadow-sm font-semibold"
                                            : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/70"
                                    }`}
                                >
                                    <div className="flex items-center gap-2.5 min-w-0">
                                        <Icon className={`h-4 w-4 flex-shrink-0 transition-colors ${isActive ? "text-indigo-600" : "text-slate-400 group-hover:text-slate-600"}`} />
                                        <span className="truncate">{tab.label}</span>
                                    </div>
                                </button>
                            );
                        })}
                    </nav>
                </div>

                {/* SECTION 2: RECORDING STREAMS */}
                <div>
                    <div className="px-3 mb-2">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                            Call Operations
                        </span>
                    </div>
                    <nav className="space-y-1">
                        {callStreamTabs.map((tab) => {
                            const Icon = tab.icon;
                            const isActive = activeTab === tab.id;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`w-full flex items-center px-3 py-2.5 rounded-lg text-xs font-medium transition-all duration-150 group ${
                                        isActive
                                            ? "bg-slate-100 text-slate-900 border border-slate-200 shadow-sm font-semibold"
                                            : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/70"
                                    }`}
                                >
                                    <div className="flex items-center gap-2.5 min-w-0">
                                        <Icon className={`h-4 w-4 flex-shrink-0 transition-colors ${isActive ? "text-slate-800" : "text-slate-400 group-hover:text-slate-600"}`} />
                                        <span className="truncate">{tab.label}</span>
                                    </div>
                                </button>
                            );
                        })}
                    </nav>
                </div>

                {/* SECTION 3: AI INTELLIGENCE */}
                <div>
                    <div className="px-3 mb-2">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                            AI Framework & Tools
                        </span>
                    </div>
                    <nav className="space-y-1">
                        {insightTabs.map((tab) => {
                            const Icon = tab.icon;
                            const isActive = activeTab === tab.id;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`w-full flex items-center px-3 py-2.5 rounded-lg text-xs font-medium transition-all duration-150 group ${
                                        isActive
                                            ? "bg-slate-100 text-slate-900 border border-slate-200 shadow-sm font-semibold"
                                            : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/70"
                                    }`}
                                >
                                    <div className="flex items-center gap-2.5 min-w-0">
                                        <Icon className={`h-4 w-4 flex-shrink-0 transition-colors ${isActive ? "text-slate-800" : "text-slate-400 group-hover:text-slate-600"}`} />
                                        <span className="truncate">{tab.label}</span>
                                    </div>
                                </button>
                            );
                        })}
                    </nav>
                </div>
            </div>

            {/* Bottom System Status */}
            <div className="p-3.5 border-t border-slate-200 bg-slate-50/70">
                <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></div>
                        <span className="text-[11px] font-semibold text-slate-700">SARTHI_AIBOT Live</span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono">13,325 Scored</span>
                </div>
            </div>
        </aside>
    );
}
