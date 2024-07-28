function responseRequestConnect(set, get, connection) {
  const user = get().user;
  // if i was the one that made the connect request,
  // update the search list row
  if (user.id === connection.sender.id) {
    const searchList = [...get().searchList];
    const searchIndex = searchList.findIndex(
      (request) => request.id === connection.receiver.id
    );
    if (searchIndex >= 0) {
      searchList[searchIndex].status = "pending-them";
      set(() => ({
        searchList: searchList,
      }));
    }
    // if they were the one  that sent the connect
    // request, add request to request list
  } else {
    const requestList = [...get().requestList];
    const requestIndex = requestList.findIndex(
      (request) => request.sender.username === connection.sender.username
    );
    if (requestIndex === -1) {
      requestList.unshift(connection);
      set(() => ({
        requestList: requestList,
      }));
    };
  };
};


function responseRequestAccept(set, get, connection) {
  const user = get().user;
  // if I was the one that accepted the request, remove
  // request from the  requestList
  if (user.id === connection.receiver.id) {
    const requestList = [...get().requestList];
    const requestIndex = requestList.findIndex(
      (request) => request.id === connection.id
    );
    if (requestIndex >= 0) {
      requestList.splice(requestIndex, 1);
      set(() => ({
        requestList: requestList,
      }));
    }
  }
  // if the corresponding user is contained within the
  // searchList for the  acceptor or the  acceptee, update
  // the state of the searchlist item
  const sl = get().searchList;
  if (sl === null) {
    return;
  }
  const searchList = [...sl];

  let searchIndex = -1;
  // if this user  accepted
  if (user.id === connection.receiver.id) {
    searchIndex = searchList.findIndex(
      (user) => user.id === connection.sender.id
    );
    // if the other user accepted
  } else {
    searchIndex = searchList.findIndex(
      (user) => user.id === connection.receiver.id
    );
  }
  if (searchIndex >= 0) {
    searchList[searchIndex].status = "connected";
    set(() => ({
      searchList: searchList,
    }));
  };
};

function responseRequestList(set, requestList) {
  set(() => ({
    requestList: requestList,
  }));
};

export {responseRequestConnect, responseRequestAccept, responseRequestList};