import { Row, Col, Carousel } from "antd";
import React from "react";
import { Header, SideMenu, ProductCollection, Footer } from "../../components";
import { productList1, productList2, productList3 } from "../../mockup";
import style from './Homepage.module.css';
import sideImage from '../../assets/images/sider_2019_12-09.png';
import sideImage2 from '../../assets/images/sider_2019_02-04.png';
import sideImage3 from '../../assets/images/sider_2019_02-04-2.png';
export class Homepage extends React.Component {
    render() {
        return (<>
            <Header></Header>
            {/* 頁面內容 */}
            <div className={style['page-content']}>
                <Row>
                    <Col span={6}> <SideMenu /></Col>
                    <Col span={18}><Carousel /></Col>
                </Row>
                <ProductCollection title={'熱門爆款'} sideImage={sideImage} products={productList1}></ProductCollection>
                <ProductCollection title={'熱門爆款'} sideImage={sideImage2} products={productList2}></ProductCollection>
                <ProductCollection title={'熱門爆款'} sideImage={sideImage3} products={productList3}></ProductCollection>
            </div>
            <Footer></Footer>

        </>)
    }
}