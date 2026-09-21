import React from "react";
import { PhoneCall, Mic, TrendingUp, BarChart2, Sparkles, Filter, Settings, ShieldAlert, FileText, ChevronRight, Activity, Database, Layers } from "lucide-react";

export default function CallAnalysisSidebar({ activeTab, setActiveTab }) {
    const mainTabs = [
        { id: "call-analysis", label: "Call Analysis Overview", icon: PhoneCall, count: "1,248" },
        { id: "live-recordings", label: "Live Call Recordings (Source 1)", icon: Database, badge: "Live Feed" },
        { id: "opportunity-framework", label: "Disbursal Opportunity Framework", icon: Layers, badge: "AI Framework" },
        { id: "collection-calls", label: "Collection Calls", icon: ShieldAlert, count: "482" },
        { id: "sales-calls", label: "Cross-Sell / Sales", icon: TrendingUp, count: "356" },
        { id: "all-recordings", label: "All Call Recordings", icon: Mic, count: "410" },
    ];

    const insightTabs = [
        { id: "voice-to-data", label: "Voice-to-Data AI", icon: Sparkles, badge: "AI Powered" },
        { id: "sentiment-analytics", label: "Sentiment Analytics", icon: BarChart2, badge: "Realtime" },
        { id: "call-insights", label: "Data Insights Report", icon: FileText },
    ];

    return (
        <aside className="w-64 bg-zinc-950 border-r border-zinc-800/80 flex flex-col h-full select-none">
            {/* Header */}
            <div className="p-4 border-b border-zinc-800/80 flex items-center gap-3">
                <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                    <PhoneCall className="h-5 w-5 text-white" />
                </div>
                <div>
                    <h2 className="text-sm font-semibold text-zinc-100 tracking-wide flex items-center gap-1.5">
                        Call Intelligence
                    </h2>
                    <p className="text-[11px] text-zinc-400 font-medium">Voice Analytics AI</p>
                </div>
            </div>

            {/* Menu Sections */}
            <div className="flex-1 overflow-y-auto p-3 space-y-6 scrollbar-custom-dark">
                {/* Main Navigation */}
                <div>
                    <div className="px-3 mb-2">
                        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-1.5">
                            <Activity className="h-3.5 w-3.5 text-cyan-400" />
                            Recording Streams
                        </span>
                    </div>
                    <nav className="space-y-1">
                        {mainTabs.map((tab) => {
                            const Icon = tab.icon;
                            const isActive = activeTab === tab.id;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-all duration-200 group ${
                                        isActive
                                            ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/10 text-cyan-300 border border-cyan-500/30 shadow-md shadow-cyan-500/5"
                                            : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/80"
                                    }`}
                                >
                                    <div className="flex items-center gap-2.5 min-w-0">
                                        <Icon className={`h-4 w-4 flex-shrink-0 transition-colors ${isActive ? "text-cyan-400" : "text-zinc-500 group-hover:text-zinc-300"}`} />
                                        <span className="truncate">{tab.label}</span>
                                    </div>
                                    {tab.badge && (
                                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-semibold tracking-wider uppercase">
                                            {tab.badge}
                                        </span>
                                    )}
                                    {tab.count && (
                                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                                            isActive ? "bg-cyan-500/30 text-cyan-200" : "bg-zinc-900 text-zinc-400 group-hover:bg-zinc-800"
                                        }`}>
                                            {tab.count}
                                        </span>
                                    )}
                                </button>
                            );
                        })}
                    </nav>
                </div>

                {/* AI Insights */}
                <div>
                    <div className="px-3 mb-2">
                        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-1.5">
                            <Sparkles className="h-3.5 w-3.5 text-purple-400" />
                            AI Analytics
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
                                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-all duration-200 group ${
                                        isActive
                                            ? "bg-gradient-to-r from-purple-500/20 to-indigo-500/10 text-purple-300 border border-purple-500/30 shadow-md shadow-purple-500/5"
                                            : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/80"
                                    }`}
                                >
                                    <div className="flex items-center gap-2.5 min-w-0">
                                        <Icon className={`h-4 w-4 flex-shrink-0 transition-colors ${isActive ? "text-purple-400" : "text-zinc-500 group-hover:text-zinc-300"}`} />
                                        <span className="truncate">{tab.label}</span>
                                    </div>
                                    {tab.badge && (
                                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30 font-semibold tracking-wider uppercase">
                                            {tab.badge}
                                        </span>
                                    )}
                                </button>
                            );
                        })}
                    </nav>
                </div>
            </div>

            {/* Bottom Status Panel */}
            <div className="p-3 border-t border-zinc-800/80 bg-zinc-950/60">
                <div className="p-2.5 rounded-lg bg-zinc-900/70 border border-zinc-800 flex items-center gap-3">
                    <div className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-[11px] font-medium text-zinc-200 truncate">Voice AI Engine</p>
                        <p className="text-[10px] text-emerald-400 font-mono truncate">Active • 99.4% Accuracy</p>
                    </div>
                </div>
            </div>
        </aside>
    );
}
