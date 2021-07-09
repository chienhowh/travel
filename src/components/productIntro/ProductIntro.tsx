import { Typography, Carousel, Table, Image, Rate } from "antd";
import { ColumnsType } from "antd/lib/table/interface";
import styles from './ProductIntro.module.css';
import uuid from 'react-uuid';
// 旅遊資料
interface PropsType {
    title: string;
    shortDescription: string;
    price: string | number;
    coupons: string;
    points: string;
    discount: string;
    rating: string | number;
    pictures: string[];
}

// 欄位名稱
const columns: ColumnsType<RowType> = [
    {
        title: "主題",
        dataIndex: "title",
        key: "title",
        align: "left",
        width: 120,
    },
    {
        title: "描述",
        dataIndex: "description",
        key: "description",
        align: "center",
    },
];

// 資料
interface RowType {
    title: string;
    description: string | number | JSX.Element;
    key: number;
}


export const ProductIntro: React.FC<PropsType> = ({
    title,
    shortDescription,
    price,
    coupons,
    discount,
    rating,
    pictures,
}) => {

    const tableDataSource: RowType[] = [
        {
            key: 0,
            title: "路線名稱",
            description: title,
        },
        {
            key: 1,
            title: "價格",
            description: (
                <>
                    ${" "}
                    <Typography.Text type="danger" strong>
                        {price}
                    </Typography.Text>
                </>
            ),
        },
        {
            key: 2,
            title: "限時搶購折購",
            description: discount ? (
                <>
                    $ <Typography.Text delete>{price}</Typography.Text>{" "}
                    <Typography.Text type="danger" strong>
                        $ {discount}
                    </Typography.Text>
                </>
            ) : (
                "暫無折扣"
            ),
        },
        {
            key: 2,
            title: "領取優惠",
            description: coupons ? discount : "無優惠券可領",
        },
        {
            key: 2,
            title: "線路評價",
            description: (
                <>
                    <Rate allowHalf defaultValue={+rating} />
                    <Typography.Text style={{ marginLeft: 10 }}>
                        {rating} 星
                    </Typography.Text>
                </>
            ),
        },
    ];
    return (<div className={styles["intro-container"]}>
        <Typography.Title level={4}>{title}</Typography.Title>
        <Typography.Text>{shortDescription}</Typography.Text>
        <div className={styles["intro-detail-content"]}>
            <Typography.Text style={{ marginLeft: 20 }}>
                $ <span className={styles["intro-detail-strong-text"]}>{price}</span>{" "}
                /人起
            </Typography.Text>
            <Typography.Text style={{ marginLeft: 50 }}>
                <span className={styles["intro-detail-strong-text"]}>{rating}</span>{" "}
                分
            </Typography.Text>
        </div>
        <Carousel autoplay slidesToShow={3}>
            {pictures.map((p) => (
                <Image height={150} src={p} key={uuid()} />
            ))}
        </Carousel>
        <Table
            columns={columns}
            dataSource={tableDataSource}
            size="small"
            bordered={false}
            pagination={false}
            showHeader={false}
        />
    </div>)
}