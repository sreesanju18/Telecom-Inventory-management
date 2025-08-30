"use client";
import React, { useState, useEffect } from 'react';
import { 
  Table, 
  Button, 
  Input, 
  Modal, 
  Form,
  message 
} from 'antd';
import { Edit2, PlusCircle, Trash2 } from 'lucide-react';

// Add this mock data after the imports and before the ProductsPage component

const mockProducts = [
  {
    id: 1,
    name: 'iPhone 14 Pro',
    category: 'phones',
    price: 999.99,
    stock: 50
  },
  {
    id: 2,
    name: 'Samsung Galaxy S23',
    category: 'phones',
    price: 899.99,
    stock: 45
  },
  {
    id: 3,
    name: 'AirPods Pro',
    category: 'accessories',
    price: 249.99,
    stock: 100
  },
  {
    id: 4,
    name: 'Cisco Router',
    category: 'network',
    price: 299.99,
    stock: 30
  },
  {
    id: 5,
    name: 'Network Cable Cat6',
    category: 'network',
    price: 19.99,
    stock: 200
  }
];

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

    const fetchProducts = async () => {
    setLoading(true);
    try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setProducts(mockProducts);
    } catch (error) {
        message.error('Failed to fetch products');
    }
    setLoading(false);
    };

  const columns = [
    {
      title: 'Product Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      filters: [
        { text: 'Phones', value: 'phones' },
        { text: 'Accessories', value: 'accessories' },
        { text: 'Network Equipment', value: 'network' },
      ],
      onFilter: (value, record) => record.category === value,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: 'Stock',
      dataIndex: 'stock',
      key: 'stock',
      sorter: (a, b) => a.stock - b.stock,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <>
          <Button 
            icon={<Edit2 size={16}/>} 
            onClick={() => handleEdit(record)}
            style={{ marginRight: 8 }}
          />
          <Button 
            icon={<Trash2 size={16}/>} 
            danger 
            onClick={() => handleDelete(record.id)}
          />
        </>
      ),
    },
  ];

  const handleEdit = (record) => {
    setEditingId(record.id);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/products/${id}`, { method: 'DELETE' });
      message.success('Product deleted successfully');
      fetchProducts();
    } catch (error) {
      message.error('Failed to delete product');
    }
  };

  const handleSubmit = async (values) => {
    try {
      const method = editingId ? 'PUT' : 'POST';
      const url = editingId ? `/api/products/${editingId}` : '/api/products';
      
      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      message.success(`Product ${editingId ? 'updated' : 'added'} successfully`);
      setIsModalVisible(false);
      form.resetFields();
      setEditingId(null);
      fetchProducts();
    } catch (error) {
      message.error('Failed to save product');
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Products Management</h1>
        <Button 
          type="primary"
          icon={<PlusCircle size={16}/>}
          onClick={() => {
            setEditingId(null);
            form.resetFields();
            setIsModalVisible(true);
          }}
        >
          Add Product
        </Button>
      </div>

      <Table 
        columns={columns} 
        dataSource={products}
        rowKey="id"
        loading={loading}
      />

      <Modal
        title={editingId ? 'Edit Product' : 'Add Product'}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Form.Item
            name="name"
            label="Product Name"
            rules={[{ required: true, message: 'Please enter product name' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true, message: 'Please select category' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="price"
            label="Price"
            rules={[{ required: true, message: 'Please enter price' }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="stock"
            label="Stock"
            rules={[{ required: true, message: 'Please enter stock quantity' }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item>
            <div className="flex justify-end gap-2">
              <Button onClick={() => setIsModalVisible(false)}>Cancel</Button>
              <Button type="primary" htmlType="submit">
                {editingId ? 'Update' : 'Add'}
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ProductsPage;