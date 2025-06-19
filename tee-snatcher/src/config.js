/**
 * Configuration for Tee Snatcher
 */
require('dotenv').config();

const config = {
  // API credentials are loaded from .env by chrono-golf-api
  
  // Monitoring settings
  checkInterval: 300000, // Check every 5 minutes (in milliseconds)
  maxAttempts: 50, // Maximum number of attempts before giving up
  
  // Tournament preferences
  courses: [], // Array of course IDs to monitor
  dates: [], // Array of dates to check for tee times (YYYY-MM-DD)
  timeRange: {
    earliest: '08:00', // Earliest acceptable tee time
    latest: '16:00', // Latest acceptable tee time
  },
  players: 4, // Default number of players for the tournament
  
  // Player information for booking
  playerInfo: [
    // Example format, to be filled by user
    // { first_name: 'John', last_name: 'Doe', email: 'john@example.com' },
    // { first_name: 'Jane', last_name: 'Smith', email: 'jane@example.com' },
    // { first_name: 'Bob', last_name: 'Johnson', email: 'bob@example.com' },
    // { first_name: 'Alice', last_name: 'Brown', email: 'alice@example.com' }
  ],
  
  // Payment token placeholder (to be provided by user)
  paymentToken: 'your_payment_token_here',
  
  // Notification settings (future implementation)
  notifyOnFind: false,
  notifyOnBook: false,
};

// Load user-specific configuration if available
try {
  const userConfig = require('../user-config.json');
  Object.assign(config, userConfig);
  console.log('Loaded user configuration from user-config.json');
} catch (error) {
  console.log('No user configuration found. Using default settings.');
  console.log('To customize settings, create a user-config.json file in the tee-snatcher directory.');
}

module.exports = config;
