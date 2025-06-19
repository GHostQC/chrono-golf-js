const fs = require('fs');
const path = require('path');
const { loadConfig } = require('../src/config');

// Mock fs to avoid actual file system operations during testing
jest.mock('fs');

// Mock path to provide consistent path handling
jest.mock('path', () => ({
  join: jest.fn().mockReturnValue('/mock/path/user-config.json')
}));

describe('Configuration Loading', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('loadConfig should return configuration from user-config.json if it exists', () => {
    // Mock fs.existsSync to return true (file exists)
    fs.existsSync.mockReturnValue(true);
    
    // Mock fs.readFileSync to return a sample configuration
    const mockConfig = {
      courses: ['course-1', 'course-2'],
      dates: ['2025-06-20', '2025-06-21'],
      timeRange: { earliest: '08:00', latest: '16:00' },
      players: 4,
      playerInfo: [
        { first_name: 'John', last_name: 'Doe', email: 'john@example.com' },
        { first_name: 'Jane', last_name: 'Smith', email: 'jane@example.com' },
        { first_name: 'Bob', last_name: 'Johnson', email: 'bob@example.com' },
        { first_name: 'Alice', last_name: 'Brown', email: 'alice@example.com' }
      ],
      paymentToken: 'mock-payment-token',
      checkInterval: 300000,
      maxAttempts: 50
    };
    fs.readFileSync.mockReturnValue(JSON.stringify(mockConfig));
    
    const config = loadConfig();
    
    expect(config).toEqual(mockConfig);
    expect(fs.existsSync).toHaveBeenCalledWith('/mock/path/user-config.json');
    expect(fs.readFileSync).toHaveBeenCalledWith('/mock/path/user-config.json', 'utf8');
  });

  test('loadConfig should return default configuration if user-config.json does not exist', () => {
    // Mock fs.existsSync to return false (file does not exist)
    fs.existsSync.mockReturnValue(false);
    
    const config = loadConfig();
    
    expect(config).toEqual({
      courses: [],
      dates: [],
      timeRange: { earliest: '08:00', latest: '16:00' },
      players: 4,
      playerInfo: [],
      paymentToken: '',
      checkInterval: 300000, // 5 minutes
      maxAttempts: 288 // 24 hours with 5-minute intervals
    });
    expect(fs.existsSync).toHaveBeenCalledWith('/mock/path/user-config.json');
    expect(fs.readFileSync).not.toHaveBeenCalled();
  });

  test('loadConfig should handle errors when reading user-config.json', () => {
    // Mock fs.existsSync to return true (file exists)
    fs.existsSync.mockReturnValue(true);
    
    // Mock fs.readFileSync to throw an error
    fs.readFileSync.mockImplementation(() => {
      throw new Error('Failed to read file');
    });
    
    const config = loadConfig();
    
    expect(config).toEqual({
      courses: [],
      dates: [],
      timeRange: { earliest: '08:00', latest: '16:00' },
      players: 4,
      playerInfo: [],
      paymentToken: '',
      checkInterval: 300000, // 5 minutes
      maxAttempts: 288 // 24 hours with 5-minute intervals
    });
    expect(fs.existsSync).toHaveBeenCalledWith('/mock/path/user-config.json');
    expect(fs.readFileSync).toHaveBeenCalledWith('/mock/path/user-config.json', 'utf8');
  });
});
