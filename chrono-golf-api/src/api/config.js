/**
 * Configuration for the Lightspeed Golf Partner V2 API
 */
require('dotenv').config();

const config = {
  apiUrl: process.env.LIGHTSPEED_API_URL || 'https://api.chronogolf.com/v2',
  clientId: process.env.LIGHTSPEED_CLIENT_ID,
  clientSecret: process.env.LIGHTSPEED_CLIENT_SECRET,
  tokenEndpoint: '/oauth/token',
  apiVersion: 'v2',
  timeout: 10000, // 10 seconds
};

// Validate required configuration
if (!config.clientId || !config.clientSecret) {
  console.warn('Warning: API credentials not found in environment variables. Authentication will fail.');
}

module.exports = config;
