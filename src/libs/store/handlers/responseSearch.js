function responseSearch(set, data) {
  set(() => ({
    searchList: data,
  }));
};

export {responseSearch};