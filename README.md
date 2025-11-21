# Timeline of the Future

An interactive timeline exploring how the concept of "future" evolved from the first life forms to the algorithmic age.

## Features

- 17 distinct eras spanning from pre-life to the present day
- Smooth animations and transitions
- Custom visualizations for each era
- Auto-play functionality
- **Immersive audio system**: Voice-over narration, background music, and ambient sounds
- Mute/unmute toggle for audio control
- Fully responsive design
- Optimized for iframe embedding

## Development

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

```bash
npm install
```

### Running Locally

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

### Building for Production

```bash
npm run build
```

This creates an optimized production build in the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

## Audio System

The timeline includes an immersive 3-layer audio system:

### Audio Layers

1. **Background Music** (`public/audio/music/background.mp3`)
   - Continuous atmospheric music that loops throughout
   - Volume: 20% (subtle, non-intrusive)
   - Should be ~2-5 minutes long, seamlessly loopable

2. **Voice-Over Narration** (`public/audio/voiceovers/era-0.mp3` through `era-16.mp3`)
   - Narrates the story/insight for each era
   - Plays once when entering each era
   - Volume: 80% (primary audio)
   - Recommended: 30-60 seconds per era

3. **Ambient Soundscapes** (`public/audio/ambient/era-0.mp3` through `era-16.mp3`)
   - Era-specific atmospheric sounds (e.g., waves for tidal era, machinery for industrial era)
   - Loops while viewing each era
   - Fades in/out smoothly on era transitions
   - Volume: 30% (background atmosphere)
   - Recommended: 20-40 seconds, seamlessly loopable

### Adding Your Audio Files

1. Create your audio files (MP3 format recommended)
2. Place them in the appropriate folders:
   ```
   public/audio/
   ├── music/background.mp3
   ├── voiceovers/
   │   ├── era-0.mp3
   │   ├── era-1.mp3
   │   └── ... (through era-16.mp3)
   └── ambient/
       ├── era-0.mp3
       ├── era-1.mp3
       └── ... (through era-16.mp3)
   ```
3. See `public/audio/README.md` for detailed specifications
4. Deploy: `npm run deploy`

### Audio Controls

- **Mute Button**: Red speaker icon in the control bar toggles all audio on/off
- **Missing Files**: The app gracefully handles missing audio files - if a file doesn't exist, it simply won't play
- **Browser Autoplay**: Some browsers block autoplay until user interaction. Background music will start after the first click.

## Deployment to GitHub Pages

### Initial Setup

1. Make sure your repository is named `timelineofthefuture` or update the `base` in `vite.config.js` to match your repo name

2. Commit and push all changes to GitHub:
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

### Deploy

```bash
npm run deploy
```

This will:
1. Build the production version
2. Push the `dist` folder to the `gh-pages` branch
3. GitHub will automatically serve it

### Accessing Your Deployed Site

After deployment, your site will be available at:
```
https://[your-username].github.io/timelineofthefuture/
```

## Embedding in Ghost Pro

Once deployed, you can embed it in your Ghost Pro site using an HTML card with an iframe:

```html
<iframe
  src="https://[your-username].github.io/timelineofthefuture/"
  width="100%"
  height="800px"
  frameborder="0"
  style="border: none; overflow: hidden;"
  allowfullscreen>
</iframe>
```

Adjust the height value as needed for your layout.

## Animation Fixes

The following animation improvements were made:

1. **Moved animations to Tailwind config** - All keyframe animations are now properly defined in `tailwind.config.js`
2. **Fixed migration animation** - Proper duration and timing with inline style overrides
3. **Added unique keys** - All mapped elements have unique keys to prevent React re-render flickering
4. **Memoized particles** - Particle positions are generated once and memoized to prevent repositioning
5. **Smooth transitions** - Proper transition classes and durations for era changes
6. **Added fadeIn animation** - New fade-in effect for smoother era transitions

## Technologies Used

- React 18
- Vite
- Tailwind CSS
- Lucide React (icons)
- gh-pages (deployment)

## License

MIT
