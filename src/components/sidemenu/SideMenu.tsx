
import { Menu } from 'antd';
import { sideMenuList } from './mockdata';
import style from './SideMenu.module.css';
import uuid from 'react-uuid';
export const SideMenu: React.FC = () => {
    return (<Menu mode='vertical' className={style['side-menu']}>
        {sideMenuList.map((menu, index) =>
            <Menu.SubMenu key={uuid()} title={menu.title}>
                {menu.subMenu.map((submenu, sindex) =>
                    <Menu.SubMenu key={uuid()} title={submenu.title}>
                        {submenu.subMenu.map((ssmenu, ssindex) =>
                            <Menu.Item key={uuid()} >
                                <span>{ssmenu}</span>
                            </Menu.Item>
                        )}
                    </Menu.SubMenu>
                )}
            </Menu.SubMenu>
        )}
    </Menu>);
}