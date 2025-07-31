# CorMemory

A digital sanctuary for your real-world memories. CorMemory helps you preserve and revisit life's meaningful moments through a beautiful, minimalist interface.

## Features

- Beautiful masonry grid layout
- Support for both portrait (3:4) and landscape (4:3) photos
- Location-based memory organization
- Clean, distraction-free interface
- Focused on real-world experiences

## Documentation

For detailed documentation, please see the [docs](./docs) directory.

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Supabase (Database & Authentication)
- React Context for state management

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- A Supabase account (free tier available)

### Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/CorMemory.git
cd CorMemory
```

2. Install dependencies:
```bash
npm install
```

3. Set up Supabase database:
   - Follow the detailed guide in [SUPABASE_SETUP.md](./SUPABASE_SETUP.md)
   - Create your Supabase project
   - Run the database migrations
   - Configure environment variables

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Database Setup

This project uses Supabase for data persistence. See [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) for complete setup instructions.

**Quick setup:**
1. Create a Supabase project
2. Copy `.env.local.example` to `.env.local`
3. Add your Supabase URL and API key
4. Run the database migration in Supabase SQL Editor

## Development

- Uses functional React components with TypeScript and hooks
- Follows Next.js App Router structure
- Implements Tailwind CSS for styling
- Follows semantic HTML practices
- Modular component architecture

## License

MIT 