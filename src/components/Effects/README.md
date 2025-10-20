# Dark Techno Noir Effects

This component adds a cyberpunk-inspired dark techno noir aesthetic to the application. It creates multiple layered visual effects including:

## Key Features

### 1. Digital Grid

- Subtle blue-tinted grid overlay
- Gradually fades in and out to create depth
- Creates a virtual space feel

### 2. Circuit Pattern

- Subtle electronic circuit pattern in the background
- Low opacity with occasional pulse effect
- Adds a technological atmosphere

### 3. Dark Noir Vignette

- Darkened edges for a cinematic noir look
- Focuses attention to the center of the screen
- Creates depth and dimension

### 4. Data Lines

- Animated horizontal and vertical light beams
- Random positions and timing to simulate data transfer
- Creates motion and cyberpunk aesthetic

### 5. Digital Noise

- Subtle noise texture overlay
- Simulates old screen/digital distortion
- Adds character and grit to the interface

### 6. Random Glitch Effect

- Occasional screen glitch animation
- Simulates technical instability
- Adds a dystopian digital feel

## Implementation Details

The effects are layered with careful z-index management to ensure they complement rather than overpower the interface. Each effect has:

- CSS-only animations for performance
- Low opacity to maintain readability
- Responsive design adjustments
- Non-intrusive positioning (all pointer-events disabled)

## Usage

Simply include the `<DarkTechnoEffects />` component in your app layout. All effects are contained and don't interfere with other UI elements.

```jsx
import DarkTechnoEffects from "./components/Effects/DarkTechnoEffects";

// In your component
<>
  <DarkTechnoEffects />
  {/* Rest of your UI */}
</>;
```
