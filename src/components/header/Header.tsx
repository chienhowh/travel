import { GlobalOutlined } from "@ant-design/icons"
import logo from '../../assets/logo.svg';
import { Typography, Dropdown, Menu, Button, Input } from "antd"
import style from './Header.module.css';
import { useHistory } from 'react-router-dom';
import React, { useEffect, useState } from "react";

import { useTranslation } from 'react-i18next';
import { changeLanguageActionCreator } from "../../redux/language/languageAction";
import { useDispatch } from 'react-redux';
import { useSelector } from '../../redux/hooks'; //
import jwt_decode, { JwtPayload as defaultJwtPayload } from 'jwt-decode';
import { user } from "../../redux/user/slice";


interface JwtPayload extends defaultJwtPayload {
    // 這樣才能拿到自訂型別
    username: string;
}

export const Header: React.FC = () => {
    const history = useHistory(); // router
    const dispatch = useDispatch();// dispatch action
    const { t } = useTranslation(); // i18n
    /** i18 start */
    const language = useSelector(state => state.language.language); // store get language
    const languageList = useSelector(state => state.language.languageList);
    /** i18 end */

    const jwt = useSelector(s => s.user.token);
    const [username, setUsername] = useState('');

    const shoppingCartItems = useSelector(s => s.shoppingCart.items);
    const shoppingCartLoading = useSelector(s => s.shoppingCart.loading);

    const handleLanguage = (e: any) => {
        const action = changeLanguageActionCreator(e.key);
        dispatch(action);

    }

    const onLogout = () => {
        dispatch(user.actions.signOut());
    }

    useEffect(() => {
        if (jwt) {
            const token = jwt_decode<JwtPayload>(jwt);
            setUsername(token.username);
        }
    }, [jwt])

    return (<div className={style['app-header']}>
        <div className={style['top-header']}>
            <div>
                <Typography.Text>{t('header.slogan')}</Typography.Text>
                <Dropdown.Button style={{ marginLeft: 15 }} icon={<GlobalOutlined />} overlay={<Menu onClick={handleLanguage}>
                    {languageList.map(lan => <Menu.Item key={lan.code}>{lan.name}</Menu.Item>)}
                </Menu>}>
                    {language}
                </Dropdown.Button>
            </div>
            <div>
                {jwt ?
                    // 登入狀態顯示
                    <>
                        <span style={{marginRight:16}}>
                            {t("header.welcome")}
                            <Typography.Text strong>{username}</Typography.Text>
                        </span>
                        <Button.Group>
                            <Button onClick={() => history.push('/shoppingCart')} loading={shoppingCartLoading}>{t("header.shoppingCart")}({shoppingCartItems.length})</Button>
                            <Button onClick={onLogout}>{t("header.signOut")}</Button>
                        </Button.Group>
                    </>
                    :
                    // 未登入狀態顯示
                    <Button.Group >
                        <Button onClick={() => history.push("/register")}>
                            {t("header.register")}
                        </Button>
                        <Button onClick={() => history.push("/signIn")}>
                            {t("header.signin")}
                        </Button>
                    </Button.Group>
                }
            </div>
        </div>
        <div className={style['main-header']}>
            <span onClick={() => history.push('/')}>
                <img src={logo} alt="" className={style['App-logo']} />
                <Typography.Title level={3} className={style.title}>旅遊網</Typography.Title>
            </span>
            <Input.Search placeholder="請輸入旅遊目的地" className={style['search-input']}
                onSearch={(keywords) => history.push(`/search/${keywords}`)}></Input.Search>
        </div>

        <Menu mode={"horizontal"} className={style["main-menu"]}>
            <Menu.Item key="1"> {t("header.home_page")} </Menu.Item>
            <Menu.Item key="2"> {t("header.weekend")} </Menu.Item>
            <Menu.Item key="3"> {t("header.group")} </Menu.Item>
            <Menu.Item key="4"> {t("header.backpack")} </Menu.Item>
            <Menu.Item key="5"> {t("header.private")} </Menu.Item>
            <Menu.Item key="6"> {t("header.cruise")} </Menu.Item>
            <Menu.Item key="7"> {t("header.hotel")} </Menu.Item>
            <Menu.Item key="8"> {t("header.local")} </Menu.Item>
            <Menu.Item key="9"> {t("header.theme")} </Menu.Item>
            <Menu.Item key="10"> {t("header.custom")} </Menu.Item>
            <Menu.Item key="11"> {t("header.study")} </Menu.Item>
            <Menu.Item key="12"> {t("header.visa")} </Menu.Item>
            <Menu.Item key="13"> {t("header.enterprise")} </Menu.Item>
            <Menu.Item key="14"> {t("header.high_end")} </Menu.Item>
            <Menu.Item key="15"> {t("header.outdoor")} </Menu.Item>
            <Menu.Item key="16"> {t("header.insurance")} </Menu.Item>
        </Menu>
    </div>)


}
