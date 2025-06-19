const chronoGolf = require('chrono-golf-api');
const config = require('./config');

/**
 * Checks for available tee times based on configured preferences
 * @returns {Promise<Object|null>} Available tee time details if found, null otherwise
 */
async function checkTeeTimes() {
  if (config.courses.length === 0 || config.dates.length === 0) {
    console.log('No courses or dates configured for monitoring. Please update your configuration.');
    return null;
  }

  console.log('Checking for available tee times...');
  
  try {
    // Iterate through configured courses and dates
    for (const courseId of config.courses) {
      for (const date of config.dates) {
        console.log(`Checking course ${courseId} for date ${date}`);
        
        const params = {
          date: date,
          players: config.players,
          time_min: config.timeRange.earliest,
          time_max: config.timeRange.latest,
          per_page: 20, // Check up to 20 slots at a time
        };
        
        const response = await chronoGolf.getTeeTimes(courseId, params);
        
        if (response.teeTimes && response.teeTimes.length > 0) {
          console.log(`Found ${response.teeTimes.length} available tee times at course ${courseId} on ${date}`);
          // Return the first available tee time that matches criteria
          const suitableTeeTime = response.teeTimes.find(tt => 
            tt.available_spots >= config.players
          );
          
          if (suitableTeeTime) {
            console.log(`Suitable tee time found at ${suitableTeeTime.time} with ${suitableTeeTime.available_spots} spots`);
            return {
              courseId: courseId,
              teeTimeId: suitableTeeTime.id,
              time: suitableTeeTime.time,
              date: date,
              spots: suitableTeeTime.available_spots
            };
          }
        } else {
          console.log(`No suitable tee times found for course ${courseId} on ${date}`);
        }
      }
    }
    
    console.log('No suitable tee times found in this check. Will retry later.');
    return null;
  } catch (error) {
    console.error('Error checking tee times:', error.message);
    return null;
  }
}

/**
 * Attempts to book a tee time
 * @param {Object} teeTimeDetails - Details of the tee time to book
 * @param {boolean} dryRun - If true, simulate booking without making API calls
 * @returns {Promise<Object|null>} Booking confirmation if successful (or simulated result in dry-run), null otherwise
 */
async function bookTeeTime(teeTimeDetails, dryRun = false) {
  if (!teeTimeDetails || !teeTimeDetails.courseId || !teeTimeDetails.teeTimeId) {
    console.error('Invalid tee time details provided for booking');
    return null;
  }
  
  if (config.playerInfo.length < config.players) {
    console.error('Not enough player information provided for booking. Please update configuration.');
    return null;
  }
  
  console.log(`Attempting to book tee time at course ${teeTimeDetails.courseId} for ${teeTimeDetails.date} at ${teeTimeDetails.time}`);
  
  if (dryRun) {
    console.log('Dry-run mode: Simulating booking without making API calls.');
    const simulatedBooking = {
      id: 'simulated-booking-id',
      courseId: teeTimeDetails.courseId,
      teeTimeId: teeTimeDetails.teeTimeId,
      date: teeTimeDetails.date,
      time: teeTimeDetails.time,
      players: config.players,
      status: 'simulated-success'
    };
    console.log('Dry-run: Simulated booking successful!', simulatedBooking);
    return simulatedBooking;
  }
  
  try {
    const bookingData = {
      players: config.players,
      player_info: config.playerInfo.slice(0, config.players),
      payment_token: config.paymentToken
    };
    
    const booking = await chronoGolf.bookTeeTime(
      teeTimeDetails.courseId,
      teeTimeDetails.teeTimeId,
      bookingData
    );
    
    console.log('Tee time successfully booked!', booking);
    return booking;
  } catch (error) {
    console.error('Failed to book tee time:', error.message);
    return null;
  }
}

/**
 * Starts the monitoring process for tee times
 * @param {boolean} dryRun - If true, simulate booking without making API calls
 */
function startMonitoring(dryRun = false) {
  console.log('Starting Tee Snatcher monitoring...', dryRun ? '(Dry-run mode)' : '');
  let attempts = 0;
  
  const interval = setInterval(async () => {
    attempts++;
    console.log(`Check attempt ${attempts} of ${config.maxAttempts}`);
    
    if (attempts > config.maxAttempts) {
      console.log('Maximum attempts reached. Stopping monitoring.');
      clearInterval(interval);
      return;
    }
    
    const teeTime = await checkTeeTimes();
    if (teeTime) {
      console.log('Available tee time found! Proceeding to book...');
      const booking = await bookTeeTime(teeTime, dryRun);
      if (booking) {
        console.log('Tournament booking completed successfully. Stopping monitoring.');
        clearInterval(interval);
      } else {
        console.log('Booking failed. Continuing to monitor...');
      }
    }
  }, config.checkInterval);
  
  // Return the interval ID so it can be stopped later if needed
  return interval;
}

/**
 * Stops the monitoring process
 * @param {number} intervalId - The ID of the interval to stop
 */
function stopMonitoring(intervalId) {
  if (intervalId) {
    clearInterval(intervalId);
    console.log('Monitoring stopped.');
  } else {
    console.log('No active monitoring interval to stop.');
  }
}

module.exports = {
  startMonitoring,
  stopMonitoring,
  checkTeeTimes,
  bookTeeTime
};
