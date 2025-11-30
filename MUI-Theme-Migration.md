# MUI-Theme v2 Migration Guide

## Overview

This guide provides step-by-step instructions for migrating the marvel-heroes repository to use @j-meira/mui-theme v2.0.x, React 19, MUI Core v7, and Vite 7.

## Breaking Changes

### 1. MUI Core v7 Upgrade

- **MUI Grid v2 is now the default** - Old Grid props (`xs`, `md`, `lg`, `xl`) have been removed
- All Grid components must use the new `size` prop with an object or single value
- **DatePickers updated to v8.19.0** - Breaking changes in the MUI X Date Pickers API

### 2. React 19 Compatibility

- **Stricter prop validation** - Invalid DOM props will cause warnings/errors
- **Enhanced type safety** - TypeScript types are more strict
- **Updated prop handling** - Some props that worked in React 18 are no longer valid

### 3. Vite 7

- **New build configuration** - Updated build optimizations
- **Updated plugin API** - Some plugins may need updates
- **Dependency updates** - All Vite-related packages need updating

## Migration Steps

### Step 1: Update Dependencies

```bash
# Update mui-theme to v2
pnpm update @j-meira/mui-theme@latest

# Update React to v19
pnpm add react@^19.0.0 react-dom@^19.0.0

# Update MUI packages (if using directly)
pnpm add @mui/material@^7.3.5 @mui/x-date-pickers@^8.19.0

# Update Vite to v7
pnpm add -D vite@^7.0.0 @vitejs/plugin-react@latest

# Update TypeScript types
pnpm add -D @types/react@^19.0.0 @types/react-dom@^19.0.0

# Install all dependencies
pnpm install
```

### Step 2: Fix MUI Grid Props

Replace old Grid props with the new `size` prop:

#### Multiple breakpoints:
```typescript
// ❌ Before (v1)
<Grid xs={12} md={6} lg={4}>
  <Component />
</Grid>

// ✅ After (v2)
<Grid size={{ xs: 12, md: 6, lg: 4 }}>
  <Component />
</Grid>
```

#### Single size for all breakpoints:
```typescript
// ❌ Before (v1)
<Grid xs={12}>
  <Component />
</Grid>

// ✅ After (v2)
<Grid size={12}>
  <Component />
</Grid>
```

#### Nested Grid with spacing:
```typescript
// ✅ Still works the same
<Grid container spacing={2}>
  <Grid size={{ xs: 12, md: 6 }}>
    <Component />
  </Grid>
  <Grid size={{ xs: 12, md: 6 }}>
    <Component />
  </Grid>
</Grid>
```

### Step 3: Update DatePicker Usage

The DatePicker component API from @j-meira/mui-theme remains the same, but internal MUI X Date Pickers changes may affect custom implementations:

```typescript
import { DatePicker } from '@j-meira/mui-theme';

// ✅ Still works - no changes needed for basic usage
<DatePicker
  label="Select Date"
  value={date}
  onChange={handleChange}
/>
```

**Note:** If you have custom DatePicker implementations or use MUI Date Pickers directly, review the [MUI X Date Pickers v8 migration guide](https://mui.com/x/migration/migration-pickers-v7/).

### Step 4: Remove Invalid DOM Props

React 19 has stricter prop validation. Remove or rename custom props that conflict with DOM attributes:

```typescript
// ❌ Before (causes React 19 warnings)
<input action="/submit" searchChange={handler} />

// ✅ After
<form action="/submit">
  <input onChange={handler} />
</form>

// ❌ Before
<div action="something" />

// ✅ After
<div data-action="something" />
```

### Step 5: Update Vite Configuration

Update your `vite.config.ts` for Vite 7 compatibility:

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react({
      // React 19 configuration
      babel: {
        plugins: []
      }
    })
  ],
  // Vite 7 optimizations
  build: {
    target: 'esnext',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          mui: ['@mui/material'],
          'mui-theme': ['@j-meira/mui-theme']
        }
      }
    }
  },
  // Optional: Add if you have path aliases
  resolve: {
    alias: {
      // Your aliases here
    }
  }
})
```

### Step 6: Update Docker Configuration (if applicable)

Ensure your Dockerfile uses a Node.js version compatible with React 19:

```dockerfile
# Use Node.js 20 or later
FROM node:20-alpine

WORKDIR /app

COPY package*.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install

COPY . .

RUN pnpm build

EXPOSE 3000
CMD ["pnpm", "preview"]
```

### Step 7: Run Tests and Build

```bash
# Check for TypeScript errors
pnpm tsc --noEmit

