const axios = require('axios');
const config = require('./config');

/**
 * Manages authentication for the Lightspeed Golf Partner V2 API
 */
class AuthManager {
  constructor() {
    this.accessToken = null;
    this.tokenExpiry = null;
    this.refreshToken = null;
  }

  /**
   * Checks if the current token is valid and not expired
   * @returns {boolean} True if token is valid and not expired
   */
  isTokenValid() {
    if (!this.accessToken || !this.tokenExpiry) {
      return false;
    }
    // Check if token expires in the next 5 minutes
    return this.tokenExpiry > Date.now() + 300000;
  }

  /**
   * Gets a valid access token, requesting a new one if necessary
   * @returns {Promise<string>} The access token
   */
  async getAccessToken() {
    if (this.isTokenValid()) {
      return this.accessToken;
    }
    return await this.requestNewToken();
  }

  /**
   * Requests a new access token from the API
   * @returns {Promise<string>} The new access token
   */
  async requestNewToken() {
    try {
      const response = await axios.post(
        `${config.apiUrl}${config.tokenEndpoint}`,
        {
          grant_type: 'client_credentials',
          client_id: config.clientId,
          client_secret: config.clientSecret,
        },
        {
          timeout: config.timeout,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data && response.data.access_token) {
        this.accessToken = response.data.access_token;
        // Set expiry time (subtract 5 minutes as safety margin)
        this.tokenExpiry = Date.now() + (response.data.expires_in * 1000) - 300000;
        this.refreshToken = response.data.refresh_token || null;
        return this.accessToken;
      } else {
        throw new Error('Invalid response from token endpoint');
      }
    } catch (error) {
      console.error('Authentication error:', error.message);
      throw new Error(`Failed to obtain access token: ${error.message}`);
    }
  }

  /**
   * Resets the stored token information
   */
  resetToken() {
    this.accessToken = null;
    this.tokenExpiry = null;
    this.refreshToken = null;
  }
}

module.exports = new AuthManager();
