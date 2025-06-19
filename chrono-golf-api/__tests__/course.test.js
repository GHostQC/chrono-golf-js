const axios = require('axios');
const { getCourses } = require('../src/api/course');
const { getAccessToken } = require('../src/api/auth');
const { config } = require('../src/api/config');

// Mock axios to avoid actual API calls during testing
jest.mock('axios');

// Mock config to provide test values without loading from environment
jest.mock('../src/api/config', () => ({
  config: {
    apiUrl: 'https://api.chronogolf.com/v2',
    clientId: 'test-client-id',
    clientSecret: 'test-client-secret'
  }
}));

// Mock getAccessToken to return a fixed token
jest.mock('../src/api/auth', () => ({
  getAccessToken: jest.fn().mockResolvedValue('mock-access-token')
}));

describe('Course API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('getCourses should return a list of courses on successful API call', async () => {
    // Mock a successful response from the API
    const mockResponse = {
      data: {
        courses: [
          { id: 'course-1', name: 'Test Course 1', location: 'Test Location 1' },
          { id: 'course-2', name: 'Test Course 2', location: 'Test Location 2' }
        ],
        pagination: {
          current_page: 1,
          total_pages: 1,
          total_items: 2
        }
      }
    };
    axios.get.mockResolvedValue(mockResponse);

    const params = { page: 1, per_page: 10 };
    const result = await getCourses(params);
    
    expect(result).toEqual({
      courses: [
        { id: 'course-1', name: 'Test Course 1', location: 'Test Location 1' },
        { id: 'course-2', name: 'Test Course 2', location: 'Test Location 2' }
      ],
      pagination: {
        current_page: 1,
        total_pages: 1,
        total_items: 2
      }
    });
    expect(getAccessToken).toHaveBeenCalled();
    expect(axios.get).toHaveBeenCalledWith(
      `${config.apiUrl}/courses`,
      {
        headers: { Authorization: 'Bearer mock-access-token' },
        params: { page: 1, per_page: 10 }
      }
    );
  });

  test('getCourses should throw an error on failed API call', async () => {
    // Mock a failed response from the API
    const mockError = {
      response: {
        status: 403,
        data: { error: 'Forbidden' }
      }
    };
    axios.get.mockRejectedValue(mockError);

    const params = { page: 1, per_page: 10 };
    await expect(getCourses(params)).rejects.toThrow('Failed to fetch courses: Forbidden');
    expect(getAccessToken).toHaveBeenCalled();
    expect(axios.get).toHaveBeenCalledWith(
      `${config.apiUrl}/courses`,
      {
        headers: { Authorization: 'Bearer mock-access-token' },
        params: { page: 1, per_page: 10 }
      }
    );
  });
});
