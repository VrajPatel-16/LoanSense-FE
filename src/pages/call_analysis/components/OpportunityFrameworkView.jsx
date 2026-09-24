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
            badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
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
            badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
            activities: [
                { name: "Collection reminder messages and customer replies", period: "Last 6 months", method: "Text-to-Data conversion + AI analysis" },
            ]
        },
        {
            id: "Source 3",
            title: "AI Calls",
            icon: Sparkles,
            badge: "Planned (Next Phase)",
            badgeColor: "bg-purple-50 text-purple-700 border-purple-200",
            activities: [
                { name: "AI-based collection calls and customer responses", period: "Last 30 days", method: "Voice-to-Data conversion + AI analysis" },
            ]
        },
        {
            id: "Source 4",
            title: "Pre-Approved Loans",
            icon: Gift,
            badge: "Planned (Next Phase)",
            badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
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
            color: "from-blue-50 to-indigo-50 border-blue-200 text-blue-700"
        },
        {
            parameter: "Referral Interest",
            description: "Whether the customer has indicated that they may refer another person",
            icon: UserCheck,
            color: "from-purple-50 to-indigo-50 border-purple-200 text-purple-700"
        },
        {
            parameter: "New Loan Requirement",
            description: "Whether the customer wants a new loan",
            icon: DollarSign,
            color: "from-emerald-50 to-teal-50 border-emerald-200 text-emerald-700"
        },
        {
            parameter: "Loan Enhancement Requirement",
            description: "Whether the customer wants to increase the loan amount of an existing loan",
            icon: TrendingUp,
            color: "from-amber-50 to-orange-50 border-amber-200 text-amber-700"
        },
        {
            parameter: "Offer Requirement",
            description: "Whether the customer has expressed interest in a specific offer, product, amount, tenure, etc.",
            icon: Gift,
            color: "from-pink-50 to-rose-50 border-pink-200 text-pink-700"
        },
        {
            parameter: "Customer Intent / Priority",
            description: "Strength of customer's intent based on conversation/message",
            icon: Zap,
            color: "from-indigo-50 to-violet-50 border-indigo-200 text-indigo-700"
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
        <div className="flex-1 flex flex-col h-full overflow-y-auto bg-slate-50 p-6 space-y-6 scrollbar-custom-light font-sans">
            {/* Header */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-indigo-50 border border-indigo-200">
                        <Layers className="h-6 w-6 text-indigo-600" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-slate-900 tracking-tight">
                            Loan Disbursal Opportunity Analysis – Overall Framework
                        </h1>
                        <p className="text-xs text-slate-500 mt-0.5">
                            AI & Human Intelligence pipeline unifying 4 Data Sources to maximize Loan Disbursal Conversions
                        </p>
                    </div>
                </div>
            </div>

            {/* Objective Banner */}
            <div className="p-5 rounded-xl bg-gradient-to-r from-indigo-50/70 via-white to-blue-50/70 border border-indigo-100 shadow-xs">
                <div className="flex items-start gap-4">
                    <div className="p-2.5 rounded-xl bg-indigo-100 text-indigo-700 flex-shrink-0">
                        <Sparkles className="h-5 w-5 text-indigo-600" />
                    </div>
                    <div>
                        <h2 className="text-xs font-bold text-indigo-900 uppercase tracking-wider">Overall Objective</h2>
                        <p className="text-xs text-slate-600 leading-relaxed mt-1">
                            The objective is to combine data from all four sources, apply AI and Human Intelligence to identify the strongest loan opportunities, and convert these opportunities into actual loan disbursals. The identified customers can be approached through AI Calls, WhatsApp, Managers, or BROs. Where the analysis identifies a specific customer requirement or preferred offer, a relevant personalized offer can be generated and provided to the Manager/BRO for follow-up and conversion.
                        </p>
                    </div>
                </div>
            </div>

            {/* Section 1: Source-wise Analysis Framework */}
            <div className="space-y-3">
                <div className="flex items-center gap-2">
                    <Database className="h-4 w-4 text-indigo-600" />
                    <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">1. Source-wise Analysis Framework</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {sources.map((src) => {
                        const Icon = src.icon;
                        return (
                            <div 
                                key={src.id}
                                className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs space-y-3 hover:border-slate-300 transition-all"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2.5">
                                        <div className="p-2 rounded-lg bg-slate-100 text-indigo-600">
                                            <Icon className="h-4 w-4" />
                                        </div>
                                        <h3 className="text-sm font-bold text-slate-900">{src.id} – {src.title}</h3>
                                    </div>
                                    <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-semibold border ${src.badgeColor}`}>
                                        {src.badge}
                                    </span>
                                </div>

                                <div className="space-y-2 pt-1">
                                    {src.activities.map((act, i) => (
                                        <div key={i} className="p-3 rounded-lg bg-slate-50 border border-slate-200/80 text-xs space-y-1">
                                            <div className="flex items-center justify-between">
                                                <span className="font-semibold text-slate-800">{act.name}</span>
                                                <span className="text-[10px] px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-600 font-mono">
                                                    {act.period}
                                                </span>
                                            </div>
                                            <p className="text-[11px] text-indigo-700 font-medium">
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
            <div className="space-y-3">
                <div className="flex items-center gap-2">
                    <Target className="h-4 w-4 text-purple-600" />
                    <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">2. Common Data Points to be Generated</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {dataPoints.map((dp, i) => {
                        const Icon = dp.icon;
                        return (
                            <div 
                                key={i}
                                className={`p-4 rounded-xl bg-white border ${dp.color.includes('border') ? dp.color.split(' ').find(c => c.startsWith('border')) : 'border-slate-200'} shadow-xs space-y-2 hover:border-indigo-300 transition-all`}
                            >
                                <div className="flex items-center gap-2.5">
                                    <div className="p-1.5 rounded-lg bg-slate-100">
                                        <Icon className="h-4 w-4 text-indigo-600" />
                                    </div>
                                    <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">{dp.parameter}</h3>
                                </div>
                                <p className="text-xs text-slate-600 leading-normal pl-1">
                                    {dp.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Section 3: Final AI + Human Intelligence Layer */}
            <div className="space-y-3">
                <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-emerald-600" />
                    <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">3. Final AI + Human Intelligence Layer (9 Stages)</h2>
                </div>

                <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-xs">
                    <table className="w-full text-left text-xs border-collapse">
                        <thead>
                            <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider text-[10px]">
                                <th className="py-3 px-4 w-12 text-center">#</th>
                                <th className="py-3 px-4">Stage</th>
                                <th className="py-3 px-4">Activity</th>
                                <th className="py-3 px-4">Output / Impact</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-slate-700">
                            {pipelineStages.map((ps, idx) => (
                                <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                                    <td className="py-3 px-4 text-center font-bold font-mono text-indigo-600">{idx + 1}</td>
                                    <td className="py-3 px-4 font-bold text-slate-900">{ps.stage}</td>
                                    <td className="py-3 px-4 text-slate-600">{ps.activity}</td>
                                    <td className="py-3 px-4">
                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-semibold">
                                            <CheckCircle2 className="h-3 w-3 text-emerald-600" />
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
