export const SearchData = (data, searchText, searchColumns) => {
    if (!searchText) {
      return data;  
    }
  
    const lowerCaseSearchText = searchText.toLowerCase();
    return data.filter(row =>
      searchColumns.some(key =>
        row[key].toLowerCase().includes(lowerCaseSearchText)
      )
    );
  };