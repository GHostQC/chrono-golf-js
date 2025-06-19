# Tee Snatcher

A Node.js tool to automatically monitor and book tee times for golf tournaments using the Chrono Golf API (Lightspeed Golf Partner V2 API). This tool is part of the `chrono-golf-js` monorepo.

## Purpose

Tee Snatcher helps golf enthusiasts and tournament organizers by continuously monitoring specified golf courses for available tee times on desired dates. When a suitable tee time is found, it automatically books the slot for the configured number of players.

## Setup

1. Ensure you have your API credentials set up in `tee-snatcher/.env` or in the parent monorepo's configuration.

2. Customize your tournament booking preferences by creating a `user-config.json` file in the `tee-snatcher` directory. Use the provided `user-config-template.json` as a starting point:

   ```bash
   cp user-config-template.json user-config.json
   ```

   Then edit `user-config.json` with your specific course IDs, dates, player information, and payment token.

## Usage

### Starting the Monitoring Process

To start monitoring for tee times and automatically book when available:

```bash
node src/index.js start
```

To start monitoring in dry-run mode (simulates booking without making API calls):

```bash
node src/index.js start --dry-run
```

From the root of the monorepo, you can use:

```bash
pnpm start:tee-snatcher
# For dry-run mode
pnpm start:tee-snatcher:dry-run
```

### Stopping the Monitoring Process

To stop the monitoring process:

```bash
node src/index.js stop
```

From the root of the monorepo:

```bash
pnpm stop:tee-snatcher
```

### Configuration

The configuration file `user-config.json` allows you to specify:
- Courses to monitor (by course ID)
- Dates to check for availability
- Preferred time range for tee times
- Number of players and their information for booking
- Payment token for completing bookings
- Monitoring interval and maximum attempts

### How It Works

1. **Initialization**: Tee Snatcher authenticates with the Chrono Golf API using the `chrono-golf-api` package.
2. **Monitoring**: It periodically checks configured courses for available tee times on specified dates within the desired time range.
3. **Booking**: When a suitable tee time is found (with enough spots for the configured number of players), it attempts to book the slot using the provided player information and payment token.
4. **Completion**: If booking is successful, monitoring stops. If unsuccessful, it continues until the maximum number of attempts is reached.

## Notes

- Ensure your API credentials and payment token are valid and have the necessary permissions to book tee times.
- The tool will stop monitoring after reaching the maximum attempts configured or after a successful booking.
- You can interrupt the process at any time with `Ctrl+C`, which will gracefully stop monitoring.

## License

This project is licensed under the ISC License - see the [LICENSE](../LICENSE) file for details.
