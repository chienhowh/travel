import { Image, Carousel as AntdCarousel } from 'antd';
import React from 'react';
import carousel_1 from '../../assets/images/carousel_1.jpg';
import carousel_2 from '../../assets/images/carousel_2.jpg';
import carousel_3 from '../../assets/images/carousel_3.jpg';
import style from './Carousel.module.css';

export const Carousel: React.FC = () => {
    return (<AntdCarousel autoplay className={style.slider}>
        <Image src={carousel_1}></Image>
        <Image src={carousel_2}></Image>
        <Image src={carousel_3}></Image>
    </AntdCarousel>)
}