import { Row, Col, Spin } from "antd";
import React, { useEffect } from "react";
import { SideMenu, ProductCollection, Carousel } from "../../components";

import sideImage from '../../assets/images/sider_2019_12-09.png';
import sideImage2 from '../../assets/images/sider_2019_02-04.png';
import sideImage3 from '../../assets/images/sider_2019_02-04-2.png';
import { useTranslation } from 'react-i18next';
import { useSelector } from "../../redux/hooks";
import { fetchRecommendProductCreator } from "../../redux/recommendProduct/recommendProductAction";
import { useDispatch } from 'react-redux';
import { MainLayout } from "../../layouts/mainLayout";

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
                height:"100vh"
            }}></Spin>
    }
    if (error) {
        return <div>網站出錯：{error}</div>
    }


    return (<>
        <MainLayout>
            {/* 頁面內容 */}
            <Row>
                <Col span={6}> <SideMenu /></Col>
                <Col span={18}><Carousel /></Col>
            </Row>
            {/* 熱門推薦 */}
            <ProductCollection title={t('home_page.hot_recommended')} sideImage={sideImage} products={productList[0].touristRoutes}></ProductCollection>
            {/* 新品 */}
            <ProductCollection title={t('home_page.new_arrival')} sideImage={sideImage2} products={productList[1].touristRoutes}></ProductCollection>
            {/* 國內遊 */}
            <ProductCollection title={t('home_page.domestic_travel')} sideImage={sideImage3} products={productList[2].touristRoutes}></ProductCollection>
        </MainLayout>
    </>)

}
