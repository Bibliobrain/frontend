import axios from 'axios';
import { useQuery } from 'react-query';

import { handleError } from '../../utils/handleError';

const getBooks = async ({ author, language, page, subject }) => {
  let queryParams = '';
  if (author) {
    queryParams += `lname=${author}&`;
  }
  if (language) {
    queryParams += `language=${language}&`;
  }
  if (page) {
    queryParams += `page=${page}&`;
  }
  if (subject) {
    queryParams += `subject=${subject}`;
  }
  try {
    const response = await axios.get(`/books?${queryParams}`);
    return response.data.payload;
  } catch (error) {
    handleError(error);
  }
};

const useBooks = ({ author, language, page, subject }) => {
  return useQuery(
    ['books', author, language, page, subject],
    () => getBooks({ author, language, page, subject }),
    {
      keepPreviousData: true,
    }
  );
};

export { useBooks };
