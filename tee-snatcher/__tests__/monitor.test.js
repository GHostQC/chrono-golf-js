const { checkTeeTimes, bookTeeTime, startMonitoring, stopMonitoring } = require('../src/monitor');
const chronoGolf = require('chrono-golf-api');
const config = require('../src/config');

// Mock chrono-golf-api to avoid actual API calls during testing
jest.mock('chrono-golf-api', () => ({
  getTeeTimes: jest.fn(),
  bookTeeTime: jest.fn()
}));

// Mock config to provide test values without loading from file
jest.mock('../src/config', () => ({
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
  checkInterval: 1000, // 1 second for testing
  maxAttempts: 3
}));

// Mock console.log and console.error to suppress output during tests
jest.spyOn(console, 'log').mockImplementation(() => {});
jest.spyOn(console, 'error').mockImplementation(() => {});

describe('Tee Time Monitoring', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('checkTeeTimes should return null if no courses or dates are configured', async () => {
    // Temporarily mock config with empty courses and dates
    jest.mock('../src/config', () => ({
      courses: [],
      dates: [],
      timeRange: { earliest: '08:00', latest: '16:00' },
      players: 4,
      playerInfo: [],
      paymentToken: '',
      checkInterval: 300000,
      maxAttempts: 288
    }));

    const result = await checkTeeTimes();
    
    expect(result).toBeNull();
    expect(chronoGolf.getTeeTimes).not.toHaveBeenCalled();
  });

  test('checkTeeTimes should return tee time details if a suitable slot is found', async () => {
    // Mock a successful response from getTeeTimes with a suitable slot
    const mockResponse = {
      teeTimes: [
        { id: 'tee-time-1', time: '09:00', available_spots: 2 },
        { id: 'tee-time-2', time: '10:00', available_spots: 4 }
      ]
    };
    chronoGolf.getTeeTimes.mockResolvedValue(mockResponse);

    const result = await checkTeeTimes();
    
    expect(result).toEqual({
      courseId: 'course-1',
      teeTimeId: 'tee-time-2',
      time: '10:00',
      date: '2025-06-20',
      spots: 4
    });
    expect(chronoGolf.getTeeTimes).toHaveBeenCalledWith('course-1', {
      date: '2025-06-20',
      players: 4,
      time_min: '08:00',
      time_max: '16:00',
      per_page: 20
    });
  });

  test('checkTeeTimes should return null if no suitable slots are found', async () => {
    // Mock a response with no suitable slots
    const mockResponse = {
      teeTimes: [
        { id: 'tee-time-1', time: '09:00', available_spots: 2 }
      ]
    };
    chronoGolf.getTeeTimes.mockResolvedValue(mockResponse);

    const result = await checkTeeTimes();
    
    expect(result).toBeNull();
    expect(chronoGolf.getTeeTimes).toHaveBeenCalled();
  });

  test('bookTeeTime should return null if tee time details are invalid', async () => {
    const result = await bookTeeTime(null);
    
    expect(result).toBeNull();
    expect(chronoGolf.bookTeeTime).not.toHaveBeenCalled();
  });

  test('bookTeeTime should return booking details on successful booking', async () => {
    // Mock a successful booking response
    const mockBooking = {
      id: 'booking-123',
      status: 'confirmed'
    };
    chronoGolf.bookTeeTime.mockResolvedValue(mockBooking);
    
    const teeTimeDetails = {
      courseId: 'course-1',
      teeTimeId: 'tee-time-2',
      date: '2025-06-20',
      time: '10:00',
      spots: 4
    };
    const result = await bookTeeTime(teeTimeDetails);
    
    expect(result).toEqual(mockBooking);
    expect(chronoGolf.bookTeeTime).toHaveBeenCalledWith(
      'course-1',
      'tee-time-2',
      {
        players: 4,
        player_info: [
          { first_name: 'John', last_name: 'Doe', email: 'john@example.com' },
          { first_name: 'Jane', last_name: 'Smith', email: 'jane@example.com' },
          { first_name: 'Bob', last_name: 'Johnson', email: 'bob@example.com' },
          { first_name: 'Alice', last_name: 'Brown', email: 'alice@example.com' }
        ],
        payment_token: 'mock-payment-token'
      }
    );
  });

  test('bookTeeTime should return simulated booking in dry-run mode', async () => {
    const teeTimeDetails = {
      courseId: 'course-1',
      teeTimeId: 'tee-time-2',
      date: '2025-06-20',
      time: '10:00',
      spots: 4
    };
    const result = await bookTeeTime(teeTimeDetails, true);
    
    expect(result).toEqual({
      id: 'simulated-booking-id',
      courseId: 'course-1',
      teeTimeId: 'tee-time-2',
      date: '2025-06-20',
      time: '10:00',
      players: 4,
      status: 'simulated-success'
    });
    expect(chronoGolf.bookTeeTime).not.toHaveBeenCalled();
  });

  test('startMonitoring should call checkTeeTimes and bookTeeTime if a slot is found', async () => {
    // Mock checkTeeTimes to return a suitable slot
    jest.spyOn(global, 'setInterval').mockImplementation((callback) => {
      callback(); // Immediately call the callback for testing
      return { unref: jest.fn() };
    });
    
    // Mock a successful response from getTeeTimes
    const mockTeeTimeResponse = {
      teeTimes: [{ id: 'tee-time-2', time: '10:00', available_spots: 4 }]
    };
    chronoGolf.getTeeTimes.mockResolvedValue(mockTeeTimeResponse);
    
    // Mock a successful booking response
    const mockBooking = { id: 'booking-123', status: 'confirmed' };
    chronoGolf.bookTeeTime.mockResolvedValue(mockBooking);
    
    await startMonitoring(false);
    
    expect(chronoGolf.getTeeTimes).toHaveBeenCalled();
    expect(chronoGolf.bookTeeTime).toHaveBeenCalled();
    expect(setInterval).toHaveBeenCalledWith(expect.any(Function), 1000);
  });
});
