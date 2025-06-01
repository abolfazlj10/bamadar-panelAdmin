# Monorepo Project

This is a monorepo project containing a web application and an Electron desktop application.

## Project Structure

```
monorepo/
├── packages/
│   ├── web/        # React web application
│   └── electron/   # Electron desktop application
```

## Prerequisites

- Node.js (v16 or higher recommended)
- Yarn (v1.22 or higher)

## Getting Started

1. Clone the repository:
```bash
git clone [your-repo-url]
cd [your-repo-name]
```

2. Install dependencies:
```bash
yarn install
```

3. Start development servers:

For web application:
```bash
cd packages/web
yarn dev
```

For Electron application:
```bash
cd packages/electron
yarn dev
```

## Building

To build the web application:
```bash
cd packages/web
yarn build
```

To build the Electron application:
```bash
cd packages/electron
yarn build
```

## Development Guidelines

1. Always work on feature branches
2. Follow the commit message convention
3. Write tests for new features
4. Update documentation when needed

## Available Scripts

Each package has its own scripts that can be run from their respective directories:

### Web Package
- `yarn dev`: Start development server
- `yarn build`: Build for production
- `yarn test`: Run tests

### Electron Package
- `yarn dev`: Start development mode
- `yarn build`: Build desktop application
- `yarn package`: Create installable packages

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

[Your License] - see the LICENSE.md file for details 