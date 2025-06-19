# Tee Snatcher - Configuration

This page provides detailed information on configuring Tee Snatcher, a tool for automating the booking of golf tournaments using the Chrono Golf API. For an overview of Tee Snatcher, refer to the [Overview](../tee-snatcher/README.md) page.

## Configuration File

Tee Snatcher uses a configuration file named `user-config.json` to customize its behavior. You can create this file in the `tee-snatcher` directory by copying the provided template:

```bash
cd tee-snatcher
cp user-config-template.json user-config.json
```

Then, edit `user-config.json` to specify your preferences for monitoring and booking tee times.

## Configuration Options

Below are the key configuration options available in `user-config.json`:

- **courses**: An array of course IDs to monitor for available tee times. Replace placeholders with actual course IDs obtained from the Chrono Golf API.
  ```json
  "courses": ["course-id-1", "course-id-2"]
  ```

- **dates**: An array of dates (in `YYYY-MM-DD` format) to check for tee time availability.
  ```json
  "dates": ["2025-06-20", "2025-06-21", "2025-06-22"]
  ```

- **timeRange**: An object specifying the earliest and latest acceptable tee times for booking.
  ```json
  "timeRange": {
    "earliest": "08:00",
    "latest": "16:00"
  }
  ```

- **players**: The number of players to book for the tournament. This should match the number of player entries in `playerInfo`.
  ```json
  "players": 4
  ```

- **playerInfo**: An array of objects containing information for each player. Ensure you provide details for at least as many players as specified in `players`.
  ```json
  "playerInfo": [
    { "first_name": "John", "last_name": "Doe", "email": "john@example.com" },
    { "first_name": "Jane", "last_name": "Smith", "email": "jane@example.com" },
    { "first_name": "Bob", "last_name": "Johnson", "email": "bob@example.com" },
    { "first_name": "Alice", "last_name": "Brown", "email": "alice@example.com" }
  ]
  ```

- **paymentToken**: A placeholder for the payment token required to complete bookings. Replace with a valid token.
  ```json
  "paymentToken": "your_payment_token_here"
  ```

- **checkInterval**: The time interval (in milliseconds) between checks for available tee times. Default is set to 5 minutes.
  ```json
  "checkInterval": 300000
  ```

- **maxAttempts**: The maximum number of attempts to check for tee times before stopping the monitoring process.
  ```json
  "maxAttempts": 50
  ```

## Environment Variables

Tee Snatcher also relies on environment variables for API credentials, which should be set in `tee-snatcher/.env` or inherited from the monorepo configuration:

```plaintext
LIGHTSPEED_API_URL=https://api.chronogolf.com/v2
LIGHTSPEED_CLIENT_ID=your_client_id
LIGHTSPEED_CLIENT_SECRET=your_client_secret
```

Ensure these credentials are correctly configured to authenticate with the Chrono Golf API.

## Notes

- Make sure your API credentials and payment token are valid and have the necessary permissions to book tee times.
- The configuration settings directly impact how Tee Snatcher monitors and books tee times, so ensure they are accurate and up-to-date before starting the tool.

## License

This project is licensed under the ISC License - see the [LICENSE](../../license.md) file for details.
