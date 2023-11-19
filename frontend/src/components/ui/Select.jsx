export function Select({ children, className, defaultValue, onChange, style }) {
  return (
    <select
      className={`${className}`}
      defaultValue={defaultValue}
      onChange={onChange}
      style={style}
    >
      {children}
    </select>
  );
}

export function Option({ children, value, style }) {
  return (
    <option value={value} style={style}>
      {children}
    </option>
  );
}
