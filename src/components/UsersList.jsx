import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, resetUsers, setPageSize } from "../store/slices/userSlice";
import FilterComponent from "./FilterComponent";
import SortComponent from "./SortComponent";
import UserRow from "./UserRow";
import {
  BiFirstPage,
  BiLastPage,
  BiSkipNext,
  BiSkipPrevious,
} from "react-icons/bi";

const UserList = () => {
  const dispatch = useDispatch();
  const { users, loading, error, currentPage, totalPages, pageSize } =
    useSelector((state) => state.users);

  const [sort, setSort] = useState("id");
  const [order, setOrder] = useState("asc");
  const [gender, setGender] = useState("");
  const [city, setCity] = useState("");

  useEffect(() => {
    dispatch(fetchUsers({ page: currentPage, size: pageSize }));
  }, [currentPage, pageSize, dispatch]);

  const sortedAndFilteredUsers = useMemo(() => {
    let filteredUsers = [...users];

    if (gender) {
      filteredUsers = filteredUsers.filter((user) => user.gender === gender);
    }

    if (city) {
      filteredUsers = filteredUsers.filter((user) =>
        user.address.city.toLowerCase().includes(city.toLowerCase())
      );
    }

    filteredUsers.sort((a, b) => {
      let aValue = a[sort];
      let bValue = b[sort];

      if (sort === "name") {
        aValue = `${a.firstName} ${a.lastName}`.toLowerCase();
        bValue = `${b.firstName} ${b.lastName}`.toLowerCase();
      }

      if (order === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filteredUsers;
  }, [users, sort, order, gender, city]);

  const handleFilter = () => {
    dispatch(resetUsers());
    dispatch(fetchUsers({ page: 1, size: pageSize }));
  };

  const handleSort = (field) => {
    const isAsc = sort === field && order === "asc";
    const newOrder = isAsc ? "desc" : "asc";
    setOrder(newOrder);
    setSort(field);
    dispatch(resetUsers());
    dispatch(fetchUsers({ page: 1, size: pageSize }));
  };

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      dispatch(fetchUsers({ page, size: pageSize }));
    }
  };

  const handlePageSizeChange = (event) => {
    const newSize = parseInt(event.target.value, 10);
    dispatch(setPageSize(newSize));
    dispatch(fetchUsers({ page: 1, size: newSize }));
  };

  const generatePageNumbers = () => {
    let pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  return (
    <div className="flex flex-col justify-center items-center overflow-auto">
      <FilterComponent
        gender={gender}
        setGender={setGender}
        city={city}
        setCity={setCity}
        handleFilter={handleFilter}
      />
      <div className="mb-4">
        <label htmlFor="pageSize" className="mr-2">
          Records per page:
        </label>
        <select id="pageSize" value={pageSize} onChange={handlePageSizeChange}>
          {[10, 20, 30, 50].map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <SortComponent sort={sort} setSort={handleSort} order={order} />
        <tbody>
          {sortedAndFilteredUsers.map((user) => (
            <UserRow key={user.id} user={user} />
          ))}
        </tbody>
      </table>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <div className="flex justify-center items-center">
        <button
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
          className="p-2 m-2 bg-neutral-950 text-white"
        >
          <BiFirstPage />
        </button>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 m-2 bg-neutral-950 text-white"
        >
          <BiSkipPrevious />
        </button>
        {generatePageNumbers().map((number) => (
          <button
            key={number}
            onClick={() => handlePageChange(number)}
            className={`px-1 h-8 ${
              number === currentPage ? "bg-blue-500 text-white" : ""
            }`}
          >
            {number}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 m-2 bg-neutral-950 text-white"
        >
          <BiSkipNext />
        </button>
        <button
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="p-2 m-2 bg-neutral-950 text-white"
        >
          <BiLastPage />
        </button>
      </div>
    </div>
  );
};

export default UserList;
