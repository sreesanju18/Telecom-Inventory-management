// app/admin/page.jsx - Admin Dashboard
'use client'

import { useState, useEffect } from 'react'
import { 
  Package, 
  Users, 
  ShoppingCart, 
  TrendingUp, 
  Plus, 
  Search, 
  Filter,
  Edit,
  Trash2,
  Eye,
  MoreHorizontal,
  ArrowUp,
  ArrowDown,
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign
} from 'lucide-react'
import { Card, CardContent, CardTitle, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

  
// Dashboard Stats Component
const DashboardStats = () => {
  const stats = [
    { 
      title: 'Total Users', 
      value: '1,247', 
      change: '+12%', 
      changeType: 'positive',
      icon: Users, 
      color: 'bg-blue-500',
      trend: 'up'
    },
    { 
      title: 'Active Suppliers', 
      value: '89', 
      change: '+5%', 
      changeType: 'positive',
      icon: Package, 
      color: 'bg-green-500',
      trend: 'up'
    },
    { 
      title: 'Products', 
      value: '3,456', 
      change: '+8%', 
      changeType: 'positive',
      icon: ShoppingCart, 
      color: 'bg-purple-500',
      trend: 'up'
    },
    { 
      title: 'Monthly Revenue', 
      value: '$156,780', 
      change: '-2%', 
      changeType: 'negative',
      icon: DollarSign, 
      color: 'bg-orange-500',
      trend: 'down'
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => {
        const Icon = stat.icon
        return (
          <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</p>
                  <div className="flex items-center space-x-1">
                    {stat.trend === 'up' ? (
                      <ArrowUp size={14} className={`${stat.changeType === 'positive' ? 'text-green-500' : 'text-red-500'}`} />
                    ) : (
                      <ArrowDown size={14} className={`${stat.changeType === 'positive' ? 'text-green-500' : 'text-red-500'}`} />
                    )}
                    <span className={`text-sm font-medium ${stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.change}
                    </span>
                    <span className="text-sm text-gray-500">vs last month</span>
                  </div>
                </div>
                <div className={`${stat.color} p-4 rounded-xl shadow-lg`}>
                  <Icon size={24} className="text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

// Recent Activity Component
const RecentActivity = () => {
  const activities = [
    { id: 1, type: 'user_registered', user: 'Sarah Wilson', action: 'registered as new supplier', time: '5 minutes ago', icon: Users, color: 'text-blue-500' },
    { id: 2, type: 'product_added', user: 'TechCorp Solutions', action: 'added new product "5G Router Pro"', time: '15 minutes ago', icon: Package, color: 'text-green-500' },
    { id: 3, type: 'order_completed', user: 'Network Supplies Ltd', action: 'completed order #12456', time: '1 hour ago', icon: CheckCircle, color: 'text-purple-500' },
    { id: 4, type: 'payment_received', user: 'Telecom Parts Inc', action: 'payment of $2,450 received', time: '2 hours ago', icon: DollarSign, color: 'text-orange-500' },
    { id: 5, type: 'stock_alert', user: 'System', action: 'low stock alert for Fiber Cable 50m', time: '3 hours ago', icon: AlertTriangle, color: 'text-red-500' }
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => {
            const Icon = activity.icon
            return (
              <div key={activity.id} className="flex items-start space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <div className={`p-2 rounded-full bg-gray-100 ${activity.color}`}>
                  <Icon size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900">
                    <span className="font-medium">{activity.user}</span> {activity.action}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            )
          })}
        </div>
        <div className="mt-4 pt-4 border-t border-gray-200">
          <Button variant="ghost" className="w-full">
            View All Activity
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

// Admin Dashboard Page
const AdminDashboard = () => {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">
            Welcome back! Here's what's happening with your telecom inventory.
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus size={16} className="mr-2" />
            Quick Add
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <DashboardStats />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity - Takes 2 columns */}
        <div className="lg:col-span-2">
          <RecentActivity />
        </div>

        {/* Right Sidebar - Quick Insights */}
        <div className="space-y-6">
          {/* Low Stock Alert */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-red-600">Stock Alerts</CardTitle>
                <AlertTriangle size={20} className="text-red-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Fiber Cable 50m</p>
                    <p className="text-xs text-red-600">Only 5 units left</p>
                  </div>
                  <Badge variant="destructive">Critical</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Network Router Pro</p>
                    <p className="text-xs text-yellow-600">25 units remaining</p>
                  </div>
                  <Badge variant="warning">Low</Badge>
                </div>
              </div>
              <Button variant="outline" className="w-full mt-4">
                View All Alerts
              </Button>
            </CardContent>
          </Card>

          {/* Top Suppliers */}
          <Card>
            <CardHeader>
              <CardTitle>Top Suppliers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: 'TechCorp Solutions', revenue: '$45,280', products: 156, growth: '+15%' },
                  { name: 'Network Supplies Ltd', revenue: '$32,150', products: 89, growth: '+8%' },
                  { name: 'Telecom Parts Inc', revenue: '$28,940', products: 67, growth: '+12%' }
                ].map((supplier, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-medium text-sm">
                        {supplier.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{supplier.name}</p>
                        <p className="text-xs text-gray-500">{supplier.products} products</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-gray-900">{supplier.revenue}</p>
                      <p className="text-xs text-green-600">{supplier.growth}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Pending Approvals */}
          <Card>
            <CardHeader>
              <CardTitle className="text-orange-600">Pending Approvals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900">New Supplier</p>
                    <p className="text-xs text-gray-600">DataLink Communications</p>
                  </div>
                  <Badge variant="warning">Review</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Product Update</p>
                    <p className="text-xs text-gray-600">WiFi 6 Router - Price Change</p>
                  </div>
                  <Badge variant="default">Approve</Badge>
                </div>
              </div>
              <Button variant="outline" className="w-full mt-4">
                View All Pending
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard;