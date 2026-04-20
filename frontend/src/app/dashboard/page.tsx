export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-slate-600">Overview of your bots and platform usage</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="text-sm font-medium text-slate-500">{stat.label}</div>
            <div className="mt-1 text-2xl font-bold text-slate-900">{stat.value}</div>
            <div className="mt-1 text-xs text-slate-400">{stat.change}</div>
          </div>
        ))}
      </div>

      {/* Recent Activity & Service Map */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Service Map */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-slate-900">Service Map</h2>
          <div className="space-y-3">
            {bots.map((bot) => (
              <div
                key={bot.name}
                className="flex items-center justify-between rounded-lg border border-slate-100 p-3"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`h-2.5 w-2.5 rounded-full ${
                      bot.status === 'online' ? 'bg-green-500' : 'bg-slate-300'
                    }`}
                  />
                  <span className="text-sm font-medium text-slate-700">{bot.name}</span>
                </div>
                <span className="text-xs text-slate-500">{bot.messages}/min</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Errors */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-slate-900">Recent Errors</h2>
          <div className="space-y-3">
            <div className="rounded-lg border border-red-100 bg-red-50 p-3">
              <div className="text-sm font-medium text-red-800">
                Timeout: HTTP Request node
              </div>
              <div className="text-xs text-red-600">
                Bot: Support Bot | 2 minutes ago
              </div>
            </div>
            <div className="rounded-lg border border-amber-100 bg-amber-50 p-3">
              <div className="text-sm font-medium text-amber-800">
                Rate limit warning: Telegram API
              </div>
              <div className="text-xs text-amber-600">
                Bot: Notification Bot | 15 minutes ago
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const stats = [
  { label: 'Active Bots', value: '3', change: '+1 this week' },
  { label: 'Active Sessions', value: '142', change: '+12% vs yesterday' },
  { label: 'Messages Today', value: '1,847', change: '+8% vs yesterday' },
  { label: 'API Requests', value: '12,431', change: '62% of monthly quota' },
];

const bots = [
  { name: 'Support Bot', status: 'online', messages: 24 },
  { name: 'Notification Bot', status: 'online', messages: 8 },
  { name: 'Survey Bot', status: 'offline', messages: 0 },
];
