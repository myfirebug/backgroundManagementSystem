import { useLocation } from "react-router-dom";
import SystemHeader from "./header";
import SystemSidebar from "./sidebar";

interface SystemLayoutProps {
  children: React.ReactNode;
}

const SystemLayout: React.FC<SystemLayoutProps> = ({ children }) => {
  const { pathname } = useLocation();
  return (
    <div className="flex flex-row-reverse w-screen h-screen">
      {pathname !== "/login" ? (
        <>
          <div className="flex-1">
            <SystemHeader />
            <div className="flex-1">{children}</div>
          </div>
          <SystemSidebar />
        </>
      ) : (
        <>{children}</>
      )}
    </div>
  );
};

export default SystemLayout;
