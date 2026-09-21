import React from "react";
import { 
    Layers, Database, Sparkles, MessageSquare, PhoneCall, Gift, 
    TrendingUp, CheckCircle2, ArrowRight, UserCheck, Zap, Target, 
    FileText, ShieldCheck, DollarSign
} from "lucide-react";

export default function OpportunityFrameworkView() {
    // Section 1: Source-wise Analysis Framework
    const sources = [
        {
            id: "Source 1",
            title: "Call Centre Recordings",
            icon: PhoneCall,
            badge: "Active",
            badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
            activities: [
                { name: "Collection-related calls", period: "Last 30 days", method: "Voice-to-Data conversion" },
                { name: "Cross-selling / Up-Sell / Sales calls", period: "Last 30 days", method: "Voice-to-Data conversion" },
                { name: "All remaining calls", period: "Last 30 days", method: "Voice-to-Data conversion" },
            ]
        },
        {
            id: "Source 2",
            title: "WhatsApp Messages",
            icon: MessageSquare,
            badge: "Planned (Next Phase)",
            badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/40",
            activities: [
                { name: "Collection reminder messages and customer replies", period: "Last 6 months", method: "Text-to-Data conversion + AI analysis" },
            ]
        },
        {
            id: "Source 3",
            title: "AI Calls",
            icon: Sparkles,
            badge: "Planned (Next Phase)",
            badgeColor: "bg-purple-500/20 text-purple-300 border-purple-500/40",
            activities: [
                { name: "AI-based collection calls and customer responses", period: "Last 30 days", method: "Voice-to-Data conversion + AI analysis" },
            ]
        },
        {
            id: "Source 4",
            title: "Pre-Approved Loans",
            icon: Gift,
            badge: "Planned (Next Phase)",
            badgeColor: "bg-blue-500/20 text-blue-300 border-blue-500/40",
            activities: [
                { name: "Calls and WhatsApp messages related to pre-approved loans", period: "Last 30 days", method: "Voice-to-Data / Text-to-Data conversion + AI analysis" },
            ]
        }
    ];

    // Section 2: Common Data Points to be Generated
    const dataPoints = [
        {
            parameter: "Customer Interest",
            description: "Whether the customer has shown interest in taking a loan or any available offer",
            icon: Target,
            color: "from-cyan-500/20 to-blue-500/10 border-cyan-500/30 text-cyan-300"
        },
        {
            parameter: "Referral Interest",
            description: "Whether the customer has indicated that they may refer another person",
            icon: UserCheck,
            color: "from-purple-500/20 to-indigo-500/10 border-purple-500/30 text-purple-300"
        },
        {
            parameter: "New Loan Requirement",
            description: "Whether the customer wants a new loan",
            icon: DollarSign,
            color: "from-emerald-500/20 to-teal-500/10 border-emerald-500/30 text-emerald-300"
        },
        {
            parameter: "Loan Enhancement Requirement",
            description: "Whether the customer wants to increase the loan amount of an existing loan",
            icon: TrendingUp,
            color: "from-amber-500/20 to-orange-500/10 border-amber-500/30 text-amber-300"
        },
        {
            parameter: "Offer Requirement",
            description: "Whether the customer has expressed interest in a specific offer, product, amount, tenure, etc.",
            icon: Gift,
            color: "from-pink-500/20 to-rose-500/10 border-pink-500/30 text-pink-300"
        },
        {
            parameter: "Customer Intent / Priority",
            description: "Strength of customer's intent based on conversation/message",
            icon: Zap,
            color: "from-violet-500/20 to-purple-500/10 border-violet-500/30 text-violet-300"
        }
    ];

    // Section 3: Final AI + Human Intelligence Layer
    const pipelineStages = [
        { stage: "1. Data Collection", activity: "Collect data from all 4 sources", output: "Raw call recordings, WhatsApp messages and pre-approved loan interactions" },
        { stage: "2. Data Conversion", activity: "Voice-to-Data and Text-to-Data conversion", output: "Structured customer-level data" },
        { stage: "3. AI Analysis", activity: "Analyze conversations/messages to identify customer intent and requirements", output: "Customer Interest, New Loan, Referral, Loan Enhancement, Offer Requirement" },
        { stage: "4. Data Consolidation", activity: "Combine insights from all four sources at customer level", output: "Unified customer opportunity database" },
        { stage: "5. AI Intelligence", activity: "Identify the best potential loan opportunities", output: "High-potential customers / opportunities" },
        { stage: "6. Human Intelligence", activity: "Add human defined rules", output: "Customer-level actionable leads" },
        { stage: "7. Offer Generation", activity: "Generate relevant offers based on customer requirements", output: "Personalised loan/offer recommendations" },
        { stage: "8. Customer Outreach", activity: "Contact customers through AI Calls, WhatsApp, Managers or BROs", output: "Customer engagement" },
        { stage: "9. Loan Conversion", activity: "Loan Disbursal", output: "Final Loan Disbursal" }
    ];

    return (
        <div className="flex-1 flex flex-col h-full overflow-y-auto bg-zinc-950 p-6 space-y-8 scrollbar-custom-dark">
            {/* Header */}
            <div className="border-b border-zinc-800 pb-5">
                <div className="flex items-center gap-2.5">
                    <div className="p-2.5 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30">
                        <Layers className="h-6 w-6 text-cyan-400" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-zinc-100 tracking-tight">
                            Loan Disbursal Opportunity Analysis – Overall Framework
                        </h1>
                        <p className="text-xs text-zinc-400 mt-0.5">
                            AI & Human Intelligence pipeline unifying 4 Data Sources to maximize Loan Disbursal Conversions
                        </p>
                    </div>
                </div>
            </div>

            {/* Objective Banner */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-cyan-950/60 via-zinc-900/90 to-purple-950/60 border border-cyan-500/30 shadow-xl relative overflow-hidden backdrop-blur-md">
                <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 flex-shrink-0">
                        <Sparkles className="h-6 w-6 text-cyan-400" />
                    </div>
                    <div>
                        <h2 className="text-sm font-bold text-cyan-200 uppercase tracking-wider">Overall Objective</h2>
                        <p className="text-xs text-zinc-300 leading-relaxed mt-1">
                            The objective is to combine data from all four sources, apply AI and Human Intelligence to identify the strongest loan opportunities, and convert these opportunities into actual loan disbursals. The identified customers can be approached through AI Calls, WhatsApp, Managers, or BROs. Where the analysis identifies a specific customer requirement or preferred offer, a relevant personalized offer can be generated and provided to the Manager/BRO for follow-up and conversion.
                        </p>
                    </div>
                </div>
            </div>

            {/* Section 1: Source-wise Analysis Framework */}
            <div className="space-y-4">
                <div className="flex items-center gap-2">
                    <Database className="h-5 w-5 text-cyan-400" />
                    <h2 className="text-base font-bold text-zinc-100">1. Source-wise Analysis Framework</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {sources.map((src) => {
                        const Icon = src.icon;
                        return (
                            <div 
                                key={src.id}
                                className="p-5 rounded-xl bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-sm space-y-3 hover:border-zinc-700 transition-all"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2.5">
                                        <div className="p-2 rounded-lg bg-zinc-800 text-cyan-400">
                                            <Icon className="h-4 w-4" />
                                        </div>
                                        <h3 className="text-sm font-bold text-zinc-100">{src.id} – {src.title}</h3>
                                    </div>
                                    <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-semibold border ${src.badgeColor}`}>
                                        {src.badge}
                                    </span>
                                </div>

                                <div className="space-y-2 pt-1">
                                    {src.activities.map((act, i) => (
                                        <div key={i} className="p-3 rounded-lg bg-zinc-950/80 border border-zinc-800/60 text-xs space-y-1">
                                            <div className="flex items-center justify-between">
                                                <span className="font-semibold text-zinc-200">{act.name}</span>
                                                <span className="text-[10px] px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 font-mono">
                                                    {act.period}
                                                </span>
                                            </div>
                                            <p className="text-[11px] text-cyan-400 font-medium">
                                                ⚡ Method: {act.method}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Section 2: Common Data Points to be Generated */}
            <div className="space-y-4">
                <div className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-purple-400" />
                    <h2 className="text-base font-bold text-zinc-100">2. Common Data Points to be Generated</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {dataPoints.map((dp, i) => {
                        const Icon = dp.icon;
                        return (
                            <div 
                                key={i}
                                className={`p-4 rounded-xl bg-gradient-to-br ${dp.color} bg-zinc-900/70 border backdrop-blur-sm space-y-2 transition-all hover:scale-[1.01]`}
                            >
                                <div className="flex items-center gap-2.5">
                                    <div className="p-1.5 rounded-lg bg-zinc-950/80">
                                        <Icon className="h-4 w-4" />
                                    </div>
                                    <h3 className="text-xs font-bold uppercase tracking-wider">{dp.parameter}</h3>
                                </div>
                                <p className="text-xs text-zinc-300 leading-normal pl-1">
                                    {dp.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Section 3: Final AI + Human Intelligence Layer */}
            <div className="space-y-4">
                <div className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-emerald-400" />
                    <h2 className="text-base font-bold text-zinc-100">3. Final AI + Human Intelligence Layer (9 Stages)</h2>
                </div>

                <div className="overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-900/60 backdrop-blur-sm">
                    <table className="w-full text-left text-xs border-collapse">
                        <thead>
                            <tr className="border-b border-zinc-800 bg-zinc-900/90 text-zinc-400 font-semibold uppercase tracking-wider text-[10px]">
                                <th className="py-3 px-4 w-12 text-center">#</th>
                                <th className="py-3 px-4">Stage</th>
                                <th className="py-3 px-4">Activity</th>
                                <th className="py-3 px-4">Output / Impact</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
                            {pipelineStages.map((ps, idx) => (
                                <tr key={idx} className="hover:bg-zinc-800/40 transition-colors">
                                    <td className="py-3 px-4 text-center font-bold font-mono text-cyan-400">{idx + 1}</td>
                                    <td className="py-3 px-4 font-bold text-zinc-100">{ps.stage}</td>
                                    <td className="py-3 px-4 text-zinc-300">{ps.activity}</td>
                                    <td className="py-3 px-4">
                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 text-[11px] font-semibold">
                                            <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                                            {ps.output}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
