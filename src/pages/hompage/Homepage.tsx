import { Row, Col, Spin } from "antd";
import React, { useEffect } from "react";
import { Header, SideMenu, ProductCollection, Footer, Carousel } from "../../components";

import style from './Homepage.module.css';
import sideImage from '../../assets/images/sider_2019_12-09.png';
import sideImage2 from '../../assets/images/sider_2019_02-04.png';
import sideImage3 from '../../assets/images/sider_2019_02-04-2.png';
import { useTranslation } from 'react-i18next';
import { useSelector } from "../../redux/hooks";
import { fetchRecommendProductCreator } from "../../redux/recommendProduct/recommendProductAction";
import { useDispatch } from 'react-redux';

export const Homepage: React.FC = () => {
    const { t } = useTranslation();// i18n
    const productList = useSelector(state => state.recommendProduct.productList);
    const error = useSelector(state => state.recommendProduct.error);
    const isLoading = useSelector(state => state.recommendProduct.isLoading);
    const dispatch = useDispatch();

     function getRecommendProduct() {
         dispatch(fetchRecommendProductCreator());
    }

    useEffect(() => {
        getRecommendProduct();
        // eslint-disable-next-line
    }, []);

    if (isLoading) {
        return <Spin size="large"
            style={{
                marginTop: 200,
                marginBottom: 200,
                marginLeft: "auto",
                marginRight: "auto",
                width: "100%",
            }}></Spin>
    }
    if (error) {
        return <div>網站出錯：{error}</div>
    }


    return (<>
        <Header></Header>
        {/* 頁面內容 */}
        <div className={style['page-content']}>
            <Row>
                <Col span={6}> <SideMenu /></Col>
                <Col span={18}><Carousel /></Col>
            </Row>
            <ProductCollection title={t('home_page.hot_recommended')} sideImage={sideImage} products={productList[0].touristRoutes}></ProductCollection>
            <ProductCollection title={t('home_page.new_arrival')} sideImage={sideImage2} products={productList[1].touristRoutes}></ProductCollection>
            <ProductCollection title={t('home_page.domestic_travel')} sideImage={sideImage3} products={productList[2].touristRoutes}></ProductCollection>
        </div>
        <Footer></Footer>

    </>)

}
