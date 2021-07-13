import React from "react";
import { Image, Typography } from "antd";
import { RouteComponentProps, Link } from 'react-router-dom';
import { tify } from 'chinese-conv';

interface PropsType  {
    id: string | number;
    size: "large" | "small";
    imageSrc: string;
    price: number | string;
    title: string;
}

export const ProductImage: React.FC<PropsType> = ({ id, size, imageSrc, price, title }) => {


    return (
        <Link to={`detail/${id}`}>
            {size === "large" ? (
                <Image src={imageSrc} height={290} width={'100%'} />
            ) : (
                <Image src={imageSrc} height={120} />
            )}
            <div>
                <Typography.Text type="secondary">
                    {tify(title.slice(0, 25))}
                </Typography.Text>
                <Typography.Text type="danger" strong>
                    NT {price} 起
                </Typography.Text>
            </div>
        </Link>
    );
}
