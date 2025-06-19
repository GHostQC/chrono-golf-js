const axios = require('axios');
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

describe('Authentication', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('getAccessToken should return a token on successful authentication', async () => {
    // Mock a successful response from the API
    const mockResponse = {
      data: {
        access_token: 'mock-access-token',
        token_type: 'Bearer',
        expires_in: 3600
      }
    };
    axios.post.mockResolvedValue(mockResponse);

    const token = await getAccessToken();
    
    expect(token).toBe('mock-access-token');
    expect(axios.post).toHaveBeenCalledWith(
      `${config.apiUrl}/oauth/token`,
      {
        grant_type: 'client_credentials',
        client_id: config.clientId,
        client_secret: config.clientSecret
      }
    );
  });

  test('getAccessToken should throw an error on failed authentication', async () => {
    // Mock a failed response from the API
    const mockError = {
      response: {
        status: 401,
        data: { error: 'invalid_client' }
      }
    };
    axios.post.mockRejectedValue(mockError);

    await expect(getAccessToken()).rejects.toThrow('Authentication failed: invalid_client');
    expect(axios.post).toHaveBeenCalledWith(
      `${config.apiUrl}/oauth/token`,
      {
        grant_type: 'client_credentials',
        client_id: config.clientId,
        client_secret: config.clientSecret
      }
    );
  });
});
