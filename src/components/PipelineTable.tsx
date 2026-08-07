import { Filter, Search } from "lucide-react";
import type { PipelineItem } from "../types";
import { StatusChip } from "./StatusChip";

export function PipelineTable({
  items,
  selectedId,
  onSelect,
}: {
  items: PipelineItem[];
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <section className="panel pipeline-panel" id="pipeline">
      <div className="section-heading">
        <div><h2>Project pipeline</h2><p>Sanitized work moving through the review process.</p></div>
        <div className="table-tools">
          <label className="search-box"><Search size={15} /><span className="sr-only">Filter pipeline</span><input placeholder="Filter work" /></label>
          <button className="secondary-button" type="button"><Filter size={15} /> Filters</button>
        </div>
      </div>
      <div className="table-scroll">
        <table>
          <thead><tr><th>Stage</th><th>Item</th><th>Branch</th><th>Status</th><th>Updated</th><th>Decision</th></tr></thead>
          <tbody>
            {items.map((item) => (
              <tr
                className={selectedId === item.id ? "selected-row" : ""}
                key={item.id}
                onClick={() => onSelect(item.id)}
              >
                <td><span className={`stage-dot stage-dot--${item.tone}`} />{item.stage}</td>
                <td className="strong-cell">{item.item}</td>
                <td><code>{item.branch}</code></td>
                <td><StatusChip label={item.status} tone={item.tone} /></td>
                <td>{item.updated}</td>
                <td>{item.decisionRequired ? <StatusChip label="Required" tone="blue" /> : <span className="muted">Not required</span>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="table-footer"><span>Showing {items.length} items</span><span>Shared through reviewed Git state</span></div>
    </section>
  );
}
