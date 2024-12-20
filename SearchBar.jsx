import React from "react";
import { Input, Select, Button, Flex } from "@chakra-ui/react";

const SearchBar = ({
  searchTerm,
  setSearchTerm,
  filterType,
  setFilterType,
  filterOptions,
  onFilter,
}) => {
  const handleFilter = () => {
    onFilter(searchTerm, filterType);
  };

  return (
    <Flex alignItems="center" mb="4">
      <Input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        mr="2"
      />
      <Select
        value={filterType}
        onChange={(e) => setFilterType(e.target.value)}
        mr="2"
      >
        <option value="">Filter By...</option>
        {filterOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
      <Button onClick={handleFilter} colorScheme="purple" width="140px">
        Filter
      </Button>
    </Flex>
  );
};

export default SearchBar;
