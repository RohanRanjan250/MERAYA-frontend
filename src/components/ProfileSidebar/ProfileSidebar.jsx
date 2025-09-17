import styles from "./ProfileSidebar.module.css";
import { NavLink } from "react-router-dom";
import ProfileSide from "../../assets/ProfileSide.png";

const ProfileSidebar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <img src={ProfileSide} alt="Profile Side" className={styles.bottomimage} />
        <div className={styles.overlay}>
          <h3 className={styles.username}>Hi, Sarah </h3>
          <p className={styles.text}>You can manage your account here. Please, choose what you’d like to do.</p>
          <ul className={styles.navList}>
            <NavLink
              to="/myaccount/contact"
              className={({ isActive }) => (isActive ? styles.active : undefined)}
            >
              <li>
                <span>CONTACT INFORMATION</span>
              </li>
            </NavLink>

            <NavLink
              to="/myaccount/address"
              className={({ isActive }) => (isActive ? styles.active : undefined)}
            >
              <li>
                <span>ADDRESS</span>
              </li>
            </NavLink>

            <NavLink
              to="/myaccount/order"
              className={({ isActive }) => (isActive ? styles.active : undefined)}
            >
              <li>
                <span>ORDER HISTORY</span>
              </li>
            </NavLink>
          </ul>
        </div>
      </div>
      
    </div>
  );
};

export default ProfileSidebar;
