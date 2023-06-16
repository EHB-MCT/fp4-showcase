import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "../styles/NavigationDropdown.module.css";
import Link from "next/link";

const NavigationDropdown = ({ items, user }) => {
  return (
    <>
      <div className={style.dropdown_wrapper}>
        {items.map((item) => {
          return (
            <>
              {item.viewableFor == user.role && (
                <Link href={item.href}>
                  <a onClick={item.closeDropdown}>
                    <FontAwesomeIcon
                      icon={item.icon.name}
                      color={item.icon.color}
                      style={item.icon.style}
                    />
                    {item.title}
                  </a>
                </Link>
              )}

              {item.viewableFor == "all" && (
                <Link href={item.href}>
                  <a onClick={item.closeDropdown}>
                    <FontAwesomeIcon
                      icon={item.icon.name}
                      color={item.icon.color}
                      style={item.icon.style}
                    />
                    {item.title}
                  </a>
                </Link>
              )}
            </>
          );
        })}
      </div>
    </>
  );
};

export default NavigationDropdown;
