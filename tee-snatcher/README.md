# Tee Snatcher

A tool to monitor and snatch available tee times using the Chrono Golf API.

## Installation

### Using Docker

To build and run `tee-snatcher` using Docker, follow these steps:

1. **Build the Docker Image**:
   From the root of the `chrono-golf-js` workspace, run:
   ```
   docker build -t tee-snatcher -f tee-snatcher/Dockerfile .
   ```

2. **Run the Docker Container**:
   After building the image, you can run a container with:
   ```
   docker run -it --rm -v $(pwd)/tee-snatcher/user-config.json:/app/tee-snatcher/user-config.json tee-snatcher
   ```
   Replace `user-config.json` with the path to your configuration file if it's different. The `-v` flag mounts your configuration file into the container.

3. **Environment Variables**:
   If your configuration relies on environment variables, you might need to pass them to the container using the `-e` flag or an environment file.

## Usage

- **Start Monitoring**: Run `pnpm start` (or use the Docker command above) to start monitoring tee times.
- **Dry Run**: Use `pnpm start:dry-run` to simulate without actually booking.
- **Stop Monitoring**: Run `pnpm stop` to stop the monitoring process.

## Configuration

Edit `user-config.json` to set up your monitoring preferences, API credentials, and notification settings. Refer to `user-config-template.json` for an example configuration.

## Development

- **Testing**: Run `pnpm test` to execute the test suite.
- **Dependencies**: This project depends on `chrono-golf-api` from the workspace.

## License

ISC
