export type Tone = "blue" | "green" | "amber" | "red" | "neutral";

export interface PipelineItem {
  id: string;
  stage: string;
  item: string;
  branch: string;
  status: string;
  tone: Tone;
  updated: string;
  decisionRequired: boolean;
}

export interface Decision {
  id: string;
  title: string;
  context: string;
  stage: string;
  branch: string;
  updated: string;
  scope: string[];
  acceptanceCriteria: string[];
  consequences: {
    approved: string;
    held: string;
    rejected: string;
  };
}

export type DecisionOutcome = "approved" | "held" | "rejected";

export interface Machine {
  id: string;
  name: string;
  status: string;
  tone: Tone;
  codex: string;
  workingTree: string;
  branch: string;
  lastCommit: string;
}

export interface Connection {
  id: string;
  name: string;
  detail: string;
  status: string;
  tone: Tone;
}

export interface Activity {
  id: string;
  time: string;
  event: string;
  item: string;
  machine: string;
  detail: string;
}

export interface StarterState {
  schemaVersion: number;
  updatedAt: string;
  workspace: {
    id: string;
    name: string;
    project: string;
    privacyBoundary: "local_only";
  };
  pipeline: PipelineItem[];
  decisions: Decision[];
  machines: Machine[];
  connections: Connection[];
  activity: Activity[];
  portableContext: {
    purpose: string;
    sharedState: string[];
    localState: string[];
    approvalProtocol: string[];
    nextActions: string[];
  };
}
