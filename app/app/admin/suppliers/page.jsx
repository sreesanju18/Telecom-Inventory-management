'use client'

import { useState, useEffect } from 'react'
import { 
  Search, 
  Plus, 
  Filter, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Eye, 
  UserCheck, 
  UserX,
  Mail,
  Phone,
  Building,
  Calendar,
  MapPin,
  Package,
  TrendingUp,
  Star,
  Download,
  FileText,
  DollarSign,
  AlertCircle,
  CheckCircle,
  Clock,
  ExternalLink
} from 'lucide-react'

// Mock suppliers data
const mockSuppliers = [
  {
    id: 1,
    userId: 3,
    companyName: 'TechCorp Solutions',
    businessLicense: 'TC2024001',
    contactPerson: 'Mike Johnson',
    email: 'contact@techcorp.com',
    phone: '+1-555-123-4567',
    address: '123 Tech Street, Silicon Valley, CA 94025',
    supplierType: 'Network Equipment',
    status: 'active',
    rating: 4.8,
    totalProducts: 45,
    totalOrders: 128,
    totalRevenue: 245000,
    joinedDate: '2024-03-10',
    lastOrderDate: '2024-08-25',
    verificationStatus: 'verified',
    documents: {
      businessLicense: 'approved',
      taxCertificate: 'approved', 
      bankDetails: 'approved'
    },
    performance: {
      orderFulfillmentRate: 98.5,
      averageDeliveryTime: 3.2,
      returnRate: 1.2
    },
    specializations: ['5G Equipment', 'Routers', 'Switches', 'Fiber Optics'],
    paymentTerms: 'Net 30',
    website: 'https://techcorp-solutions.com'
  },
  {
    id: 2,
    userId: 4,
    companyName: 'GlobalTech Systems',
    businessLicense: 'GT2024002',
    contactPerson: 'Lisa Chen',
    email: 'info@globaltech.com',
    phone: '+1-555-987-6543',
    address: '456 Global Ave, New York, NY 10001',
    supplierType: 'Mobile Devices',
    status: 'pending',
    rating: null,
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    joinedDate: '2024-08-28',
    lastOrderDate: null,
    verificationStatus: 'pending',
    documents: {
      businessLicense: 'pending',
      taxCertificate: 'pending',
      bankDetails: 'pending'
    },
    performance: {
      orderFulfillmentRate: null,
      averageDeliveryTime: null,
      returnRate: null
    },
    specializations: ['Smartphones', 'Tablets', 'Accessories'],
    paymentTerms: 'Net 15',
    website: 'https://globaltech-systems.com'
  },
  {
    id: 3,
    userId: 5,
    companyName: 'SecureNet Inc',
    businessLicense: 'SN2024003',
    contactPerson: 'David Wilson',
    email: 'admin@securenet.com',
    phone: '+1-555-456-7890',
    address: '789 Security Blvd, Austin, TX 73301',
    supplierType: 'Security Equipment',
    status: 'inactive',
    rating: 4.2,
    totalProducts: 23,
    totalOrders: 67,
    totalRevenue: 89000,
    joinedDate: '2024-01-05',
    lastOrderDate: '2024-07-15',
    verificationStatus: 'verified',
    documents: {
      businessLicense: 'approved',
      taxCertificate: 'approved',
      bankDetails: 'expired'
    },
    performance: {
      orderFulfillmentRate: 94.2,
      averageDeliveryTime: 4.1,
      returnRate: 2.8
    },
    specializations: ['Firewalls', 'VPN Devices', 'Security Cameras', 'Access Control'],
    paymentTerms: 'Net 45',
    website: 'https://securenet-inc.com'
  },
  {
    id: 4,
    userId: 6,
    companyName: 'ConnectWave Ltd',
    businessLicense: 'CW2024004',
    contactPerson: 'Emma Rodriguez',
    email: 'sales@connectwave.com',
    phone: '+1-555-789-0123',
    address: '321 Wave Street, Miami, FL 33101',
    supplierType: 'Accessories',
    status: 'active',
    rating: 4.6,
    totalProducts: 78,
    totalOrders: 234,
    totalRevenue: 156000,
    joinedDate: '2024-02-15',
    lastOrderDate: '2024-08-29',
    verificationStatus: 'verified',
    documents: {
      businessLicense: 'approved',
      taxCertificate: 'approved',
      bankDetails: 'approved'
    },
    performance: {
      orderFulfillmentRate: 96.8,
      averageDeliveryTime: 2.8,
      returnRate: 1.8
    },
    specializations: ['Cables', 'Connectors', 'Power Supplies', 'Tools'],
    paymentTerms: 'Net 30',
    website: 'https://connectwave.com'
  },
  {
    id: 5,
    userId: 7,
    companyName: 'FiberLink Technologies',
    businessLicense: 'FL2024005',
    contactPerson: 'Alex Thompson',
    email: 'contact@fiberlink.com',
    phone: '+1-555-345-6789',
    address: '987 Fiber Road, Seattle, WA 98101',
    supplierType: 'Network Equipment',
    status: 'active',
    rating: 4.9,
    totalProducts: 32,
    totalOrders: 89,
    totalRevenue: 198000,
    joinedDate: '2024-01-20',
    lastOrderDate: '2024-08-30',
    verificationStatus: 'verified',
    documents: {
      businessLicense: 'approved',
      taxCertificate: 'approved',
      bankDetails: 'approved'
    },
    performance: {
      orderFulfillmentRate: 99.1,
      averageDeliveryTime: 2.5,
      returnRate: 0.9
    },
    specializations: ['Fiber Optic Cables', 'Optical Transceivers', 'Splitters', 'Patch Panels'],
    paymentTerms: 'Net 30',
    website: 'https://fiberlink-tech.com'
  }
]

