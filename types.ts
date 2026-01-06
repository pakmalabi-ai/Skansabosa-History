export interface PageRoute {
  id: number;
  path: string;
  title: string;
  isAvailable: boolean;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  answerIndex: number;
}

export interface SimulationStep {
  title: string;
  description: string;
  activeElements: string[];
}

export interface TabContent {
  id: string;
  title: string;
}