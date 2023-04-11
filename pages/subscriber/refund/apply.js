import AdminLayout from "../../../components/layout/AdminLayout";
import SubscriberLayout from "../../../components/layout/SubsLayout";
import { Form, Input, Button, Tag } from "antd";
import axios from "axios";
import { AuthContext } from "../../../context/auth";
import { useContext ,useState} from "react";
import toast from "react-hot-toast";
import WalletDetails from "../../../components/wallet";


const Apply = () => { 
    const [auth, setAuth] = useContext(AuthContext);
    const userId = auth?.user?._id;
    const[form] = Form.useForm();
    const [Wallet, setWallet] = useState(0);
  
  const handleSubmit = async (values) => {
    console.log("hello");
    return;   // alert(values);
    console.table(values);
    try { 
      await axios.post(`/refund/create`, {
           name: values.name,
        email: values.email,
        mobile: values.mobile,
        amount: values.amount,
        upi: values.upi,
        bankName: values.bankName,
        accountNumber: values.accountNumber,
        ifscCode: values.ifscCode,
        user:userId
      });
      toast.success("Withdraw  Applied  successfully!");
      // alert("Withdraw  Applied  successfully!");
      form.resetFields();

    }catch(err){
      console.log(err)
    }

  }
//   console.log("userId")
//  console.log(Wallet)
  return (
    <SubscriberLayout>
      <h1 style={{ textAlign: 'center' }}>Withdraw</h1>
      <br></br>

      <WalletDetails userId={userId}  setwalletBalance={setWallet}/>
      <br></br>
      <h3 className="Withdrawl"  style={{ textAlign: 'center' }} > Available Balance : {Wallet}
      {Wallet<=0 ? (<Tag  style={{ textAlign: 'center' }}color="red">Insufficient Balance</Tag> ):(<Tag  style={{ textAlign: 'center' }}  color="green" >Eligible For Withdrawl</Tag>)}</h3> 

      <Form
        name="creratePlan"
        form={form}
        onFinish={handleSubmit}
        hideRequiredMark
      >
        <Form.Item
          label="Your Name"
          name="name"
          // rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          // rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Mobile"
          name="mobile"
          // rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Amount"
          name="amount"
          // rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

    
        <Form.Item
          label="Upi"
          name="upi"
          // rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Bank Name"
          name="bankName"
          // rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Account Number"
          name="accountNumber"
          // rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="IFSC Code"
          name="ifscCode"
          // rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
     


        <Form.Item>
          <Button type="primary" htmlType="submit" disabled={Wallet<=0}>
          Withdraw
          </Button>
       
        </Form.Item>
      </Form>
      <br></br>
    </SubscriberLayout>
  );
};

export default Apply;
