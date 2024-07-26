import { ADDRESS } from "../../core/api"


const appendFullUrl = url => {
  if (url.includes(ADDRESS)) {
    return {uri: url};
  } else {
    return {uri: "http://" + ADDRESS + url};
  };
};

export {appendFullUrl};