import { forwardRef } from "react";

const UserRow = forwardRef(({ user }, ref) => {
  return (
    <tr
      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
      ref={ref}
    >
      <td className="px-6 py-4">{user.id}</td>
      <td className="px-6 py-4">
        {user.firstName} {user.lastName}
      </td>
      <td className="px-6 py-4">{user.age}</td>
      <td className="px-6 py-4">{user.gender}</td>
      <td className="px-6 py-4">{user.address.city}</td>
    </tr>
  );
});

export default UserRow;
