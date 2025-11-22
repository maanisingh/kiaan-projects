'use client'

import { use } from 'react'
import { ArrowLeft, Mail, Phone, Building2, MapPin, Calendar, DollarSign, TrendingUp, Clock, MessageSquare, PhoneCall, Video, FileText } from 'lucide-react'
import { contacts, deals, activities } from '@/lib/data'
import { formatCurrency, formatDate } from '@/lib/utils'
import Link from 'next/link'

export default function ContactDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const contact = contacts.find(c => c.id === id)

  if (!contact) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Contact Not Found</h1>
          <Link href="/contacts" className="text-indigo-600 hover:underline">
            Back to Contacts
          </Link>
        </div>
      </div>
    )
  }

  const contactDeals = deals.filter(d => d.contact === contact.name)
  const contactActivities = activities.filter(a =>
    a.details.toLowerCase().includes(contact.name.toLowerCase()) ||
    a.details.toLowerCase().includes(contact.company.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="border-b bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <Link
            href="/contacts"
            className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Contacts
          </Link>

          <div className="flex items-start justify-between">
            <div className="flex gap-4">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-3xl font-bold text-white">
                {contact.avatar}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-slate-900">{contact.name}</h1>
                <p className="text-lg text-slate-600 mt-1">{contact.position}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    contact.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {contact.status === 'active' ? '● Active Customer' : '○ Lead'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Contact Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Contact Information Card */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">Contact Information</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-indigo-600 mt-0.5" />
                  <div>
                    <p className="text-sm text-slate-500">Email</p>
                    <a href={`mailto:${contact.email}`} className="text-slate-900 hover:text-indigo-600">
                      {contact.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-indigo-600 mt-0.5" />
                  <div>
                    <p className="text-sm text-slate-500">Phone</p>
                    <a href={`tel:${contact.phone}`} className="text-slate-900 hover:text-indigo-600">
                      {contact.phone}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Building2 className="w-5 h-5 text-indigo-600 mt-0.5" />
                  <div>
                    <p className="text-sm text-slate-500">Company</p>
                    <p className="text-slate-900">{contact.company}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-indigo-600 mt-0.5" />
                  <div>
                    <p className="text-sm text-slate-500">Last Contact</p>
                    <p className="text-slate-900">{formatDate(contact.lastContact)}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats Card */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">Quick Stats</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-600">
                    <DollarSign className="w-5 h-5 text-green-600" />
                    <span className="text-sm">Total Value</span>
                  </div>
                  <span className="font-semibold text-slate-900">
                    {formatCurrency(contact.value)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-600">
                    <TrendingUp className="w-5 h-5 text-blue-600" />
                    <span className="text-sm">Active Deals</span>
                  </div>
                  <span className="font-semibold text-slate-900">
                    {contactDeals.length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-600">
                    <Clock className="w-5 h-5 text-purple-600" />
                    <span className="text-sm">Recent Activities</span>
                  </div>
                  <span className="font-semibold text-slate-900">
                    {contactActivities.length}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-sm p-6 text-white">
              <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
              <div className="space-y-2">
                <button className="w-full px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>Send Email</span>
                </button>
                <button className="w-full px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors flex items-center gap-2">
                  <PhoneCall className="w-4 h-4" />
                  <span>Schedule Call</span>
                </button>
                <button className="w-full px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors flex items-center gap-2">
                  <Video className="w-4 h-4" />
                  <span>Video Meeting</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Deals & Activity */}
          <div className="lg:col-span-2 space-y-6">
            {/* Active Deals */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">Active Deals</h2>
              {contactDeals.length === 0 ? (
                <p className="text-slate-500 text-center py-8">No active deals</p>
              ) : (
                <div className="space-y-4">
                  {contactDeals.map(deal => (
                    <div
                      key={deal.id}
                      className="border border-slate-200 rounded-lg p-4 hover:border-indigo-300 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-slate-900">{deal.title}</h3>
                          <p className="text-sm text-slate-600 mt-1">{deal.company}</p>
                        </div>
                        <span className="text-lg font-bold text-indigo-600">
                          {formatCurrency(deal.value)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="px-2.5 py-1 bg-blue-100 text-blue-800 rounded-full font-medium capitalize">
                          {deal.stage}
                        </span>
                        <div className="flex items-center gap-4 text-slate-600">
                          <span>{deal.probability}% probability</span>
                          <span>Closes {formatDate(deal.closingDate)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Activity Timeline */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">Activity Timeline</h2>
              {contactActivities.length === 0 ? (
                <p className="text-slate-500 text-center py-8">No recent activities</p>
              ) : (
                <div className="space-y-4">
                  {contactActivities.map((activity, index) => (
                    <div key={index} className="flex gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                        activity.type === 'email' ? 'bg-blue-100 text-blue-600' :
                        activity.type === 'call' ? 'bg-green-100 text-green-600' :
                        activity.type === 'meeting' ? 'bg-purple-100 text-purple-600' :
                        'bg-slate-100 text-slate-600'
                      }`}>
                        {activity.type === 'email' && <Mail className="w-5 h-5" />}
                        {activity.type === 'call' && <PhoneCall className="w-5 h-5" />}
                        {activity.type === 'meeting' && <Video className="w-5 h-5" />}
                        {activity.type === 'note' && <FileText className="w-5 h-5" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-medium text-slate-900 capitalize">{activity.type}</h3>
                          <span className="text-sm text-slate-500">{activity.time}</span>
                        </div>
                        <p className="text-slate-600 text-sm">{activity.details}</p>
                        <p className="text-slate-500 text-xs mt-1">by {activity.user}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Notes Section */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">Notes</h2>
              <textarea
                placeholder="Add notes about this contact..."
                rows={4}
                className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
              ></textarea>
              <div className="mt-3 flex justify-end">
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                  Save Note
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
