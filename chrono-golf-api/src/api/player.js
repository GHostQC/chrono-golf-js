const { makeApiRequest, extractPaginationInfo } = require('./utils');

/**
 * Retrieves a list of players/customers
 * @param {Object} [params] - Query parameters for filtering players
 * @param {number} [params.page] - Page number for pagination
 * @param {number} [params.per_page] - Items per page
 * @param {string} [params.search] - Search term for filtering players by name or email
 * @returns {Promise<Object>} Object containing player data and pagination info
 */
async function getPlayers(params = {}) {
  try {
    const response = await makeApiRequest('GET', '/players', null, params);
    return {
      players: response.data || response,
      pagination: extractPaginationInfo(response),
    };
  } catch (error) {
    throw new Error(`Failed to retrieve players: ${error.message}`);
  }
}

/**
 * Retrieves details for a specific player
 * @param {string} playerId - The ID of the player to retrieve
 * @returns {Promise<Object>} Player details
 */
async function getPlayerDetails(playerId) {
  if (!playerId) {
    throw new Error('Player ID is required');
  }
  
  try {
    const response = await makeApiRequest('GET', `/players/${playerId}`);
    return response.data || response;
  } catch (error) {
    throw new Error(`Failed to retrieve player details: ${error.message}`);
  }
}

/**
 * Creates a new player/customer
 * @param {Object} playerData - Player information
 * @param {string} playerData.first_name - Player's first name
 * @param {string} playerData.last_name - Player's last name
 * @param {string} playerData.email - Player's email address
 * @param {string} [playerData.phone] - Player's phone number
 * @returns {Promise<Object>} Created player data
 */
async function createPlayer(playerData) {
  if (!playerData || !playerData.first_name || !playerData.last_name || !playerData.email) {
    throw new Error('Player data with first name, last name, and email is required');
  }
  
  try {
    const response = await makeApiRequest('POST', '/players', playerData);
    return response.data || response;
  } catch (error) {
    throw new Error(`Failed to create player: ${error.message}`);
  }
}

/**
 * Updates an existing player's information
 * @param {string} playerId - The ID of the player to update
 * @param {Object} playerData - Updated player information
 * @returns {Promise<Object>} Updated player data
 */
async function updatePlayer(playerId, playerData) {
  if (!playerId) {
    throw new Error('Player ID is required');
  }
  
  if (!playerData) {
    throw new Error('Player data is required');
  }
  
  try {
    const response = await makeApiRequest('PUT', `/players/${playerId}`, playerData);
    return response.data || response;
  } catch (error) {
    throw new Error(`Failed to update player: ${error.message}`);
  }
}

module.exports = {
  getPlayers,
  getPlayerDetails,
  createPlayer,
  updatePlayer,
};
