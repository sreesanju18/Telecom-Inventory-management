// app/supplier/layout.jsx
'use client'

import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { 
  Home, 
  Package, 
  TrendingUp, 
  Plus,
  FileText,
  Settings,
  LogOut,
  Bell,
  Search,
  Menu,
  X,
  ChevronDown,
  User,
  ShoppingBag,
  ClipboardList,
  HelpCircle,
  MessageSquare,
  DollarSign
} from 'lucide-react'

// Mock supplier user data - in real app, this would come from auth context
const mockSupplierUser = {
  id: 2,
  name: 'Jane Supplier',
  email: 'supplier@techcorp.com',
  role: 'supplier',
  companyName: 'TechCorp Solutions',
  supplierStatus: 'active',
  avatar: null
}

const SupplierLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [notifications, setNotifications] = useState([])
  const [notificationOpen, setNotificationOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  // Navigation items for supplier
  const navigationItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: Home,
      href: '/supplier',
      active: pathname === '/supplier',
      description: 'Overview & quick stats'
    },
    {
      id: 'products',
      label: 'My Products',
      icon: Package,
      href: '/supplier/products',
      active: pathname === '/supplier/products',
      description: 'Manage your inventory'
    },
    {
      id: 'orders',
      label: 'Orders',
      icon: ShoppingBag,
      href: '/supplier/orders',
      active: pathname === '/supplier/orders',
      description: 'View and manage orders'
    },
    {
      id: 'transactions',
      label: 'Transactions',
      icon: TrendingUp,
      href: '/supplier/transactions',
      active: pathname === '/supplier/transactions',
      description: 'Financial records'
    },
    {
      id: 'invoices',
      label: 'Invoices',
      icon: FileText,
      href: '/supplier/invoices',
      active: pathname === '/supplier/invoices',
      description: 'Billing & payments'
    },
    {
      id: 'reports',
      label: 'Reports',
      icon: ClipboardList,
      href: '/supplier/reports',
      active: pathname === '/supplier/reports',
      description: 'Sales & performance'
    }
  ]

  // Quick action items
  const quickActions = [
    {
      id: 'add-product',
      label: 'Add Product',
      icon: Plus,
      action: () => router.push('/supplier/products/add'),
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      id: 'support',
      label: 'Support',
      icon: HelpCircle,
      action: () => router.push('/supplier/support'),
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      id: 'messages',
      label: 'Messages',
      icon: MessageSquare,
      action: () => router.push('/supplier/messages'),
      color: 'bg-purple-500 hover:bg-purple-600'
    }
  ]

  // Mock notifications specific to suppliers
  useEffect(() => {
    setNotifications([
      { id: 1, title: 'New Order Received', message: 'Order #SP-12345 for Fiber Optic Cable', time: '10m ago', unread: true, type: 'order' },
      { id: 2, title: 'Payment Processed', message: 'Payment of $2,450 has been credited', time: '1h ago', unread: true, type: 'payment' },
      { id: 3, title: 'Product Approved', message: '5G Antenna Module has been approved', time: '3h ago', unread: false, type: 'approval' },
      { id: 4, title: 'Low Stock Alert', message: 'Network Router Pro is running low', time: '5h ago', unread: false, type: 'stock' }
    ])
  }, [])

  const handleNavigation = (href) => {
    router.push(href)
    setSidebarOpen(false) // Close mobile sidebar after navigation
  }

  const handleLogout = () => {
    // In real app, clear auth tokens and redirect to login
    router.push('/login')
  }

  const unreadNotifications = notifications.filter(n => n.unread).length

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'order': return ShoppingBag
      case 'payment': return DollarSign
      case 'approval': return Package
      case 'stock': return Bell
      default: return Bell
    }
  }

  const getNotificationColor = (type) => {
    switch (type) {
      case 'order': return 'border-l-blue-500 bg-blue-50'
      case 'payment': return 'border-l-green-500 bg-green-50'
      case 'approval': return 'border-l-purple-500 bg-purple-50'
      case 'stock': return 'border-l-orange-500 bg-orange-50'
      default: return 'border-l-gray-500 bg-gray-50'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-72 bg-gradient-to-b from-slate-900 to-slate-800 text-white transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        {/* Sidebar header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700/50">
          <div>
            <h1 className="text-xl font-bold text-white">Telecom Inventory</h1>
            <p className="text-sm text-blue-300">Supplier Portal</p>
            <p className="text-xs text-slate-400 mt-1">{mockSupplierUser.companyName}</p>
          </div>
          <button 
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1 rounded-md hover:bg-slate-700/50"
          >
            <X size={20} />
          </button>
        </div>

        {/* Quick Actions */}
        <div className="p-4 border-b border-slate-700/50">
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
            Quick Actions
          </h3>
          <div className="grid grid-cols-3 gap-2">
            {quickActions.map((action) => {
              const Icon = action.icon
              return (
                <button
                  key={action.id}
                  onClick={action.action}
                  className={`${action.color} text-white p-2.5 rounded-lg transition-all duration-200 hover:shadow-lg hover:scale-105 flex flex-col items-center space-y-1`}
                  title={action.label}
                >
                  <Icon size={16} />
                  <span className="text-xs font-medium">{action.label.split(' ')[0]}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 overflow-y-auto">
          <div className="space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item.href)}
                  className={`w-full flex items-start px-4 py-3 text-left rounded-xl transition-all duration-200 group ${
                    item.active 
                      ? 'bg-blue-600 text-white shadow-xl shadow-blue-500/25 scale-105' 
                      : 'text-slate-300 hover:bg-slate-700/50 hover:text-white hover:scale-102'
                  }`}
                >
                  <Icon 
                    size={20} 
                    className={`mr-3 mt-0.5 flex-shrink-0 transition-colors ${
                      item.active ? 'text-white' : 'text-slate-400 group-hover:text-blue-300'
                    }`} 
                  />
                  <div className="flex-1 min-w-0">
                    <span className="font-medium block">{item.label}</span>
                    <span className={`text-xs block mt-0.5 ${
                      item.active ? 'text-blue-100' : 'text-slate-500 group-hover:text-slate-400'
                    }`}>
                      {item.description}
                    </span>
                  </div>
                  {item.active && (
                    <div className="w-2 h-2 bg-white rounded-full flex-shrink-0 mt-2"></div>
                  )}
                </button>
              )
            })}
          </div>
        </nav>

        {/* Supplier Status Badge */}
        <div className="px-4 pb-4">
          <div className={`px-3 py-2 rounded-lg text-center text-sm font-medium ${
            mockSupplierUser.supplierStatus === 'active' 
              ? 'bg-green-500/20 text-green-300 border border-green-500/30' 
              : 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
          }`}>
            <span className="capitalize">{mockSupplierUser.supplierStatus}</span> Supplier
          </div>
        </div>

        {/* Sidebar footer */}
        <div className="p-4 border-t border-slate-700/50">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <User size={20} className="text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{mockSupplierUser.name}</p>
              <p className="text-xs text-slate-400 truncate">{mockSupplierUser.email}</p>
            </div>
          </div>
          
          <div className="space-y-1">
            <button 
              onClick={() => handleNavigation('/supplier/profile')}
              className="w-full flex items-center px-3 py-2 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors text-sm"
            >
              <Settings size={16} className="mr-3" />
              Profile Settings
            </button>
            
            <button 
              onClick={handleLogout}
              className="w-full flex items-center px-3 py-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors text-sm"
            >
              <LogOut size={16} className="mr-3" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:ml-72">
        {/* Top header */}
        <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
          <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
            {/* Left side - Mobile menu button and search */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              >
                <Menu size={20} />
              </button>
              
              {/* Search bar */}
              <div className="hidden sm:block relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={16} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search products, orders..."
                  className="block w-80 pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Right side - Quick stats, notifications and user menu */}
            <div className="flex items-center space-x-4">
              {/* Quick stats for suppliers */}
              <div className="hidden xl:flex items-center space-x-4 px-4 py-2 bg-gray-50 rounded-lg">
                <div className="text-center">
                  <p className="text-xs text-gray-500">Products</p>
                  <p className="text-sm font-semibold text-gray-900">45</p>
                </div>
                <div className="w-px h-8 bg-gray-300"></div>
                <div className="text-center">
                  <p className="text-xs text-gray-500">Orders</p>
                  <p className="text-sm font-semibold text-green-600">12</p>
                </div>
                <div className="w-px h-8 bg-gray-300"></div>
                <div className="text-center">
                  <p className="text-xs text-gray-500">Revenue</p>
                  <p className="text-sm font-semibold text-blue-600">$12.4k</p>
                </div>
              </div>

              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setNotificationOpen(!notificationOpen)}
                  className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg relative"
                >
                  <Bell size={20} />
                  {unreadNotifications > 0 && (
                    <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
                      {unreadNotifications}
                    </span>
                  )}
                </button>

                {/* Notifications dropdown */}
                {notificationOpen && (
                  <div className="absolute right-0 mt-2 w-96 bg-white rounded-xl shadow-xl border border-gray-200 py-3 z-50">
                    <div className="px-4 py-2 border-b border-gray-200">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-semibold text-gray-900">Notifications</h3>
                        <span className="text-xs text-gray-500">{unreadNotifications} new</span>
                      </div>
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                      {notifications.map((notification) => {
                        const NotificationIcon = getNotificationIcon(notification.type)
                        return (
                          <div key={notification.id} className={`px-4 py-4 hover:bg-gray-50 border-l-4 ${
                            notification.unread ? getNotificationColor(notification.type) : 'border-l-transparent'
                          }`}>
                            <div className="flex items-start space-x-3">
                              <div className={`p-2 rounded-lg ${
                                notification.type === 'order' ? 'bg-blue-100 text-blue-600' :
                                notification.type === 'payment' ? 'bg-green-100 text-green-600' :
                                notification.type === 'approval' ? 'bg-purple-100 text-purple-600' :
                                'bg-orange-100 text-orange-600'
                              }`}>
                                <NotificationIcon size={16} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                  <h4 className="text-sm font-medium text-gray-900">{notification.title}</h4>
                                  {notification.unread && (
                                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                  )}
                                </div>
                                <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                                <p className="text-xs text-gray-500 mt-2">{notification.time}</p>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                    <div className="px-4 py-2 border-t border-gray-200">
                      <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                        View all notifications
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* User menu */}
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center space-x-2 p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <User size={16} className="text-white" />
                  </div>
                  <span className="hidden sm:block text-sm font-medium text-gray-700">
                    {mockSupplierUser.name}
                  </span>
                  <ChevronDown size={16} className="text-gray-400" />
                </button>

                {/* User dropdown */}
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50">
                    <div className="px-4 py-3 border-b border-gray-200">
                      <p className="text-sm font-medium text-gray-900">{mockSupplierUser.name}</p>
                      <p className="text-xs text-gray-500">{mockSupplierUser.email}</p>
                      <p className="text-xs text-blue-600 font-medium mt-1">{mockSupplierUser.companyName}</p>
                    </div>
                    
                    <button 
                      onClick={() => handleNavigation('/supplier/profile')}
                      className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
                    >
                      <User size={16} className="inline mr-2" />
                      Profile & Company Settings
                    </button>
                    
                    <button 
                      onClick={() => handleNavigation('/supplier/support')}
                      className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
                    >
                      <HelpCircle size={16} className="inline mr-2" />
                      Help & Support
                    </button>
                    
                    <div className="border-t border-gray-200 my-1"></div>
                    
                    <button 
                      onClick={handleLogout}
                      className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                    >
                      <LogOut size={16} className="inline mr-2" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>

      {/* Click outside handlers */}
      {notificationOpen && (
        <div 
          className="fixed inset-0 z-20" 
          onClick={() => setNotificationOpen(false)}
        />
      )}
      
      {userMenuOpen && (
        <div 
          className="fixed inset-0 z-20" 
          onClick={() => setUserMenuOpen(false)}
        />
      )}
    </div>
  )
}

export default SupplierLayout