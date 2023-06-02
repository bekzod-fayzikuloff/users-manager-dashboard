import axios from 'axios';

const sendData = async (resourceUrl: string, data: object) => {
  return await axios.post(resourceUrl,
    {...data}
  );
};

const sendDataAuthRequire = async (
  method: string,
  resourceUrl: string,
  data: object,
) => {
  return axios({
    method: method,
    url: resourceUrl,
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("authToken")).accessToken}`
    },
    data: JSON.stringify(data)
  });
};

const getResponse = async (resourceUrl: string) => {
  return await axios.get(resourceUrl, {
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("authToken")).accessToken}`
    }
  });
};

export { sendData, sendDataAuthRequire, getResponse };