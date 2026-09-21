import React, { useState, useEffect } from "react";
import { 
    Database, RefreshCw, Play, Pause, Search, Calendar, Filter, 
    CheckCircle2, AlertCircle, Phone, User, Building, MapPin, 
    ArrowUpRight, Sparkles, Volume2, ShieldCheck, FileAudio, FileSpreadsheet, Download
} from "lucide-react";

export default function LiveCallRecordingsView() {
    const [recordings, setRecordings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [exportingExcel, setExportingExcel] = useState(false);
    const [error, setError] = useState(null);
    const [activeAudio, setActiveAudio] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);

    // Filters
    const [startDate, setStartDate] = useState("2026-08-01");
    const [endDate, setEndDate] = useState("2026-08-21");
    const [limit, setLimit] = useState(10);
    const [statusFilter, setStatusFilter] = useState("answered");
    const [searchTerm, setSearchTerm] = useState("");

    const fetchRecordings = async () => {
        setLoading(true);
        setError(null);
        try {
            const apiBase = import.meta.env.VITE_API_URL || "";
            const url = `${apiBase}/loan-opportunity/call-recordings/?start_date=${startDate}&end_date=${endDate}&limit=${limit}&status=${statusFilter}`;
            
            const res = await fetch(url);
            if (!res.ok) {
                throw new Error(`HTTP error ${res.status}: ${res.statusText}`);
            }
            const data = await res.json();
            if (data.status === "success") {
                setRecordings(data.data || []);
            } else {
                throw new Error(data.message || "Failed to fetch live recordings");
            }
        } catch (err) {
            console.error("Error fetching live call recordings:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleExportExcel = async () => {
        setExportingExcel(true);
        try {
            const apiBase = import.meta.env.VITE_API_URL || "";
            const url = `${apiBase}/loan-opportunity/export-excel/?start_date=${startDate}&end_date=${endDate}&status=${statusFilter}`;
            
            const res = await fetch(url, { method: "GET" });
            if (!res.ok) throw new Error(`Export failed with HTTP status ${res.status}`);
            
            const blob = await res.blob();
            const downloadUrl = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = downloadUrl;
            a.download = `Sonata_Call_Opportunity_Analysis_Report_${startDate}_to_${endDate}.xlsx`;
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(downloadUrl);
        } catch (err) {
            console.error("Error downloading Excel report:", err);
            alert("Failed to export Excel report: " + err.message);
        } finally {
            setExportingExcel(false);
        }
    };

    useEffect(() => {
        fetchRecordings();
    }, []);

    const handlePlayAudio = (url) => {
        if (activeAudio === url) {
            setIsPlaying(!isPlaying);
        } else {
            setActiveAudio(url);
            setIsPlaying(true);
        }
    };

    const filtered = recordings.filter(r => {
        if (!searchTerm) return true;
        const term = searchTerm.toLowerCase();
        return (
            (r.client_number && r.client_number.toLowerCase().includes(term)) ||
            (r.agent_number && r.agent_number.toLowerCase().includes(term)) ||
            (r.circle_operator && r.circle_operator.toLowerCase().includes(term)) ||
            (r.circle_circle && r.circle_circle.toLowerCase().includes(term))
        );
    });

    return (
        <div className="flex-1 flex flex-col h-full overflow-y-auto bg-zinc-950 p-6 space-y-6 scrollbar-custom-dark">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800 pb-5">
                <div>
                    <div className="flex items-center gap-2.5">
                        <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
                            <Database className="h-5 w-5 text-emerald-400" />
                        </div>
                        <h1 className="text-xl font-bold text-zinc-100 tracking-tight">
                            Live Call Centre Recordings Feed
                        </h1>
                    </div>
                    <p className="text-xs text-zinc-400 mt-1">
                        Source 1 Call Centre Recordings Stream
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <button 
                        onClick={handleExportExcel}
                        disabled={exportingExcel}
                        className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-purple-500/20 transition-all flex items-center gap-2 disabled:opacity-50"
                    >
                        <FileSpreadsheet className={`h-4 w-4 ${exportingExcel ? "animate-bounce text-amber-300" : "text-purple-200"}`} />
                        {exportingExcel ? "Generating Excel Report..." : "Run Bulk Analysis & Export Excel"}
                    </button>

                    <button 
                        onClick={fetchRecordings}
                        disabled={loading}
                        className="px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-zinc-200 text-xs font-medium transition-all flex items-center gap-2 disabled:opacity-50"
                    >
                        <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
                        {loading ? "Refreshing..." : "Refresh Live Feed"}
                    </button>
                </div>
            </div>

            {/* Filter Bar */}
            <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80 flex flex-wrap items-center justify-between gap-4 backdrop-blur-sm">
                <div className="flex items-center gap-3 flex-wrap">
                    <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-zinc-400" />
                        <span className="text-xs text-zinc-400 font-medium">From:</span>
                        <input 
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1 text-xs text-zinc-200 focus:border-emerald-500 focus:outline-none"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-xs text-zinc-400 font-medium">To:</span>
                        <input 
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1 text-xs text-zinc-200 focus:border-emerald-500 focus:outline-none"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-xs text-zinc-400 font-medium">Rows:</span>
                        <select
                            value={limit}
                            onChange={(e) => setLimit(Number(e.target.value))}
                            className="bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1 text-xs text-zinc-200 focus:border-emerald-500 focus:outline-none"
                        >
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={25}>25</option>
                            <option value={50}>50</option>
                        </select>
                    </div>
                    <button 
                        onClick={fetchRecordings}
                        className="px-3 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium border border-zinc-700 transition-all"
                    >
                        Apply Filter
                    </button>
                </div>

                <div className="relative w-full sm:w-64">
                    <Search className="h-4 w-4 absolute left-3 top-2.5 text-zinc-500" />
                    <input 
                        type="text"
                        placeholder="Search Client / Agent / Operator..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-zinc-200 focus:outline-none focus:border-emerald-500"
                    />
                </div>
            </div>

            {/* Error Display */}
            {error && (
                <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <AlertCircle className="h-4 w-4 text-rose-400" />
                        <span>Failed to fetch live recordings: {error}</span>
                    </div>
                    <button onClick={fetchRecordings} className="px-2.5 py-1 bg-rose-500/20 hover:bg-rose-500/30 rounded border border-rose-500/40 text-[11px] font-semibold">
                        Retry Connection
                    </button>
                </div>
            )}

            {/* Audio Player Drawer if active */}
            {activeAudio && (
                <div className="p-4 rounded-xl bg-gradient-to-r from-zinc-900 to-zinc-950 border border-cyan-500/40 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4 animate-in fade-in">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-lg bg-cyan-500/20 text-cyan-300">
                            <Volume2 className="h-5 w-5 text-cyan-400 animate-pulse" />
                        </div>
                        <div>
                            <h4 className="text-xs font-bold text-zinc-100">Live Recording Audio Player</h4>
                            <p className="text-[11px] text-zinc-400 truncate max-w-md">{activeAudio}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <audio src={activeAudio} controls autoPlay className="h-8 w-full md:w-80 rounded bg-zinc-900" />
                        <button 
                            onClick={() => setActiveAudio(null)}
                            className="px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-zinc-200 text-xs"
                        >
                            Close Player
                        </button>
                    </div>
                </div>
            )}

            {/* Live Data Cards / Table */}
            {loading ? (
                <div className="p-12 text-center space-y-3">
                    <RefreshCw className="h-8 w-8 text-emerald-400 animate-spin mx-auto" />
                    <p className="text-xs text-zinc-400 font-medium">Loading live recordings...</p>
                </div>
            ) : filtered.length === 0 ? (
                <div className="p-12 text-center rounded-xl bg-zinc-900/40 border border-zinc-800/60">
                    <FileAudio className="h-10 w-10 text-zinc-600 mx-auto mb-2" />
                    <p className="text-sm font-semibold text-zinc-300">No recordings found</p>
                    <p className="text-xs text-zinc-500 mt-1">Try adjusting your date filters or search parameters.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    <div className="flex items-center justify-between px-1">
                        <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                            Showing {filtered.length} Live Calls (Source 1)
                        </span>
                        <span className="text-[11px] text-zinc-500 font-mono">Status: {statusFilter.toUpperCase()}</span>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                        {filtered.map((record, index) => (
                            <div 
                                key={index}
                                className="p-5 rounded-xl bg-zinc-900/60 border border-zinc-800/80 hover:border-emerald-500/40 transition-all duration-200 backdrop-blur-sm group"
                            >
                                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                                    <div className="space-y-2 flex-1">
                                        <div className="flex items-center gap-3 flex-wrap">
                                            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                                                <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                                                {record.status}
                                            </span>
                                            <span className="text-xs text-zinc-400 font-medium flex items-center gap-1 bg-zinc-800/80 px-2.5 py-0.5 rounded">
                                                <Calendar className="h-3 w-3 text-zinc-400" />
                                                {record.date}
                                            </span>
                                            <span className="text-xs font-semibold text-cyan-300 bg-cyan-500/10 px-2.5 py-0.5 rounded border border-cyan-500/20">
                                                📱 {record.circle_operator || "N/A"} • {record.circle_circle || "N/A"}
                                            </span>
                                        </div>

                                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs pt-1">
                                            <div>
                                                <span className="text-[10px] text-zinc-500 font-semibold block">CLIENT NUMBER</span>
                                                <span className="font-mono text-zinc-100 font-bold">{record.client_number}</span>
                                            </div>
                                            <div>
                                                <span className="text-[10px] text-zinc-500 font-semibold block">AGENT NUMBER</span>
                                                <span className="font-mono text-zinc-200">{record.agent_number}</span>
                                            </div>
                                            <div>
                                                <span className="text-[10px] text-zinc-500 font-semibold block">CUSTOMER INFO ID</span>
                                                <span className="font-mono text-zinc-300">{record.customerinfoid || "0"}</span>
                                            </div>
                                            <div>
                                                <span className="text-[10px] text-zinc-500 font-semibold block">DISBURSEMENT ID</span>
                                                <span className="font-mono text-zinc-300">{record.disbursementid}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <button 
                                            onClick={() => handlePlayAudio(record.recording_url)}
                                            className="px-4 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/20 text-xs font-semibold flex items-center gap-2 transition-all shadow-sm"
                                        >
                                            <Play className="h-3.5 w-3.5 text-emerald-400" />
                                            Play Audio Recording
                                        </button>

                                        <a 
                                            href={record.recording_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-zinc-200 text-xs border border-zinc-700 transition-all"
                                            title="Open Recording URL in Browser"
                                        >
                                            <ArrowUpRight className="h-4 w-4" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
