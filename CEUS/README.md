# CEUS Next.js Project

This directory contains the main Next.js application for the CEUS website.

## Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Set up Environment Variables**
   Create a `.env.local` file with your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

3. **Run Development Server**
   ```bash
   npm run dev
   ```

4. **Build for Production**
   ```bash
   npm run build
   ```

## Documentation

For comprehensive documentation on the project architecture, features, and contribution guidelines, please refer to the **[root README](../README.md)** and the **[docs/](../docs/)** directory.

## Supabase Integration

This project uses Supabase for database, authentication, and storage.

### Storage Setup
Site images are stored in a public bucket named `public-images`.

1. Run the migration: `scripts/migrations/create_public_images_bucket.sql`.
2. Sync local images (optional):
   ```bash
   set -a && source .env.local && set +a && node scripts/upload-public-images-to-supabase.mjs
   ```

### Admin Access
The admin panel is located at `/admin`. Authentication is handled via Supabase Auth.

---

**[Go to Root Documentation](../README.md)**
