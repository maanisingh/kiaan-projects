'use client'

import { useState } from 'react'
import { Search, Mail, Phone, Building2, DollarSign, Calendar, User, Filter } from 'lucide-react'
import { contacts } from '@/lib/data'
import { formatCurrency, formatDate } from '@/lib/utils'
import Link from 'next/link'

export default function ContactsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch =
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === 'all' || contact.status === statusFilter

    return matchesSearch && matchesStatus
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Contacts</h1>
              <p className="text-slate-600 mt-1">Manage your customer relationships</p>
            </div>
            <Link
              href="/dashboard"
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Back to Dashboard
            </Link>
          </div>

          {/* Search and Filters */}
          <div className="flex gap-4 flex-col sm:flex-row">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search contacts by name, company, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="pl-10 pr-8 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white appearance-none cursor-pointer min-w-[150px]"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="lead">Lead</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Contacts Grid */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {filteredContacts.length === 0 ? (
          <div className="text-center py-16">
            <User className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-700 mb-2">No contacts found</h3>
            <p className="text-slate-500">Try adjusting your search or filters</p>
          </div>
        ) : (
          <>
            <div className="mb-4 text-sm text-slate-600">
              Showing {filteredContacts.length} of {contacts.length} contacts
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredContacts.map((contact) => (
                <div
                  key={contact.id}
                  className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all border border-slate-100 overflow-hidden group"
                >
                  {/* Contact Header */}
                  <div className="bg-gradient-to-br from-indigo-500 to-purple-600 px-6 py-8 relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative">
                      <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center text-2xl font-bold text-indigo-600 mb-3 mx-auto">
                        {contact.avatar}
                      </div>
                      <h3 className="text-xl font-bold text-white text-center mb-1">
                        {contact.name}
                      </h3>
                      <p className="text-indigo-100 text-sm text-center">{contact.position}</p>
                    </div>
                  </div>

                  {/* Contact Details */}
                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-2 text-slate-600">
                      <Building2 className="w-4 h-4 text-slate-400" />
                      <span className="text-sm">{contact.company}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-600">
                      <Mail className="w-4 h-4 text-slate-400" />
                      <span className="text-sm truncate">{contact.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-600">
                      <Phone className="w-4 h-4 text-slate-400" />
                      <span className="text-sm">{contact.phone}</span>
                    </div>

                    <div className="pt-3 border-t border-slate-100 grid grid-cols-2 gap-3">
                      <div>
                        <div className="flex items-center gap-1 text-slate-500 text-xs mb-1">
                          <DollarSign className="w-3 h-3" />
                          <span>Deal Value</span>
                        </div>
                        <p className="text-sm font-semibold text-slate-900">
                          {formatCurrency(contact.value)}
                        </p>
                      </div>
                      <div>
                        <div className="flex items-center gap-1 text-slate-500 text-xs mb-1">
                          <Calendar className="w-3 h-3" />
                          <span>Last Contact</span>
                        </div>
                        <p className="text-sm font-semibold text-slate-900">
                          {formatDate(contact.lastContact)}
                        </p>
                      </div>
                    </div>

                    {/* Status Badge */}
                    <div className="pt-2">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        contact.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {contact.status === 'active' ? '● Active' : '○ Lead'}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="px-6 pb-6 pt-2 flex gap-2">
                    <Link
                      href={`/contacts/${contact.id}`}
                      className="flex-1 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors text-center"
                    >
                      View Details
                    </Link>
                    <button className="px-4 py-2 border border-slate-200 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-50 transition-colors">
                      Contact
                    </button>
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
