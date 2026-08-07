import { useEffect, useMemo, useState } from "react";
import { Menu, Moon, ShieldCheck, Sun } from "lucide-react";
import { ActivityTable } from "./components/ActivityTable";
import { DecisionPanel } from "./components/DecisionPanel";
import { PipelineTable } from "./components/PipelineTable";
import { ReadinessSection } from "./components/ReadinessSection";
import { Sidebar } from "./components/Sidebar";
import { starterState } from "./starter-state";
import type { DecisionOutcome } from "./types";

const STORAGE_KEY = "codex-dashboard-starter-decisions-v1";

function readOutcomes(): Record<string, DecisionOutcome> {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}");
  } catch {
    return {};
  }
}

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const [selectedPipeline, setSelectedPipeline] = useState(starterState.pipeline[0].id);
  const [selectedDecision, setSelectedDecision] = useState(starterState.decisions[0].id);
  const [outcomes, setOutcomes] = useState<Record<string, DecisionOutcome>>(readOutcomes);

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
  }, [dark]);

  const unresolved = useMemo(
    () => starterState.decisions.filter((decision) => !outcomes[decision.id]).length,
    [outcomes],
  );

  function decide(id: string, outcome: DecisionOutcome) {
    const next = { ...outcomes, [id]: outcome };
    setOutcomes(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }

  return (
    <div className="app-shell">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      {sidebarOpen && <button aria-label="Close navigation overlay" className="nav-overlay" onClick={() => setSidebarOpen(false)} />}
      <main>
        <header className="topbar">
          <div className="topbar__title"><button className="mobile-menu" aria-label="Open navigation" onClick={() => setSidebarOpen(true)}><Menu size={19} /></button><div><h1>{starterState.workspace.name} control plane</h1><p>One reviewed source · two independent Codex installations</p></div></div>
          <div className="topbar__actions">
            <span className="local-status"><ShieldCheck size={16} /> Local only</span>
            <button className="theme-toggle" aria-label={`Switch to ${dark ? "light" : "dark"} theme`} onClick={() => setDark(!dark)}>{dark ? <Sun size={17} /> : <Moon size={17} />}<span>{dark ? "Light" : "Dark"}</span></button>
          </div>
        </header>
        <div className="project-bar">
          <label><span>Project</span><select defaultValue={starterState.workspace.project}><option>{starterState.workspace.project}</option></select></label>
          <span className="project-bar__note">Shared through reviewed Git commits</span>
          <span className="review-count">{unresolved} decision{unresolved === 1 ? "" : "s"} awaiting review</span>
        </div>
        <div className="workspace-grid">
          <div className="workspace-main">
            <PipelineTable items={starterState.pipeline} selectedId={selectedPipeline} onSelect={setSelectedPipeline} />
            <ReadinessSection machines={starterState.machines} connections={starterState.connections} />
            <ActivityTable activity={starterState.activity} />
          </div>
          <DecisionPanel decisions={starterState.decisions} selectedId={selectedDecision} outcomes={outcomes} onSelect={setSelectedDecision} onDecide={decide} />
        </div>
      </main>
      <script id="codex-portable-context" type="application/json">{JSON.stringify(starterState.portableContext)}</script>
    </div>
  );
}
