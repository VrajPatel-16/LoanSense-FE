import React from "react";
import { Search, ShieldCheck, AlertTriangle, CheckCircle2, TrendingUp, DollarSign, Layers, ArrowRight, Zap, Info } from "lucide-react";

export default function InquiryScrubView() {
    return (
        <div className="flex-1 flex flex-col h-full bg-slate-50 text-slate-900 overflow-y-auto p-6 space-y-6 font-sans scrollbar-custom-light">
            {/* Header */}
            <div className="p-5 px-6 rounded-xl bg-white border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2.5">
                        <div className="h-8 w-8 rounded-lg bg-amber-600 flex items-center justify-center shadow-xs text-white font-bold">
                            <Search className="h-4.5 w-4.5" />
                        </div>
                        <h1 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
                            Pillar 3: Bureau Inquiry & Scrub Calculation Engine
                            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                                17.5% Weight in Final Disbursal
                            </span>
                        </h1>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">
                        Detecting credit hunger from recent bureau inquiries across other MFIs/Banks and classifying cross-lender repayment loyalty
                    </p>
                </div>
            </div>

            {/* Core Logic Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
                    <div className="flex items-center justify-between text-slate-500 mb-2">
                        <span className="text-xs font-bold uppercase tracking-wider">Credit Hunger Trigger</span>
                        <Zap className="h-4 w-4 text-amber-500" />
                    </div>
                    <div className="text-lg font-bold text-slate-900">Inquiries (Last 30 Days)</div>
                    <p className="text-xs text-slate-500 mt-1">
                        Borrowers actively searching for funds with clean track record are flagged for instant reach-out.
                    </p>
                </div>

                <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 shadow-xs">
                    <div className="flex items-center justify-between text-emerald-800 mb-2">
                        <span className="text-xs font-bold uppercase tracking-wider">Sonata Loyal</span>
                        <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    </div>
                    <div className="text-lg font-bold text-emerald-950">Paying Sonata Only</div>
                    <p className="text-xs text-emerald-700 mt-1">
                        Borrowers who service Sonata loans exclusively. Zero competitor distraction $\implies$ High renewal rate.
                    </p>
                </div>

                <div className="p-4 rounded-xl bg-rose-50/70 border border-rose-200 shadow-xs">
                    <div className="flex items-center justify-between text-rose-800 mb-2">
                        <span className="text-xs font-bold uppercase tracking-wider">Competitor Churn</span>
                        <AlertTriangle className="h-4 w-4 text-rose-600" />
                    </div>
                    <div className="text-lg font-bold text-rose-950">Paying Others, Not Sonata</div>
                    <p className="text-xs text-rose-700 mt-1">
                        Borrowers servicing competitor debts while delaying Sonata payments $\implies$ Auto-disqualification.
                    </p>
                </div>

                <div className="p-4 rounded-xl bg-indigo-50/70 border border-indigo-200 shadow-xs">
                    <div className="flex items-center justify-between text-indigo-900 mb-2">
                        <span className="text-xs font-bold uppercase tracking-wider">Unpivoted DPD Track</span>
                        <ShieldCheck className="h-4 w-4 text-indigo-600" />
                    </div>
                    <div className="text-lg font-bold text-indigo-950">50-Month Bureau Depth</div>
                    <p className="text-xs text-indigo-700 mt-1">
                        Aggregated DPD buckets (1-30, 31-60, 180+) providing lifetime repayment reliability.
                    </p>
                </div>
            </div>

            {/* DuckDB & SQL Scrub Feature Matrix */}
            <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-xs space-y-4">
                <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                    <Layers className="h-4 w-4 text-indigo-600" />
                    Engineered Scrub Parameters (From DuckDB & SQL Server)
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 space-y-1.5">
                        <span className="font-bold text-slate-900 block">1. SCRUB_PAYING_TO_BOTH</span>
                        <p className="text-slate-600 leading-relaxed">
                            Customer actively serviced both Sonata and other institutional credit lines in the last 3 months. Prime candidate for cycle ticket size upgrade.
                        </p>
                    </div>

                    <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 space-y-1.5">
                        <span className="font-bold text-slate-900 block">2. SCRUB_TOTAL_GRANTOR</span>
                        <p className="text-slate-600 leading-relaxed">
                            Number of unique lending institutions with active exposure. Used as an RBI guardrail filter against multi-indebtedness.
                        </p>
                    </div>

                    <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 space-y-1.5">
                        <span className="font-bold text-slate-900 block">3. INQ_COUNT_LAST_30D</span>
                        <p className="text-slate-600 leading-relaxed">
                            High-velocity credit inquiries recorded across Equifax/HighMark in the last month. Shows immediate capital appetite.
                        </p>
                    </div>

                    <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 space-y-1.5">
                        <span className="font-bold text-slate-900 block">4. SCRUB_OTHER_CUSTOMER_EMI</span>
                        <p className="text-slate-600 leading-relaxed">
                            Normalized monthly installment obligation across other lenders to evaluate customer debt service capacity before cycle renewal.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
