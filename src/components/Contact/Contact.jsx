import React, { useState, useEffect } from "react";
import styles from "./Contact.module.css";
import { getUserContact, updateUserContact } from "../../API/myaccountAPI";
import { useNavigate } from "react-router-dom";
import { isLoggedIn } from "../../utils/authCookie";

const Contact = () => {
  const [user, setUser] = useState(null);
  const [editedUser, setEditedUser] = useState({});
  const [isEdited, setIsEdited] = useState(false);
  const navigate = useNavigate();
  let isAuth = isLoggedIn();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (!isAuth) {
          navigate("/login");
          return;
        }
        const res = await getUserContact();
        console.log("API response:", res);
        const mappedUser = {
          name: res.name,
          phone: res.phone,
          email: res.email,
        };
        setUser(mappedUser);
        setEditedUser(mappedUser);
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };

    fetchUser();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser({ ...editedUser, [name]: value });
    setIsEdited(true);
  };

  const handleUpdateProfile = async () => {
    try {
      if (!isAuth) {
        navigate("/login");
        return;
      }
      console.log(editedUser)
      await updateUserContact(editedUser);
      setUser(editedUser);
      setIsEdited(false);
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className={styles.profileContainer}>
      <h2>CONTACT INFORMATION</h2>
      <div className={styles.container}>
        <div className={styles.section}>
          <div className={styles.both}></div>
          <label>NAME</label>
          <input
            type="text"
            name="name"
            value={editedUser.name || ""}
            onChange={handleChange}
          />

          <div className={styles.both}></div>
          <label>PHONE</label>
          <input
            type="text"
            name="phone"
            value={editedUser.phone || ""}
            onChange={handleChange}
          />

          <div className={styles.both}></div>
          <label>EMAIL</label>
          <input type="text" value={user.email || ""} disabled />

          {isEdited && (
            <button onClick={handleUpdateProfile} className={styles.updateBtn}>
              UPDATE
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
