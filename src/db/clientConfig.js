import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ─── Auth ────────────────────────────────────────────────────────────────────

export const auth = {
  signInAnonymously: () => supabase.auth.signInAnonymously(),
  signInWithEmail: (email, password) =>
    supabase.auth.signInWithPassword({ email, password }),
  signUp: (email, password) =>
    supabase.auth.signUp({ email, password }),
  signOut: () => supabase.auth.signOut(),
  getSession: () => supabase.auth.getSession(),
  onAuthStateChange: (cb) => supabase.auth.onAuthStateChange(cb),
};

// ─── Database ─────────────────────────────────────────────────────────────────

export const db = {
  // Scenarios
  async getCustomScenarios() {
    const { data, error } = await supabase
      .from('custom_scenarios')
      .select('*')
      .eq('is_approved', true);
    if (error) throw error;
    return data.map(s => ({
      ...s,
      ballLocation: s.ball_location,
      baseRunners: s.base_runners,
      positionFocus: s.position_focus,
    }));
  },

  async createCustomScenario(scenario) {
    const { ballLocation, baseRunners, positionFocus, createdAt, updatedAt, isApproved, ...rest } = scenario;
    const { data, error } = await supabase
      .from('custom_scenarios')
      .insert([{
        ...rest,
        ball_location: ballLocation,
        base_runners: baseRunners,
        position_focus: positionFocus,
        created_at: createdAt,
        updated_at: updatedAt,
        is_approved: isApproved,
      }])
      .select();
    if (error) throw error;
    return data[0];
  },

  // User scores
  async getUserScore(userId) {
    const { data, error } = await supabase
      .from('user_scores')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle();
    if (error) throw error;
    return data; // null if no row yet
  },

  async updateUserScore(userId, scoreData) {
    const existing = await this.getUserScore(userId);
    const row = {
      user_id: userId,
      score: scoreData.score,
      scenarios_completed: scoreData.scenariosCompleted,
      correct_answers: scoreData.correctAnswers,
      last_played: scoreData.lastPlayed ?? new Date(),
    };
    const query = existing
      ? supabase.from('user_scores').update(row).eq('user_id', userId)
      : supabase.from('user_scores').insert(row);
    const { data, error } = await query.select();
    if (error) throw error;
    return data[0];
  },

  // Leaderboard
  async getLeaderboard(limit = 10) {
    const { data, error } = await supabase
      .from('leaderboard_entries')
      .select('*')
      .order('score', { ascending: false })
      .limit(limit);
    if (error) throw error;
    return data;
  },

  async updateLeaderboardEntry(userId, score) {
    const { data: existing } = await supabase
      .from('leaderboard_entries')
      .select('id')
      .eq('user_id', userId)
      .maybeSingle();
    const row = { user_id: userId, score, updated_at: new Date() };
    const query = existing
      ? supabase.from('leaderboard_entries').update(row).eq('user_id', userId)
      : supabase.from('leaderboard_entries').insert(row);
    const { data, error } = await query.select();
    if (error) throw error;
    return data[0];
  },
};
