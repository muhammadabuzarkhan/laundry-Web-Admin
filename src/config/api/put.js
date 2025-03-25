import axios from 'axios';

//constants imports
const { BASE_URL } = require("../constants/index");

// main function
async function Put(path, token, putData, paramObj , contentType ) {
  let url = BASE_URL + path;
  let header;
  if (contentType === "multipart") {
    header = {
      headers: token
        ? {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          }
        : {
            "Content-Type": "multipart/form-data",
          },
    };
  } 
  else{
    header = {
      headers: token
        ? {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          }
        : {
            "Content-Type": "application/json",
          },
    };
  }
  
  if (paramObj) {
    let queryString = "";
    Object.keys(paramObj).map((val) => {
      if (paramObj[val].length > 0) {
        if (queryString.length > 0) {
          queryString += `&${val}=${paramObj[val]}`;
        } else {
          queryString += `?${val}=${paramObj[val]}`;
        }
      }
    });

    url += queryString;
    header.headers.params = paramObj;
  }
  const { data } = await axios.put(url, putData, header);
  return data;
}


export { Put };