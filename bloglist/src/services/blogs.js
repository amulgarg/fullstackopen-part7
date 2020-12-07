import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (payload, user) => {
  const config = {
    headers: {
      authorization: `Bearer ${user.token}`
    }
  }

  try {
    const response = await axios.post(baseUrl, payload, config);
    return response.data;
  } catch (error) {
    throw error.response.data.error;
  }
};

const update = async (blogId, payload, callback) => {

  try {
    const response = await axios.put(`${baseUrl}/${blogId}`, payload);
    callback();
    return response.data;
  } catch (error) {
    throw error.response.data.error;
  }

};

const remove = async (blogId, user, callback) => {

  const config = {
    headers: {
      authorization: `Bearer ${user.token}`
    }
  }

  try {
    const response = await axios.delete(`${baseUrl}/${blogId}`, config);
    callback();
    return response.data;
  } catch (error) {
    throw error.response.data.error;
  }

};

export default { getAll, create, update, remove }