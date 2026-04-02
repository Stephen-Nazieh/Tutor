# TutorMe Design System

A premium, cohesive UI system featuring three distinct themes with consistent design language.

## 🎨 Three Themes

### 1. Aura (Default) - Warm Neutral
**Emotional Tone:** Calm, professional, approachable

- **Primary Background:** #EDEDED
- **Section Background:** #DFDFDF  
- **Card Surface:** #D4D4D3
- **Primary Accent (Teal):** #4FD1C5
- **Secondary Accent (Blue):** #1D4ED8
- **Warm Accent:** #CABDB4
- **Primary Text:** #3F3D39
- **Secondary Text:** #7F7C77

### 2. Nimbus - Cool Slate
**Emotional Tone:** Professional, modern, tech-forward

- **Primary Background:** #F1F3F5
- **Section Background:** #E9ECEF
- **Card Surface:** #DEE2E6
- **Primary Accent (Teal):** #4FD1C5
- **Secondary Accent (Blue):** #3B82F6
- **Cool Accent:** #ADB5BD
- **Primary Text:** #212529
- **Secondary Text:** #6C757D

### 3. Sahara - Warm Sand
**Emotional Tone:** Warm, inviting, organic

- **Primary Background:** #F5F1EB
- **Section Background:** #EDE7DE
- **Card Surface:** #E5DDD2
- **Primary Accent (Teal):** #3CBDB2
- **Secondary Accent (Amber):** #D97706
- **Warm Accent:** #D4C4B0
- **Primary Text:** #3D3830
- **Secondary Text:** #7A7165

## 🌙 Dark Mode

All themes include carefully crafted dark modes that:
- Use deep neutral greys (NOT pure black)
- Preserve the same emotional tone as light mode
- Keep teal and blue accents consistent but slightly softened
- Maintain strong readability and contrast

## 🧱 Depth & Elevation System

Cards and surfaces "float in space" using a layered elevation system:

```
elevation-1: Subtle, for grouped content
elevation-2: Default card elevation
elevation-3: Elevated cards, modals
elevation-4: Floating panels, dropdowns
elevation-5: Highest elevation, dialogs
```

### CSS Classes

```css
/* Elevation levels */
.shadow-elevation-1    /* Subtle shadow */
.shadow-elevation-2    /* Default card */
.shadow-elevation-3    /* Elevated */
.shadow-elevation-4    /* Floating panel */
.shadow-elevation-5    /* Modal/dialog */

/* Soft shadows */
.shadow-soft           /* Soft diffused */
.shadow-soft-lg        /* Large soft */
.shadow-soft-xl        /* Extra large soft */

/* Special effects */
.shadow-glow           /* Primary color glow */
.shadow-glow-subtle    /* Subtle glow */
.shadow-floating       /* Floating effect */

/* Interactive states */
.shadow-hover-lift     /* On hover */
.shadow-active-press   /* On active */
.shadow-focus-glow     /* On focus */
```

## 🧩 Components

### Button

```tsx
import { Button, IconButton, ButtonGroup } from "@/components/ui/button";

// Variants
<Button variant="default">Primary</Button>
<Button variant="gradient">Gradient</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="secondary-gradient">Secondary Gradient</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="muted">Muted</Button>
<Button variant="accent">Accent</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="link">Link</Button>
<Button variant="soft">Soft</Button>
<Button variant="glass">Glass</Button>
<Button variant="floating">Floating</Button>

// Sizes
<Button size="xs">Extra Small</Button>
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="xl">Extra Large</Button>
<Button size="icon"><Icon /></Button>

// States
<Button isLoading>Loading</Button>
<Button leftIcon={<Icon />}>With Icon</Button>
<Button rightIcon={<Icon />}>With Icon</Button>
```

### Card

```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";

// Elevation levels
<Card elevation={1}>Low elevation</Card>
<Card elevation={2}>Default elevation</Card>
<Card elevation={3}>High elevation</Card>
<Card elevation={4}>Very high elevation</Card>
<Card elevation={5}>Highest elevation</Card>

// Interactive (with hover lift)
<Card interactive>Elevates on hover</Card>

// Variants
<Card variant="default">Default</Card>
<Card variant="elevated">Elevated surface</Card>
<Card variant="outlined">Border only</Card>
<Card variant="ghost">Transparent</Card>
<Card variant="glass">Glass effect</Card>
<Card variant="floating">Floating card</Card>
```

### Input

```tsx
import { Input, Textarea, InputGroup } from "@/components/ui/input";

// Variants
<Input variant="default" />
<Input variant="filled" />
<Input variant="outlined" />
<Input variant="ghost" />
<Input variant="elevated" />

// States
<Input state="error" errorMessage="Invalid input" />
<Input state="success" />
<Input state="warning" />

// With icons
<Input leftIcon={<SearchIcon />} placeholder="Search..." />
<Input rightIcon={<CheckIcon />} />

// Sizes
<Input size="sm" />
<Input size="default" />
<Input size="lg" />
<Input size="xl" />
```

