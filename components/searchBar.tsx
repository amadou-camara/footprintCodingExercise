import React, { useState } from "react";

import { TextField, InputAdornment } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import styles from "../styles/SearchBar.module.css";

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState("");

  const handleSearch = (event) => {
    event.preventDefault();
    setSearchInput(event.target.value);
    let searchParams = new URLSearchParams(window.location.search);
    searchParams.set("q", event.target.value);

    if (window.history.replaceState) {
      const url =
        window.location.protocol +
        "//" +
        window.location.host +
        window.location.pathname +
        "?" +
        searchParams.toString();
      window.history.replaceState(
        {
          path: url,
        },
        "",
        url
      );
    }

    if (event.target.value === "") {
      const url =
        window.location.protocol +
        "//" +
        window.location.host +
        window.location.pathname;
      window.history.replaceState(
        {
          path: url,
        },
        "",
        url
      );
    }
  };

  return (
    <div className={styles.searchBar}>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search"
        value={searchInput}
        onChange={handleSearch}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IconButton>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
};

export default SearchBar;
