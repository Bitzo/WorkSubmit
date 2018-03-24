const work = require('../db/models/workModel');
const _ = require('lodash');

const workDal = {};

workDal.addWork = async (info) => {
  try {
    const u = await work.create({
      id: info.id,
      username: info.username,
      grade: info.grade,
      className: info.className,
      phoneNumber: info.phoneNumber,
      email: info.email,
    });

    console.log(`Created Work: ${JSON.stringify(u)}`);
    return true;
  } catch (err) {
    console.log(`Created Work Failed: ${err}`);
    return false;
  }
};

workDal.queryWorks = async (info) => {
  try {
    const works = await work.findAll({
      where: info,
    });
    works.forEach((user) => {
      console.log(`Query Works: ${user}`);
    });
    return works;
  } catch (err) {
    console.log(`Query Works Error: ${err}`);
    return false;
  }
};

workDal.updateWork = async (info) => {
  try {
    let result = await work.update(
      _.omit(info, 'id'),
      {
        where: {
          id: info.id,
        },
      },
    );
    [result] = result;
    return result;
  } catch (err) {
    console.log(`Update Work Error: ${err}`);
    return false;
  }
};


module.exports = workDal;
