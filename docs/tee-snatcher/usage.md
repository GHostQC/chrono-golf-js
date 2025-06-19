# Tee Snatcher - Usage

This page provides detailed instructions on how to use Tee Snatcher, a tool for automating the booking of golf tournaments using the Chrono Golf API. For an overview of Tee Snatcher, refer to the [Overview](../tee-snatcher/README.md) page, and for configuration details, see the [Configuration](../tee-snatcher/configuration.md) page.

## Starting the Monitoring Process

To start monitoring for tee times and automatically book when available slots are found, use the following command from the `tee-snatcher` directory:

```bash
node src/index.js start
```

If you want to test the monitoring and booking process without actually making API calls to book tee times (dry-run mode), use:

```bash
node src/index.js start --dry-run
```

Alternatively, you can start the process from the root of the monorepo using pnpm commands:

```bash
pnpm start:tee-snatcher
# For dry-run mode
pnpm start:tee-snatcher:dry-run
```

When started, Tee Snatcher will:
1. Authenticate with the Chrono Golf API using the credentials provided in your configuration.
2. Periodically check the specified courses for available tee times on the configured dates within the desired time range.
3. Attempt to book a tee time when a suitable slot is found (with enough spots for the configured number of players), using the provided player information and payment token.

## Stopping the Monitoring Process

To stop the monitoring process, use the following command from the `tee-snatcher` directory:

```bash
node src/index.js stop
```

Alternatively, from the root of the monorepo:

```bash
pnpm stop:tee-snatcher
```

This will gracefully terminate the monitoring process. You can also stop the process at any time by pressing `Ctrl+C` in the terminal where Tee Snatcher is running, which will also stop monitoring gracefully.

## How It Works

1. **Initialization**: Tee Snatcher authenticates with the Chrono Golf API using the `chrono-golf-api` package and the credentials provided in your environment configuration.
2. **Monitoring**: Based on the `checkInterval` setting in your `user-config.json`, it periodically checks configured courses for available tee times on specified dates within the desired time range.
3. **Booking**: When a suitable tee time is found (with enough spots for the configured number of players), it attempts to book the slot using the provided player information and payment token. In dry-run mode, this step is simulated without making actual API calls.
4. **Completion**: If booking is successful, monitoring stops. If unsuccessful, it continues until the maximum number of attempts (`maxAttempts` in `user-config.json`) is reached. If the maximum attempts are reached without a successful booking, the process stops.

## Notes

- Ensure your API credentials and payment token are valid and have the necessary permissions to book tee times before starting the monitoring process.
- The tool will stop monitoring after reaching the maximum attempts configured or after a successful booking.
- Dry-run mode is useful for testing your configuration and ensuring the monitoring logic works as expected without affecting real bookings.
- Logs are output to the console, providing information on the monitoring process, found tee times, and booking attempts. Check these logs for troubleshooting or to confirm the tool's operation.

## License

This project is licensed under the ISC License - see the [LICENSE](../../license.md) file for details.
