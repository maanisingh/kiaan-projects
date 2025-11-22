'use client'

import { useState } from 'react'
import { User, Bell, Lock, Palette, Globe, Mail, Shield, Save, Camera } from 'lucide-react'
import Link from 'next/link'

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile')

  const tabs = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'security', name: 'Security', icon: Lock },
    { id: 'appearance', name: 'Appearance', icon: Palette },
    { id: 'preferences', name: 'Preferences', icon: Globe },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Settings</h1>
              <p className="text-slate-600 mt-1">Manage your account and preferences</p>
            </div>
            <Link
              href="/dashboard"
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4">
              <nav className="space-y-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                        activeTab === tab.id
                          ? 'bg-indigo-50 text-indigo-600'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{tab.name}</span>
                    </button>
                  )
                })}
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
                  <h2 className="text-xl font-semibold text-slate-900 mb-6">Profile Information</h2>

                  {/* Profile Photo */}
                  <div className="flex items-center gap-6 mb-6 pb-6 border-b border-slate-100">
                    <div className="relative">
                      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-3xl font-bold text-white">
                        JD
                      </div>
                      <button className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full border-2 border-indigo-600 flex items-center justify-center text-indigo-600 hover:bg-indigo-50 transition-colors">
                        <Camera className="w-4 h-4" />
                      </button>
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900">Profile Photo</h3>
                      <p className="text-sm text-slate-600 mt-1">JPG, PNG or GIF. Max 2MB.</p>
                      <button className="text-sm text-indigo-600 hover:text-indigo-700 mt-2">Upload new photo</button>
                    </div>
                  </div>

                  {/* Form Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">First Name</label>
                      <input
                        type="text"
                        defaultValue="John"
                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Last Name</label>
                      <input
                        type="text"
                        defaultValue="Doe"
                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                      <input
                        type="email"
                        defaultValue="john.doe@company.com"
                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Phone Number</label>
                      <input
                        type="tel"
                        defaultValue="+1 (555) 123-4567"
                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Job Title</label>
                      <input
                        type="text"
                        defaultValue="Sales Manager"
                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-slate-700 mb-2">Bio</label>
                      <textarea
                        rows={4}
                        defaultValue="Experienced sales professional with 10+ years in B2B software sales."
                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                      ></textarea>
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 mt-6">
                    <button className="px-4 py-2 border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors">
                      Cancel
                    </button>
                    <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2">
                      <Save className="w-4 h-4" />
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
                  <h2 className="text-xl font-semibold text-slate-900 mb-6">Notification Preferences</h2>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-3 border-b border-slate-100">
                      <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5 text-slate-400" />
                        <div>
                          <p className="font-medium text-slate-900">Email Notifications</p>
                          <p className="text-sm text-slate-600">Receive email updates about your activity</p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked className="sr-only peer" />
                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between py-3 border-b border-slate-100">
                      <div className="flex items-center gap-3">
                        <Bell className="w-5 h-5 text-slate-400" />
                        <div>
                          <p className="font-medium text-slate-900">Push Notifications</p>
                          <p className="text-sm text-slate-600">Get push notifications in your browser</p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked className="sr-only peer" />
                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between py-3 border-b border-slate-100">
                      <div className="flex items-center gap-3">
                        <User className="w-5 h-5 text-slate-400" />
                        <div>
                          <p className="font-medium text-slate-900">New Contact Notifications</p>
                          <p className="text-sm text-slate-600">Get notified when a new contact is added</p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                      </label>
                    </div>
                  </div>

                  <div className="flex justify-end mt-6">
                    <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2">
                      <Save className="w-4 h-4" />
                      Save Preferences
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
                  <h2 className="text-xl font-semibold text-slate-900 mb-6">Security Settings</h2>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Current Password</label>
                      <input
                        type="password"
                        placeholder="Enter current password"
                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">New Password</label>
                      <input
                        type="password"
                        placeholder="Enter new password"
                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Confirm New Password</label>
                      <input
                        type="password"
                        placeholder="Confirm new password"
                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    <div className="pt-4 border-t border-slate-100">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Shield className="w-5 h-5 text-slate-400" />
                          <div>
                            <p className="font-medium text-slate-900">Two-Factor Authentication</p>
                            <p className="text-sm text-slate-600">Add an extra layer of security</p>
                          </div>
                        </div>
                        <button className="px-4 py-2 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors">
                          Enable
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end mt-6">
                    <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                      Update Password
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Appearance Tab */}
            {activeTab === 'appearance' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
                  <h2 className="text-xl font-semibold text-slate-900 mb-6">Appearance Settings</h2>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-3">Theme</label>
                      <div className="grid grid-cols-3 gap-4">
                        <button className="border-2 border-indigo-600 rounded-lg p-4 text-center">
                          <div className="w-full h-20 bg-white rounded mb-2"></div>
                          <span className="text-sm font-medium">Light</span>
                        </button>
                        <button className="border-2 border-slate-200 rounded-lg p-4 text-center hover:border-slate-300">
                          <div className="w-full h-20 bg-slate-900 rounded mb-2"></div>
                          <span className="text-sm font-medium">Dark</span>
                        </button>
                        <button className="border-2 border-slate-200 rounded-lg p-4 text-center hover:border-slate-300">
                          <div className="w-full h-20 bg-gradient-to-br from-white to-slate-900 rounded mb-2"></div>
                          <span className="text-sm font-medium">Auto</span>
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-3">Accent Color</label>
                      <div className="flex gap-3">
                        {['bg-indigo-600', 'bg-blue-600', 'bg-purple-600', 'bg-pink-600', 'bg-green-600'].map((color, i) => (
                          <button
                            key={i}
                            className={`w-10 h-10 rounded-full ${color} ${i === 0 ? 'ring-2 ring-offset-2 ring-indigo-600' : ''}`}
                          ></button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end mt-6">
                    <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                      Save Appearance
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Preferences Tab */}
            {activeTab === 'preferences' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
                  <h2 className="text-xl font-semibold text-slate-900 mb-6">General Preferences</h2>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Language</label>
                      <select className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                        <option>English (US)</option>
                        <option>English (UK)</option>
                        <option>Spanish</option>
                        <option>French</option>
                        <option>German</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Timezone</label>
                      <select className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                        <option>Pacific Time (PT)</option>
                        <option>Mountain Time (MT)</option>
                        <option>Central Time (CT)</option>
                        <option>Eastern Time (ET)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Date Format</label>
                      <select className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                        <option>MM/DD/YYYY</option>
                        <option>DD/MM/YYYY</option>
                        <option>YYYY-MM-DD</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Currency</label>
                      <select className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                        <option>USD ($)</option>
                        <option>EUR (€)</option>
                        <option>GBP (£)</option>
                        <option>JPY (¥)</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-end mt-6">
                    <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                      Save Preferences
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