### Tabs

```tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

// Variants
<TabsList variant="default">
<TabsList variant="pills">
<TabsList variant="underline">
<TabsList variant="buttons">
<TabsList variant="floating">

// Full width
<TabsList fullWidth>
  <TabsTrigger fullWidth>Tab 1</TabsTrigger>
  <TabsTrigger fullWidth>Tab 2</TabsTrigger>
</TabsList>
```

### Dialog

```tsx
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";

// Sizes
<DialogContent size="sm">
<DialogContent size="default">
<DialogContent size="lg">
<DialogContent size="xl">
<DialogContent size="2xl">
<DialogContent size="full">

// Positions
<DialogContent position="center">
<DialogContent position="top">
<DialogContent position="bottom">
```

## 🎯 Theme Provider

### Setup

```tsx
import { ThemeProvider } from "@/components/ui/theme-provider";

// In your layout
<ThemeProvider defaultTheme="aura" defaultMode="system">
  {children}
</ThemeProvider>
```

### Usage

```tsx
import { useTheme, ThemeSwitcher, ModeToggle } from "@/components/ui/theme-provider";

// Get theme state
const { theme, mode, resolvedMode, setTheme, setMode, toggleMode, cycleTheme } = useTheme();

// Theme switcher dropdown
<ThemeSwitcher />

// Mode toggle button
<ModeToggle />

// Programmatic control
setTheme("nimbus");
setMode("dark");
toggleMode();
cycleTheme(); // Cycles through aura → nimbus → sahara
```

## 🌈 Gradients

### Background Gradients

```css
/* Primary gradient */
bg-gradient-primary      /* Teal gradient */
bg-gradient-secondary    /* Blue gradient */
bg-gradient-accent       /* Teal → Blue */
bg-gradient-surface      /* Surface gradient */
bg-gradient-card         /* Card gradient */
```

### Text Gradients

```css
text-gradient-primary    /* Primary color gradient text */
text-gradient-subtle     /* Neutral gradient text */
```

## ✨ Animations

### Fade Animations
```css
animate-fade-in
animate-fade-out
animate-fade-in-up
animate-fade-in-down
```

### Scale Animations
```css
animate-scale-in
animate-scale-out
animate-pop
```

### Slide Animations
```css
animate-slide-in-right
animate-slide-in-left
animate-slide-in-up
animate-slide-in-down
```

### Special Animations
```css
animate-float          /* Floating effect */
animate-float-subtle /* Subtle floating */
animate-pulse-soft   /* Soft pulse */
animate-glow-pulse   /* Glowing pulse */
animate-shimmer      /* Shimmer loading */
```

## 🎨 Utility Classes

### Elevation
```css
.elevation-1 through .elevation-5
.card-floating
.card-floating-interactive
```

### Glass Effect
```css
.glass
.glass-dark
```

### Gradient Surfaces
```css
.gradient-surface
.gradient-card
.gradient-primary-btn
.gradient-secondary-btn
```

### Interactive States
```css
.interactive
.interactive-lift
.focus-glow
```

### Section Styles
```css
.section-elevated
.section-card
```

## 📱 Responsive Design

- **Mobile-first approach**
- **Minimum width:** 320px
- **Touch targets:** 44px minimum
- **Safe area support:** For notched devices

## 🔤 Typography

- **Font Family:** Inter (with system fallbacks)
- **Chinese Support:** System fonts (PingFang, Microsoft YaHei)

### Hierarchy
- **H1:** text-4xl, font-semibold, tracking-tight
- **H2:** text-3xl, font-semibold, tracking-tight
- **H3:** text-2xl, font-semibold, tracking-tight
- **H4:** text-xl, font-semibold, tracking-tight
- **H5:** text-lg, font-semibold, tracking-tight
- **H6:** text-base, font-semibold, tracking-tight
- **Body:** text-sm, text-foreground
- **Secondary:** text-sm, text-muted-foreground

## 🎯 Best Practices

1. **Use elevation consistently** - Match elevation to content importance
2. **Reserve gradients** for primary actions and key cards
3. **Maintain spacing rhythm** - Use consistent padding (4, 6, 8, 10)
4. **Interactive elements** - Always provide hover and active states
5. **Dark mode** - Test all components in both light and dark modes
6. **Accessibility** - Maintain WCAG AA contrast ratios
7. **Mobile** - Ensure 44px minimum touch targets

## 🧪 Customization

### CSS Variables

All colors and shadows use CSS custom properties:

```css
:root {
  --background: ...;
  --foreground: ...;
  --primary: ...;
  --shadow-elevation-1: ...;
  /* etc */
}
```

Override these in your component or page for localized theming.

### Tailwind Config

Extended with:
- Custom colors (surface, divider, status)
- Custom shadows (elevation system)
- Custom animations
- Custom border radius
- Custom spacing
