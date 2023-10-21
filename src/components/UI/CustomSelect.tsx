import "../../assets/scss/components/UI/_custom-select.scss";
import Select, { components } from "react-select";
import dropDown from "../../assets/img/customSelect/arrow-down.png";

interface optionsItem {
  label: string;
  value: string;
}
interface CustomSelectProps {
  label?: optionsItem;
  value?: optionsItem;
  options: optionsItem[];
  heightSelect?: number | string;
  isHaveIcon?: boolean;
  onChange: (value: any) => void;
  width?: number | string;
  paddingContainer?: number;
  paddingIndicator?: number;
  backgroundColor?: string;
  menuPlacement?: any;
  isMulti?: boolean;
}

const DropdownIndicator = (props: any) => {
  return (
    <components.DropdownIndicator {...props}>
      <img
        src={dropDown}
        className={`${props.selectProps.menuIsOpen ? "arrowDown" : "arrowUp"}`}
      />
    </components.DropdownIndicator>
  );
};

const IndicatorSeparator = () => {
  return <></>;
}; // removes the "stick"
const formatOptionLabel = (item: any, isHaveIcon: boolean) => {
  return isHaveIcon ? (
    <div className="option-with-img">
      <img src={item.icon} className="icon-in-option" />
      <p>{item.label}</p>
    </div>
  ) : (
    item.label
  );
};

const CustomSelect = ({
  label,
  options,
  onChange,
  heightSelect,
  value = options[0],
  isHaveIcon = false,
  width = "100%",
  paddingIndicator = 20,
  paddingContainer = 8,
  backgroundColor = "white",
  menuPlacement = "bottom",
  isMulti = false,
}: CustomSelectProps) => {
  const customStyles = {
    container: (defaultStyles: any, state: any) => ({
      ...defaultStyles,
      width: width,
      maxWidth: "200px",
      cursor: "pointer",
      border: "2px solid #ff0000",
      borderRadius: "8px",
      heigth: "100%",
    }),
    option: (defaultStyles: any, state: any) => ({
      ...defaultStyles,
      top: 0,
      color: state.isFocused ? "#011111" : "#011111",
      backgroundColor: state.isFocused ? "#f2f3ee" : "white",
      fontSize: "14px",
      cursor: "pointer",
    }),
    valueContainer: (defaultStyles: any, state: any) => ({
      ...defaultStyles,
      // padding: paddingContainer,
    }),
    indicators: (defaultStyles: any, state: any) => ({
      ...defaultStyles,
      padding: 12,
      cursor: "pointer",
    }),
    indicatorsContainer: (defaultStyles: any, state: any) => ({
      ...defaultStyles,
      paddingRight: 12,
    }),
    control: (defaultStyles: any) => ({
      ...defaultStyles,
      backgroundColor: "#ffffff",
      height: heightSelect ? heightSelect : 40,
      display: "flex",
      alignItems: "center",
      fontSize: "14px",
      border: "none",
      boxShadow: "none",
      borderRadius: "12px",
      cursor: "pointer",
    }),
    menu: (defaultStyles: any) => ({
      ...defaultStyles,
      backgroundColor: "white",
      boxSizing: "min-content",
    }),

    dropdownIndicator: (provided: any) => ({
      ...provided,
      padding: paddingIndicator,
      color: "#011111",
    }),
    ropdownIndicator: (provided: any, state: any) => ({
      ...provided,
      transition: "all .2s ease",
      transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : null,
      background: `url('../../../img/customSelect/arrow-down.png') no-repeat right #011111  `,
      color: "#011111",
    }),
    singleValue: (defaultStyles: any) => ({
      ...defaultStyles,
      color: "#011111",
    }),
  };

  return (
    <>
      <Select
        defaultValue={value}
        components={{ DropdownIndicator, IndicatorSeparator }}
        onChange={onChange}
        options={options}
        menuPlacement={menuPlacement}
        isSearchable={false}
        formatOptionLabel={(item) => formatOptionLabel(item, isHaveIcon)}
        isMulti={isMulti}
        // menuShouldBlockScroll={true}
        maxMenuHeight={150}
        styles={customStyles}
        // menuShouldScrollIntoView = {false}
      />
    </>
  );
};

export default CustomSelect;
