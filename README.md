# Mamidi Niveditha — Portfolio

## Setup & Run

```bash
# Install dependencies (one time)
npm install

# Start dev server
npm run dev
```

Then open http://localhost:3000

## Add Your Photo

1. Put your photo in `client/public/photo.jpg`
2. In `client/src/components/Hero.tsx`, replace the placeholder div with:
   ```jsx
   <img src="/photo.jpg" alt="Niveditha" />
   ```

## Build for Production

```bash
npm run build
```
