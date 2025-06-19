# Chrono Golf API

A Node.js client for the Lightspeed Golf Partner V2 API (also known as Chrono Golf API). This package is part of the [chrono-golf-js](../index.md) monorepo.

## Purpose

This library provides a convenient way to interact with the Chrono Golf API, allowing developers to manage golf courses, tee times, bookings, and player information programmatically.

## Setup

Ensure you have your API credentials set up in `chrono-golf-api/.env` or in the parent monorepo's configuration:

```plaintext
LIGHTSPEED_API_URL=https://api.chronogolf.com/v2
LIGHTSPEED_CLIENT_ID=your_client_id
LIGHTSPEED_CLIENT_SECRET=your_client_secret
```

## Usage

Below are examples of common operations with the Chrono Golf API client:

### Authentication

```javascript
const chronoGolf = require('chrono-golf-api');

async function authenticate() {
  try {
    const accessToken = await chronoGolf.getAccessToken();
    console.log('Access token obtained:', accessToken);
    return accessToken;
  } catch (error) {
    console.error('Authentication failed:', error.message);
  }
}

authenticate();
```

### Getting Courses

```javascript
const chronoGolf = require('chrono-golf-api');

async function getCourses() {
  try {
    const coursesResponse = await chronoGolf.getCourses({ page: 1, per_page: 10 });
    console.log('Courses:', coursesResponse.courses);
  } catch (error) {
    console.error('Error fetching courses:', error.message);
  }
}

getCourses();
```

### Getting Tee Times

```javascript
const chronoGolf = require('chrono-golf-api');

async function getTeeTimes(courseId, date) {
  try {
    const params = {
      date: date, // Format: YYYY-MM-DD
      players: 4,
      time_min: '08:00',
      time_max: '18:00',
      per_page: 50
    };
    const response = await chronoGolf.getTeeTimes(courseId, params);
    console.log('Tee times for course', courseId, 'on', date, ':', response.teeTimes);
  } catch (error) {
    console.error('Error fetching tee times:', error.message);
  }
}

getTeeTimes('course-id-here', '2025-06-20');
```

### Booking a Tee Time

```javascript
const chronoGolf = require('chrono-golf-api');

async function bookTeeTime(courseId, teeTimeId) {
  try {
    const bookingData = {
      players: 4,
      player_info: [
        { first_name: 'John', last_name: 'Doe', email: 'john@example.com' },
        { first_name: 'Jane', last_name: 'Smith', email: 'jane@example.com' },
        { first_name: 'Bob', last_name: 'Johnson', email: 'bob@example.com' },
        { first_name: 'Alice', last_name: 'Brown', email: 'alice@example.com' }
      ],
      payment_token: 'your_payment_token_here'
    };
    const booking = await chronoGolf.bookTeeTime(courseId, teeTimeId, bookingData);
    console.log('Booking successful:', booking);
  } catch (error) {
    console.error('Error booking tee time:', error.message);
  }
}

bookTeeTime('course-id-here', 'tee-time-id-here');
```

## License

This project is licensed under the ISC License - see the [LICENSE](../../LICENSE) file for details.
