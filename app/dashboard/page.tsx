'use client'

import { motion } from 'framer-motion'
import {
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  Target,
  BarChart3,
  Phone,
  Mail,
  Calendar,
  CheckCircle2,
  Clock,
  AlertCircle,
  LayoutDashboard,
  Settings,
  Home,
} from 'lucide-react'
import Link from 'next/link'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { contacts, deals, tasks, activities, metrics, revenueData, pipelineData } from '@/lib/data'
import { formatCurrency, formatDate } from '@/lib/utils'

export default function Dashboard() {
  const navItems = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, active: true },
    { name: 'Contacts', href: '/contacts', icon: Users },
    { name: 'Deals', href: '/deals', icon: Target },
    { name: 'Tasks', href: '/tasks', icon: CheckCircle2 },
    { name: 'Analytics', href: '/analytics', icon: BarChart3 },
    { name: 'Settings', href: '/settings', icon: Settings },
  ]

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col">
        <div className="p-6 border-b border-slate-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">K</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-800">Kiaan Connect</h1>
              <p className="text-xs text-slate-600">CRM Platform</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 p-4">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      item.active
                        ? 'bg-indigo-50 text-indigo-600'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
        <div className="p-4 border-t border-slate-200">
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-semibold">
              JD
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-900 truncate">John Doe</p>
              <p className="text-xs text-slate-600 truncate">john@company.com</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <header className="bg-white border-b border-slate-200">
          <div className="px-8 py-6">
            <h2 className="text-2xl font-bold text-slate-800">Dashboard</h2>
            <p className="text-slate-600 mt-1">Welcome back! Here's what's happening today.</p>
          </div>
        </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-xl shadow-sm border border-slate-200"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-slate-600">{metric.label}</span>
                {metric.trend === 'up' ? (
                  <TrendingUp className="w-4 h-4 text-green-600" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-600" />
                )}
              </div>
              <div className="text-3xl font-bold text-slate-800 mb-1">{metric.value}</div>
              <div className={`text-sm font-medium ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                {metric.change} from last month
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Revenue Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white p-6 rounded-xl shadow-sm border border-slate-200"
          >
            <h2 className="text-lg font-semibold text-slate-800 mb-4">Revenue Trend</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                  }}
                  formatter={(value: number) => formatCurrency(value)}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  dot={{ fill: '#3b82f6', r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Pipeline Chart */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white p-6 rounded-xl shadow-sm border border-slate-200"
          >
            <h2 className="text-lg font-semibold text-slate-800 mb-4">Sales Pipeline</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={pipelineData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="stage" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                  }}
                  formatter={(value: number) => formatCurrency(value)}
                />
                <Bar dataKey="value" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Contacts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-sm border border-slate-200"
          >
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-slate-800">Recent Contacts</h2>
                <Users className="w-5 h-5 text-slate-400" />
              </div>
            </div>
            <div className="p-4 space-y-3">
              {contacts.slice(0, 5).map((contact) => (
                <div
                  key={contact.id}
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-semibold text-sm">{contact.avatar}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-800 truncate">{contact.name}</p>
                    <p className="text-xs text-slate-600 truncate">{contact.company}</p>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      contact.status === 'active'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    {contact.status}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Active Deals */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-sm border border-slate-200"
          >
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-slate-800">Active Deals</h2>
                <Target className="w-5 h-5 text-slate-400" />
              </div>
            </div>
            <div className="p-4 space-y-3">
              {deals.map((deal) => (
                <div
                  key={deal.id}
                  className="p-3 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-slate-800">{deal.title}</p>
                    <span className="text-sm font-semibold text-blue-600">
                      {formatCurrency(deal.value)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-600">{deal.company}</span>
                    <span className="text-xs text-slate-500">{deal.probability}% likely</span>
                  </div>
                  <div className="mt-2 bg-slate-100 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all"
                      style={{ width: `${deal.probability}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Upcoming Tasks */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl shadow-sm border border-slate-200"
          >
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-slate-800">Upcoming Tasks</h2>
                <CheckCircle2 className="w-5 h-5 text-slate-400" />
              </div>
            </div>
            <div className="p-4 space-y-3">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className="p-3 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <div className="flex items-start space-x-3">
                    {task.status === 'completed' ? (
                      <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    ) : task.status === 'in-progress' ? (
                      <Clock className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-800 mb-1">{task.title}</p>
                      <p className="text-xs text-slate-600 mb-2">{task.relatedTo}</p>
                      <div className="flex items-center space-x-2">
                        <span
                          className={`px-2 py-0.5 rounded text-xs font-medium ${
                            task.priority === 'high'
                              ? 'bg-red-100 text-red-700'
                              : task.priority === 'medium'
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-green-100 text-green-700'
                          }`}
                        >
                          {task.priority}
                        </span>
                        <span className="text-xs text-slate-500">Due {formatDate(task.dueDate)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 bg-white rounded-xl shadow-sm border border-slate-200"
        >
          <div className="p-6 border-b border-slate-200">
            <h2 className="text-lg font-semibold text-slate-800">Recent Activity</h2>
          </div>
          <div className="p-4">
            <div className="space-y-4">
              {activities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-4 p-3 rounded-lg hover:bg-slate-50 transition-colors">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                      activity.type === 'email'
                        ? 'bg-blue-100'
                        : activity.type === 'call'
                        ? 'bg-green-100'
                        : activity.type === 'meeting'
                        ? 'bg-purple-100'
                        : 'bg-slate-100'
                    }`}
                  >
                    {activity.type === 'email' && <Mail className="w-5 h-5 text-blue-600" />}
                    {activity.type === 'call' && <Phone className="w-5 h-5 text-green-600" />}
                    {activity.type === 'meeting' && <Calendar className="w-5 h-5 text-purple-600" />}
                    {activity.type === 'note' && <BarChart3 className="w-5 h-5 text-slate-600" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-800">{activity.title}</p>
                    <p className="text-sm text-slate-600 mt-1">{activity.description}</p>
                    <p className="text-xs text-slate-500 mt-2">
                      {formatDate(activity.timestamp)} • {activity.contact}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
      </div>
    </div>
  )
}
