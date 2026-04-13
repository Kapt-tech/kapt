---
title: "Kapt Project Governance & Context"
description: "Diretrizes primárias de governança, stack e comunicação para a IA."
type: "tech"
epic: "platform"
status: "approved"
---

## Gemini Skill: Kapt Project Governance & Context (v2.0)

## 1. Project Mission & Identity

Kapt is a **high-performance digital platform for the management, distribution, and monetization of official multisport event photography**. Evolving into a **DaaS (Data as a Service)** provider, it delivers hyper-segmented consumer insights based on performance and equipment usage to sports retailers and brands.

## 2. Technical Stack & AI Intelligence

- **Frontend:** Next.js (App Router), TypeScript, Tailwind CSS.
- **Backend:** Go (Golang) for high-concurrency API and data processing.
- **AI/ML Engine (Python):**
  - **Models:** YOLO for object/gear detection; DeepFace/FaceNet for facial recognition; PyTorch/TensorFlow for apparel segmentation.
  - **Orchestration:** n8n manages the pipeline between uploads, AI triggers, and notifications.
- **Infrastructure:** Docker, Portainer, Traefik/Nginx, Neon (PostgreSQL) + PostGIS.

## 3. Official Glossary (Strict Camel Case)

- `seeker`: The athlete/runner (end consumer).
- `registeredSeeker`: A returning athlete with saved biometrics and LGPD opt-in.
- `occurrence`: The sporting event/cobertura.
- `promoter`: The event organizer.
- `photographer`: The professional "Creator" supplying photos.
- `actionVolt`: Our Design System (Table Black #000000, Volt #CEFF00 accent).

## 4. Evolution Roadmap

- **Phase 1 (Current):** Infrastructure stabilization (Next.js + Go core, basic gallery, OTP auth).
- **Phase 2 (AI Integration):**
  - **AI-Driven Automated Tagging:**
    - **Facial Recognition:** High-precision identification of athletes across thousands of photos.
    - **Equipment & Brand Detection:** Automatic identification of footwear (running shoes), apparel, and gear (bikes, helmets, watches).
- **Phase 4 (DaaS Launch):** Predictive analytics and real-time dashboards for retailers.

## 5. Development Standards

- **Methodology:** Spec-Driven Development (SDD). All code must align with `docs/specification/`. No implementation without an approved spec.
- **UI/UX:** Focus on "Zero-Click Discovery" and premium "Multisport Mosaic" interfaces.
- **Security:** JWT (HS256, no PII in claims) + OTP (crypto/rand, no hardcoded fallbacks) for passwordless sessions.
- **Localization:** UI labels in PT-BR; technical specs in English.

### Database Migration Rigor

Every schema change requires a numbered migration file in `services/sqlc/migration/` (`00000X_name.sql`), followed immediately by `sqlc generate` from `services/`. Both the `.sql` file and the generated Go code ship in the same commit. No schema changes without a migration file.

### Branch Strategy

| Branch | Environment | Promoted via |
| --- | --- | --- |
| `feat/<issue>-<desc>` | Local dev | PR → `develop` |
| `develop` | Integration | Explicit request → `staging` |
| `staging` | Pre-production QA | Explicit request → `main` |
| `main` | Production | Never touched without release request |

- After every merge to `develop` in `Kapt-tech/kapt`, sync the personal fork (`antonioroque200OK/kapt`).

### Fast-Track for Docs & Chores

- **Exceptions:** Changes categorized as `docs:` (documentation) or `chore:` (dependency updates, configuration, cleanup) are exempt from the standard PR/Review flow.
- **Direct Merge:** The agent is authorized to commit, push, and merge these changes directly into the `develop` branch without opening a PR or waiting for manual approval.
- **Trigger Command:** This fast-track is activated by the user command: "Commit the change(s)".

### Agent Workflow & Manual Gates

1. **Pick up:** When commanded with "Pick up Issue #X", the agent must:
   - Identify the issue in the Kanban and move it to `IN PROGRESS`.
   - Create a branch `feat/<issue-id>-<desc>` from `develop`.
2. **Implementation:** Implement changes following Kapt's tech specs.
3. **PR & Review Gate:** After implementation, the agent must:
   - Push the branch and open a PR to `develop`.
   - Move the issue to `CODE REVIEW & QA`.
   - **MANDATORY:** Stop and prompt the user: "PR opened. Please review the diff at <PR_URL> and approve the merge."
4. **Merge to Develop:** Only proceed after explicit user approval.
5. **Release Gate:** When merging `develop` to `main`:
   - Move the issue to `STAGING / UAT`.
   - **MANDATORY:** Prompt the user for final UAT validation before the final PR to `main`.
