const axios = require('axios');
const config = require('./config');
const auth = require('./auth');

/**
 * Makes an API request to the Lightspeed Golf Partner V2 API with proper authentication
 * @param {string} method - HTTP method (GET, POST, PUT, DELETE)
 * @param {string} endpoint - API endpoint path
 * @param {Object} [data] - Request payload for POST/PUT requests
 * @param {Object} [params] - Query parameters for GET requests
 * @returns {Promise<Object>} API response data
 */
async function makeApiRequest(method, endpoint, data = null, params = null) {
  try {
    // Ensure we have a valid access token
    const accessToken = await auth.getAccessToken();
    
    // Prepare request configuration
    const requestConfig = {
      method: method.toLowerCase(),
      url: `${config.apiUrl}${endpoint}`,
      timeout: config.timeout,
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    };
    
    // Add data for POST/PUT requests
    if (data && (method.toLowerCase() === 'post' || method.toLowerCase() === 'put')) {
      requestConfig.data = data;
    }
    
    // Add query parameters for GET requests
    if (params) {
      requestConfig.params = params;
    }
    
    // Make the request
    const response = await axios(requestConfig);
    
    // Return the response data
    return response.data;
  } catch (error) {
    // Handle authentication errors
    if (error.response && error.response.status === 401) {
      // Token might be expired, reset it and retry once
      auth.resetToken();
      console.log('Authentication failed, retrying with new token...');
      return await makeApiRequest(method, endpoint, data, params);
    }
    
    // Handle other errors
    let errorMessage = `API request failed: ${error.message}`;
    if (error.response) {
      errorMessage += ` Status: ${error.response.status}`;
      if (error.response.data) {
        errorMessage += ` Details: ${JSON.stringify(error.response.data)}`;
      }
      return error.response; // Return the error response for caller to handle
    }
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
}

/**
 * Utility to handle pagination in API responses
 * @param {Object} response - API response with pagination data
 * @returns {Object} Object containing pagination information
 */
function extractPaginationInfo(response) {
  return {
    currentPage: response.current_page || 1,
    totalPages: response.total_pages || 1,
    perPage: response.per_page || 0,
    totalItems: response.total || 0,
    nextPageUrl: response.next_page_url || null,
    prevPageUrl: response.prev_page_url || null,
  };
}

module.exports = {
  makeApiRequest,
  extractPaginationInfo,
};
