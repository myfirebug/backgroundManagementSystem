import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { NonIndexRouteObject } from "react-router-dom";

export interface IMeta {
  // 是否需要token
  auth: boolean;
  // 是否全屏
  fullScreen?: boolean;
  // 是否是菜单
  menu?: boolean;
}

export interface IRoute extends NonIndexRouteObject {
  // 页面标题
  title: string;
  // 模块路径在template模块下的路径
  modulePath: string;
  meta: IMeta;
  // 子路由
  children?: IRoute[];
  // 访问的兄弟路由不存在时，重定向到该路由
  redirect?: string;
  state?: any;
  icon?: string;
}

type State = {
  menus: IRoute[];
  allRoutes: IRoute[];
};

type Actions = {
  getMenus: (routes: IRoute[]) => void;
};
const initialState = {
  menus: [],
  allRoutes: [
    {
      path: "/",
      title: "",
      modulePath: "layout",
      meta: {
        auth: false,
      },
      children: [
        {
          path: "/login",
          title: "登录",
          redirect: "/login",
          modulePath: "login",
          meta: {
            auth: false,
            menu: false,
          },
        },
        {
          path: "/home",
          title: "首页",
          redirect: "/home",
          modulePath: "home",
          meta: {
            auth: true,
            menu: false,
          },
        },
        {
          path: "*",
          title: "404",
          modulePath: "",
          meta: {
            auth: false,
          },
        },
      ],
    },
  ],
};

export const useMenuStore = create<State & Actions>()(
  persist(
    (set) => ({
      ...initialState,
      getMenus: (routes) =>
        set((state) => {
          const arr = JSON.parse(JSON.stringify(initialState.allRoutes));
          arr[0].children = [...arr[0].children, ...routes];
          return {
            ...state,
            menus: routes,
            allRoutes: arr,
          };
        }),
    }),
    {
      name: "SPEAKER_CENTER_MENUS",
    }
  )
);
