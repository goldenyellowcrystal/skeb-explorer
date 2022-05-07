const axios = require('axios');

const axiosHeaders = {
  headers: {
    Authorization: "Bearer null"
  }
};

const axiosGet = async (url) => {
  try {
    let resp = await axios.get(url, axiosHeaders);
    return resp.data;
  } catch (err) {
    var error = new Error(err.message);
    error.code = err.response.status;
    console.log(err);
    throw error;
  };
};

module.exports = axiosGet;
