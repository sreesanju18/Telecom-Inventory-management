"use client";
import React, { useState, useEffect } from 'react';
import { 
  Table, 
  Button, 
  Modal, 
  Form,
  Input,
  Select,
  message 
} from 'antd';
import { Edit2, PlusCircle, Trash2 } from 'lucide-react';

const mockTransactions = [
  {
    id: 1,
    date: '2025-08-30',
    productId: 1,
    productName: 'iPhone 14 Pro',
    type: 'sale',
    quantity: 2,
    amount: 1999.98,
    customer: 'John Doe'
  },
  {
    id: 2,
    date: '2025-08-29',
    productId: 3,
    productName: 'AirPods Pro',
    type: 'purchase',
    quantity: 50,
    amount: 12499.50,
    supplier: 'Apple Inc'
  },
  {
    id: 3,
    date: '2025-08-28',
    productId: 4,
    productName: 'Cisco Router',
    type: 'sale',
    quantity: 5,
    amount: 1499.95,
    customer: 'Tech Solutions Ltd'
  }
];

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setTransactions(mockTransactions);
    } catch (error) {
      message.error('Failed to fetch transactions');
    }
    setLoading(false);
  };

  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      sorter: (a, b) => new Date(a.date) - new Date(b.date),
    },
    {
      title: 'Product',
      dataIndex: 'productName',
      key: 'productName',
      sorter: (a, b) => a.productName.localeCompare(b.productName),
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      filters: [
        { text: 'Sale', value: 'sale' },
        { text: 'Purchase', value: 'purchase' },
      ],
      onFilter: (value, record) => record.type === value,
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      sorter: (a, b) => a.quantity - b.quantity,
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount) => `$${amount.toFixed(2)}`,
      sorter: (a, b) => a.amount - b.amount,
    },
    {
      title: 'Customer/Supplier',
      dataIndex: 'customer',
      key: 'customer',
      render: (customer, record) => customer || record.supplier,
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
      // Simulate API call
      const updatedTransactions = transactions.filter(t => t.id !== id);
      setTransactions(updatedTransactions);
      message.success('Transaction deleted successfully');
    } catch (error) {
      message.error('Failed to delete transaction');
    }
  };

  const handleSubmit = async (values) => {
    try {
      if (editingId) {
        // Update existing transaction
        const updatedTransactions = transactions.map(t => 
          t.id === editingId ? { ...t, ...values } : t
        );
        setTransactions(updatedTransactions);
      } else {
        // Add new transaction
        const newTransaction = {
          id: transactions.length + 1,
          ...values,
          date: new Date().toISOString().split('T')[0]
        };
        setTransactions([...transactions, newTransaction]);
      }
      
      message.success(`Transaction ${editingId ? 'updated' : 'added'} successfully`);
      setIsModalVisible(false);
      form.resetFields();
      setEditingId(null);
    } catch (error) {
      message.error('Failed to save transaction');
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Transactions Management</h1>
        <Button 
          type="primary"
          icon={<PlusCircle size={16}/>}
          onClick={() => {
            setEditingId(null);
            form.resetFields();
            setIsModalVisible(true);
          }}
        >
          Add Transaction
        </Button>
      </div>

      <Table 
        columns={columns} 
        dataSource={transactions}
        rowKey="id"
        loading={loading}
      />

      <Modal
        title={editingId ? 'Edit Transaction' : 'Add Transaction'}
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
            name="productName"
            label="Product Name"
            rules={[{ required: true, message: 'Please enter product name' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="type"
            label="Transaction Type"
            rules={[{ required: true, message: 'Please select transaction type' }]}
          >
            <Select>
              <Select.Option value="sale">Sale</Select.Option>
              <Select.Option value="purchase">Purchase</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="quantity"
            label="Quantity"
            rules={[{ required: true, message: 'Please enter quantity' }]}
          >
            <Input type="number" min={1} />
          </Form.Item>
          <Form.Item
            name="amount"
            label="Amount"
            rules={[{ required: true, message: 'Please enter amount' }]}
          >
            <Input type="number" step="0.01" min="0" />
          </Form.Item>
          <Form.Item
            name="customer"
            label="Customer/Supplier"
            rules={[{ required: true, message: 'Please enter customer/supplier name' }]}
          >
            <Input />
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

export default TransactionsPage;