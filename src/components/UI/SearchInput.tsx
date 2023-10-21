import React, { useState, useCallback, ChangeEvent } from "react";
import debounce from "lodash.debounce";
import { ReactComponent as SearchIcon } from "../../assets/img/profile/SearchIcon.svg";
import "../../assets/scss/components/UI/_search-input.scss";

interface SearchInputProps {
  placeholder: string;
  value: string;
  setValue: (val: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({
  placeholder,
  value,
  setValue,
}) => {
  const [inputValue, setInputValue] = useState("");

  const updateValue = useCallback(
    debounce((str) => {
      setValue(str);
    }, 1000),
    []
  );

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    updateValue(e.target.value);
  };

  return (
    <div className="searchInputWrap">
      <SearchIcon className="searchIcon" />
      <input
        value={inputValue}
        onChange={onChangeInput}
        className="searchInput"
        type="text"
        placeholder={placeholder}
      />
    </div>
  );
};

export default SearchInput;
