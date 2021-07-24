import React from "react";
import {
  Skeleton,
  Card,
  Button,
  Typography,
  Table,
} from "antd";
import { DeleteOutlined, CheckCircleOutlined } from "@ant-design/icons";
import { ColumnsType } from "antd/es/table";

const { Meta } = Card;
const { Title, Text } = Typography;

interface Item {
  key: number;
  item: string;
  amount: string | number | JSX.Element;
}

const columns: ColumnsType<Item> = [
  {
    title: "项目",
    dataIndex: "item",
    key: "item",
  },
  {
    title: "金额",
    dataIndex: "amount",
    key: "amount",
  },
];

interface PropsType {
  loading: boolean;
  originalPrice: number;
  price: number;
  onShoppingCartClear: () => void;
  onCheckout: () => void;
}

export const PaymentCard: React.FC<PropsType> = ({
  loading,
  originalPrice,
  price,
  onShoppingCartClear,
  onCheckout,
}) => {
  const paymentData: Item[] = [
    {
      key: 1,
      item: "原價",
      amount: <Text delete>NT {originalPrice}</Text>,
    },
    {
      key: 3,
      item: "現價",
      amount: (
        <Title type="danger" level={2}>
          NT {price}
        </Title>
      ),
    },
  ];

  return (
    <Card
      style={{ marginTop: 16 }}
      actions={[
        <Button type="primary" danger onClick={onCheckout} loading={loading}>
          <CheckCircleOutlined />
          下單支付
        </Button>,
        <Button onClick={onShoppingCartClear} loading={loading}>
          <DeleteOutlined />
          清空
        </Button>,
      ]}
    >
      <Skeleton loading={loading} active>
        <Meta
          title={<Title level={2}>總計</Title>}
          description={
            <Table<Item>
              columns={columns}
              dataSource={paymentData}
              showHeader={false}
              size="small"
              bordered={false}
              pagination={false}
            />
          }
        />
      </Skeleton>
    </Card>
  );
};
