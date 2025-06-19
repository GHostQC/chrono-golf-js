const { makeApiRequest, extractPaginationInfo } = require('./utils');

/**
 * Retrieves a list of courses available to the partner
 * @param {Object} [params] - Query parameters for filtering results
 * @param {number} [params.page] - Page number for pagination
 * @param {number} [params.per_page] - Items per page
 * @param {string} [params.search] - Search term for filtering courses
 * @param {string} [params.country] - Filter by country code
 * @param {string} [params.state] - Filter by state/province
 * @param {string} [params.city] - Filter by city
 * @returns {Promise<Object>} Object containing course data and pagination info
 */
async function getCourses(params = {}) {
  try {
    const response = await makeApiRequest('GET', '/courses', null, params);
    return {
      courses: response.data || response,
      pagination: extractPaginationInfo(response),
    };
  } catch (error) {
    throw new Error(`Failed to retrieve courses: ${error.message}`);
  }
}

/**
 * Retrieves details for a specific course
 * @param {string} courseId - The ID of the course to retrieve
 * @returns {Promise<Object>} Course details
 */
async function getCourseDetails(courseId) {
  if (!courseId) {
    throw new Error('Course ID is required');
  }
  
  try {
    const response = await makeApiRequest('GET', `/courses/${courseId}`);
    return response.data || response;
  } catch (error) {
    throw new Error(`Failed to retrieve course details: ${error.message}`);
  }
}

/**
 * Retrieves facilities for a specific course
 * @param {string} courseId - The ID of the course
 * @returns {Promise<Object>} Facilities data for the course
 */
async function getCourseFacilities(courseId) {
  if (!courseId) {
    throw new Error('Course ID is required');
  }
  
  try {
    const response = await makeApiRequest('GET', `/courses/${courseId}/facilities`);
    return response.data || response;
  } catch (error) {
    throw new Error(`Failed to retrieve course facilities: ${error.message}`);
  }
}

module.exports = {
  getCourses,
  getCourseDetails,
  getCourseFacilities,
};
