export const CartInfoRow = ({
  label,
  value,
}: {
  label: React.ReactNode;
  value: React.ReactNode;
}) => (
  <tr className="d-flex">
    <td className="col-7"></td>
    <td className="col-3">{label}</td>
    <td className="col-2">{value}</td>
  </tr>
);
