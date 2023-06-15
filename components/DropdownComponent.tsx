import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "../styles/DropdownComponent.module.css";

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
        <div className={`${styles.dropdownContent} dropdown`}>
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
            <div key={index} className={styles.dropdownOption}>
              <p onClick={() => handleOptionSelect(option)}>{option}</p>
              {selectedOptions.includes(option) && (
                <span
                  className={styles.removeButton}
                  onClick={() => handleRemoveOption(option)}
                >
                  X
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

DropdownComponent.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default DropdownComponent;
