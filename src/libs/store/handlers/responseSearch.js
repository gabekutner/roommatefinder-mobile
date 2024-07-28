function responseSearch(set, get, data) {
  set(() => ({
    searchList: data,
  }));
};

export {responseSearch};