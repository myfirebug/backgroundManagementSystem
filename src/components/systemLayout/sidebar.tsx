import { Menu, type MenuProps } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { useCollapsedStore, useMenuStore } from "@store/index";
import { type IRoute } from "@router/routes";
import { useSpring, animated } from "@react-spring/web";
import {
  ApartmentOutlined,
  BuildOutlined,
  ContactsOutlined,
  LeftOutlined,
  RightOutlined,
  SettingOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
type MenuItem = Required<MenuProps>["items"][number];
interface SystemSidebarProps {}

const icon: any = {
  ContactsOutlined: <ContactsOutlined />,
  SettingOutlined: <SettingOutlined />,
  BuildOutlined: <BuildOutlined />,
  TeamOutlined: <TeamOutlined />,
  ApartmentOutlined: <ApartmentOutlined />,
};

const diffMenus = (menus: IRoute[]) => {
  const arr: MenuItem[] = [];
  menus.map((item: IRoute) => {
    if (item?.children?.length) {
      arr.push({
        key: item.path as string,
        label: item.title,
        icon: item.icon && icon?.[item.icon] ? icon?.[item.icon] : null,
        children: diffMenus(item?.children),
      });
    } else {
      arr.push({
        key: item.path as string,
        label: item.title,
        icon: item.icon && icon?.[item.icon] ? icon?.[item.icon] : null,
      });
    }
  });
  return arr;
};

const SystemSidebar: React.FC<SystemSidebarProps> = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { collapsed, change } = useCollapsedStore();
  const { menus } = useMenuStore();
  const props = useSpring({ width: !collapsed ? 200 : 80 });
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [openKeys, setOpenKeys] = useState<string[]>([]);

  // 选中菜单
  const onSelect = (item: any) => {
    navigate(item.key);
  };

  // 菜单展开
  const onOpenChange = (openKeys: string[]) => {
    setOpenKeys(openKeys.slice(openKeys.length - 1));
  };

  useEffect(() => {
    if (pathname !== "/404") {
      setSelectedKeys([pathname]);
      const arr = pathname.split("/");
      if (arr.length > 2) {
        let keys = [];
        for (let i = 2; i < arr.length; i++) {
          keys.push(arr.slice(0, i).join("/"));
        }
        setOpenKeys(keys);
      }
    }
  }, [pathname]);
  return (
    <animated.div style={props}>
      <div className=" bg-white flex flex-col h-screen relative border-r border-gray-200">
        <div
          onClick={change}
          className="absolute z-10 w-6 h-6 rounded-2xl align-middle bg-white -right-2 top-2 flex items-center justify-center text-gray-400 shadow font-bold cursor-pointer"
          style={{ fontSize: "10px" }}
        >
          {!collapsed ? <LeftOutlined /> : <RightOutlined />}
        </div>
        <div className="overflow-hidden overflow-y-auto">
          <Menu
            theme="light"
            selectedKeys={selectedKeys}
            openKeys={openKeys}
            mode="inline"
            inlineCollapsed={collapsed}
            items={diffMenus(menus)}
            onSelect={onSelect}
            onOpenChange={onOpenChange}
          />
        </div>
      </div>
    </animated.div>
  );
};

export default SystemSidebar;
