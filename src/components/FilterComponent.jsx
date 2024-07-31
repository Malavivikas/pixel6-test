const FilterComponent = ({
  gender,
  setGender,
  city,
  setCity,
  handleFilter,
}) => {
  return (
    <div>
      <label>
        Gender:
        <select value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="">All</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </label>
      <label>
        City:
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </label>
      <button onClick={handleFilter}>Filter</button>
    </div>
  );
};

export default FilterComponent;
