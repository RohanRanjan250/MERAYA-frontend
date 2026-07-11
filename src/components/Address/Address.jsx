import React, { useState, useEffect } from "react";
import styles from "./Address.module.css";
import { getUserAddress, addUserAddress, updateUserAddress } from "../../API/myaccountAPI";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../Context/ToastContext";
import { isLoggedIn } from "../../utils/authCookie";

const REQUIRED_FIELDS = [
  { name: "full_name", label: "Name" },
  { name: "address_line1", label: "Address Line 1" },
  { name: "city", label: "City" },
  { name: "state", label: "State" },
  { name: "pincode", label: "Pincode" },
  { name: "phone", label: "Mobile" },
  { name: "tag", label: "Tag" },
];

const Address = () => {
  const [selected, setSelected] = useState(0);
  const [addresses, setAddresses] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [newAddressMode, setNewAddressMode] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "",
    address_line1: "",
    address_line2: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
    tag: "",
  });
  const navigate = useNavigate();
  const { showToast } = useToast();
  let isAuth = isLoggedIn();

  const validateAddressForm = (data) => {
    for (const field of REQUIRED_FIELDS) {
      if (!String(data[field.name] || "").trim()) {
        showToast(`${field.label} is required`, "error");
        return false;
      }
    }
    return true;
  };

  // 🔹 Fetch addresses from backend
  const fetchAddresses = async () => {
    try {
      if (!isAuth) {
        navigate("/login");
        return;
      }
      const data = await getUserAddress();
      setAddresses(data); // assuming backend returns array of addresses
    } catch (err) {
      console.error("Error fetching addresses:", err);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const saveEdit = async (index) => {
    try {
      if (!isAuth) {
        navigate("/login");
        return;
      }
      if (!validateAddressForm(formData)) {
        return;
      }
      await updateUserAddress(addresses[index].id, formData);
      setEditingIndex(null);
      await fetchAddresses(); // ✅ reload fresh data from backend
    } catch (err) {
      console.error("Error updating address:", err);
    }
  };

  const saveNew = async () => {
    try {
      if (!isAuth) {
        navigate("/login");
        return;
      }
      if (!validateAddressForm(formData)) {
        return;
      }
      await addUserAddress(formData);
      setNewAddressMode(false);
      setFormData({
        full_name: "",
        address_line1: "",
        address_line2: "",
        city: "",
        state: "",
        pincode: "",
        phone: "",
        tag: "",
      });
      await fetchAddresses(); // ✅ reload fresh list
    } catch (err) {
      console.error("Error adding address:", err);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>ADDRESS</h2>

      {addresses.map((addr, index) => (
        <div
          key={addr.id}
          className={`${styles.card} ${selected === index ? styles.activeCard : ""}`}
        >
          <div className={styles.checkbox} onClick={() => setSelected(index)}>
            {selected === index && <div className={styles.checked} />}
          </div>
          
          {editingIndex === index ? (
            <div className={styles.form}>
              <input type="text" name="full_name" value={formData.full_name} onChange={handleInputChange} placeholder="Name" required />
              <input type="text" name="address_line1" value={formData.address_line1} onChange={handleInputChange} placeholder="Address Line 1" required />
              <input type="text" name="address_line2" value={formData.address_line2} onChange={handleInputChange} placeholder="Address Line 2" />
              <input type="text" name="city" value={formData.city} onChange={handleInputChange} placeholder="City" required />
              <input type="text" name="pincode" value={formData.pincode} onChange={handleInputChange} placeholder="Pincode" required />
              <input type="text" name="state" value={formData.state} onChange={handleInputChange} placeholder="State" required />
              <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="Mobile" required />
              <input type="text" name="tag" value={formData.tag} onChange={handleInputChange} placeholder="Tag" required />

              <button className={styles.saveBtn} onClick={() => saveEdit(index)}>
                SAVE
              </button>
            </div>
          ) : (
            <div className={styles.info}>
              <div className={styles.upper}>
                <h3 className={styles.name}>{addr.full_name}</h3>
                <p className={styles.tag}>{addr.tag}</p>
              </div>
              <p>{addr.address_line1} {addr.address_line2}</p>
              <p>{addr.city} - {addr.pincode}</p>
              <p>{addr.state}</p>
              <p>Mobile Number - {addr.phone}</p>
              <button
                className={styles.editBtn}
                onClick={() => {
                  setEditingIndex(index);
                  setFormData(addr); // load existing address into form
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
              <input type="text" name="full_name" value={formData.full_name} onChange={handleInputChange} placeholder="Name" required />
              <input type="text" name="address_line1" value={formData.address_line1} onChange={handleInputChange} placeholder="Address Line 1" required />
              <input type="text" name="address_line2" value={formData.address_line2} onChange={handleInputChange} placeholder="Address Line 2" />
              <input type="text" name="city" value={formData.city} onChange={handleInputChange} placeholder="City" required />
            </div>
            <div className={styles.rightpart}>
              <input type="text" name="state" value={formData.state} onChange={handleInputChange} placeholder="State" required />
              <input type="text" name="pincode" value={formData.pincode} onChange={handleInputChange} placeholder="Pincode" required />
              <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="Mobile" required />
              <input type="text" name="tag" value={formData.tag} onChange={handleInputChange} placeholder="Tag" required />
            </div>
          </div>
          <button className={styles.saveBtn} onClick={saveNew}>
            SAVE NEW ADDRESS
          </button>
        </div>
      ) : (
        <button className={styles.addBtn} onClick={() => setNewAddressMode(true)}>
          ADD NEW ADDRESS
        </button>
      )}
    </div>
  );
};

export default Address;
