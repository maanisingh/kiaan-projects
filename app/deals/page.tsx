'use client'

import { useState } from 'react'
import { Plus, DollarSign, Calendar, TrendingUp, User, Building2 } from 'lucide-react'
import { deals } from '@/lib/data'
import { formatCurrency, formatDate } from '@/lib/utils'
import Link from 'next/link'

const stages = [
  { id: 'qualification', name: 'Qualification', color: 'bg-blue-500' },
  { id: 'proposal', name: 'Proposal', color: 'bg-yellow-500' },
  { id: 'negotiation', name: 'Negotiation', color: 'bg-orange-500' },
  { id: 'closed', name: 'Closed Won', color: 'bg-green-500' }
]

export default function DealsPage() {
  const [selectedStage, setSelectedStage] = useState<string | null>(null)

  const getDealsByStage = (stageId: string) => {
    return deals.filter(deal => deal.stage === stageId)
  }

  const getStageTotalValue = (stageId: string) => {
    return getDealsByStage(stageId).reduce((sum, deal) => sum + deal.value, 0)
  }

  const totalPipelineValue = deals.reduce((sum, deal) => sum + deal.value, 0)
  const averageDealSize = totalPipelineValue / deals.length

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Sales Pipeline</h1>
              <p className="text-slate-600 mt-1">Track and manage your deals</p>
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
                New Deal
              </button>
            </div>
          </div>

          {/* Pipeline Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-4 text-white">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5" />
                <span className="text-sm font-medium opacity-90">Total Pipeline</span>
              </div>
              <p className="text-2xl font-bold">{formatCurrency(totalPipelineValue)}</p>
              <p className="text-sm opacity-75 mt-1">{deals.length} active deals</p>
            </div>
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-4 text-white">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="w-5 h-5" />
                <span className="text-sm font-medium opacity-90">Avg Deal Size</span>
              </div>
              <p className="text-2xl font-bold">{formatCurrency(averageDealSize)}</p>
              <p className="text-sm opacity-75 mt-1">across all stages</p>
            </div>
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-4 text-white">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-5 h-5" />
                <span className="text-sm font-medium opacity-90">This Month</span>
              </div>
              <p className="text-2xl font-bold">{deals.length}</p>
              <p className="text-sm opacity-75 mt-1">deals in pipeline</p>
            </div>
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg p-4 text-white">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5" />
                <span className="text-sm font-medium opacity-90">Win Rate</span>
              </div>
              <p className="text-2xl font-bold">78%</p>
              <p className="text-sm opacity-75 mt-1">last 30 days</p>
            </div>
          </div>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stages.map(stage => {
            const stageDeals = getDealsByStage(stage.id)
            const stageTotalValue = getStageTotalValue(stage.id)

            return (
              <div key={stage.id} className="flex flex-col">
                {/* Column Header */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${stage.color}`}></div>
                      <h2 className="font-semibold text-slate-900">{stage.name}</h2>
                      <span className="text-sm text-slate-500">({stageDeals.length})</span>
                    </div>
                  </div>
                  <p className="text-sm font-medium text-slate-600">
                    {formatCurrency(stageTotalValue)}
                  </p>
                </div>

                {/* Deal Cards */}
                <div className="flex-1 space-y-3 min-h-[400px]">
                  {stageDeals.length === 0 ? (
                    <div className="border-2 border-dashed border-slate-200 rounded-lg p-8 text-center">
                      <p className="text-slate-400 text-sm">No deals in this stage</p>
                    </div>
                  ) : (
                    stageDeals.map(deal => (
                      <div
                        key={deal.id}
                        className="bg-white rounded-lg border border-slate-200 p-4 hover:shadow-md transition-all cursor-pointer group"
                      >
                        {/* Deal Title */}
                        <h3 className="font-semibold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">
                          {deal.title}
                        </h3>

                        {/* Company */}
                        <div className="flex items-center gap-2 text-sm text-slate-600 mb-3">
                          <Building2 className="w-4 h-4" />
                          <span>{deal.company}</span>
                        </div>

                        {/* Value */}
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-lg font-bold text-indigo-600">
                            {formatCurrency(deal.value)}
                          </span>
                          <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded">
                            {deal.probability}% win
                          </span>
                        </div>

                        {/* Contact */}
                        <div className="flex items-center gap-2 text-sm text-slate-600 mb-3">
                          <User className="w-4 h-4" />
                          <span>{deal.contact}</span>
                        </div>

                        {/* Closing Date */}
                        <div className="flex items-center gap-2 text-sm text-slate-500 pt-3 border-t border-slate-100">
                          <Calendar className="w-4 h-4" />
                          <span>Closes {formatDate(deal.closingDate)}</span>
                        </div>

                        {/* Progress Bar */}
                        <div className="mt-3">
                          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                            <span>Progress</span>
                            <span>{deal.probability}%</span>
                          </div>
                          <div className="w-full bg-slate-100 rounded-full h-1.5">
                            <div
                              className={`h-1.5 rounded-full ${stage.color}`}
                              style={{ width: `${deal.probability}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}

                  {/* Add Deal Button */}
                  <button className="w-full border-2 border-dashed border-slate-200 rounded-lg p-4 text-slate-400 hover:border-indigo-300 hover:text-indigo-600 transition-colors flex items-center justify-center gap-2">
                    <Plus className="w-4 h-4" />
                    <span className="text-sm font-medium">Add Deal</span>
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
