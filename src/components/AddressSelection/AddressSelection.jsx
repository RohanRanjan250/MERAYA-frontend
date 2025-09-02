import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import styles from "./AddressSelection.module.css";

const AddressSelection = ({
  addresses,
  selectedAddress,
  onSelect,
  onEdit,
  onRemove,
  onAddNew,
}) => {
  return (
    <div className={styles.addressSelection}>
      {addresses.map((address, index) => (
        <div
          key={index}
          className={`${styles.addressCard} ${
            selectedAddress === index ? styles.active : ""
          }`}
          onClick={() => onSelect(index)}
        >
          {/* Left Section: Radio + Details */}
          <div className={styles.left}>
            <div
              className={`${styles.radio} ${
                selectedAddress === index ? styles.checked : ""
              }`}
            ></div>

            <div>
              <div className={styles.nameRow}>
                <h3 className={styles.name}>{address.name}</h3>
                <span className={styles.tag}>{address.tag}</span>
              </div>
              <p className={styles.text}>{address.street}&nbsp;{address.cityStateZip}</p>
              {/* <p className={styles.text}>{address.cityStateZip}</p> */}
              <p className={styles.text}>
                CONTACT&emsp;&emsp;<span className={styles.phone}>{address.phone}</span>
              </p>
            </div>
          </div>

          {/* Right Section: Edit & Remove */}
          <div className={styles.actions}>
            <button
              className={styles.editBtn}
              onClick={(e) => {
                e.stopPropagation();
                onEdit(address);
              }}
            >
               Edit
            </button>
            <span className={styles.separator}>|</span>
            <button
              className={styles.removeBtn}
              onClick={(e) => {
                e.stopPropagation();
                onRemove(address);
              }}
            >
               Remove
            </button>
          </div>
        </div>
      ))}

      {/* Add New Address */}
      <div className={styles.addNew} onClick={onAddNew}>
        <FontAwesomeIcon icon={faPlus} /> Add New Address
      </div>
    </div>
  );
};

export default AddressSelection;
