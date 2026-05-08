# Project State: Curtains

**Status:** Project Initialized | **Current Phase:** Planning

## Project Reference

See: `.planning/PROJECT.md` (updated 2026-05-08)

**Core value:** Thu thập lead chất lượng từ khách hàng quan tâm, với tính giá realtime giúp khách hiểu rõ chi phí

**Current focus:** Phase 1 - Admin Dashboard

## Execution Timeline

- **Phase 1 (Admin Dashboard):** Weeks 1-5 | **39 requirements**
- **Phase 2 (Platform Portal):** Weeks 5-8 | **21 requirements**
- **Phase 3 (Blog & SEO):** Weeks 8-11 | **4 requirements**
- **Total:** ~11 weeks (2.5 months)

## Codebase Map

See: `.planning/codebase/` (updated 2026-05-08)

- **STACK.md**: Next.js, Supabase, TailwindCSS, React Hook Form, Zod
- **ARCHITECTURE.md**: App Router structure, API routes, Supabase integration
- **STRUCTURE.md**: src/ layout - app/, components/, lib/, types/, etc.
- **CONVENTIONS.md**: Code style, error handling patterns
- **TESTING.md**: Vitest, React Testing Library setup
- **INTEGRATIONS.md**: Supabase Auth, Resend/SendGrid for email
- **CONCERNS.md**: Performance, security, technical debt notes

## Configuration

See: `.planning/config.json`

- **Mode:** Interactive (manual approvals at gates)
- **Granularity:** Standard (5-8 phases, 3-5 plans each)
- **Execution:** Parallel (independent plans run simultaneously)
- **Git Tracking:** Yes (planning docs tracked in version control)
- **Model Profile:** Balanced (Sonnet for most agents)
- **Workflow Agents:**
  - Research: Yes (domain investigation)
  - Plan Check: Yes (verify plans achieve goals)
  - Verifier: Yes (confirm deliverables match phase goals)

## Next Steps

1. Discuss Phase 1 (Admin Dashboard) context and approach → `/gsd-discuss-phase 1`
2. Create detailed phase plan → `/gsd-plan-phase 1`
3. Execute Phase 1 → `/gsd-execute-phase 1`

---

*State initialized: 2026-05-08*
