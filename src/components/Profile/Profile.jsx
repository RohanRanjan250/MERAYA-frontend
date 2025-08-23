import React, { useState } from "react";
import styles from "./Profile.module.css";

const Profile = () => {
  // Initial user data
  const [user, setUser] = useState({
    name: "John Doe",
    phone: "9876543210",
    email: "johndoe@example.com",
  });

  // Address data (mock from user_addresses table)
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      full_name: "John Doe",
      phone: "9876543210",
      address_line1: "123, MG Road",
      address_line2: "Near Mall",
      city: "Bangalore",
      state: "Karnataka",
      pincode: "560001",
      is_default: true,
    },
    {
      id: 2,
      full_name: "John Doe",
      phone: "9876543210",
      address_line1: "45, Park Street",
      address_line2: "2nd Floor",
      city: "Kolkata",
      state: "West Bengal",
      pincode: "700016",
      is_default: false,
    },
  ]);

  const [editedUser, setEditedUser] = useState(user);
  const [isEdited, setIsEdited] = useState(false);

  const [editingAddress, setEditingAddress] = useState(null);
  const [newAddress, setNewAddress] = useState(null);

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

  // Handle address edit button click
  const handleEditAddress = (addr) => {
    setEditingAddress({ ...addr });
    setNewAddress(null); // close add form if open
  };

  const handleUpdateAddress = () => {
    setAddresses(
      addresses.map((addr) =>
        addr.id === editingAddress.id ? editingAddress : addr
      )
    );
    setEditingAddress(null);
  };

  // Handle new address add
  const handleAddAddress = () => {
    setNewAddress({
      id: Date.now(),
      full_name: "",
      phone: "",
      address_line1: "",
      address_line2: "",
      city: "",
      state: "",
      pincode: "",
      is_default: false,
    });
    setEditingAddress(null); // close edit form if open
  };

  const handleSaveNewAddress = () => {
    setAddresses([...addresses, newAddress]);
    setNewAddress(null);
  };

  return (
    <div className={styles.profileContainer}>
      <h2>My Profile</h2>

      {/* User Info */}
      <div className={styles.section}>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={editedUser.name}
          onChange={handleChange}
        />

        <label>Phone:</label>
        <input
          type="text"
          name="phone"
          value={editedUser.phone}
          onChange={handleChange}
        />

        <label>Email:</label>
        <input type="text" value={user.email} disabled />

        {isEdited && (
          <button onClick={handleUpdateProfile} className={styles.updateBtn}>
            Update Profile
          </button>
        )}
      </div>

      {/* Saved Addresses */}
      <div className={styles.section}>
        <h3>Saved Addresses</h3>
        <ul className={styles.addressList}>
          {addresses.map((addr) => (
            <li key={addr.id}>
              <div onClick={() => handleEditAddress(addr)}>
                <strong>{addr.full_name}</strong>, {addr.address_line1},{" "}
                {addr.city}, {addr.state} - {addr.pincode} <br />
                Phone: {addr.phone}{" "}
                {addr.is_default && <span className={styles.defaultTag}>[Default]</span>}
              </div>
            </li>
          ))}
        </ul>

        {/* Edit Address Form */}
        {editingAddress && (
          <div className={styles.editForm}>
            <h4>Edit Address</h4>
            <input
              type="text"
              placeholder="Full Name"
              value={editingAddress.full_name}
              onChange={(e) =>
                setEditingAddress({ ...editingAddress, full_name: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Phone"
              value={editingAddress.phone}
              onChange={(e) =>
                setEditingAddress({ ...editingAddress, phone: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Address Line 1"
              value={editingAddress.address_line1}
              onChange={(e) =>
                setEditingAddress({ ...editingAddress, address_line1: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Address Line 2"
              value={editingAddress.address_line2}
              onChange={(e) =>
                setEditingAddress({ ...editingAddress, address_line2: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="City"
              value={editingAddress.city}
              onChange={(e) =>
                setEditingAddress({ ...editingAddress, city: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="State"
              value={editingAddress.state}
              onChange={(e) =>
                setEditingAddress({ ...editingAddress, state: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Pincode"
              value={editingAddress.pincode}
              onChange={(e) =>
                setEditingAddress({ ...editingAddress, pincode: e.target.value })
              }
            />

            <button onClick={handleUpdateAddress} className={styles.updateBtn}>
              Update Address
            </button>
          </div>
        )}

        {/* Add New Address Form */}
        {newAddress && (
          <div className={styles.editForm}>
            <h4>Add New Address</h4>
            <input
              type="text"
              placeholder="Full Name"
              value={newAddress.full_name}
              onChange={(e) =>
                setNewAddress({ ...newAddress, full_name: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Phone"
              value={newAddress.phone}
              onChange={(e) =>
                setNewAddress({ ...newAddress, phone: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Address Line 1"
              value={newAddress.address_line1}
              onChange={(e) =>
                setNewAddress({ ...newAddress, address_line1: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Address Line 2"
              value={newAddress.address_line2}
              onChange={(e) =>
                setNewAddress({ ...newAddress, address_line2: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="City"
              value={newAddress.city}
              onChange={(e) =>
                setNewAddress({ ...newAddress, city: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="State"
              value={newAddress.state}
              onChange={(e) =>
                setNewAddress({ ...newAddress, state: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Pincode"
              value={newAddress.pincode}
              onChange={(e) =>
                setNewAddress({ ...newAddress, pincode: e.target.value })
              }
            />

            <button onClick={handleSaveNewAddress} className={styles.addBtn}>
              Save Address
            </button>
          </div>
        )}

        {!newAddress && (
          <button onClick={handleAddAddress} className={styles.addBtn}>
            + Add New Address
          </button>
        )}
      </div>
    </div>
  );
};

export default Profile;
