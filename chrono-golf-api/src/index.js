/**
 * Lightspeed Golf Partner V2 API Client
 * 
 * This module provides a comprehensive interface to interact with the Lightspeed Golf Partner V2 API.
 * It handles authentication and provides functions for managing courses, tee times, bookings, and players.
 */

// Authentication manager
const auth = require('./api/auth');

// Course-related functions
const {
  getCourses,
  getCourseDetails,
  getCourseFacilities,
} = require('./api/course');

// Tee time and booking-related functions
const {
  getTeeTimes,
  bookTeeTime,
  getBookingDetails,
  cancelBooking,
} = require('./api/teeTime');

// Player-related functions
const {
  getPlayers,
  getPlayerDetails,
  createPlayer,
  updatePlayer,
} = require('./api/player');

// Export all functions and the auth manager for direct access if needed
module.exports = {
  // Authentication
  auth,
  getAccessToken: auth.getAccessToken.bind(auth),
  resetToken: auth.resetToken.bind(auth),
  
  // Courses
  getCourses,
  getCourseDetails,
  getCourseFacilities,
  
  // Tee Times and Bookings
  getTeeTimes,
  bookTeeTime,
  getBookingDetails,
  cancelBooking,
  
  // Players
  getPlayers,
  getPlayerDetails,
  createPlayer,
  updatePlayer,
};
