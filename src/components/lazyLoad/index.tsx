import { lazy } from "react";

/**
 * 组件或者路由懒加载
 * @param path 路径
 * @returns
 */
const lazyLoad = function (path: string) {
  console.log(path);
  let splitName = path.split("/");
  let Module: any;
  if (splitName.length === 1) {
    Module = lazy(() => import(`../../pages/${splitName[0]}/index.tsx`));
  }
  if (splitName.length === 2) {
    Module = lazy(
      () => import(`../../pages/${splitName[0]}/${splitName[1]}/index.tsx`)
    );
  }

  // const Module = lazy(() => import(`../../pages/${path}/index.tsx`));
  return <Module />;
};

export default lazyLoad;
