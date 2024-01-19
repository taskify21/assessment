export const userTableHeaders = [
  "#No",
  "Name",
  "Email",
  "Role",
  "Phone",
  "Updated",
  "Delete",
];
export const menuTableHeaders = [
  "#No",
  "Cover",
  "Name",
  "Category",
  "Price",
  "Updated",
  "Actions",
];

export const TableHeaderList = ({ row }: { row: any }) => {
  return (
    <tr>
      {row.map((ro: string) => (
        <th scope="col" className="px-6 py-3" key={ro}>
          {ro}
        </th>
      ))}
    </tr>
  );
};
export const UserLists = ({ users }: { users: any }) => {
  return users?.map((user: any, i: any) => (
    <tr className=" border-b" key={i}>
      <td className="px-6 py-4">{i + 1}</td>
      <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
        {user.name}
      </th>
      <td className="px-6 py-4">{user.email}</td>
      <td className="px-6 py-4">{user.role}</td>
      <td className="px-6 py-4">{user.phone}</td>
      <td className="px-6 py-4">{user.updatedAt}</td>
      <td className="px-6 py-4 text-red">Delete</td>
    </tr>
  ));
};
function formatDate(timestamp: any) {
  // Create a new Date object using the timestamp
  const date = new Date(+timestamp);

  // Get day, month, and year
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
  const year = date.getFullYear().toString().slice(-2); // Get the last two digits of the year

  // Combine into the desired format
  const formattedDate = `${day}-${month}-${year}`;

  return formattedDate;
}
export const MenuLists = ({
  menus,
  deleteMenu,
  editMenu,
}: {
  menus: any;
  deleteMenu: any;
  editMenu: any;
}) => {
  return menus?.map((menu: any, i: any) => (
    <tr className=" border-b h-full" key={i}>
      <td className="px-6 py-4 h-full">{i + 1}</td>

      <td className="px-6 py-4 h-full">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={menu.coverImage} alt="" />
      </td>
      <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
        {menu.name}
      </th>
      <td className="px-6 py-4 h-full">{menu.category}</td>

      <td className="px-6 py-4 h-full">{menu.price}</td>
      <td className="px-6 py-4 h-full">{formatDate(Number(menu.updatedAt))}</td>
      <td className="px-6 py-4    ">
        <div className="flex gap-4 ">
          <button
            className="border-none outline-none cursor-pointer font-semibold text-green "
            onClick={() => editMenu(menu)}
          >
            Edit
          </button>
          <button
            className="border-none outline-none cursor-pointer text-red font-semibold "
            onClick={() => deleteMenu(menu)}
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  ));
};
