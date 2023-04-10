import { useState,useEffect } from "react";
import { Table ,Switch } from "antd";
import axios from "axios";
import AdminLayout from "../../../../components/layout/AdminLayout";

const AllPlans = () => {

    const columns = [
        {
            title: "Plan Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Plan Amount",
            dataIndex: "planAmount",
            key: "planAmount",
        },
        {
            title: "Plan Time",
            dataIndex: "planTime",
            key: "planTime",
        },
        {
            title: "Plan Profit",
            dataIndex: "planProfit",
            key: "planProfit",
        },
        {
            title: "Plan Total Income",
            dataIndex: "planTotalIncome",
            key: "planTotalIncome",
        },
        {
            title: "Active",
            key: "isActive",
            render: (text, record) => (
              <Switch
                checked={record.isActive}
                onChange={(checked) => changeIsActive(record._id, checked)}
              />
            ),
          },
        

    ];


    const [plans, setPlans] = useState([]);
    
    const fetchPlans = async () => {
        const { data } = await axios.get("/plans/admin/get");
        console.log(data)
        setPlans(data.plan);
    };
    
    useEffect(() => {
        fetchPlans();
    }, []);
    const changeIsActive = async (planId, isActive) => {
        console.log(isActive);
        // return;
        try {
          const response = await axios.put(`/plans/admin/change/${planId}`, { isActive });
          console.log(response.data);
          fetchPlans(); // fetch plans again to update the UI
        } catch (error) {
          console.log(error);
        }
      };
      
    
    return (
        <AdminLayout>
        <div className="container-fluid">
            <div className="row">
            <div className="col-md-12 pt-5 pb-5">
                <h2>All Plans</h2>
            </div>
            <div className="col-md-12">
                <Table
                dataSource={plans}
                columns={columns}
                rowKey={(record) => record._id}
                />
            </div>
            </div>
        </div>
        </AdminLayout>
    );
}

export default AllPlans;