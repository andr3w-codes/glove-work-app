import { scenarios } from '../data/scenarios.js';
import { db } from './config.js';
import { v4 as uuidv4 } from 'uuid';

async function migrateScenarios() {
  console.log('Starting scenario migration...');
  let successCount = 0;
  let errorCount = 0;

  for (const scenario of scenarios) {
    try {
      // Create a new object with the fields we want to keep
      const { ballLocation, baseRunners, positionFocus, ...rest } = scenario;

      // Convert the scenario to match our database schema
      const dbScenario = {
        ...rest,
        id: uuidv4(), // Generate a new UUID for each scenario
        createdAt: new Date(),
        updatedAt: new Date(),
        isApproved: true, // Mark all existing scenarios as approved
        ballLocation, // Keep the original field names
        baseRunners,
        positionFocus
      };

      console.log('Migrating scenario with data:', {
        ballLocation: dbScenario.ballLocation,
        baseRunners: dbScenario.baseRunners,
        positionFocus: dbScenario.positionFocus
      });

      await db.createCustomScenario(dbScenario);
      successCount++;
      console.log(`Migrated scenario: ${scenario.id}`);
    } catch (error) {
      errorCount++;
      console.error(`Failed to migrate scenario ${scenario.id}:`, error.message);
    }
  }

  console.log('\nMigration complete!');
  console.log(`Successfully migrated: ${successCount} scenarios`);
  console.log(`Failed to migrate: ${errorCount} scenarios`);
}

// Run the migration
migrateScenarios().catch(console.error); 