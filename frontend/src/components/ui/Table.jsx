export function Table({ children, className, style }) {
  return (
    <table className={`${className}`} style={style}>
      {children}
    </table>
  );
}

export function Thead({ children, className, style }) {
  return (
    <thead className={`${className}`} style={style}>
      {children}
    </thead>
  );
}

export function Tbody({ children, className, style }) {
  return (
    <tbody className={`${className}`} style={style}>
      {children}
    </tbody>
  );
}

export function Tr({ children, className, style }) {
  return (
    <tr className={`${className}`} style={style}>
      {children}
    </tr>
  );
}

export function Th({ children, className, style }) {
  return (
    <th className={`${className}`} style={style}>
      {children}
    </th>
  );
}

export function Td({ children, className, style }) {
  return (
    <td className={`${className}`} style={style}>
      {children}
    </td>
  );
}
