import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import App from "./App";

describe("dashboard starter", () => {
  beforeEach(() => localStorage.clear());
  afterEach(() => cleanup());

  it("renders the fictional workspace and privacy boundary", () => {
    render(<App />);
    expect(screen.getByRole("heading", { name: /Sample Workspace control plane/i })).toBeInTheDocument();
    expect(screen.getAllByText(/local only/i).length).toBeGreaterThan(0);
    expect(document.querySelector("#codex-portable-context")).toHaveAttribute("type", "application/json");
  });

  it("stores a decision only in browser local storage", () => {
    render(<App />);
    fireEvent.click(screen.getByRole("button", { name: /^Approve$/i }));
    expect(screen.getByText("Current outcome: Approved")).toBeInTheDocument();
    expect(localStorage.getItem("codex-dashboard-starter-decisions-v1")).toContain("approved");
  });
});
