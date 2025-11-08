import {
  DownOutlined,
  FullscreenExitOutlined,
  FullscreenOutlined,
  LoginOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Dropdown, Image, Space, type MenuProps } from "antd";
import { useCollapsedStore, useMenuStore, useTokensStore } from "@store/index";
import { useCallback, useEffect, useState } from "react";
import { getParentsById } from "@src/utils";
import { Link, useLocation, useNavigate } from "react-router-dom";
interface SystemHeaderProps {}

const SystemHeader: React.FC<SystemHeaderProps> = () => {
  const [breadcrumb, setBreadcrumb] = useState<any[]>([]);
  const { pathname } = useLocation();
  const { collapsed, change } = useCollapsedStore();
  const { clearToken } = useTokensStore();
  const navigate = useNavigate();
  const [fullscreen, setFullscreen] = useState(false);

  const { menus } = useMenuStore();
  useEffect(() => {
    setBreadcrumb(() => {
      const result = getParentsById(menus, pathname);
      return result ? result.reverse() : [];
    });
  }, [pathname]);

  const items: MenuProps["items"] = [
    {
      key: "2",
      label: (
        <div
          onClick={() => {
            navigate("/login");
            clearToken();
          }}
        >
          退出登录
        </div>
      ),
      icon: <LoginOutlined />,
    },
  ];
  // 打开全屏
  const openFullscreen = () => {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
      setFullscreen(true);
    } else if (document.documentElement.mozRequestFullScreen) {
      /* Firefox */
      document.documentElement.mozRequestFullScreen();
      setFullscreen(true);
    } else if (document.documentElement.webkitRequestFullscreen) {
      /* Chrome, Safari & Opera */
      document.documentElement.webkitRequestFullscreen();
      setFullscreen(true);
    } else if (document.documentElement.msRequestFullscreen) {
      /* IE/Edge */
      document.documentElement.msRequestFullscreen();
      setFullscreen(true);
    }
  };
  // 退出全屏
  const closeFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
      setFullscreen(false);
    } else if (document.mozCancelFullScreen) {
      /* Firefox */
      document.mozCancelFullScreen();
      setFullscreen(false);
    } else if (document.webkitExitFullscreen) {
      /* Chrome, Safari and Opera */
      document.webkitExitFullscreen();
      setFullscreen(false);
    } else if (document.msExitFullscreen) {
      /* IE/Edge */
      document.msExitFullscreen();
      setFullscreen(false);
    }
  };
  const fullscreenchangeHandler = useCallback(() => {
    if (document.fullscreenElement) {
      setFullscreen(true);
    } else {
      setFullscreen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("fullscreenchange", fullscreenchangeHandler);
    return () => {
      document.removeEventListener("fullscreenchange", fullscreenchangeHandler);
    };
  }, []);
  return (
    <div className="flex flex-1 h-12 pl-3 pr-3 border-b border-gray-200 bg-white">
      <div className="flex-1 flex items-center">
        <div
          className="pr-4 cursor-pointer hover:text-sky-800"
          onClick={change}
        >
          {collapsed ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
        </div>
        {breadcrumb && breadcrumb.length ? (
          <Breadcrumb
            items={breadcrumb.map((item: any) => ({
              title: item.path ? (
                <Link to={item.path}>{item.name}</Link>
              ) : (
                item.name
              ),
            }))}
          ></Breadcrumb>
        ) : null}
      </div>
      <div className="flex items-center">
        <div
          className="pr-2 cursor-pointer hover:text-sky-800"
          onClick={() => {
            fullscreen ? closeFullscreen() : openFullscreen();
          }}
        >
          {fullscreen ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
        </div>
        <Image
          width={30}
          height={30}
          preview={false}
          src="error"
          fallback="data:image/png;base64,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"
        />
        <Dropdown menu={{ items }}>
          <div className="pl-2 text-sm">
            <Space>
              myfirebug
              <DownOutlined />
            </Space>
          </div>
        </Dropdown>
      </div>
    </div>
  );
};

export default SystemHeader;
