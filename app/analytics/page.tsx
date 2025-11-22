'use client'

import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { TrendingUp, TrendingDown, DollarSign, Users, Target, Calendar, Download, Filter } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'
import Link from 'next/link'

// Sample analytics data
const revenueData = [
  { month: 'Jan', revenue: 45000, target: 50000, deals: 12 },
  { month: 'Feb', revenue: 52000, target: 50000, deals: 15 },
  { month: 'Mar', revenue: 48000, target: 55000, deals: 14 },
  { month: 'Apr', revenue: 61000, target: 55000, deals: 18 },
  { month: 'May', revenue: 55000, target: 60000, deals: 16 },
  { month: 'Jun', revenue: 67000, target: 60000, deals: 20 },
  { month: 'Jul', revenue: 72000, target: 65000, deals: 22 },
  { month: 'Aug', revenue: 68000, target: 65000, deals: 19 },
  { month: 'Sep', revenue: 75000, target: 70000, deals: 23 },
  { month: 'Oct', revenue: 82000, target: 70000, deals: 25 },
  { month: 'Nov', revenue: 88000, target: 75000, deals: 27 },
]

const dealsByStage = [
  { stage: 'Qualification', count: 24, value: 580000 },
  { stage: 'Proposal', count: 18, value: 720000 },
  { stage: 'Negotiation', count: 12, value: 960000 },
  { stage: 'Closed Won', count: 8, value: 640000 },
]

const industryData = [
  { name: 'Technology', value: 35, color: '#3b82f6' },
  { name: 'Healthcare', value: 25, color: '#10b981' },
  { name: 'Finance', value: 20, color: '#f59e0b' },
  { name: 'Retail', value: 12, color: '#ef4444' },
  { name: 'Other', value: 8, color: '#6366f1' },
]

const teamPerformance = [
  { name: 'Sarah Johnson', deals: 12, revenue: 340000, winRate: 85 },
  { name: 'Mike Chen', deals: 10, revenue: 285000, winRate: 78 },
  { name: 'Emma Davis', deals: 9, revenue: 310000, winRate: 82 },
  { name: 'Alex Kumar', deals: 8, revenue: 265000, winRate: 75 },
  { name: 'Lisa Wang', deals: 7, revenue: 245000, winRate: 71 },
]

export default function AnalyticsPage() {
  const totalRevenue = revenueData.reduce((sum, item) => sum + item.revenue, 0)
  const avgMonthlyRevenue = totalRevenue / revenueData.length
  const totalDeals = revenueData.reduce((sum, item) => sum + item.deals, 0)
  const revenueGrowth = ((revenueData[revenueData.length - 1].revenue - revenueData[0].revenue) / revenueData[0].revenue) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Analytics & Reports</h1>
              <p className="text-slate-600 mt-1">Insights and performance metrics</p>
            </div>
            <div className="flex gap-3">
              <button className="px-4 py-2 border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filters
              </button>
              <button className="px-4 py-2 border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-2">
                <Download className="w-4 h-4" />
                Export
              </button>
              <Link
                href="/dashboard"
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Back to Dashboard
              </Link>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-4 text-white">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm opacity-90">Total Revenue</span>
                <DollarSign className="w-5 h-5 opacity-75" />
              </div>
              <p className="text-2xl font-bold">{formatCurrency(totalRevenue)}</p>
              <div className="flex items-center gap-1 mt-2 text-sm">
                <TrendingUp className="w-4 h-4" />
                <span>+{revenueGrowth.toFixed(1)}% YTD</span>
              </div>
            </div>
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-4 text-white">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm opacity-90">Avg Monthly</span>
                <Target className="w-5 h-5 opacity-75" />
              </div>
              <p className="text-2xl font-bold">{formatCurrency(avgMonthlyRevenue)}</p>
              <p className="text-sm opacity-75 mt-2">per month</p>
            </div>
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-4 text-white">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm opacity-90">Total Deals</span>
                <Calendar className="w-5 h-5 opacity-75" />
              </div>
              <p className="text-2xl font-bold">{totalDeals}</p>
              <p className="text-sm opacity-75 mt-2">this year</p>
            </div>
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg p-4 text-white">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm opacity-90">Win Rate</span>
                <Users className="w-5 h-5 opacity-75" />
              </div>
              <p className="text-2xl font-bold">78%</p>
              <div className="flex items-center gap-1 mt-2 text-sm">
                <TrendingUp className="w-4 h-4" />
                <span>+5% vs last quarter</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue Trend */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 lg:col-span-2">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Revenue Trend</h2>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#64748b" />
                <YAxis stroke="#64748b" tickFormatter={(value) => `$${value / 1000}k`} />
                <Tooltip
                  formatter={(value: number) => formatCurrency(value)}
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px' }}
                />
                <Legend />
                <Area type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} fill="url(#colorRevenue)" name="Revenue" />
                <Line type="monotone" dataKey="target" stroke="#f59e0b" strokeWidth={2} strokeDasharray="5 5" name="Target" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Deals by Stage */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Pipeline by Stage</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dealsByStage}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="stage" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip
                  formatter={(value: number, name: string) => {
                    if (name === 'value') return formatCurrency(value)
                    return value
                  }}
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px' }}
                />
                <Legend />
                <Bar dataKey="count" fill="#3b82f6" name="Deal Count" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Industry Distribution */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Deals by Industry</h2>
            <div className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={industryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {industryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => `${value}%`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Team Performance */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 lg:col-span-2">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Team Performance</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Team Member</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-slate-700">Deals Closed</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-slate-700">Revenue</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-slate-700">Win Rate</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-slate-700">Performance</th>
                  </tr>
                </thead>
                <tbody>
                  {teamPerformance.map((member, index) => (
                    <tr key={index} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <span className="font-medium text-slate-900">{member.name}</span>
                        </div>
                      </td>
                      <td className="text-right py-3 px-4 text-slate-700">{member.deals}</td>
                      <td className="text-right py-3 px-4 font-semibold text-slate-900">{formatCurrency(member.revenue)}</td>
                      <td className="text-right py-3 px-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                          member.winRate >= 80 ? 'bg-green-100 text-green-700' :
                          member.winRate >= 75 ? 'bg-blue-100 text-blue-700' :
                          'bg-yellow-100 text-yellow-700'
                        }`}>
                          {member.winRate}%
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center justify-end gap-2">
                          <div className="w-24 bg-slate-100 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full"
                              style={{ width: `${member.winRate}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
