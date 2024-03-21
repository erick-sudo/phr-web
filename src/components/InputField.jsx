import { useState } from "react";

export function InputField({
  placeholder = "",
  type = "text",
  value = "",
  name = "",
  onChange,
  fClassName,
  lClassName,
  iClassName,
  colors: {
    success = "text-green-500 border-green-500",
    initial = "text-amber-500 border-amber-500",
    error = "text-red-500 border-red-500",
  } = {},
}) {
  const [focused, setFocused] = useState(false);

  return (
    <fieldset className={`${fClassName} border float-none px-3 rounded`}>
      <legend
        className={`${lClassName} float-none w-auto text-xs ${
          (value + "").length > 0 ? "block " : "hidden"
        }`}
      >
        {placeholder}
      </legend>
      <input
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        value={value || ""}
        name={name}
        onChange={onChange || (() => {})}
        type={type}
        className={`${iClassName} border ${
          (value + "").length > 0 ? "mb-2" : "py-2"
        } outline-none px-2 w-full bg-transparent`}
        placeholder={placeholder}
      />
    </fieldset>
  );
}
