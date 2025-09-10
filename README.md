# Dribbble-Style Search Dropdown

A modern, glassmorphic search dropdown component built with React, TypeScript, Tailwind CSS, and Framer Motion. This project replicates the sleek animation and design from the [Dribbble Search Results Animation](https://dribbble.com/shots/17399694-Search-Results-Animation).

## Features

### 🎨 Glassmorphic Design
- Backdrop blur effects with semi-transparent backgrounds
- Rounded corners and subtle drop shadows
- Modern, clean aesthetic inspired by Dribbble

### ⚡ Smooth Animations
- Framer Motion powered transitions
- Fade and slide animations for dropdown entry/exit
- Animated tab selection with moving underlines
- Smooth settings menu transitions

### 🔍 Advanced Search
- **Debounced search input** (500ms delay) for optimal performance
- **Throttled loading** (1s maximum) for infinite scroll
- Real-time filtering across different content types

### 📱 Responsive Tabs
- **All, Files, People, Chats** tabs with smooth transitions
- Hover effects and active state indicators
- Keyboard navigation support

### ⚙️ Settings Menu
- Toggle switches for filtering different content types
- Animated floating panel with backdrop blur
- Individual control over Files, People, and Chats visibility

### ♿ Accessibility
- Full keyboard navigation support
- ARIA labels and proper focus management
- Escape key handling for closing modals
- Outside click detection

## Component Structure

```
src/components/
├── SearchDropdown.tsx    # Main container component
├── SearchInput.tsx       # Search input with clear functionality
├── Tabs.tsx             # Tab navigation with settings gear
├── SettingsMenu.tsx     # Floating settings panel with toggles
├── GlassLoader.tsx      # Skeleton loading animation
└── ResultsList.tsx      # Results display with filtering
```

## Technologies Used

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for utility-first styling
- **Framer Motion** for smooth animations
- **Lucide React** for beautiful icons

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to `http://localhost:5173`

## Usage

The search dropdown automatically opens when you focus on the search input. You can:

- **Type to search** - Results are debounced for optimal performance
- **Switch tabs** - Filter between All, Files, People, and Chats
- **Open settings** - Click the gear icon to toggle content types
- **Clear search** - Click the X button or press Escape
- **Load more** - Click "Load More" for additional results

## Key Features Implementation

### Debounced Search
```typescript
useEffect(() => {
  const timer = setTimeout(() => {
    setDebouncedSearch(searchValue);
  }, 500);
  return () => clearTimeout(timer);
}, [searchValue]);
```

### Glassmorphic Styling
```css
bg-white/30 backdrop-blur-lg border border-white/30 rounded-lg shadow-lg
```

### Smooth Animations
```typescript
<motion.div
  initial={{ opacity: 0, y: -10, scale: 0.95 }}
  animate={{ opacity: 1, y: 0, scale: 1 }}
  exit={{ opacity: 0, y: -10, scale: 0.95 }}
  transition={{ duration: 0.2 }}
>
```

## Performance Optimizations

- **Debounced search input** prevents excessive API calls
- **Throttled loading** for smooth infinite scroll
- **Memoized callbacks** to prevent unnecessary re-renders
- **Efficient state management** with proper dependency arrays

## Browser Support

- Chrome 88+
- Firefox 87+
- Safari 14+
- Edge 88+

## License

MIT License - feel free to use this project for personal or commercial purposes.