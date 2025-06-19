# Contributing to Chrono Golf JS

Thank you for your interest in contributing to Chrono Golf JS! This monorepo contains tools and libraries for interacting with the Lightspeed Golf Partner V2 API (Chrono Golf API), and we welcome contributions from the community to improve and expand its functionality.

## How Can I Contribute?

There are several ways you can contribute to this project:

- **Reporting Bugs**: If you encounter any issues or bugs, please open an issue on GitHub with a detailed description of the problem, including steps to reproduce it.
- **Suggesting Enhancements**: Have an idea for a new feature or improvement? Open an issue with the tag "enhancement" and describe your suggestion.
- **Code Contributions**: You can fork the repository, make changes, and submit a pull request. We appreciate contributions that address bugs, add features, or improve documentation.
- **Documentation**: Help improve project documentation by correcting typos, clarifying instructions, or adding examples. Documentation changes are as valuable as code contributions.
- **Testing**: Help test new features or bug fixes by checking out pull requests or pre-release versions and providing feedback.

## Development Setup

To set up the project for development:

1. **Clone the Repository**: Clone the `chrono-golf-js` repository to your local machine.
   ```bash
   git clone https://github.com/GHostQC/chrono-golf-js.git
   cd chrono-golf-js
   ```

2. **Install Dependencies**: Use pnpm to install the necessary dependencies for the monorepo.
   ```bash
   pnpm install
   ```

3. **Make Changes**: Navigate to the package you want to work on (`chrono-golf-api` or `tee-snatcher`), make your changes, and test them locally.

4. **Run Tests**: If applicable, ensure your changes pass any existing tests or add new tests to cover your contributions.
   ```bash
   pnpm test
   ```

## Coding Guidelines

We aim to maintain a high-quality, consistent codebase:

- **Follow Existing Style**: Match the coding style and conventions used in the existing codebase for consistency.
- **Comment Your Code**: Add comments to explain complex logic or functionality, especially in areas that might be confusing to other developers.
- **Modularize**: Keep code modular and reusable where possible, following the structure of the existing packages.
- **Include Tests**: For new features or bug fixes, include appropriate tests to ensure functionality and prevent regressions.

## Pull Request Process

1. **Create a Branch**: Create a branch with a descriptive name related to the issue or feature you're working on.
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Commit Your Changes**: Make your changes and commit them with meaningful commit messages.
   ```bash
   git commit -m "Add feature: description of your feature"
   ```

3. **Push to GitHub**: Push your branch to the repository.
   ```bash
   git push origin feature/your-feature-name
   ```

4. **Open a Pull Request**: Go to the GitHub repository, select your branch, and open a pull request. Provide a detailed description of your changes, referencing any related issues.

5. **Code Review**: Your pull request will be reviewed by maintainers. Address any feedback or requested changes by updating your branch and pushing the updates.

6. **Merge**: Once approved, your pull request will be merged into the main branch.

## Community

Join the community discussion or ask questions by opening issues on GitHub or reaching out through other channels if available.

## License

By contributing to Chrono Golf JS, you agree that your contributions will be licensed under the ISC License. See the [LICENSE](license.md) file for details.

Thank you for contributing to Chrono Golf JS and helping make it better!
