import Select from "react-select";

const MySelect = ({ options, value, onChange }) => {
  return (
    <Select
      id="react-select-3-live-region"
      instanceId="react-select-3-live-region"
      className="w-full sm:w-64"
      styles={{
        control: (baseStyles, state) => ({
          ...baseStyles,
          borderColor: state.isFocused ? "grey" : "#cccccc",
          padding: "0.25rem",
        }),
      }}
      theme={(theme) => ({
        ...theme,
        borderRadius: 0,
        colors: {
          ...theme.colors,
          primary25: "#cccccc",
          primary: "black",
        },
      })}
      value={value}
      onChange={onChange}
      options={options}
    />
  );
};

export default MySelect;
