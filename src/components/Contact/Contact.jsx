import React, { useState } from "react";
import styles from "./Contact.module.css";

const Contact = () => {
  // Initial user data
  const [user, setUser] = useState({
    name: "John Doe",
    phone: "9876543210",
    email: "johndoe@example.com",
  });

  const [editedUser, setEditedUser] = useState(user);
  const [isEdited, setIsEdited] = useState(false);

  // Handle profile input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser({ ...editedUser, [name]: value });
    setIsEdited(true);
  };

  const handleUpdateProfile = () => {
    setUser(editedUser);
    setIsEdited(false);
  };

  return (
    <div className={styles.profileContainer}>
      <h2>CONTACT INFORMATION</h2>
      <div className={styles.container}>
        {/* Left Part */}
          <div className={styles.section}>
            <div className={styles.both}></div>
            <label>NAME</label>
            <input
              type="text"
              name="name"
              value={editedUser.name}
              onChange={handleChange}
            />

            <div className={styles.both}></div>
            <label>PHONE</label>
            <input
              type="text"
              name="phone"
              value={editedUser.phone}
              onChange={handleChange}
            />

            <div className={styles.both}></div>
            <label>EMAIL</label>
            <input type="text" value={user.email} disabled />

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
