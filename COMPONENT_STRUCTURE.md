# Codebase Structure

This document outlines the improved component organization for the Blitzs project.

## 📁 Directory Structure

```
src/
├── components/
│   ├── landing/           # Landing page specific components
│   │   ├── LandingNavbar.tsx
│   │   ├── HeroSection.tsx
│   │   ├── FeaturesSection.tsx
│   │   ├── ProjectsSection.tsx
│   │   ├── TestimonialsSection.tsx
│   │   ├── CTASection.tsx
│   │   ├── ContactSection.tsx
│   │   ├── Footer.tsx
│   │   └── index.ts       # Barrel export for clean imports
│   │
│   ├── shared/            # Shared reusable components
│   │   ├── ScrollProgress.tsx
│   │   └── index.ts       # Barrel export for clean imports
│   │
│   ├── ui/                # Shadcn UI components
│   ├── layout/            # Layout components (Navbar, Footer, etc.)
│   ├── auth/              # Authentication components
│   └── admin/             # Admin-specific components
│
├── pages/                 # Route components
├── services/              # API and service layers
├── hooks/                 # Custom React hooks
├── contexts/              # React Context providers
├── lib/                   # Utility libraries
├── utils/                 # Utility functions
└── integrations/          # External integrations
```

## 🧩 Component Organization

### Landing Page Components (`components/landing/`)

Modularized landing page components for better maintainability:

- **LandingNavbar**: Fixed navigation bar with mobile menu support
- **HeroSection**: Main hero section with animations
- **FeaturesSection**: Feature showcase grid
- **ProjectsSection**: Project cards with hover effects
- **TestimonialsSection**: Customer testimonials grid
- **CTASection**: Call-to-action with email signup
- **ContactSection**: Contact information section
- **Footer**: Page footer with social links

### Shared Components (`components/shared/`)

Reusable components that can be used across the application:

- **ScrollProgress**: Scroll progress indicator bar

### UI Components (`components/ui/`)

Shadcn UI component library - keep as-is for consistency.

### Layout Components (`components/layout/`)

Application-wide layout components:

- **Navbar**: Main app navigation (for authenticated/app pages)
- **Footer**: App footer
- **MainLayout**: Main layout wrapper
- **ThemeToggle**: Dark/light mode toggle

### Auth Components (`components/auth/`)

Authentication-related components:

- **ProtectedRoute**: Route protection wrapper

### Admin Components (`components/admin/`)

Admin-specific components:

- **QuickSetup**: Admin setup wizard

## 📦 Usage Examples

### Importing from landing components

```tsx
import { 
  LandingNavbar, 
  HeroSection, 
  FeaturesSection 
} from '@/components/landing';

export default function Page() {
  return (
    <>
      <LandingNavbar mobileMenuOpen={false} setMobileMenuOpen={() => {}} />
      <HeroSection 
        translateY={someValue} 
        opacity={someValue} 
        scale={someValue} 
        blur={someValue} 
      />
    </>
  );
}
```

### Importing from shared components

```tsx
import { ScrollProgress } from '@/components/shared';

export default function App() {
  return (
    <>
      {/* Your content */}
      <ScrollProgress scrollProgress={0.5} />
    </>
  );
}
```

## 🎯 Benefits of This Structure

1. **Separation of Concerns**: Each component has a single, well-defined purpose
2. **Reusability**: Shared components can be used anywhere in the app
3. **Maintainability**: Easier to find and update specific functionality
4. **Scalability**: Easy to add new features or components
5. **Clean Imports**: Barrel exports allow importing from a single path
6. **Type Safety**: TypeScript interfaces are defined and exported properly

## 🔄 Component Props

All components use TypeScript for type safety. Key props for landing page components:

### HeroSection
- `translateY`: Motion value for vertical parallax
- `opacity`: Motion value for fade effect
- `scale`: Motion value for zoom effect
- `blur`: Motion value for blur effect

### FeaturesSection
- `features`: Array of feature objects with icon, title, description, gradients

### ProjectsSection
- `projects`: Array of project objects with title, description, tags, gradients

### TestimonialsSection
- `testimonials`: Array of testimonial objects with name, role, content, avatar, gradient

### CTASection
- No props required (self-contained)

### ContactSection
- No props required (self-contained)

### Footer
- No props required (self-contained)

## 🚀 Adding New Components

### Landing Page Component

1. Create the component in `src/components/landing/`
2. Define TypeScript interfaces for props
3. Export from `src/components/landing/index.ts`
4. Import and use in your page

```typescript
// src/components/landing/NewSection.tsx
export const NewSection = () => {
  return <div>New section content</div>;
};

// src/components/landing/index.ts
export { NewSection } from './NewSection';
```

### Shared Component

1. Create the component in `src/components/shared/`
2. Define TypeScript interfaces for props
3. Export from `src/components/shared/index.ts`
4. Use anywhere in the app

```typescript
// src/components/shared/NewComponent.tsx
interface NewComponentProps {
  value: string;
}

export const NewComponent = ({ value }: NewComponentProps) => {
  return <div>{value}</div>;
};

// src/components/shared/index.ts
export { NewComponent } from './NewComponent';
```

## 📝 Best Practices

1. **Keep components small**: Each component should focus on one responsibility
2. **Use TypeScript**: Define proper interfaces for all props
3. **Export from index**: Always export components from the folder's `index.ts`
4. **Use barrel exports**: Export multiple components from `index.ts` for clean imports
5. **Separate concerns**: Landing components stay in `landing/`, shared components in `shared/`
6. **Document props**: Add JSDoc comments for complex component props
7. **Follow naming conventions**: Use PascalCase for component files

## 🎨 Styling

- Use Tailwind CSS for styling
- Follow the existing color scheme (indigo, purple, pink gradients)
- Use backdrop-blur for glass-morphism effects
- Use motion/framer-motion for animations
- Maintain consistent spacing and sizing

## 🔧 Future Improvements

Consider adding:

1. **Storybook**: Component documentation and testing
2. **Component tests**: Unit tests for components
3. **Loading states**: Skeleton components for loading
4. **Error boundaries**: Error handling for components
5. **Performance optimization**: Memo components where needed
6. **Accessibility**: ARIA labels and keyboard navigation

---

Last updated: 2024
