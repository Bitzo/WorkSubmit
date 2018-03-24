const workDal = require('../dal/workDAL');
const _ = require('lodash');

const workService = {};

workService.addWork = async (workInfo) => {
  const info = {};
  _.forIn(workInfo, (value, key) => {
    if (!(value === '' || value === null || value === undefined)) {
      info[key] = value;
    }
  });
  try {
    return await workDal.addWork(workInfo);
  } catch (err) {
    console.log(`Add Work Failed: ${err}`);
    return false;
  }
};

workService.queryWorks = async (workInfo) => {
  const info = {};
  _.forIn(workInfo, (value, key) => {
    if (!(value === null || value === undefined || value === '')) {
      info[key] = value;
    }
  });
  try {
    return await workDal.queryWorks(info);
  } catch (err) {
    console.log(`Query Work Failed: ${err}`);
    return false;
  }
};

workService.updateTask = async (taskInfo) => {
  const info = {};
  _.forIn(taskInfo, (value, key) => {
    if (!(value === null || value === undefined || value === '')) {
      info[key] = value;
    }
  });
  try {
    return await workDal.updateTask(info);
  } catch (err) {
    console.log(`Update Work Failed: ${err}`);
    return false;
  }
};

module.exports = workService;
