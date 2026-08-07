import type { Activity } from "../types";

export function ActivityTable({ activity }: { activity: Activity[] }) {
  return (
    <section className="panel activity-panel" id="activity">
      <div className="section-heading compact"><div><h2>Recent activity</h2><p>Fictional public-safe evidence.</p></div></div>
      <div className="table-scroll">
        <table>
          <thead><tr><th>Time</th><th>Event</th><th>Project item</th><th>Machine</th><th>Details</th></tr></thead>
          <tbody>{activity.map((item) => <tr key={item.id}><td>{item.time}</td><td className="strong-cell">{item.event}</td><td>{item.item}</td><td>{item.machine}</td><td>{item.detail}</td></tr>)}</tbody>
        </table>
      </div>
    </section>
  );
}
