import type { Tone } from "../types";

export function StatusChip({ label, tone = "neutral" }: { label: string; tone?: Tone }) {
  return <span className={`status-chip status-chip--${tone}`}>{label}</span>;
}
