import React, { Suspense, memo } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { type IRoute, type IMeta } from "./routes";
import lazyLoad from "@components/lazyLoad";
import { Spin } from "antd";
import { useMenuStore, useTokensStore } from "@src/store";

interface IPrivateRoute {
  children: any;
  meta: IMeta;
  title: string;
}

const PrivateRoute: React.FC<IPrivateRoute> = ({ children, meta, title }) => {
  const { token } = useTokensStore();
  if (title) {
    document.title = title;
  }
  // 处理未登录情况时跳首页
  if (meta.auth && !token) {
    return <Navigate to="/login" />;
  }
  return children;
};

/**
 * 递归路由
 * @param datas 路由数据
 * @returns
 */
const routeTree = (datas: IRoute[]) => {
  return datas.map(({ path, children, modulePath, title, meta, redirect }) => {
    return children && children.length ? (
      <Route
        path={path}
        element={
          modulePath ? (
            <PrivateRoute title={title} meta={meta}>
              {lazyLoad(modulePath)}
            </PrivateRoute>
          ) : null
        }
        key={modulePath}
      >
        {routeTree(children)}
        {redirect ? (
          <Route path={path} element={<Navigate to={redirect} />}></Route>
        ) : (
          <Route
            path={path}
            element={<Navigate to={children[0].path as string} />}
          ></Route>
        )}
      </Route>
    ) : (
      <Route
        path={path}
        element={
          (path as string) === "*" ? (
            <Navigate to="/login" replace />
          ) : modulePath ? (
            <PrivateRoute title={title} meta={meta}>
              {lazyLoad(modulePath)}
            </PrivateRoute>
          ) : null
        }
        key={modulePath}
      ></Route>
    );
  });
};
const RoutesView = memo(() => {
  const { allRoutes } = useMenuStore();
  console.log(allRoutes, "allRoutes");
  return (
    <Suspense
      fallback={
        <Spin
          className="fullscreen-pattern"
          tip="加载中..."
          size="large"
          style={{
            position: "fixed",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 100,
          }}
        >
          <span></span>
        </Spin>
      }
    >
      <Routes>{routeTree(allRoutes)}</Routes>
    </Suspense>
  );
});

export default RoutesView;
