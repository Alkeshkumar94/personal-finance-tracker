import React from "react";
import { Modal, Button, Form, Input, DatePicker} from "antd";
import "./style.css";

function AddExpense({ isExpenseModalVisible, handleExpenseCancel, onFinish }) {
  const [form] = Form.useForm();
  return (
    <Modal
      style={{ fontWeight: 600 }}
      title="Add Expense"
      open={isExpenseModalVisible}
      onCancel={handleExpenseCancel}
      footer={null}
    >
          <div className="line"></div>
      <Form
        form={form}
        layout="vertical"
        onFinish={(values) => {
          onFinish(values, "expense");
          form.resetFields();
        }}
      >
        <Form.Item
          style={{ fontWeight: 600 }}
          label="name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input the name of transaction!",
            },
          ]}
        >
          <Input type="text" className="custom-Input" />
        </Form.Item>
        <Form.Item
          style={{ fontWeight: 600 }}
          label="Amount"
          name="amount"
          rules={[
            {
              required: true,
              message: "Please input the expense amount!",
            },
          ]}
        >
          <Input type="number" className="custom-Input" />
        </Form.Item>
        <Form.Item
          style={{ fontWeight: 600 }}
          label="Date"
          name="date"
          rules={[
            {
              required: true,
              message: "Please input the expense date!",
            },
          ]}
        >
          <DatePicker className="custom-Input" format="YYYY-MM-DD" />
        </Form.Item>

        <Form.Item
          style={{ fontWeight: 600 }}
          label="Tag"
          name="tag"
          rules={[
            {
              required: true,
              message: "Please input the tag!",
            },
          ]}
        >
          <Input type="text" className="custom-Input" />
        </Form.Item>
        
        <Form.Item>
          <Button className="btn btn-blue" type="primary" htmlType="submit">Add Expense</Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default AddExpense;
