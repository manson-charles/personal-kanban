import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-brand-600" />
            <span className="text-xl font-bold text-slate-900">BotForge</span>
          </div>
          <nav className="flex items-center gap-4">
            <Link
              href="/login"
              className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700"
            >
              Get Started
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <main className="flex flex-1 flex-col items-center justify-center px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="mb-6 text-5xl font-bold leading-tight text-slate-900">
            Build Powerful Bots
            <br />
            <span className="text-brand-600">Without the Complexity</span>
          </h1>
          <p className="mb-8 text-lg text-slate-600">
            BotForge is a no/low-code platform for building bots with backend logic,
            database integration, deployment, and monetization. Connect Telegram,
            Discord, WhatsApp, and web chat -- all from one visual builder.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link
              href="/register"
              className="rounded-lg bg-brand-600 px-6 py-3 text-base font-medium text-white hover:bg-brand-700"
            >
              Start Building for Free
            </Link>
            <Link
              href="/docs"
              className="rounded-lg border border-slate-300 px-6 py-3 text-base font-medium text-slate-700 hover:bg-slate-50"
            >
              View Documentation
            </Link>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="mx-auto mt-20 grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-brand-100 text-brand-600">
                {feature.icon}
              </div>
              <h3 className="mb-2 text-lg font-semibold text-slate-900">
                {feature.title}
              </h3>
              <p className="text-sm text-slate-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-8">
        <div className="mx-auto max-w-7xl px-4 text-center text-sm text-slate-500">
          BotForge - Bot Constructor Platform
        </div>
      </footer>
    </div>
  );
}

const features = [
  {
    title: 'Visual Bot Builder',
    description:
      'Drag-and-drop workflow editor with nodes for messages, conditions, API calls, database queries, and custom functions.',
    icon: '~',
  },
  {
    title: 'Multi-Channel',
    description:
      'Deploy to Telegram, Discord, WhatsApp, and web chat from a single bot project. One logic, many channels.',
    icon: '#',
  },
  {
    title: 'Backend as Code',
    description:
      'Create REST/GraphQL API endpoints, write TypeScript/Python functions, and connect external repos.',
    icon: '<>',
  },
  {
    title: 'Database Integration',
    description:
      'Built-in PostgreSQL with visual schema editor. Or connect Supabase, Firebase, MongoDB, and more.',
    icon: 'DB',
  },
  {
    title: 'One-Click Deploy',
    description:
      'Local, staging, and production environments with Docker containers and Kubernetes orchestration.',
    icon: '^',
  },
  {
    title: 'Built-in Monetization',
    description:
      'Add paid subscriptions, one-time payments, and premium features to your bots with Stripe integration.',
    icon: '$',
  },
];
