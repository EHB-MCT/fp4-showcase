import "bootstrap/dist/css/bootstrap.min.css";
import Image from "next/image";
import React from "react";
import { useEffect, useState } from "react";
import styles from "../styles/FilterComponent.module.css";
import clustersData from "../data/clusters.json";
import tagsData from "../data/tags.json";
import DropdownComponent from "./DropdownComponent";
import { AnimatePresence, motion } from "framer-motion";

const FilterComponent = ({
  showFinalWorkProjects,
  setShowFinalWorkProjects,
  onSearch,
  onSelectedTagsChange,
  onSelectedClustersChange,
  onClearFilter,
}) => {
  const [toggleState, setToggleState] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedClusters, setSelectedClusters] = useState([]);
  const [tags, setTags] = useState([...tagsData]);
  const [clusters, setClusters] = useState([...clustersData]);
  const [showClearButton, setShowClearButton] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const handleTagSelect = (tag) => {
    setSelectedTags([...selectedTags, tag]);
    const updatedTags = tags.filter((t) => t !== tag);
    setTags(updatedTags);
    console.log(selectedTags);
    setShowClearButton(true);

    // Invoke the callback function and pass the updated selected tags
    onSelectedTagsChange([...selectedTags, tag]);
  };

  const handleToggle = () => {
    setToggleState(!toggleState);
  };

  const handleClusterChange = (cluster) => {
    if (!selectedClusters.includes(cluster)) {
      setSelectedClusters([...selectedClusters, cluster]);
      const updatedClusters = clusters.filter((c) => c !== cluster);
      setClusters(updatedClusters);
      setShowClearButton(true);

      // Invoke the callback function and pass the updated selected clusters
      onSelectedClustersChange([...selectedClusters, cluster]);
    }
  };

  const handleClearButtonClick = () => {
    setSelectedTags([]);
    setSelectedClusters([]);
    setTags([...tagsData]);
    setClusters([...clustersData]);
    setShowClearButton(false);

    onClearFilter((prev) => !prev);
  };

  const removeSelectedTag = (tag) => {
    const updatedTags = selectedTags.filter(
      (selectedTag) => selectedTag !== tag
    );
    setSelectedTags(updatedTags);
    setTags([...tags, tag]);
    onSelectedTagsChange(updatedTags); // Invoke the callback function with updated tags
  };

  const removeSelectedCluster = (cluster) => {
    const updatedClusters = selectedClusters.filter(
      (selectedCluster) => selectedCluster !== cluster
    );
    setSelectedClusters(updatedClusters);
    setClusters([...clusters, cluster]);
    onSelectedClustersChange(updatedClusters); // Invoke the callback function with updated clusters
  };

  // const handleSearchSubmit = (e) => {
  //   e.preventDefault();
  //   onSearch(searchQuery);
  //   setSearchQuery("");
  //   setIsFormSubmitted(true);
  // };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setIsFormSubmitted(true);
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query); // Invoke the callback function with the search query
  };
  const [isMobileFilterOpen, setisMobileFilterOpen] = useState(false);
  const toggleMobileFilter = () => {
    setisMobileFilterOpen(!isMobileFilterOpen);
  };

  const closeMobileFilter = () => {
    setisMobileFilterOpen(false);
  };

  return (
    <div>
      <div className={styles.filterContainer}>
        <div className={styles.filterSearchContainer}>
          <form onSubmit={handleSearchSubmit}>
            <input
              type="text"
              placeholder="Project title"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <button type="submit" className={styles.searchButton}>
              <span className="material-icons">search</span>
            </button>
          </form>
        </div>
        <div className={styles.filterTagsContainer}>
          <DropdownComponent
            options={tags}
            dropdownName="Tags"
            onOptionSelect={handleTagSelect}
            removeSelectedOption={removeSelectedTag}
            selectedOptions={selectedTags}
          />
        </div>
        <div className={styles.filterCategoriesContainer}>
          <DropdownComponent
            options={clusters}
            dropdownName="Categories"
            onOptionSelect={handleClusterChange}
            removeSelectedOption={removeSelectedCluster}
            selectedOptions={selectedClusters}
          />
        </div>
        <div className={styles.filterToggleContainer}>
          <p>Finalwork</p>
          <div className={styles.toggleOnOff}>
            <p>{showFinalWorkProjects ? "On" : "Off"}</p>
            <span
              onClick={() => setShowFinalWorkProjects(!showFinalWorkProjects)}
              className={`material-icons toggle ${
                showFinalWorkProjects ? styles.on : ""
              } ${styles.toggle}`}
            >
              {showFinalWorkProjects ? "toggle_on" : "toggle_off"}
            </span>
          </div>
        </div>
      </div>

      <div className={styles.mobile_filter_toggle}>
        <div className={styles.mobile_filter_margin}>
          <div className={styles.filterSearchContainer}>
            <form onSubmit={handleSearchSubmit}>
              <input
                type="text"
                placeholder="Project title"
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <button type="submit" className={styles.searchButton}>
                <span className="material-icons">search</span>
              </button>
            </form>
          </div>
          <div className={styles.mobilefilterIcon} onClick={toggleMobileFilter}>
            <p>Filter</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="36"
              height="36"
              viewBox="0 0 36 36"
            >
              <path
                id="Icon_awesome-filter"
                data-name="Icon awesome-filter"
                d="M34.311,0H1.689A1.689,1.689,0,0,0,.5,2.881l13,13.006V30.375a1.688,1.688,0,0,0,.72,1.382l5.625,3.936A1.689,1.689,0,0,0,22.5,34.311V15.886l13-13.006A1.689,1.689,0,0,0,34.311,0Z"
                fill="#fff"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className={styles.selectedTagsContainer}>
        {showClearButton && (
          <div
            className={`${styles.selectedTag} ${styles.clearBtn}`}
            onClick={handleClearButtonClick}
          >
            Clear
          </div>
        )}

        {selectedTags.map((tag, index) => (
          <AnimatePresence key={index}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div
                className={styles.selectedTag}
                onClick={() => removeSelectedTag(tag)}
              >
                {tag}
                <span className={styles.removeButton}>X</span>
              </div>
            </motion.div>
          </AnimatePresence>
        ))}

        {selectedClusters.map((cluster, index) => (
          <div
            key={index}
            className={styles.selectedCluster}
            onClick={() => removeSelectedCluster(cluster)}
          >
            {cluster}
            <span className={styles.removeButton}>X</span>
          </div>
        ))}
      </div>
      {isMobileFilterOpen && (
        <div className={styles.mobile_filter_toggle_style}>
          <div
            style={{ marginTop: "12%" }}
            className={styles.filterContainerMob}
          >
            <div style={{ width: "70%", margin: "auto" }}>
              <p style={{ textAlign: "right" }} onClick={closeMobileFilter}>
                X
              </p>
            </div>

            <div className={styles.filterTagsContainer}>
              <DropdownComponent
                options={tags}
                dropdownName="Tags"
                onOptionSelect={handleTagSelect}
                removeSelectedOption={removeSelectedTag}
                selectedOptions={selectedTags}
              />
            </div>
            <div className={styles.filterCategoriesContainer}>
              <DropdownComponent
                options={clusters}
                dropdownName="Categories"
                onOptionSelect={handleClusterChange}
                removeSelectedOption={removeSelectedCluster}
                selectedOptions={selectedClusters}
              />
            </div>
            <div className={styles.filterToggleContainer}>
              <p>Finalwork</p>
              <div className={styles.toggleOnOff}>
                <p>{showFinalWorkProjects ? "On" : "Off"}</p>
                <span
                  onClick={() =>
                    setShowFinalWorkProjects(!showFinalWorkProjects)
                  }
                  className={`material-icons toggle ${
                    showFinalWorkProjects ? styles.on : ""
                  } ${styles.toggle}`}
                >
                  {showFinalWorkProjects ? "toggle_on" : "toggle_off"}
                </span>
              </div>
            </div>
            <div className={styles.filterMobileSaveChangesBtn}>
              <p
                style={{ border: "1px solid white" }}
                onClick={closeMobileFilter}
              >
                Save your changes
              </p>
            </div>
            <div className={styles.selectedTagsContainerPop}>
              {showClearButton && (
                <div
                  className={`${styles.selectedTag} ${styles.clearBtn}`}
                  onClick={handleClearButtonClick}
                >
                  Clear
                </div>
              )}

              {selectedTags.map((tag, index) => (
                <AnimatePresence key={index}>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div
                      className={styles.selectedTag}
                      onClick={() => removeSelectedTag(tag)}
                    >
                      {tag}
                      <span className={styles.removeButton}>X</span>
                    </div>
                  </motion.div>
                </AnimatePresence>
              ))}

              {selectedClusters.map((cluster, index) => (
                <div
                  key={index}
                  className={styles.selectedCluster}
                  onClick={() => removeSelectedCluster(cluster)}
                >
                  {cluster}
                  <span className={styles.removeButton}>X</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterComponent;
