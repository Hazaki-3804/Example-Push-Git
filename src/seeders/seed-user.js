'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'admin@gmail.com',
        password: "admin@123",
        firstName: 'Yan',
        lastName: 'Hazaki',
        address: 'VietNam',
        phone: "0123456789",
        gender: 1,
        positionId: "Tiến Sĩ",
        image: null,
        roleId: "R1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    // return queryInterface.bulkDelete('Users', null, {});
  },
};
