import React from "react";
import { Award, Zap, Cpu, PhoneCall, Search, TrendingUp, CheckCircle2, ArrowRight, ShieldCheck, DollarSign } from "lucide-react";

export default function MasterRankingView() {
    return (
        <div className="flex-1 flex flex-col h-full bg-slate-50 text-slate-900 overflow-y-auto p-6 space-y-6 font-sans scrollbar-custom-light">
            {/* Header */}
            <div className="p-5 px-6 rounded-xl bg-white border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2.5">
                        <div className="h-8 w-8 rounded-lg bg-emerald-600 flex items-center justify-center shadow-xs text-white font-bold">
                            <Award className="h-4.5 w-4.5" />
                        </div>
                        <h1 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
                            Disbursal Master Ranking Engine
                            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                                Target: Top 1,000 Customers (₹5.00 Cr)
                            </span>
                        </h1>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">
                        Synthesizing Gemma Call Intelligence (65%) + XGBoost Model (17.5%) + Bureau Scrub Inquiries (17.5%)
                    </p>
                </div>
            </div>

            {/* Tri-Pillar Weight Formula Card */}
            <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-xs space-y-4">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Composite Decision Formula</span>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 font-mono text-xs sm:text-sm font-bold text-slate-900 text-center">
                    Final Disbursal Score = (0.65 &times; Gemma Call Intent) + (0.175 &times; XGBoost Conversion) + (0.175 &times; Scrub Inquiry Hunger)
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                    {/* Pillar 1 */}
                    <div className="p-4 rounded-xl bg-cyan-50/70 border border-cyan-200 shadow-xs space-y-2">
                        <div className="flex items-center justify-between text-cyan-800">
                            <span className="text-xs font-extrabold uppercase tracking-wider flex items-center gap-1.5">
                                <PhoneCall className="h-4 w-4" />
                                Gemma Audio Intent
                            </span>
                            <span className="text-xs font-bold px-2 py-0.5 rounded bg-cyan-100 text-cyan-800">65% Weight</span>
                        </div>
                        <div className="text-sm font-bold text-cyan-950">Spoken Verbal Affirmation</div>
                        <p className="text-xs text-cyan-800 leading-relaxed">
                            Voice-to-text transcripts analyzed by Gemma 4B to detect real customer interest, urgency, and loan purpose from call recordings.
                        </p>
                    </div>

                    {/* Pillar 2 */}
                    <div className="p-4 rounded-xl bg-indigo-50/70 border border-indigo-200 shadow-xs space-y-2">
                        <div className="flex items-center justify-between text-indigo-800">
                            <span className="text-xs font-extrabold uppercase tracking-wider flex items-center gap-1.5">
                                <Cpu className="h-4 w-4" />
                                XGBoost ML Model
                            </span>
                            <span className="text-xs font-bold px-2 py-0.5 rounded bg-indigo-100 text-indigo-800">17.5% Weight</span>
                        </div>
                        <div className="text-sm font-bold text-indigo-950">Credit Conversion Propensity</div>
                        <p className="text-xs text-indigo-800 leading-relaxed">
                            93.84% AUC model scoring repayment health, bureau DPD across 50 months, arrears, product tier, and ticket size capacity.
                        </p>
                    </div>

                    {/* Pillar 3 */}
                    <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 shadow-xs space-y-2">
                        <div className="flex items-center justify-between text-amber-800">
                            <span className="text-xs font-extrabold uppercase tracking-wider flex items-center gap-1.5">
                                <Search className="h-4 w-4" />
                                Scrub Inquiry Rules
                            </span>
                            <span className="text-xs font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800">17.5% Weight</span>
                        </div>
                        <div className="text-sm font-bold text-amber-950">Bureau Credit Demand</div>
                        <p className="text-xs text-amber-800 leading-relaxed">
                            Recent 30-day inquiries across external banks/MFIs combined with cross-lender payment behavior and churn prevention checks.
                        </p>
                    </div>
                </div>
            </div>

            {/* Campaign Funnel Progression */}
            <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-xs space-y-4">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Monthly Disbursement Funnel</span>
                <div className="space-y-3 text-xs">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-200 font-medium">
                        <span className="text-slate-700">1. Maturing Active Pool (&le; 5 EMIs Remaining)</span>
                        <span className="font-bold font-mono text-slate-900">13,325 Borrowers (₹57.05 Cr)</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-indigo-50 border border-indigo-200 font-medium text-indigo-950">
                        <span>2. High-Propensity ML Candidates (&ge; 70% Conversion Score)</span>
                        <span className="font-bold font-mono text-indigo-900">4,048 Borrowers (₹17.34 Cr)</span>
                    </div>
                    <div className="flex items-center justify-between p-3.5 rounded-lg bg-emerald-50 border border-emerald-300 font-bold text-emerald-950 shadow-xs">
                        <span className="flex items-center gap-2">
                            <Award className="h-4 w-4 text-emerald-600" />
                            3. Final Ranked Disbursal Candidates (Top 1,000 Portfolio)
                        </span>
                        <span className="font-extrabold font-mono text-emerald-700 text-sm">1,000 Borrowers &bull; ₹5.00 Crore</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
