import {
  Activity,
  CheckSquare2,
  ChevronLeft,
  CircleHelp,
  FolderKanban,
  GitBranch,
  LayoutDashboard,
  Link2,
  MonitorCog,
  Settings,
  ShieldCheck,
} from "lucide-react";

const items = [
  ["Overview", LayoutDashboard],
  ["Projects", FolderKanban],
  ["Pipeline", GitBranch],
  ["Decisions", CheckSquare2],
  ["Machines", MonitorCog],
  ["Connections", Link2],
  ["Activity", Activity],
  ["Settings", Settings],
] as const;

export function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <aside className={`sidebar ${open ? "sidebar--open" : ""}`} aria-label="Primary navigation">
      <div className="sidebar__brand">
        <div><strong>Sample Workspace</strong><span>Control plane</span></div>
        <button aria-label="Close navigation" onClick={onClose}><ChevronLeft size={18} /></button>
      </div>
      <nav>
        {items.map(([label, Icon], index) => (
          <a className={index === 0 ? "nav-item nav-item--active" : "nav-item"} href={`#${label.toLowerCase()}`} key={label}>
            <Icon size={18} strokeWidth={1.8} /><span>{label}</span>
          </a>
        ))}
      </nav>
      <div className="sidebar__footer">
        <div className="privacy-mark"><ShieldCheck size={19} /><div><strong>Privacy boundary</strong><span>Local only</span></div></div>
        <a className="nav-item" href="https://github.com/danox46/codex-dashboard-starter/blob/main/docs/SECURITY_BOUNDARY.md">
          <CircleHelp size={18} /><span>Security guide</span>
        </a>
      </div>
    </aside>
  );
}
