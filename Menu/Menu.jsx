import { useLocation, useNavigate } from "react-router-dom";
import styles from "./Menu.module.css";
import { APP_LOGO, APP_LOGO1 } from "../../siteConfig";
import { scrollTop } from "../../util_helper";
import { useSelector } from "react-redux";
import { fetchPaths } from "../../util_helper";

const MenuAside = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const user = useSelector((store) => store?.user?.user || {});
  const usertypes = user?.roles || '';
  const { menus = [] } = useSelector((store) => store?.user || {});
  const menuPaths = fetchPaths(menus);
  let filteredMenus;
  if (usertypes === 'admin') {
    filteredMenus = menus.filter(
      (menu) => menuPaths.includes(menu.path) && menu.isSideMenu && menu.isAdminMenu
    );
  } else {
    filteredMenus = menus.filter(
      (menu) => menuPaths.includes(menu.path) && menu.isSideMenu
    );
  }

 
  return (
    <aside className={`${styles?.menuAside} tec-shadow-right`}>
      <div className={styles?.headerForLogo}>
        <div className={styles.appLogo}>
          <img src={APP_LOGO} width="47" height="47" alt=".." />
          <div className={`${styles?.menuTitle} logoname`}>
            <img src={APP_LOGO1} width="95" height="47" alt=".." />
          </div>
        </div>
      </div>
      <div className={styles?.menuBody}>
        <ul>
          {filteredMenus?.length > 0 &&
            filteredMenus.map((menu) => {
              const iconParentClassName = menu?.parentClassName;
              const iconClassName = menu?.className;
              return (
                <li
                  key={menu.id}
                  className={`${styles?.menuItem} ${
                    pathname === menu.path ? styles?.activeMenu : ""
                  }`}
                  onClick={() => {
                    if (menu.path) {
                      navigate(menu.path);
                      scrollTop();
                    }
                  }}
                >
                  <h5 className={`${styles.menu_title} ${iconParentClassName}`}>
                    <span
                      className={`${styles?.innerTitle} ${iconClassName}`}
                      dangerouslySetInnerHTML={{
                        __html: `${
                          pathname === menu.path
                            ? menu?.classNameOfIconActive
                            : menu?.classNameOfIcon
                        }`,
                      }}
                    />
                    <span className={styles?.innerTitle2}>{menu.name}</span>
                  </h5>
                </li>
              );
            })}
        </ul>
      </div>
    </aside>
  );
};

export default MenuAside;