const SuppliersManagement = () => {
  const [suppliers, setSuppliers] = useState(mockSuppliers)
  const [filteredSuppliers, setFilteredSuppliers] = useState(mockSuppliers)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedVerification, setSelectedVerification] = useState('all')
  const [showSupplierModal, setShowSupplierModal] = useState(false)
  const [selectedSupplier, setSelectedSupplier] = useState(null)
  const [modalType, setModalType] = useState('view') // 'view', 'edit', 'create'
  const [showQuickActions, setShowQuickActions] = useState(null)

  // Filter suppliers
  useEffect(() => {
    let filtered = suppliers

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(supplier => 
        supplier.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        supplier.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
        supplier.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        supplier.supplierType.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Type filter
    if (selectedType !== 'all') {
      filtered = filtered.filter(supplier => supplier.supplierType === selectedType)
    }

    // Status filter
    if (selectedStatus !== 'all') {
      filtered = filtered.filter(supplier => supplier.status === selectedStatus)
    }

    // Verification filter
    if (selectedVerification !== 'all') {
      filtered = filtered.filter(supplier => supplier.verificationStatus === selectedVerification)
    }

    setFilteredSuppliers(filtered)
  }, [suppliers, searchTerm, selectedType, selectedStatus, selectedVerification])

  const handleViewSupplier = (supplier) => {
    setSelectedSupplier(supplier)
    setModalType('view')
    setShowSupplierModal(true)
  }

  const handleEditSupplier = (supplier) => {
    setSelectedSupplier(supplier)
    setModalType('edit')
    setShowSupplierModal(true)
  }

  const handleCreateSupplier = () => {
    setSelectedSupplier(null)
    setModalType('create')
    setShowSupplierModal(true)
  }

  const handleStatusChange = (supplierId, newStatus) => {
    setSuppliers(suppliers.map(supplier => 
      supplier.id === supplierId ? { ...supplier, status: newStatus } : supplier
    ))
  }

  const handleVerificationChange = (supplierId, newVerification) => {
    setSuppliers(suppliers.map(supplier => 
      supplier.id === supplierId ? { ...supplier, verificationStatus: newVerification } : supplier
    ))
  }

  const handleDeleteSupplier = (supplierId) => {
    if (window.confirm('Are you sure you want to delete this supplier?')) {
      setSuppliers(suppliers.filter(supplier => supplier.id !== supplierId))
    }
  }

  const getStatusBadge = (status) => {
    const statusStyles = {
      active: 'bg-green-100 text-green-800 border-green-200',
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      inactive: 'bg-red-100 text-red-800 border-red-200'
    }
    
    const statusIcons = {
      active: CheckCircle,
      pending: Clock,
      inactive: AlertCircle
    }
    
    const Icon = statusIcons[status]
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusStyles[status]}`}>
        <Icon size={12} className="mr-1" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    )
  }

  const getVerificationBadge = (verification) => {
    const verificationStyles = {
      verified: 'bg-green-100 text-green-800 border-green-200',
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      rejected: 'bg-red-100 text-red-800 border-red-200'
    }
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${verificationStyles[verification]}`}>
        {verification.charAt(0).toUpperCase() + verification.slice(1)}
      </span>
    )
  }

  const getRatingStars = (rating) => {
    if (!rating) return <span className="text-gray-400 text-sm">No rating</span>
    
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star 
            key={star} 
            size={14} 
            className={`${star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
          />
        ))}
        <span className="ml-1 text-sm text-gray-600">({rating})</span>
      </div>
    )
  }

  const supplierTypes = [...new Set(suppliers.map(s => s.supplierType))]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Supplier Management</h1>
          <p className="text-sm text-gray-600 mt-1">
            Manage supplier relationships and vendor information
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-3">
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            <Download size={16} className="mr-2" />
            Export
          </button>
          <button 
            onClick={handleCreateSupplier}
            className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg"
          >
            <Plus size={16} className="mr-2" />
            Add Supplier
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <Building size={16} className="text-white" />
              </div>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">Total Suppliers</p>
              <p className="text-2xl font-bold text-gray-900">{suppliers.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                <CheckCircle size={16} className="text-white" />
              </div>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">Active</p>
              <p className="text-2xl font-bold text-gray-900">
                {suppliers.filter(s => s.status === 'active').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center">
                <Clock size={16} className="text-white" />
              </div>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">Pending</p>
              <p className="text-2xl font-bold text-gray-900">
                {suppliers.filter(s => s.status === 'pending').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                <Package size={16} className="text-white" />
              </div>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">Total Products</p>
              <p className="text-2xl font-bold text-gray-900">
                {suppliers.reduce((sum, s) => sum + s.totalProducts, 0)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
                <DollarSign size={16} className="text-white" />
              </div>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">
                ${(suppliers.reduce((sum, s) => sum + s.totalRevenue, 0) / 1000).toFixed(0)}K
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search suppliers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-3">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Types</option>
              {supplierTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="inactive">Inactive</option>
            </select>

            <select
              value={selectedVerification}
              onChange={(e) => setSelectedVerification(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Verification</option>
              <option value="verified">Verified</option>
              <option value="pending">Pending</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>
      </div>

      {/* Suppliers Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredSuppliers.map((supplier) => (
          <div key={supplier.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            {/* Card Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {supplier.companyName}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">{supplier.supplierType}</p>
                  {getRatingStars(supplier.rating)}
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusBadge(supplier.status)}
                  <div className="relative">
                    <button
                      onClick={() => setShowQuickActions(showQuickActions === supplier.id ? null : supplier.id)}
                      className="p-2 hover:bg-gray-100 rounded-lg"
                    >
                      <MoreHorizontal size={16} />
                    </button>
                    
                    {showQuickActions === supplier.id && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
                        <button
                          onClick={() => handleViewSupplier(supplier)}
                          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          <Eye size={16} className="mr-2" />
                          View Details
                        </button>
                        <button
                          onClick={() => handleEditSupplier(supplier)}
                          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          <Edit size={16} className="mr-2" />
                          Edit
                        </button>
                        {supplier.status === 'pending' && (
                          <button
                            onClick={() => handleStatusChange(supplier.id, 'active')}
                            className="flex items-center w-full px-4 py-2 text-sm text-green-600 hover:bg-green-50"
                          >
                            <UserCheck size={16} className="mr-2" />
                            Approve
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteSupplier(supplier.id)}
                          className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                        >
                          <Trash2 size={16} className="mr-2" />
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Card Content */}
            <div className="p-6">
              {/* Contact Info */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <Phone size={14} className="mr-2 text-gray-400" />
                  {supplier.phone}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Mail size={14} className="mr-2 text-gray-400" />
                  {supplier.email}
                </div>
                <div className="flex items-start text-sm text-gray-600">
                  <MapPin size={14} className="mr-2 text-gray-400 mt-0.5 flex-shrink-0" />
                  <span className="line-clamp-2">{supplier.address}</span>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                  <p className="text-lg font-semibold text-gray-900">{supplier.totalProducts}</p>
                  <p className="text-xs text-gray-600">Products</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-semibold text-gray-900">{supplier.totalOrders}</p>
                  <p className="text-xs text-gray-600">Orders</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-semibold text-gray-900">
                    ${(supplier.totalRevenue / 1000).toFixed(0)}K
                  </p>
                  <p className="text-xs text-gray-600">Revenue</p>
                </div>
              </div>

              {/* Verification Status */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-gray-700">Verification:</span>
                {getVerificationBadge(supplier.verificationStatus)}
              </div>

              {/* Performance Indicators */}
              {supplier.performance.orderFulfillmentRate && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Fulfillment Rate</span>
                    <span className="font-medium">{supplier.performance.orderFulfillmentRate}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full" 
                      style={{ width: `${supplier.performance.orderFulfillmentRate}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>

            {/* Card Footer */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar size={14} className="mr-1" />
                  Joined {new Date(supplier.joinedDate).toLocaleDateString()}
                </div>
                {supplier.website && (
                  <a
                    href={supplier.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-sm text-blue-600 hover:text-blue-800"
                  >
                    <ExternalLink size={14} className="mr-1" />
                    Website
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredSuppliers.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-500">
            <Building size={48} className="mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-medium mb-2">No suppliers found</h3>
            <p className="text-sm">Try adjusting your search or filters</p>
          </div>
        </div>
      )}

      {/* Supplier Modal */}
      {showSupplierModal && (
        <SupplierModal
          supplier={selectedSupplier}
          type={modalType}
          onClose={() => {
            setShowSupplierModal(false)
            setShowQuickActions(null)
          }}
          onSave={(supplierData) => {
            if (modalType === 'create') {
              const newSupplier = {
                ...supplierData,
                id: Math.max(...suppliers.map(s => s.id)) + 1,
                joinedDate: new Date().toISOString().split('T')[0],
                totalProducts: 0,
                totalOrders: 0,
                totalRevenue: 0,
                rating: null,
                lastOrderDate: null,
                performance: {
                  orderFulfillmentRate: null,
                  averageDeliveryTime: null,
                  returnRate: null
                }
              }
              setSuppliers([...suppliers, newSupplier])
            } else if (modalType === 'edit') {
              setSuppliers(suppliers.map(s => s.id === selectedSupplier.id ? { ...s, ...supplierData } : s))
            }
            setShowSupplierModal(false)
            setShowQuickActions(null)
          }}
          onStatusChange={handleStatusChange}
          onVerificationChange={handleVerificationChange}
        />
      )}

      {/* Click outside handler for quick actions */}
      {showQuickActions && (
        <div 
          className="fixed inset-0 z-5" 
          onClick={() => setShowQuickActions(null)}
        />
      )}
    </div>
  )
}

// Supplier Modal Component
const SupplierModal = ({ supplier, type, onClose, onSave, onStatusChange, onVerificationChange }) => {
    return <></>;
}

export default SuppliersManagement