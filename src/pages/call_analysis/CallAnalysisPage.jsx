import React, { useState } from "react";
import CallAnalysisSidebar from "./components/CallAnalysisSidebar";
import CallAnalysisDashboard from "./components/CallAnalysisDashboard";

export default function CallAnalysisPage() {
    const [activeTab, setActiveTab] = useState("call-analysis");

    return (
        <div className="h-screen w-full flex bg-zinc-950 text-zinc-100 overflow-hidden font-sans">
            {/* Left Sidebar Menu */}
            <CallAnalysisSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

            {/* Right Main Content Pane */}
            <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden bg-zinc-950">
                <CallAnalysisDashboard activeTab={activeTab} />
            </div>
        </div>
    );
}
