export function Select({ children, className, defaultValue, onChange }) {
  return (
    <select
      className={`${className}`}
      defaultValue={defaultValue}
      onChange={onChange}
    >
      {children}
    </select>
  );
}

export function Option({ children, value }) {
  return <option value={value}>{children}</option>;
}
