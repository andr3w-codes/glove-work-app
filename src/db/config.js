import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

// Load environment variables from .env.local
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
config({ path: resolve(__dirname, '../../.env.local') });

// Initialize Supabase client
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database helper functions
export const db = {
  // Custom Scenarios
  async createCustomScenario(scenario) {
    console.log('Creating scenario with data:', scenario);
    
    const { 
      ballLocation,
      baseRunners,
      positionFocus,
      createdAt,
      updatedAt,
      isApproved,
      ...rest 
    } = scenario;

    const dbScenario = {
      ...rest,
      ball_location: ballLocation,
      base_runners: baseRunners,
      position_focus: positionFocus,
      created_at: createdAt,
      updated_at: updatedAt,
      is_approved: isApproved
    };

    console.log('Converted to database format:', dbScenario);

    const { data, error } = await supabase
      .from('custom_scenarios')
      .insert([dbScenario])
      .select();
    
    if (error) throw error;
    return data[0];
  },

  async getCustomScenarios() {
    const { data, error } = await supabase
      .from('custom_scenarios')
      .select('*')
      .eq('is_approved', true);
    
    if (error) throw error;
    return data.map(scenario => ({
      ...scenario,
      ballLocation: scenario.ball_location,
      baseRunners: scenario.base_runners,
      positionFocus: scenario.position_focus
    }));
  },

  // User Scores
  async updateUserScore(userId, scoreData) {
    const { data, error } = await supabase
      .from('user_scores')
      .upsert({ userId, ...scoreData })
      .select();
    
    if (error) throw error;
    return data[0];
  },

  async getUserScore(userId) {
    const { data, error } = await supabase
      .from('user_scores')
      .select('*')
      .eq('userId', userId)
      .single();
    
    if (error) throw error;
    return data;
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
    const { data, error } = await supabase
      .from('leaderboard_entries')
      .upsert({ userId, score, updatedAt: new Date() })
      .select();
    
    if (error) throw error;
    return data[0];
  }
}; 