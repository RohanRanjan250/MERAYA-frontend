import React, { useState } from "react";
import styles from "./Address.module.css";

const Address = () => {
  const [selected, setSelected] = useState(0);
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: "Viinay Ahuja",
      address: "Flat 26, Orchid Garden Society, Bangalore",
      city: "Bangalore- 290292",
      state: "Karnataka",
      mobile: "+91 90389 45678",
    },
    {
      id: 2,
      name: "Viinay Ahuja",
      address: "Flat 26, Orchid Garden Society, Bangalore",
      city: "Bangalore- 290292",
      state: "Karnataka",
      mobile: "+91 90389 45678",
    },
  ]);

  const [editingIndex, setEditingIndex] = useState(null);
  const [newAddressMode, setNewAddressMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    mobile: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const saveEdit = (index) => {
    const updated = [...addresses];
    updated[index] = { ...updated[index], ...formData };
    setAddresses(updated);
    setEditingIndex(null);
  };

  const saveNew = () => {
    setAddresses([...addresses, { id: Date.now(), ...formData }]);
    setNewAddressMode(false);
    setFormData({ name: "", address: "", city: "", state: "", mobile: "" });
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>ADDRESS</h2>

      {addresses.map((addr, index) => (
        <div
          key={addr.id}
          className={`${styles.card} ${
            selected === index ? styles.activeCard : ""
          }`}
        >
          <div
            className={styles.checkbox}
            onClick={() => setSelected(index)}
          >
            {selected === index && <div className={styles.checked} />}
          </div>

          {editingIndex === index ? (
            <div className={styles.form}>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Name"
              />
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Address"
              />
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                placeholder="City & Pincode"
              />
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                placeholder="State"
              />
              <input
                type="text"
                name="mobile"
                value={formData.mobile}
                onChange={handleInputChange}
                placeholder="Mobile"
              />
              <button
                className={styles.saveBtn}
                onClick={() => saveEdit(index)}
              >
                SAVE
              </button>
            </div>
          ) : (
            <div className={styles.info}>
              <h3 className={styles.name}>{addr.name}</h3>
              <p>{addr.address}</p>
              <p>{addr.city}</p>
              <p>{addr.state}</p>
              <p>Mobile Number- {addr.mobile}</p>
              <button
                className={styles.editBtn}
                onClick={() => {
                  setEditingIndex(index);
                  setFormData(addr);
                }}
              >
                EDIT
              </button>
            </div>
          )}
        </div>
      ))}

      {newAddressMode ? (
          <div className={styles.form}>
            <h2>ADD NEW ADDRESS</h2>
            <div className={styles.part}>
                <div className={styles.leftpart}>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Name"
                    />
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="Address"
                    />
                    <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="City"
                    />
                </div>
                <div className={styles.rightpart}>
                    <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        placeholder="State"
                    />
                    <input
                        type="text"
                        name="Pincode"
                        value={formData.pincode}
                        onChange={handleInputChange}
                        placeholder="Pincode"
                    />
                    <input
                        type="text"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleInputChange}
                        placeholder="Mobile"
                    />
                </div>
            </div>

          <button className={styles.saveBtn} onClick={saveNew}>
            SAVE NEW ADDRESS
          </button>
        </div>
      ) : (
        <button
          className={styles.addBtn}
          onClick={() => setNewAddressMode(true)}
        >
          ADD NEW ADDRESS
        </button>
      )}
    </div>
  );
};

export default Address;
