import AdminLayout from "../../../components/layout/AdminLayout";
import { Form, Input, Button } from "antd";
import axios from "axios";
import toast from "react-hot-toast";


const Plans = () => {
  const [form] = Form.useForm(); 
  const handleSubmit = async (values) => {
   // alert(values);
    console.table(values);
    try { 
      await axios.post(`/plans/create`, {
        name: values.name,
        planAmount: values.planAmount,
        planTime: values.planTime,
        planProfit: values.planProfit,
        planTotalIncome: values.planTotalIncome,
      });
      toast.success("Plan created successfully!");
     // alert("Plan created successfully!");

     form.resetFields();

    }catch(err){
      console.log(err)
    }

  }
  return (
    <AdminLayout>
      <Form
      form={form}
        name="creratePlan"
        onFinish={handleSubmit}
        hideRequiredMark
      >
        <Form.Item
          label="Plan Name"
          name="name"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Plan Investment Amount"
          name="planAmount"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Plan Total Days"
          name="planTime"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Plan Profit Per Day"
          name="planProfit"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Plan Total Income"
          name="planTotalIncome"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>


        <Form.Item>
          <Button type="primary" htmlType="submit">
           Create Plan
          </Button>
       
        </Form.Item>
      </Form>
    </AdminLayout>
  );
};

export default Plans;
