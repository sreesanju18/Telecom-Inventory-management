// app/admin/layout.jsx
'use client'

import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { 
  Home, 
  Users, 
  Package, 
  ShoppingCart, 
  TrendingUp, 
  BarChart3,
  Settings,
  LogOut,
  Bell,
  Search,
  Menu,
  X,
  ChevronDown,
  User
} from 'lucide-react'

// Mock user data - in real app, this would come from auth context
const mockAdminUser = {
  id: 1,
  name: 'John Admin',
  email: 'admin@telecom.com',
  role: 'admin',
  avatar: null
}

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [notifications, setNotifications] = useState([])
  const [notificationOpen, setNotificationOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  // Navigation items for admin
  const navigationItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: Home,
      href: '/admin',
      active: pathname === '/admin'
    },
    {
      id: 'users',
      label: 'User Management',
      icon: Users,
      href: '/admin/users',
      active: pathname === '/admin/users'
    },
    {
      id: 'suppliers',
      label: 'Suppliers',
      icon: Package,
      href: '/admin/suppliers',
      active: pathname === '/admin/suppliers'
    },
    {
      id: 'products',
      label: 'Products',
      icon: ShoppingCart,
      href: '/admin/products',
      active: pathname === '/admin/products'
    },
    {
      id: 'transactions',
      label: 'Transactions',
      icon: TrendingUp,
      href: '/admin/transactions',
      active: pathname === '/admin/transactions'
    },
    {
      id: 'reports',
      label: 'Reports & Analytics',
      icon: BarChart3,
      href: '/admin/reports',
      active: pathname === '/admin/reports'
    },
    {
      id: 'settings',
      label: 'System Settings',
      icon: Settings,
      href: '/admin/settings',
      active: pathname === '/admin/settings'
    }
  ]

  // Mock notifications
  useEffect(() => {
    setNotifications([
      { id: 1, title: 'New supplier registration', message: 'TechCorp Solutions has requested access', time: '5m ago', unread: true },
      { id: 2, title: 'Low stock alert', message: 'Network Router Pro is running low', time: '1h ago', unread: true },
      { id: 3, title: 'Order completed', message: 'Order #12345 has been fulfilled', time: '2h ago', unread: false }
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
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        {/* Sidebar header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <div>
            <h1 className="text-xl font-bold text-white">Telecom Inventory</h1>
            <p className="text-sm text-slate-400">Admin Portal</p>
          </div>
          <button 
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1 rounded-md hover:bg-slate-800"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-6 px-3">
          <div className="space-y-1">
            {navigationItems.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item.href)}
                  className={`w-full flex 9items-center px-3 py-2.5 text-left rounded-lg transition-all duration-200 group ${
                    item.active 
                      ? 'bg-blue-600 text-white shadow-lg' 
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <Icon 
                    size={20} 
                    className={`mr-3 transition-colors ${
                      item.active ? 'text-white' : 'text-slate-400 group-hover:text-white'
                    }`} 
                  />
                  <span className="font-medium">{item.label}</span>
                </button>
              )
            })}
          </div>
        </nav>

        {/* Sidebar footer */}
        <div className="absolute bottom-0 w-full p-4 border-t border-slate-700">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
              <User size={20} className="text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{mockAdminUser.name}</p>
              <p className="text-xs text-slate-400 truncate">{mockAdminUser.email}</p>
            </div>
          </div>
          
          <button 
            onClick={handleLogout}
            className="w-full flex items-center px-3 py-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          >
            <LogOut size={18} className="mr-3" />
            <span className="text-sm">Logout</span>
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:ml-64">
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
                  placeholder="Search..."
                  className="block w-80 pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Right side - Notifications and user menu */}
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setNotificationOpen(!notificationOpen)}
                  className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg relative"
                >
                  <Bell size={20} />
                  {unreadNotifications > 0 && (
                    <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {unreadNotifications}
                    </span>
                  )}
                </button>

                {/* Notifications dropdown */}
                {notificationOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-200">
                      <h3 className="text-sm font-semibold text-gray-900">Notifications</h3>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      {notifications.map((notification) => (
                        <div key={notification.id} className={`px-4 py-3 hover:bg-gray-50 border-l-4 ${
                          notification.unread ? 'border-l-blue-500 bg-blue-50' : 'border-l-transparent'
                        }`}>
                          <h4 className="text-sm font-medium text-gray-900">{notification.title}</h4>
                          <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                          <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                        </div>
                      ))}
                    </div>
                    <div className="px-4 py-2 border-t border-gray-200">
                      <button className="text-sm text-blue-600 hover:text-blue-800">
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
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <User size={16} className="text-white" />
                  </div>
                  <span className="hidden sm:block text-sm font-medium text-gray-700">
                    {mockAdminUser.name}
                  </span>
                  <ChevronDown size={16} className="text-gray-400" />
                </button>

                {/* User dropdown */}
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                    <div className="px-4 py-2 border-b border-gray-200">
                      <p className="text-sm font-medium text-gray-900">{mockAdminUser.name}</p>
                      <p className="text-xs text-gray-500">{mockAdminUser.email}</p>
                    </div>
                    
                    <button 
                      onClick={() => handleNavigation('/admin/profile')}
                      className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
                    >
                      <User size={16} className="inline mr-2" />
                      Profile Settings
                    </button>
                    
                    <button 
                      onClick={() => handleNavigation('/admin/settings')}
                      className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
                    >
                      <Settings size={16} className="inline mr-2" />
                      System Settings
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

export default AdminLayout