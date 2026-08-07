import { CheckCircle2, GitBranch, Laptop, Link2, Monitor, RefreshCw } from "lucide-react";
import type { Connection, Machine } from "../types";
import { StatusChip } from "./StatusChip";

export function ReadinessSection({ machines, connections }: { machines: Machine[]; connections: Connection[] }) {
  return (
    <section className="readiness-grid" id="machines">
      <div className="panel readiness-panel">
        <div className="section-heading compact"><div><h2>Machine readiness</h2><p>Independent installations, one reviewed source.</p></div></div>
        <div className="machine-grid">
          {machines.map((machine, index) => {
            const Icon = index === 0 ? Monitor : Laptop;
            return (
              <article className="machine-card" key={machine.id}>
                <header><div><Icon size={19} /><strong>{machine.name}</strong></div><StatusChip label={machine.status} tone={machine.tone} /></header>
                <dl>
                  <div><dt>Codex</dt><dd>{machine.codex}</dd></div>
                  <div><dt>Working tree</dt><dd>{machine.workingTree}</dd></div>
                  <div><dt>Branch</dt><dd><code>{machine.branch}</code></dd></div>
                  <div><dt>Last commit</dt><dd>{machine.lastCommit}</dd></div>
                </dl>
              </article>
            );
          })}
        </div>
      </div>
      <div className="panel connection-panel" id="connections">
        <div className="section-heading compact"><div><h2>Connection health</h2><p>Capability does not imply permission.</p></div><button aria-label="Refresh connection status" className="icon-button"><RefreshCw size={16} /></button></div>
        <div className="connection-list">
          {connections.map((connection, index) => {
            const Icon = index === 0 ? GitBranch : index === 1 ? Link2 : CheckCircle2;
            return (
              <div className="connection-row" key={connection.id}>
                <Icon size={19} />
                <div><strong>{connection.name}</strong><span>{connection.detail}</span></div>
                <StatusChip label={connection.status} tone={connection.tone} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
