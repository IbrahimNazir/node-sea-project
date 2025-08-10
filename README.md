# Node.js SEA Example Project

This project demonstrates how to create a Single Executable Application (SEA) using Node.js v22.11, bundling a simple Express server into a standalone .exe file for Windows.

## Project Structure

```
node-sea-project/
├── src/
│   └── server.js       # Main application entry point
├── build-sea.js        # Script to create SEA executable
├── package.json        # Project configuration and dependencies
├── sea-config.json     # SEA configuration file
└── README.md           # Project documentation
```

## Prerequisites

- Node.js v22.11
- npm (Node Package Manager)
- Windows operating system
- Windows SDK (optional, for signtool)

## Setup Instructions

1. **Install dependencies**:
   ```bash
   npm i
   ```

2. **Build the executable**:
   ```bash
   npm run build
   ```

3. **Run the executable**:
   After the build, find the `hello.exe` in the `dist` directory. Run it:
   ```bash
   .\dist\hello.exe Ibrahim
   ```
   This starts the Express server, and you can access it at `http://localhost:3000`. The server will respond with "Hello, Ibrahim!" if you provided "Ibrahim" as an argument.

## References:
[Node.js SEA documentation](https://nodejs.org/api/single-executable-applications.html).