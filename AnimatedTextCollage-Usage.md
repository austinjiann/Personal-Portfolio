# AnimatedTextCollage Usage Guide

## Installation & Setup

1. **Import the component** in your main App or page:

```tsx
import AnimatedTextCollage from './AnimatedTextCollage';

function App() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <>
      {showIntro && (
        <AnimatedTextCollage 
          onAnimationComplete={() => setShowIntro(false)}
          animationDuration={2500} // Optional: customize duration (ms)
        />
      )}
      
      {/* Your main homepage content */}
      <div className="min-h-screen bg-gray-900 text-white">
        <h1>Welcome to my site!</h1>
        {/* Rest of your content */}
      </div>
    </>
  );
}
```

## Customization Options

### 1. Word List
Edit the `wordList` array in the component (line 29-34):
```tsx
const wordList = [
  'your', 'custom', 'words', 'here'
];
```

### 2. Animation Duration
Pass the `animationDuration` prop (default: 2500ms):
```tsx
<AnimatedTextCollage animationDuration={3000} />
```

### 3. Font Sizes
Modify the `sizeClasses` object (line 37-44) for different scales:
```tsx
const sizeClasses = {
  xs: 'text-xs sm:text-sm',
  // ... customize as needed
};
```

### 4. Positioning
Adjust the `getRandomPosition` function (line 47-58) for different layouts

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| onAnimationComplete | () => void | undefined | Callback when animation finishes |
| animationDuration | number | 2500 | Total animation duration in milliseconds |

## Dependencies

- React with TypeScript
- Tailwind CSS (must be configured in your project)
- No additional animation libraries required

## Responsive Design

The component automatically scales font sizes based on viewport:
- Mobile: Smaller font sizes
- Desktop: Larger font sizes
- Uses Tailwind's responsive prefixes (sm:, md:, lg:, xl:)