# Run linting
pnpm lint

# Run tests (if available)
pnpm test

# Build production bundle
pnpm build

# Test dev server
pnpm dev
```

## Component-Specific Changes

### ✅ No Breaking Changes Required:

All these components from @j-meira/mui-theme work without changes:
- **Buttons**: Button, ButtonIcon, ButtonMenu, etc.
- **DataTable**: All DataTable components and variations
- **Inputs**: Input, CheckBox, Currency, DatePicker, FileUpload, Masked, Password, Select, Switch, TextArea
- **Search**: SearchGeneric, SearchRequest
- **Layout**: Header, SideBar, PopUp, Dialog
- **Hooks**: useCookies, useToast, useDebounce, useLocalStorage, etc.
- **Providers**: MultiProvider

### ⚠️ Internal Updates Only:

These have internal optimizations but no API changes:
- **DatePicker**: Updated to MUI X Date Pickers v8 (API unchanged)
- **SearchGeneric/SearchRequest**: Code optimizations (no API changes)

## Quick Search Commands

Use these commands to find code that needs updating:

```bash
# Find all Grid components with old props
grep -r "Grid.*xs=" src/ --include="*.tsx" --include="*.jsx"
grep -r "Grid.*md=" src/ --include="*.tsx" --include="*.jsx"
grep -r "Grid.*lg=" src/ --include="*.tsx" --include="*.jsx"
grep -r "Grid.*xl=" src/ --include="*.tsx" --include="*.jsx"

# Find potential invalid props
grep -r 'action=' src/ --include="*.tsx" --include="*.jsx"
grep -r 'searchChange=' src/ --include="*.tsx" --include="*.jsx"

# Count Grid components to migrate
grep -rc "Grid.*xs=" src/ | grep -v ":0$"
```

## Rollback Plan

If you need to rollback:

```bash
# Revert to previous versions
pnpm add @j-meira/mui-theme@^1.0.0 react@^18.0.0 react-dom@^18.0.0

# Or checkout previous commit
git checkout <previous-commit-sha>

# Or revert the migration branch
git revert <commit-range>
```

## Support Resources

- [MUI v7 Migration Guide](https://mui.com/material-ui/migration/migration-v6/)
- [React 19 Upgrade Guide](https://react.dev/blog/2024/04/25/react-19-upgrade-guide)
- [Vite 7 Release Notes](https://vitejs.dev/)
- [@j-meira/mui-theme Documentation](https://github.com/J-Meira/mui-theme)

## Troubleshooting

### Common Issues

**Issue**: TypeScript errors about Grid props
```
Property 'xs' does not exist on type 'GridProps'
```
**Solution**: Replace `xs`, `md`, `lg`, `xl` props with `size={{ xs: 12, md: 6 }}`

---

**Issue**: React warnings about invalid DOM props
```
Warning: React does not recognize the `action` prop on a DOM element
```
**Solution**: Remove the prop or rename it with `data-` prefix (e.g., `data-action`)

---

**Issue**: Vite build errors
```
Failed to resolve entry for package
```
**Solution**: Clear node_modules and reinstall: `rm -rf node_modules pnpm-lock.yaml && pnpm install`

---

**Issue**: DatePicker not working
```
DatePicker format error
```
**Solution**: Check that you're using the DatePicker from @j-meira/mui-theme, not directly from MUI

## Migration Checklist

Use this checklist to track your progress:

- [ ] Update @j-meira/mui-theme to v2.0.x
- [ ] Update React to v19
- [ ] Update MUI packages to v7
- [ ] Update Vite to v7
- [ ] Update TypeScript types
- [ ] Replace all Grid `xs`/`md`/`lg`/`xl` props with `size`
- [ ] Remove invalid DOM props
- [ ] Update Vite configuration
- [ ] Update Dockerfile (if applicable)
- [ ] Run TypeScript compiler check
- [ ] Run linting
- [ ] Run tests
- [ ] Build production bundle successfully
- [ ] Test in development environment
- [ ] Test all pages and routes
- [ ] Test responsive layouts (mobile, tablet, desktop)
- [ ] Test forms and data entry
- [ ] Test date pickers
- [ ] Test data tables
- [ ] Deploy to staging
- [ ] QA testing in staging
- [ ] Update documentation
- [ ] Deploy to production
- [ ] Monitor for errors

---

**Last Updated**: 2025-11-30  
**Version**: 2.0.0 Migration Guide