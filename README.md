# BotForge

**No/Low-code bot constructor platform** for building complex bots with backend logic, database integration, deployment, and monetization.

## Architecture

BotForge is a SaaS platform built as a monorepo with the following microservices:

| Service | Description |
|---------|-------------|
| **core** | Platform logic: projects, users, bots, environments |
| **builder** | Visual bot constructor: nodes, chains, conditions |
| **runner** | Bot logic execution and backend code runtime |
| **db-gateway** | Unified access to any database |
| **billing** | Subscriptions, pay-per-use, licenses |
| **monitoring** | Metrics, logs, alerts |

## Tech Stack

- **Backend**: NestJS (TypeScript), Prisma ORM, PostgreSQL
- **Frontend**: Next.js 14 (React), TypeScript, TailwindCSS, ReactFlow
- **Infrastructure**: Docker, Kubernetes, GitHub Actions CI/CD
- **Auth**: OAuth2 (GitHub, Google), JWT, MFA
- **Payments**: Stripe integration

## Project Structure

```
botforge/
├── backend/           # NestJS API server
│   ├── src/
│   │   ├── modules/   # Feature modules (core, builder, runner, etc.)
│   │   ├── common/    # Shared utilities, guards, decorators
│   │   └── config/    # Configuration files
│   └── prisma/        # Database schema and migrations
├── frontend/          # Next.js web application
│   ├── src/
│   │   ├── app/       # Next.js App Router pages
│   │   ├── components/# React components
│   │   ├── lib/       # Utilities and API client
│   │   └── store/     # State management
├── packages/          # Shared packages
│   └── shared-types/  # TypeScript types shared between FE and BE
└── docker/            # Docker and K8s configs
```

## Getting Started

### Prerequisites
- Node.js >= 20
- PostgreSQL 15+
- Docker (optional)

### Installation

```bash
npm install
```

### Development

```bash
# Start backend
npm run dev:backend

# Start frontend
npm run dev:frontend
```

### Testing

```bash
npm test
```

## Supported Channels

- Telegram Bot API (webhooks / polling)
- Discord (webhooks + bot token)
- WhatsApp (via Twilio / Meta API)
- Web chat (iframe widget)

## Subscription Tiers

| Tier | Features |
|------|----------|
| **Free** | Basic features, limited quotas |
| **Starter** | More API quotas, 1-2 integrations |
| **Pro** | Unlimited bots, advanced DB integrations |
| **Enterprise** | Custom SLA, dedicated environment, SSO |

## License

Proprietary - All rights reserved.
