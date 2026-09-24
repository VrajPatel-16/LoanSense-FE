import React, { useState, useEffect } from "react";
import { 
    Cpu, TrendingUp, CheckCircle2, AlertTriangle, Search, Filter, 
    RefreshCw, Download, ArrowUpRight, ShieldCheck, DollarSign, 
    CreditCard, Calendar, User, Building, MapPin, ChevronLeft, ChevronRight,
    Award, BarChart3, AlertOctagon, Info, X, Zap, ArrowRight, Eye, Copy, Check
} from "lucide-react";

export default function LoanConversionMLView() {
    // Data states
    const [leads, setLeads] = useState([]);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [statsLoading, setStatsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Filter states
    const [selectedTier, setSelectedTier] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState("rank");
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(50);
    const [totalPages, setTotalPages] = useState(1);
    const [totalRecords, setTotalRecords] = useState(0);

    // Modal state
    const [selectedLead, setSelectedLead] = useState(null);
    const [copiedApac, setCopiedApac] = useState(false);

    // Fetch Stats
    const fetchStats = async () => {
        setStatsLoading(true);
        try {
            const apiBase = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";
            const res = await fetch(`${apiBase}/api/loan-opportunity/ml-stats/`);
            if (res.ok) {
                const json = await res.json();
                if (json.status === "success") {
                    setStats(json.stats);
                }
            }
        } catch (err) {
            console.error("Error fetching ML stats:", err);
        } finally {
            setStatsLoading(false);
        }
    };

    // Fetch Paginated Leads
    const fetchLeads = async () => {
        setLoading(true);
        setError(null);
        try {
            const apiBase = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";
            const params = new URLSearchParams({
                tier: selectedTier,
                search: searchTerm,
                page: page.toString(),
                limit: limit.toString(),
                sort: sortBy
            });
            const res = await fetch(`${apiBase}/api/loan-opportunity/ml-predictions/?${params.toString()}`);
            if (!res.ok) {
                throw new Error(`Server returned ${res.status}: ${res.statusText}`);
            }
            const json = await res.json();
            if (json.status === "success") {
                setLeads(json.data || []);
                setTotalPages(json.total_pages || 1);
                setTotalRecords(json.total || 0);
            } else {
                throw new Error(json.message || "Failed to load predictions");
            }
        } catch (err) {
            console.error("Error fetching ML predictions:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStats();
    }, []);

    useEffect(() => {
        fetchLeads();
    }, [selectedTier, sortBy, page, limit]);

    // Handle Search with form submit
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        setPage(1);
        fetchLeads();
    };

    // Export CSV
    const exportCSV = () => {
        if (!leads.length) return;
        const headers = ["Rank", "CustomerInfoID", "DisbursementID", "APACNo", "ProductName", "DisbursedAmt", "EMIsLeft", "CNS_Score", "ConversionScorePct", "IntentTier"];
        const rows = leads.map(l => [
            l.ml_conversion_rank,
            l.customer_info_id,
            l.disbursement_id,
            l.apac_no,
            `"${l.product_name || ''}"`,
            l.disbursed_amt,
            l.total_left_installments,
            l.scrub_performance_score,
            Number(l.conversion_score_pct || 0).toFixed(2),
            l.intent_tier
        ]);
        const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `LoanSense_Conversion_Leads_${selectedTier}_p${page}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // Tier badge colors
    const getTierBadge = (tier) => {
        switch (tier) {
            case "High":
                return "bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold";
            case "Medium":
                return "bg-amber-50 text-amber-700 border border-amber-200 font-bold";
            case "Low":
                return "bg-rose-50 text-rose-700 border border-rose-200 font-bold";
            default:
                return "bg-slate-100 text-slate-700 border border-slate-200";
        }
    };

    const getScoreBarColor = (score) => {
        if (score >= 70) return "bg-emerald-500";
        if (score >= 40) return "bg-amber-500";
        return "bg-rose-500";
    };

    const getCNSColor = (score) => {
        if (!score || score < 300) return "text-slate-400";
        if (score >= 700) return "text-emerald-700 font-bold";
        if (score >= 600) return "text-blue-700 font-bold";
        if (score >= 500) return "text-amber-700 font-bold";
        return "text-rose-700 font-bold";
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        setCopiedApac(true);
        setTimeout(() => setCopiedApac(false), 2000);
    };

    return (
        <div className="flex-1 flex flex-col h-full bg-slate-50 text-slate-900 overflow-hidden font-sans">
            {/* Top Clean Header */}
            <div className="p-5 px-6 border-b border-slate-200 bg-white shadow-xs flex flex-wrap items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2.5">
                        <div className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center shadow-sm shadow-indigo-600/20">
                            <Cpu className="h-4.5 w-4.5 text-white" />
                        </div>
                        <h1 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
                            Customer Loan Renewal ML Intelligence
                            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                                93.84% Test ROC-AUC
                            </span>
                        </h1>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">
                        Predicting repeat loan propensity across 13,325 active borrowers with &le; 5 EMIs to deploy ₹5.00 Cr in cycle renewals
                    </p>
                </div>

                <div className="flex items-center gap-2.5">
                    <button
                        onClick={exportCSV}
                        className="px-3 py-1.5 rounded-lg bg-white hover:bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 flex items-center gap-1.5 transition-all shadow-xs"
                    >
                        <Download className="h-3.5 w-3.5 text-slate-500" />
                        Export CSV
                    </button>
                    <button
                        onClick={() => { fetchStats(); fetchLeads(); }}
                        className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-xs font-semibold text-white flex items-center gap-1.5 transition-all shadow-xs"
                    >
                        <RefreshCw className={`h-3.5 w-3.5 ${loading ? 'animate-spin' : ''}`} />
                        Refresh Leads
                    </button>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-5 scrollbar-custom-light">
                {/* 1. Hero KPI Cards (Light & Vibrant) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                    {/* Card 1: Total Leads */}
                    <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-xs relative overflow-hidden">
                        <div className="flex items-center justify-between text-slate-500 mb-1.5">
                            <span className="text-[11px] font-bold uppercase tracking-wider">Maturing Cohort</span>
                            <div className="p-1.5 rounded-lg bg-slate-100 text-slate-600">
                                <User className="h-4 w-4" />
                            </div>
                        </div>
                        <div className="text-2xl font-black text-slate-900 tracking-tight">
                            {statsLoading ? "..." : (stats?.total_leads?.toLocaleString() || "13,325")}
                        </div>
                        <p className="text-[11px] text-slate-500 mt-1 font-medium">
                            Active with &le; 5 EMIs pending
                        </p>
                    </div>

                    {/* Card 2: High Intent (Primary Target) */}
                    <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 shadow-xs relative overflow-hidden">
                        <div className="flex items-center justify-between text-emerald-800 mb-1.5">
                            <span className="text-[11px] font-extrabold uppercase tracking-wider flex items-center gap-1.5">
                                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                                High Intent (&ge; 70%)
                            </span>
                            <div className="p-1.5 rounded-lg bg-emerald-100 text-emerald-800">
                                <Zap className="h-4 w-4" />
                            </div>
                        </div>
                        <div className="text-2xl font-black text-emerald-950 tracking-tight">
                            {statsLoading ? "..." : (stats?.high_intent_count?.toLocaleString() || "4,048")}
                        </div>
                        <p className="text-[11px] font-bold text-emerald-700 mt-1">
                            ₹{stats?.high_intent_disbursal_cr || "17.34"} Cr potential disbursal
                        </p>
                    </div>

                    {/* Card 3: Medium Intent */}
                    <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 shadow-xs relative overflow-hidden">
                        <div className="flex items-center justify-between text-amber-800 mb-1.5">
                            <span className="text-[11px] font-bold uppercase tracking-wider">Medium Intent (40-70%)</span>
                            <div className="p-1.5 rounded-lg bg-amber-100 text-amber-800">
                                <TrendingUp className="h-4 w-4" />
                            </div>
                        </div>
                        <div className="text-2xl font-black text-amber-950 tracking-tight">
                            {statsLoading ? "..." : (stats?.medium_intent_count?.toLocaleString() || "2,948")}
                        </div>
                        <p className="text-[11px] font-medium text-amber-700 mt-1">
                            Contact via Tele-callers
                        </p>
                    </div>

                    {/* Card 4: Low Intent */}
                    <div className="p-4 rounded-xl bg-rose-50/70 border border-rose-200 shadow-xs relative overflow-hidden">
                        <div className="flex items-center justify-between text-rose-800 mb-1.5">
                            <span className="text-[11px] font-bold uppercase tracking-wider">Low Intent (&lt; 40%)</span>
                            <div className="p-1.5 rounded-lg bg-rose-100 text-rose-800">
                                <AlertOctagon className="h-4 w-4" />
                            </div>
                        </div>
                        <div className="text-2xl font-black text-rose-950 tracking-tight">
                            {statsLoading ? "..." : (stats?.low_intent_count?.toLocaleString() || "6,329")}
                        </div>
                        <p className="text-[11px] font-medium text-rose-700 mt-1">
                            High arrears or low credit appetite
                        </p>
                    </div>

                    {/* Card 5: Target Progress */}
                    <div className="p-4 rounded-xl bg-indigo-50/80 border border-indigo-200 shadow-xs relative overflow-hidden">
                        <div className="flex items-center justify-between text-indigo-900 mb-1.5">
                            <span className="text-[11px] font-bold uppercase tracking-wider flex items-center gap-1">
                                <Award className="h-4 w-4 text-amber-500" />
                                Target: Top 1,000
                            </span>
                        </div>
                        <div className="text-2xl font-black text-indigo-950 tracking-tight">
                            ₹5.00 Crore
                        </div>
                        <div className="w-full bg-indigo-200/80 h-1.5 rounded-full mt-2 overflow-hidden">
                            <div className="bg-emerald-500 h-full rounded-full" style={{ width: '100%' }}></div>
                        </div>
                        <p className="text-[10px] font-bold text-emerald-700 mt-1">
                            100% covered by High-Intent pool
                        </p>
                    </div>
                </div>

                {/* 2. Filter & Search Control Bar */}
                <div className="p-3.5 px-4 rounded-xl bg-white border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
                    {/* Tier Pills */}
                    <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200">
                        {["All", "High", "Medium", "Low"].map((tier) => (
                            <button
                                key={tier}
                                onClick={() => { setSelectedTier(tier); setPage(1); }}
                                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                                    selectedTier === tier
                                        ? "bg-white text-indigo-700 shadow-xs font-bold border border-slate-200"
                                        : "text-slate-600 hover:text-slate-900"
                                }`}
                            >
                                {tier === "All" ? `All (${stats?.total_leads || 13325})` : tier}
                            </button>
                        ))}
                    </div>

                    {/* Search and Sort */}
                    <div className="flex flex-wrap items-center gap-2.5">
                        <form onSubmit={handleSearchSubmit} className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search Customer / APAC / Product..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white w-64 transition-all"
                            />
                        </form>

                        <div className="flex items-center gap-1.5">
                            <span className="text-xs text-slate-500 font-medium">Sort:</span>
                            <select
                                value={sortBy}
                                onChange={(e) => { setSortBy(e.target.value); setPage(1); }}
                                className="bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 font-medium px-2.5 py-1.5 focus:outline-none focus:border-indigo-500 cursor-pointer"
                            >
                                <option value="rank">Rank (#1 First)</option>
                                <option value="score_desc">Score (Highest First)</option>
                                <option value="emi_asc">EMIs Left (Lowest First)</option>
                                <option value="amount_desc">Disbursed Amount (High to Low)</option>
                            </select>
                        </div>

                        <select
                            value={limit}
                            onChange={(e) => { setLimit(Number(e.target.value)); setPage(1); }}
                            className="bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 font-medium px-2 py-1.5 focus:outline-none focus:border-indigo-500 cursor-pointer"
                        >
                            <option value={25}>25 / page</option>
                            <option value={50}>50 / page</option>
                            <option value={100}>100 / page</option>
                        </select>
                    </div>
                </div>

                {/* 3. Main Lead Table */}
                <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-xs">
                    {loading ? (
                        <div className="p-16 text-center text-slate-500 space-y-3">
                            <RefreshCw className="h-6 w-6 animate-spin mx-auto text-indigo-600" />
                            <p className="text-xs font-semibold">Loading scored conversion leads...</p>
                        </div>
                    ) : error ? (
                        <div className="p-12 text-center text-rose-600 space-y-2">
                            <AlertTriangle className="h-6 w-6 mx-auto text-rose-600" />
                            <p className="text-xs font-semibold">{error}</p>
                        </div>
                    ) : leads.length === 0 ? (
                        <div className="p-12 text-center text-slate-400 space-y-2">
                            <User className="h-6 w-6 mx-auto text-slate-300" />
                            <p className="text-xs">No matching loan renewal candidates found.</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-xs">
                                <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 uppercase text-[10px] tracking-wider select-none">
                                    <tr>
                                        <th className="py-3 px-4">Rank</th>
                                        <th className="py-3 px-4">Customer Info</th>
                                        <th className="py-3 px-4">Loan Product</th>
                                        <th className="py-3 px-4">EMIs Left</th>
                                        <th className="py-3 px-4">Disbursed Amount</th>
                                        <th className="py-3 px-4">Bureau CNS</th>
                                        <th className="py-3 px-4">Delinquency Track</th>
                                        <th className="py-3 px-4">Conversion Score</th>
                                        <th className="py-3 px-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {leads.map((lead) => {
                                        const score = Math.round(lead.conversion_score_pct || 0);
                                        const isTop3 = lead.ml_conversion_rank <= 3;
                                        return (
                                            <tr 
                                                key={lead.disbursement_id}
                                                className={`hover:bg-slate-50/90 transition-colors group cursor-pointer ${
                                                    isTop3 ? "bg-indigo-50/30" : ""
                                                }`}
                                                onClick={() => setSelectedLead(lead)}
                                            >
                                                {/* Rank */}
                                                <td className="py-3 px-4 font-mono font-bold">
                                                    {isTop3 ? (
                                                        <span className="inline-flex items-center gap-1 text-amber-600 font-extrabold">
                                                            <Award className="h-3.5 w-3.5 text-amber-500" />
                                                            #{lead.ml_conversion_rank}
                                                        </span>
                                                    ) : (
                                                        <span className="text-slate-600 font-semibold">#{lead.ml_conversion_rank}</span>
                                                    )}
                                                </td>

                                                {/* Customer Info */}
                                                <td className="py-3 px-4">
                                                    <div className="font-bold text-slate-900">
                                                        {lead.customer_info_id}
                                                    </div>
                                                    <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                                                        APAC: {lead.apac_no || 'N/A'}
                                                    </div>
                                                </td>

                                                {/* Product */}
                                                <td className="py-3 px-4">
                                                    <div className="font-semibold text-slate-800 truncate max-w-[200px]" title={lead.product_name}>
                                                        {lead.product_name || `Product #${lead.product_id}`}
                                                    </div>
                                                    <div className="text-[10px] text-slate-500">
                                                        Branch #{lead.branch_id} &bull; Center #{lead.center_id}
                                                    </div>
                                                </td>

                                                {/* EMIs Left */}
                                                <td className="py-3 px-4">
                                                    <span className={`inline-flex items-center gap-1 font-bold px-2 py-0.5 rounded text-[11px] ${
                                                        lead.total_left_installments <= 2 
                                                            ? "bg-amber-100 text-amber-800 border border-amber-200"
                                                            : "bg-slate-100 text-slate-700 border border-slate-200"
                                                    }`}>
                                                        {lead.total_left_installments} EMI{lead.total_left_installments > 1 ? 's' : ''}
                                                    </span>
                                                </td>

                                                {/* Disbursed Amount */}
                                                <td className="py-3 px-4 font-bold text-slate-900 font-mono">
                                                    ₹{Number(lead.disbursed_amt || 0).toLocaleString()}
                                                </td>

                                                {/* Bureau Score */}
                                                <td className="py-3 px-4">
                                                    <div className={`font-mono text-sm ${getCNSColor(lead.scrub_performance_score)}`}>
                                                        {lead.scrub_performance_score > 0 ? lead.scrub_performance_score : 'N/A'}
                                                    </div>
                                                    <div className="text-[9px] text-slate-400 font-bold uppercase">CNS Score</div>
                                                </td>

                                                {/* Delinquency Profile */}
                                                <td className="py-3 px-4">
                                                    {lead.arrear_days > 0 ? (
                                                        <span className="text-[10px] text-rose-700 font-bold flex items-center gap-1">
                                                            <AlertOctagon className="h-3 w-3" />
                                                            {lead.arrear_days}d Arrears
                                                        </span>
                                                    ) : (
                                                        <span className="text-[10px] text-emerald-700 font-bold flex items-center gap-1">
                                                            <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                                                            0 Arrears (Clean)
                                                        </span>
                                                    )}
                                                    {lead.scrub_paying_others_not_sonata === 1 && (
                                                        <span className="block text-[9px] font-bold text-amber-700 mt-0.5">⚠️ Churn Risk: Pays Others</span>
                                                    )}
                                                </td>

                                                {/* Conversion Score */}
                                                <td className="py-3 px-4 min-w-[150px]">
                                                    <div className="flex items-center justify-between text-xs mb-1">
                                                        <span className="font-extrabold text-slate-900">{Number(lead.conversion_score_pct || 0).toFixed(2)}%</span>
                                                        <span className={`text-[10px] px-1.5 py-0.2 rounded ${getTierBadge(lead.intent_tier)}`}>
                                                            {lead.intent_tier}
                                                        </span>
                                                    </div>
                                                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden border border-slate-200">
                                                        <div 
                                                            className={`h-full rounded-full transition-all duration-300 ${getScoreBarColor(score)}`}
                                                            style={{ width: `${Math.min(100, Math.max(5, score))}%` }}
                                                        ></div>
                                                    </div>
                                                </td>

                                                {/* Actions */}
                                                <td className="py-3 px-4 text-right">
                                                    <button
                                                        onClick={(e) => { e.stopPropagation(); setSelectedLead(lead); }}
                                                        className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold inline-flex items-center gap-1 transition-all border border-slate-200"
                                                    >
                                                        <Eye className="h-3 w-3 text-indigo-600" />
                                                        View
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* Pagination Bar */}
                    <div className="p-3.5 px-4 border-t border-slate-200 bg-slate-50/60 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
                        <div>
                            Showing page <span className="font-bold text-slate-900">{page}</span> of <span className="font-bold text-slate-900">{totalPages}</span> ({totalRecords.toLocaleString()} leads total)
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                disabled={page <= 1}
                                onClick={() => setPage(p => Math.max(1, p - 1))}
                                className="px-3 py-1.5 rounded-md bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed text-slate-700 font-medium flex items-center gap-1 transition-all border border-slate-200 shadow-xs"
                            >
                                <ChevronLeft className="h-3.5 w-3.5" />
                                Previous
                            </button>
                            <button
                                disabled={page >= totalPages}
                                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                className="px-3 py-1.5 rounded-md bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed text-slate-700 font-medium flex items-center gap-1 transition-all border border-slate-200 shadow-xs"
                            >
                                Next
                                <ChevronRight className="h-3.5 w-3.5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* 4. Slide-over Customer Profile Drawer Modal (Clean White) */}
            {selectedLead && (
                <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex justify-end animate-fade-in" onClick={() => setSelectedLead(null)}>
                    <div 
                        className="w-full max-w-md bg-white border-l border-slate-200 h-full p-6 overflow-y-auto space-y-5 shadow-2xl flex flex-col justify-between"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div>
                            {/* Drawer Header */}
                            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs font-mono font-bold text-indigo-600">Rank #{selectedLead.ml_conversion_rank}</span>
                                        <span className={`text-[10px] px-2 py-0.5 rounded ${getTierBadge(selectedLead.intent_tier)}`}>
                                            {selectedLead.intent_tier} Intent
                                        </span>
                                    </div>
                                    <h2 className="text-base font-extrabold text-slate-900 mt-1">
                                        Customer #{selectedLead.customer_info_id}
                                    </h2>
                                    <div className="flex items-center gap-2 mt-0.5">
                                        <span className="text-xs text-slate-500 font-mono">APAC: {selectedLead.apac_no}</span>
                                        <button 
                                            onClick={() => copyToClipboard(selectedLead.apac_no)}
                                            className="text-slate-400 hover:text-indigo-600"
                                            title="Copy APAC"
                                        >
                                            {copiedApac ? <Check className="h-3 w-3 text-emerald-600" /> : <Copy className="h-3 w-3" />}
                                        </button>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => setSelectedLead(null)}
                                    className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-all"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            </div>

                            {/* Conversion Score Gauge */}
                            <div className="mt-5 p-4 rounded-xl bg-slate-50 border border-slate-200 text-center space-y-1.5">
                                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Conversion Propensity</span>
                                <div className="text-4xl font-black text-indigo-700">
                                    {Number(selectedLead.conversion_score_pct || 0).toFixed(2)}%
                                </div>
                                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                                    <div 
                                        className={`h-full rounded-full ${getScoreBarColor(Math.round(selectedLead.conversion_score_pct || 0))}`}
                                        style={{ width: `${Math.min(100, Math.max(5, Number(selectedLead.conversion_score_pct || 0)))}%` }}
                                    ></div>
                                </div>
                                <p className="text-[11px] font-medium text-slate-600 pt-1">
                                    {Number(selectedLead.conversion_score_pct || 0) >= 70 
                                        ? "🔥 High Priority Candidate: Pre-approved for instant renewal" 
                                        : Number(selectedLead.conversion_score_pct || 0) >= 40 
                                        ? "📞 Tele-calling Follow-up Recommended (Verify Intent)" 
                                        : "⚠️ High Churn Risk / Default History"}
                                </p>
                            </div>

                            {/* 360 Feature Profile */}
                            <div className="mt-5 space-y-3.5">
                                <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                                    <Info className="h-3.5 w-3.5 text-indigo-600" />
                                    Credit & Repayment Health
                                </h3>

                                <div className="grid grid-cols-2 gap-2.5 text-xs">
                                    <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                                        <span className="text-slate-500 block text-[10px]">Loan Product</span>
                                        <span className="font-bold text-slate-800 mt-0.5 block truncate" title={selectedLead.product_name}>
                                            {selectedLead.product_name}
                                        </span>
                                    </div>

                                    <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                                        <span className="text-slate-500 block text-[10px]">Disbursed Amount</span>
                                        <span className="font-bold text-slate-900 mt-0.5 block font-mono">
                                            ₹{Number(selectedLead.disbursed_amt || 0).toLocaleString()}
                                        </span>
                                    </div>

                                    <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                                        <span className="text-slate-500 block text-[10px]">EMIs Remaining</span>
                                        <span className="font-bold text-amber-700 mt-0.5 block">
                                            {selectedLead.total_left_installments} EMIs Left
                                        </span>
                                    </div>

                                    <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                                        <span className="text-slate-500 block text-[10px]">Bureau Score (CNS)</span>
                                        <span className={`font-mono mt-0.5 block ${getCNSColor(selectedLead.scrub_performance_score)}`}>
                                            {selectedLead.scrub_performance_score || 'N/A'}
                                        </span>
                                    </div>

                                    <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                                        <span className="text-slate-500 block text-[10px]">Arrear Days</span>
                                        <span className={`font-bold mt-0.5 block ${selectedLead.arrear_days > 0 ? 'text-rose-700' : 'text-emerald-700'}`}>
                                            {selectedLead.arrear_days} Days
                                        </span>
                                    </div>

                                    <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                                        <span className="text-slate-500 block text-[10px]">Principal Arrear</span>
                                        <span className="font-bold text-slate-900 mt-0.5 block font-mono">
                                            ₹{Number(selectedLead.principal_arrear || 0).toLocaleString()}
                                        </span>
                                    </div>
                                </div>

                                {/* Cross-Lender Loyalty Behavior */}
                                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-1.5 text-xs">
                                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Bureau Cross-Lender Payment Track</span>
                                    <div className="space-y-1 text-[11px]">
                                        <div className="flex items-center justify-between">
                                            <span className="text-slate-600">Pays Both Sonata & Others:</span>
                                            <span className="font-bold text-slate-800">{selectedLead.scrub_paying_to_both === 1 ? '✅ Yes' : 'No'}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-slate-600">Loyal to Sonata Only:</span>
                                            <span className="font-bold text-emerald-700">{selectedLead.scrub_paying_sonata_not_others === 1 ? '🌟 Highly Loyal' : 'No'}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-slate-600">Pays Others (Not Sonata):</span>
                                            <span className={`font-bold ${selectedLead.scrub_paying_others_not_sonata === 1 ? 'text-rose-700' : 'text-slate-500'}`}>
                                                {selectedLead.scrub_paying_others_not_sonata === 1 ? '⚠️ Competitor Churn Risk' : 'None'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Action CTAs */}
                        <div className="pt-3 border-t border-slate-200 space-y-2">
                            <button className="w-full py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer">
                                <Zap className="h-3.5 w-3.5" />
                                Approve for Instant Renewal Sanction
                            </button>
                            <button className="w-full py-2 rounded-lg bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs border border-slate-300 transition-all flex items-center justify-center gap-1.5 shadow-xs cursor-pointer">
                                Trigger Gemma Call Center Verification
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
