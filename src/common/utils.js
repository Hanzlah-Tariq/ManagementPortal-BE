import MYSQL_CONNECTION_LOST_ERROR from 'constants';

import transformKeys from './transformKeys';
import mysql from '../services/Mysql';

export const arrayToObject = (array, keyField) =>
  array.reduce((obj, item) => {
    obj[item[keyField].toLowerCase()] = item;
    return transformKeys.toCamelCase(obj);
  }, {});

// Params must be a object
const getQueryParams = params => Object.keys(params).map(key => `${key}=${params[key]}`).join('&');

export const URLQueryParams = {
  construct: (params) => {
    return getQueryParams(params);
  },
  appendToQueryString: (queryString, params) => {
    return queryString ? `${queryString}&${getQueryParams(params)}` : getQueryParams(params);
  },
};

export const handleMysqlError = (error) => {
  if (error && error.code && error.code === MYSQL_CONNECTION_LOST_ERROR) {
    mysql.restart();
  }
};

export const getCurrentDate = () => {
  let today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const yyyy = today.getFullYear();

  today = `${yyyy}-${mm}-${dd}`;

  return today;
};

export function getCurrentTime(date = new Date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
};
