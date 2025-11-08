import { Link, useLocation } from "react-router-dom";
import SystemHeader from "./header";
import SystemSidebar from "./sidebar";
import { Breadcrumb } from "antd";
import { useEffect, useState } from "react";
import { useMenuStore } from "@src/store";
import { getParentsById } from "@src/utils";

interface SystemLayoutProps {
  children: React.ReactNode;
}

const SystemLayout: React.FC<SystemLayoutProps> = ({ children }) => {
  const { pathname } = useLocation();
  const { menus } = useMenuStore();
  const [breadcrumb, setBreadcrumb] = useState<any[]>([]);
  useEffect(() => {
    setBreadcrumb(() => {
      const result = getParentsById(menus, pathname);
      return result ? result.reverse() : [];
    });
  }, [pathname]);
  return (
    <div className="w-screen h-screen">
      {pathname !== "/login" ? (
        <>
          <SystemHeader />
          <div className="flex-1 flex">
            <SystemSidebar />
            <div className="flex-1 flex flex-col">
              {breadcrumb && breadcrumb.length ? (
                <Breadcrumb
                  className="p-2 pl-4"
                  items={breadcrumb.map((item: any) => ({
                    title: item.path ? (
                      <Link to={item.path}>{item.name}</Link>
                    ) : (
                      item.name
                    ),
                  }))}
                ></Breadcrumb>
              ) : null}
              <div className="flex-1">{children}</div>
            </div>
          </div>
        </>
      ) : (
        <>{children}</>
      )}
    </div>
  );
};

export default SystemLayout;
