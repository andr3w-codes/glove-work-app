// Database schema definitions
export const schema = {
  customScenarios: {
    id: 'uuid',
    positionFocus: 'string[]',
    baseRunners: 'jsonb',
    outs: 'integer',
    ballLocation: 'jsonb',
    situation: 'text',
    question: 'text',
    options: 'jsonb',
    explanation: 'text',
    createdAt: 'timestamp',
    updatedAt: 'timestamp',
    isApproved: 'boolean'
  },
  userScores: {
    id: 'uuid',
    userId: 'uuid',
    score: 'integer',
    scenariosCompleted: 'integer',
    correctAnswers: 'integer',
    bestStreak: 'integer',
    lastPlayed: 'timestamp',
    createdAt: 'timestamp'
  },
  leaderboardEntries: {
    id: 'uuid',
    userId: 'uuid',
    score: 'integer',
    rank: 'integer',
    updatedAt: 'timestamp'
  }
}; 