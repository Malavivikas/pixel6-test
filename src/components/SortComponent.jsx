const SortComponent = ({ sort, setSort, order }) => {
  return (
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th className="px-6 py-3" onClick={() => setSort("id")}>
          ID {sort === "id" && (order === "asc" ? "↑" : "↓")}
        </th>
        <th className="px-6 py-3" onClick={() => setSort("name")}>
          Name {sort === "name" && (order === "asc" ? "↑" : "↓")}
        </th>
        <th className="px-6 py-3" onClick={() => setSort("age")}>
          Age {sort === "age" && (order === "asc" ? "↑" : "↓")}
        </th>
        <th className="px-6 py-3">Gender</th>
        <th className="px-6 py-3">City</th>
      </tr>
    </thead>
  );
};

export default SortComponent;
