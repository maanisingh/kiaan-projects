'use client'

import { useState } from 'react'
import { Plus, CheckCircle2, Circle, Clock, Flag, Calendar, User, Filter, Search } from 'lucide-react'
import { tasks } from '@/lib/data'
import { formatDate } from '@/lib/utils'
import Link from 'next/link'

type TaskStatus = 'pending' | 'in-progress' | 'completed'
type TaskPriority = 'high' | 'medium' | 'low'

export default function TasksPage() {
  const [statusFilter, setStatusFilter] = useState<TaskStatus | 'all'>('all')
  const [priorityFilter, setPriorityFilter] = useState<TaskPriority | 'all'>('all')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredTasks = tasks.filter(task => {
    const matchesStatus = statusFilter === 'all' || task.status === statusFilter
    const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.assignee.toLowerCase().includes(searchTerm.toLowerCase())

    return matchesStatus && matchesPriority && matchesSearch
  })

  const getTasksByStatus = (status: TaskStatus) => {
    return tasks.filter(task => task.status === status)
  }

  const pendingTasks = getTasksByStatus('pending')
  const inProgressTasks = getTasksByStatus('in-progress')
  const completedTasks = getTasksByStatus('completed')

  const getPriorityColor = (priority: TaskPriority) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100'
      case 'medium': return 'text-yellow-600 bg-yellow-100'
      case 'low': return 'text-blue-600 bg-blue-100'
      default: return 'text-slate-600 bg-slate-100'
    }
  }

  const getStatusIcon = (status: TaskStatus) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="w-5 h-5 text-green-600" />
      case 'in-progress':
        return <Clock className="w-5 h-5 text-blue-600" />
      default:
        return <Circle className="w-5 h-5 text-slate-400" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Tasks</h1>
              <p className="text-slate-600 mt-1">Manage your to-do list and track progress</p>
            </div>
            <div className="flex gap-3">
              <Link
                href="/dashboard"
                className="px-4 py-2 border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
              >
                Back to Dashboard
              </Link>
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2">
                <Plus className="w-4 h-4" />
                New Task
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-gradient-to-br from-slate-500 to-slate-600 rounded-lg p-4 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90 mb-1">Pending</p>
                  <p className="text-3xl font-bold">{pendingTasks.length}</p>
                </div>
                <Circle className="w-10 h-10 opacity-50" />
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-4 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90 mb-1">In Progress</p>
                  <p className="text-3xl font-bold">{inProgressTasks.length}</p>
                </div>
                <Clock className="w-10 h-10 opacity-50" />
              </div>
            </div>
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-4 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90 mb-1">Completed</p>
                  <p className="text-3xl font-bold">{completedTasks.length}</p>
                </div>
                <CheckCircle2 className="w-10 h-10 opacity-50" />
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="flex gap-4 flex-col sm:flex-row">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as TaskStatus | 'all')}
                className="pl-10 pr-8 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white appearance-none cursor-pointer min-w-[150px]"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <div className="relative">
              <Flag className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value as TaskPriority | 'all')}
                className="pl-10 pr-8 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white appearance-none cursor-pointer min-w-[150px]"
              >
                <option value="all">All Priorities</option>
                <option value="high">High Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="low">Low Priority</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Tasks List */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {filteredTasks.length === 0 ? (
          <div className="text-center py-16">
            <CheckCircle2 className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-700 mb-2">No tasks found</h3>
            <p className="text-slate-500">Try adjusting your filters or create a new task</p>
          </div>
        ) : (
          <>
            <div className="mb-4 text-sm text-slate-600">
              Showing {filteredTasks.length} of {tasks.length} tasks
            </div>
            <div className="space-y-3">
              {filteredTasks.map((task) => (
                <div
                  key={task.id}
                  className="bg-white rounded-lg border border-slate-200 p-5 hover:shadow-md transition-all group"
                >
                  <div className="flex items-start gap-4">
                    {/* Status Icon */}
                    <button className="mt-0.5 hover:scale-110 transition-transform">
                      {getStatusIcon(task.status)}
                    </button>

                    {/* Task Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <h3 className={`font-semibold text-lg ${
                          task.status === 'completed' ? 'text-slate-400 line-through' : 'text-slate-900'
                        }`}>
                          {task.title}
                        </h3>
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium flex-shrink-0 ${getPriorityColor(task.priority)}`}>
                          {task.priority.toUpperCase()}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600">
                        <div className="flex items-center gap-1.5">
                          <User className="w-4 h-4" />
                          <span>{task.assignee}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-4 h-4" />
                          <span>Due {formatDate(task.dueDate)}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                            task.status === 'completed' ? 'bg-green-100 text-green-700' :
                            task.status === 'in-progress' ? 'bg-blue-100 text-blue-700' :
                            'bg-slate-100 text-slate-700'
                          }`}>
                            {task.status === 'completed' ? 'Completed' :
                             task.status === 'in-progress' ? 'In Progress' : 'Pending'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="px-3 py-1.5 text-sm border border-slate-200 text-slate-700 rounded hover:bg-slate-50 transition-colors">
                        Edit
                      </button>
                      {task.status !== 'completed' && (
                        <button className="px-3 py-1.5 text-sm bg-green-600 text-white rounded hover:bg-green-700 transition-colors">
                          Complete
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
