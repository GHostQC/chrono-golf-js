# Chrono Golf JS

A monorepo containing Node.js tools and libraries for interacting with the Lightspeed Golf Partner V2 API (also known as Chrono Golf API). This repository hosts two main packages designed to streamline golf course management and tournament booking processes.

## Disclaimer

This project creation has been assisted by AI

## Overview

`chrono-golf-js` is structured as a pnpm monorepo, providing a cohesive environment for multiple related packages:

- **chrono-golf-api**: A comprehensive Node.js client for the Lightspeed Golf Partner V2 API, offering functionality to manage courses, tee times, bookings, and player information.
- **tee-snatcher**: A specialized tool built on top of `chrono-golf-api` to automatically monitor and book tee times for golf tournaments based on user-defined criteria.

## Installation

To set up the monorepo and its packages, you'll need pnpm. If you don't have pnpm installed, you can install it via npm:

```bash
npm install -g pnpm
```

Then, clone this repository and install dependencies:

```bash
git clone <repository-url>
cd chrono-golf-js
pnpm install
```

## Packages

### chrono-golf-api

A robust API client for interacting with the Chrono Golf API. It handles authentication and provides methods for:

- Listing and retrieving details about golf courses
- Searching and booking tee times
- Managing player information and bookings

#### Setup

Configure your API credentials in `chrono-golf-api/.env`:

```plaintext
LIGHTSPEED_API_URL=https://api.chronogolf.com/v2
LIGHTSPEED_CLIENT_ID=your_client_id
LIGHTSPEED_CLIENT_SECRET=your_client_secret
```

#### Usage

```javascript
const chronoGolf = require('chrono-golf-api');

// Example: Get a list of courses
async function getCourses() {
  try {
    const coursesResponse = await chronoGolf.getCourses({ page: 1, per_page: 10 });
    console.log(coursesResponse.courses);
  } catch (error) {
    console.error('Error fetching courses:', error.message);
  }
}

getCourses();
```

For detailed usage instructions and API documentation, refer to the [chrono-golf-api README](chrono-golf-api/README.md).

### tee-snatcher

A utility for automating the booking of golf tournaments by monitoring available tee times and booking them when criteria are met. It leverages `chrono-golf-api` for API interactions.

#### Setup

1. Ensure API credentials are set in `tee-snatcher/.env` or inherited from the monorepo configuration.
2. Customize booking preferences by creating a `user-config.json` file in the `tee-snatcher` directory:

   ```bash
   cd tee-snatcher
   cp user-config-template.json user-config.json
   ```

   Edit `user-config.json` to specify course IDs, dates, player information, and payment details.

#### Usage

Start monitoring and automatic booking from the root of the monorepo:

```bash
pnpm start:tee-snatcher
```

Start monitoring in dry-run mode (simulates booking without making API calls) from the root:

```bash
pnpm start:tee-snatcher:dry-run
```

Alternatively, from the `tee-snatcher` directory:

```bash
cd tee-snatcher
node src/index.js start
# For dry-run mode
node src/index.js start --dry-run
```

Stop monitoring from the root of the monorepo:

```bash
pnpm stop:tee-snatcher
```

Alternatively, from the `tee-snatcher` directory:

```bash
node src/index.js stop
```

For complete setup and usage instructions, see the [tee-snatcher README](tee-snatcher/README.md).

## Monorepo Structure

```plaintext
chrono-golf-js/
├── chrono-golf-api/          # API client package
│   ├── src/                  # Source code for API interactions
│   └── README.md             # API client documentation
├── tee-snatcher/             # Tournament booking automation tool
│   ├── src/                  # Source code for monitoring and booking
│   ├── user-config-template.json  # Template for user configuration
│   └── README.md             # Tee Snatcher documentation
├── pnpm-workspace.yaml       # Monorepo workspace configuration
└── README.md                 # This file
```

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests for improvements to either package. Ensure you follow the coding standards and include tests where applicable.

## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.
