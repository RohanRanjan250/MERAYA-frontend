import styles from "./ProfileSidebar.module.css";
import { NavLink } from "react-router-dom";
import ProfileSideFallback from "../../assets/ProfileSide.png";
import {fetchUsername} from "../../API/myaccountAPI"
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PROFILE_SIDE_URL, onImgError } from "../../utils/cloudinaryImages";
import { isLoggedIn } from "../../utils/authCookie";

const ProfileSide = PROFILE_SIDE_URL;

const ProfileSidebar = () => {
  const [username, setUsername] = useState("User");
  const navigate = useNavigate();
  let isAuth = isLoggedIn();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (!isAuth) {
          navigate("/login");
          return;
        }
        const data = await fetchUsername();
        setUsername(data.username || "User");
      } catch (err) {
        console.error("Error fetching user profile:", err);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <img src={ProfileSide} onError={onImgError(ProfileSideFallback)} alt="Profile Side" className={styles.bottomimage} />
        <div className={styles.overlay}>
          <h3 className={styles.username}>Hi, {username}</h3>
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
