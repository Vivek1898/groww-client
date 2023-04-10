import { Row, Col, Divider } from "antd";
import AdminLayout from "../../components/layout/AdminLayout";
import RenderProgress from "../../components/progress/RenderProgressCircle";
import useNumbers from "../../hooks/useNumbers";

function Admin() {
  const { numbers } = useNumbers();

  return (
    <AdminLayout>
      <Row>
        <Col span={24}>
          <Divider>
            <h1>Statistics</h1>
          </Divider>
        </Col>
      </Row>

      <Row>
        {/* posts */}
        <Col
          span={12}
          style={{ marginTop: 50, textAlign: "center", fontSize: 20 }}
        >
          <RenderProgress
            number={numbers.transactions}
            name="Transactions"
            link="/admin/posts"
          />
        </Col>
        {/* comments */}
        <Col
          span={12}
          style={{ marginTop: 50, textAlign: "center", fontSize: 20 }}
        >
          <RenderProgress
            number={numbers.plans}
            name="Plans"
            link="/admin/comments"
          />
        </Col>
      </Row>

      <Row>
        {/* catgories */}
        <Col
          span={12}
          style={{ marginTop: 50, textAlign: "center", fontSize: 20 }}
        >
          <RenderProgress
            number={numbers.latestBalance}
            name="Money Recived"
            link="/admin/categories"
          />
        </Col>
        {/* users */}
        <Col
          span={12}
          style={{ marginTop: 50, textAlign: "center", fontSize: 20 }}
        >
          <RenderProgress
            number={numbers.users}
            name="Users"
            link="/admin/users"
          />
        </Col>
      </Row>
    </AdminLayout>
  );
}

export default Admin;
