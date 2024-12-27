export const clearFilter = (setFilterModel, filterIndex ) => {
  setFilterModel((prevFilterModel) => ({
    items: prevFilterModel.items.filter((_, index) => index !== filterIndex),
  }));
};

export const changeFilter = (setFilterModel, filterIndex, value ) => {
  setFilterModel((prevFilterModel) => {
    const newItems = [...prevFilterModel.items];
    newItems[filterIndex] = {
      ...newItems[filterIndex],
      value: value,
    };
    return { items: newItems };
  });
};

export const addFilter = (setFilterModel,id, field, operator, value) =>{
    setFilterModel((prevFilterModel)=>{
        const newItems = [...prevFilterModel.items];
        newItems.push({
            id: id,
            field:field,
            operator: operator,
            value: value,
        });
        return {items: newItems};
    });
}


