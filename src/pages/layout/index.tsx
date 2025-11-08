import { useTransition, animated } from "@react-spring/web";
import SystemLayout from "@src/components/systemLayout";
import { memo } from "react";
import { Outlet, useLocation } from "react-router-dom";

const CurrentLayout = memo(() => {
  const { pathname } = useLocation();
  const transition = useTransition(pathname, {
    from: {
      transform: "translateX(30px)",
      opacity: 0,
    },
    enter: {
      transform: "translateX(0px)",
      opacity: 1,
    },
    // leave: {
    //   transform: "translateX(-10px)",
    //   opacity: 0.5,
    // },
    config: {
      duration: 200,
    },
  });

  return (
    <SystemLayout>
      {pathname === "/login" ? (
        <Outlet />
      ) : (
        <div className=" overflow-hidden">
          {transition((style) => (
            <animated.div style={style}>
              <Outlet />
            </animated.div>
          ))}
        </div>
      )}
    </SystemLayout>
  );
});

export default CurrentLayout;
