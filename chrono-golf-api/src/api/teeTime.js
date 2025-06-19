const { makeApiRequest, extractPaginationInfo } = require('./utils');

/**
 * Retrieves available tee times for a specific course
 * @param {string} courseId - The ID of the course
 * @param {Object} [params] - Query parameters for filtering tee times
 * @param {string} [params.date] - Date in YYYY-MM-DD format
 * @param {number} [params.players] - Number of players
 * @param {string} [params.time_min] - Earliest time to search (HH:MM)
 * @param {string} [params.time_max] - Latest time to search (HH:MM)
 * @param {number} [params.page] - Page number for pagination
 * @param {number} [params.per_page] - Items per page
 * @returns {Promise<Object>} Object containing tee time data and pagination info
 */
async function getTeeTimes(courseId, params = {}) {
  if (!courseId) {
    throw new Error('Course ID is required');
  }
  
  try {
    const response = await makeApiRequest('GET', `/courses/${courseId}/tee_times`, null, params);
    return {
      teeTimes: response.data || response,
      pagination: extractPaginationInfo(response),
    };
  } catch (error) {
    throw new Error(`Failed to retrieve tee times: ${error.message}`);
  }
}

/**
 * Books a tee time
 * @param {string} courseId - The ID of the course
 * @param {string} teeTimeId - The ID of the tee time to book
 * @param {Object} bookingData - Booking information
 * @param {number} bookingData.players - Number of players
 * @param {Object[]} bookingData.player_info - Array of player information objects
 * @param {string} bookingData.payment_token - Payment token for processing payment
 * @returns {Promise<Object>} Booking confirmation data
 */
async function bookTeeTime(courseId, teeTimeId, bookingData) {
  if (!courseId || !teeTimeId) {
    throw new Error('Course ID and Tee Time ID are required');
  }
  
  if (!bookingData || !bookingData.players || !bookingData.player_info) {
    throw new Error('Booking data with players and player information is required');
  }
  
  try {
    const response = await makeApiRequest('POST', `/courses/${courseId}/tee_times/${teeTimeId}/book`, bookingData);
    return response.data || response;
  } catch (error) {
    throw new Error(`Failed to book tee time: ${error.message}`);
  }
}

/**
 * Retrieves details for a specific booking
 * @param {string} bookingId - The ID of the booking
 * @returns {Promise<Object>} Booking details
 */
async function getBookingDetails(bookingId) {
  if (!bookingId) {
    throw new Error('Booking ID is required');
  }
  
  try {
    const response = await makeApiRequest('GET', `/bookings/${bookingId}`);
    return response.data || response;
  } catch (error) {
    throw new Error(`Failed to retrieve booking details: ${error.message}`);
  }
}

/**
 * Cancels a booking
 * @param {string} bookingId - The ID of the booking to cancel
 * @returns {Promise<Object>} Cancellation confirmation
 */
async function cancelBooking(bookingId) {
  if (!bookingId) {
    throw new Error('Booking ID is required');
  }
  
  try {
    const response = await makeApiRequest('DELETE', `/bookings/${bookingId}`);
    return response.data || response;
  } catch (error) {
    throw new Error(`Failed to cancel booking: ${error.message}`);
  }
}

module.exports = {
  getTeeTimes,
  bookTeeTime,
  getBookingDetails,
  cancelBooking,
};
