# Audio Files

This folder contains all audio assets for the Timeline of the Future.

## Structure

### `music/`
- `background.mp3` - Continuous background music that loops throughout the experience

### `voiceovers/`
- `era-0.mp3` through `era-16.mp3` - Narrative voice-overs for each era
- These should narrate the story/insight for each timeline section
- Recommended: Mono, 64-96 kbps MP3, ~30-60 seconds each

### `ambient/`
- `era-0.mp3` through `era-16.mp3` - Ambient soundscapes for each era
- These loop while viewing each era (void sounds, ocean waves, machinery, etc.)
- Recommended: Stereo, 96-128 kbps MP3, ~20-40 seconds each (seamless loops)

## File Naming Convention

All files should be named according to their era ID:
- Era 0 (The Eternal Now): `era-0.mp3`
- Era 1 (The Circadian Loop): `era-1.mp3`
- ... and so on through era 16

## Audio Recommendations

- **Voice overs**: Clear, professional narration
- **Ambient sounds**: Subtle, atmospheric, not distracting
- **Background music**: Low volume, non-intrusive, helps set the mood
- **File sizes**: Keep each file under 2MB for faster loading

## Adding Your Files

1. Generate or record your audio files
2. Convert to MP3 format at the recommended bitrates
3. Name them according to the convention above
4. Place them in the appropriate folders
5. Run `npm run deploy` to update the live site

## Optional Files

If a file doesn't exist, that's okay! The audio system will gracefully handle missing files:
- No voice-over? The section will just show the text
- No ambient sound? Only the background music will play
- No background music? Only voice-overs and ambient sounds will play
