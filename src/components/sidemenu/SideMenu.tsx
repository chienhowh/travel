
import { Menu } from 'antd';
import { sideMenuList } from './mockdata';
import style from './SideMenu.module.css';
export const SideMenu: React.FC = () => {
    return (<Menu mode='vertical' className={style['side-menu']}>
        {sideMenuList.map((menu, index) =>
            <Menu.SubMenu key={`side-menu-${index}`} title={menu.title}>
                {menu.subMenu.map((submenu, sindex) =>
                    <Menu.SubMenu key={`sub-menu-${sindex}`} title={submenu.title}>
                        {submenu.subMenu.map((ssmenu, ssindex) =>
                            <Menu.Item key={`sub-sub-menu-${ssindex}`} >
                                <span>{ssmenu}</span>
                            </Menu.Item>
                        )}
                    </Menu.SubMenu>
                )}
            </Menu.SubMenu>
        )}
    </Menu>);
}