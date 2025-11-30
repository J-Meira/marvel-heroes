# TODO List for MUI-Theme Migration

## Migration Steps
- [x] Update @j-meira/mui-theme to v2.0.x (v1.9.0 - latest available)
- [x] Update React to v19 (v19.2.0)
- [x] Update MUI packages to v7 (v7.3.5)
- [x] Update Vite to v7 (v7.2.4)
- [x] Update TypeScript types
- [x] Fix MUI Grid Props (all Grid2 → Grid with size prop)
- [x] Update DatePicker Usage (no changes needed - @j-meira/mui-theme handles it)
- [x] Remove Invalid DOM Props (verified - no invalid props found)
- [ ] Update Vite Configuration (current config works, optimization optional)
- [ ] Update Docker Configuration (Node 18 → Node 20+ recommended)
- [x] Run Tests and Build (build successful ✓)

## Testing
- [x] Check for TypeScript errors (no errors ✓)
- [x] Run linting (passing with warnings only ✓)
- [ ] Run all unit tests (no tests configured in project)

## Deployment
- [ ] Deploy to staging
- [ ] QA testing in staging
- [ ] Deploy to production

## Documentation
- [ ] Update README with migration instructions
- [ ] Ensure all documentation reflects the new setup
