import { Check, ChevronDown, CirclePause, CircleX, ShieldCheck } from "lucide-react";
import type { Decision, DecisionOutcome } from "../types";

const labels: Record<DecisionOutcome, string> = {
  approved: "Approved",
  held: "Held",
  rejected: "Rejected",
};

export function DecisionPanel({
  decisions,
  selectedId,
  outcomes,
  onSelect,
  onDecide,
}: {
  decisions: Decision[];
  selectedId: string;
  outcomes: Record<string, DecisionOutcome>;
  onSelect: (id: string) => void;
  onDecide: (id: string, outcome: DecisionOutcome) => void;
}) {
  const selected = decisions.find((decision) => decision.id === selectedId) ?? decisions[0];
  const currentOutcome = outcomes[selected.id];

  return (
    <aside className="decision-column" id="decisions" aria-label="Decision review queue">
      <div className="decision-column__header"><div><h2>Decision review queue</h2><span>{decisions.length}</span></div><small>Outcomes are browser-local</small></div>
      <article className="decision-card">
        <header>
          <div><strong>{selected.title}</strong><span>{selected.stage} · <code>{selected.branch}</code></span></div>
          <ChevronDown size={18} />
        </header>
        <div className="decision-card__body">
          <section><h3>Context</h3><p>{selected.context}</p></section>
          <section><h3>Scope</h3><ul>{selected.scope.map((item) => <li key={item}>{item}</li>)}</ul></section>
          <section><h3>Acceptance criteria</h3><ul className="check-list">{selected.acceptanceCriteria.map((item) => <li key={item}><Check size={14} />{item}</li>)}</ul></section>
          <section>
            <h3>Your decision</h3>
            <p className="local-note"><ShieldCheck size={15} /> Saved only in this browser. Record durable approvals in reviewed Git state.</p>
            {currentOutcome && <div className={`decision-result decision-result--${currentOutcome}`}>Current outcome: {labels[currentOutcome]}</div>}
            <div className="decision-actions">
              <button className="approve-button" onClick={() => onDecide(selected.id, "approved")}><Check size={16} />Approve</button>
              <button className="hold-button" onClick={() => onDecide(selected.id, "held")}><CirclePause size={16} />Hold</button>
              <button className="reject-button" onClick={() => onDecide(selected.id, "rejected")}><CircleX size={16} />Reject</button>
            </div>
          </section>
        </div>
      </article>
      <div className="decision-list">
        {decisions.map((decision) => (
          <button className={decision.id === selected.id ? "decision-list__item decision-list__item--active" : "decision-list__item"} key={decision.id} onClick={() => onSelect(decision.id)}>
            <span><strong>{decision.title}</strong><small>{decision.updated}</small></span>
            {outcomes[decision.id] ? labels[outcomes[decision.id]] : "Review"}
          </button>
        ))}
      </div>
      <div className="privacy-callout">
        <ShieldCheck size={21} />
        <div><strong>Privacy boundary: local only</strong><p>Sessions, memories, credentials, and raw client data stay outside this dashboard and outside Git.</p></div>
      </div>
    </aside>
  );
}
