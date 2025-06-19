/**
 * Tee Snatcher - A tool to monitor and snatch available tee times for golf tournaments
 */
console.log('Tee Snatcher starting...');

const chronoGolf = require('chrono-golf-api');
const { startMonitoring, stopMonitoring } = require('./monitor');
const config = require('./config');

/**
 * Initializes the Tee Snatcher application by setting up authentication
 * with the Chrono Golf API.
 */
async function initialize() {
  try {
    console.log('Initializing authentication with Chrono Golf API...');
    const accessToken = await chronoGolf.getAccessToken();
    console.log('Authentication successful. Access token obtained.');
    return accessToken;
  } catch (error) {
    console.error('Failed to initialize authentication:', error.message);
    process.exit(1);
  }
}

// Handle command line arguments for basic control
const args = process.argv.slice(2);
const command = args[0];
const isDryRun = args.includes('--dry-run') || args.includes('-d');

// Variable to store the monitoring interval ID
let monitoringInterval = null;

// Start the application
initialize().then(() => {
  console.log('Tee Snatcher initialized. Ready to monitor tee times for tournaments.');
  
  if (command === 'start') {
    console.log('Starting monitoring process...', isDryRun ? '(Dry-run mode)' : '');
    monitoringInterval = startMonitoring(isDryRun);
  } else if (command === 'stop') {
    console.log('Stopping monitoring process...');
    stopMonitoring(monitoringInterval);
  } else {
    console.log('No command provided. Use "start" to begin monitoring or "stop" to end it.');
    console.log('Use "--dry-run" or "-d" flag for dry-run mode (simulates booking without API calls).');
    console.log('Examples:');
    console.log('  node src/index.js start          # Start monitoring and booking');
    console.log('  node src/index.js start --dry-run  # Start monitoring in dry-run mode');
    console.log('  node src/index.js stop           # Stop monitoring');
    console.log('Configuration settings can be customized in user-config.json.');
    console.log('Current configuration:', JSON.stringify(config, null, 2));
  }
});

// Handle process termination to ensure monitoring is stopped gracefully
process.on('SIGINT', () => {
  console.log('\nReceived SIGINT. Stopping monitoring...');
  stopMonitoring(monitoringInterval);
  process.exit(0);
});
