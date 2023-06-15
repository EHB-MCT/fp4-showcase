import "bootstrap/dist/css/bootstrap.min.css";
import Image from "next/image";
import React from "react";
import { useEffect, useState } from "react";
import styles from "../styles/FilterComponent.module.css";
import clustersData from "../data/clusters.json";
import tagsData from "../data/tags.json";
import DropdownComponent from "./DropdownComponent";

const FilterComponent = ({
  showFinalWorkProjects,
  setShowFinalWorkProjects,
  onSearch,
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
    setShowClearButton(true);
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
    }
  };

  const handleClearButtonClick = () => {
    setSelectedTags([]);
    setSelectedClusters([]);
    setTags([...tagsData]);
    setClusters([...clustersData]);
    setShowClearButton(false);
  };

  const removeSelectedTag = (tag) => {
    const updatedTags = selectedTags.filter(
      (selectedTag) => selectedTag !== tag
    );
    setSelectedTags(updatedTags);
    setTags([...tags, tag]);
  };

  const removeSelectedCluster = (cluster) => {
    const updatedClusters = selectedClusters.filter(
      (selectedCluster) => selectedCluster !== cluster
    );
    setSelectedClusters(updatedClusters);
    setClusters([...clusters, cluster]);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(searchQuery);
    setSearchQuery("");
    setIsFormSubmitted(true);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
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

          <span
            onClick={() => setShowFinalWorkProjects(!showFinalWorkProjects)}
            className={`material-icons toggle ${
              showFinalWorkProjects ? "on" : ""
            } ${styles.toggle}`}
          >
            {showFinalWorkProjects ? "toggle_on" : "toggle_off"}
          </span>
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
          <div
            key={index}
            className={styles.selectedTag}
            onClick={() => removeSelectedTag(tag)}
          >
            {tag}
            <span className={styles.removeButton}>X</span>
          </div>
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
  );
};

export default FilterComponent;
