import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "../styles/DropdownComponent.module.css";
import { useAnimate, stagger } from "framer-motion";
import { motion } from "framer-motion";

const staggerVariant = {
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
  hidden: {
    opacity: 0,
  },
};

const staggerChildVariant = {
  visible: {
    opacity: 1,
    y: 0,
  },
  hidden: {
    opacity: 0,
    y: 20,
  },
};
const DropdownComponent = ({
  options,
  dropdownName,
  onOptionSelect,
  removeSelectedOption,
  selectedOptions,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleOptionSelect = (option) => {
    onOptionSelect(option);
  };

  const handleRemoveOption = (option) => {
    removeSelectedOption(option);
  };

  return (
    <div className={styles.dropdownWrapper}>
      <div onClick={handleToggle} className={`${styles.dropdownBtn} dropdown`}>
        {dropdownName} <span className="material-icons">arrow_drop_down</span>
      </div>
      {isOpen && (
        <motion.div
          className={`${styles.dropdownContent} dropdown`}
          variants={staggerVariant}
          initial="hidden"
          animate="visible"
        >
          <div className={styles.dropdownSearchContainer}>
            <input
              type="text"
              placeholder="Tag name"
              value={searchTerm}
              onChange={handleSearch}
            />
            <span className="material-icons">search</span>
          </div>
          {filteredOptions.map((option, index) => (
            <motion.div
              key={index}
              className={styles.dropdownOption}
              variants={staggerChildVariant}
            >
              <p onClick={() => handleOptionSelect(option)}>{option}</p>
              {selectedOptions.includes(option) && (
                <span
                  className={styles.removeButton}
                  onClick={() => handleRemoveOption(option)}
                >
                  X
                </span>
              )}
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

DropdownComponent.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default DropdownComponent;
