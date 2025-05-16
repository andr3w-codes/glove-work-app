export interface CustomScenario {
  id: string;
  coachId: string;
  positionFocus: string[];
  baseRunners: {
    first: boolean;
    second: boolean;
    third: boolean;
  };
  outs: number;
  ballLocation: {
    x: number;
    y: number;
  };
  situation: string;
  question: string;
  options: Array<{
    text: string;
    isCorrect: boolean;
  }>;
  explanation: string;
  createdAt: Date;
  updatedAt: Date;
  isApproved: boolean;
}

export interface UserScore {
  id: string;
  userId: string;
  score: number;
  scenariosCompleted: number;
  correctAnswers: number;
  bestStreak: number;
  lastPlayed: Date;
  createdAt: Date;
}

export interface LeaderboardEntry {
  id: string;
  userId: string;
  score: number;
  rank: number;
  updatedAt: Date;
}

export interface ScoreData {
  score: number;
  scenariosCompleted: number;
  correctAnswers: number;
  bestStreak: number;
  lastPlayed: Date;
} 