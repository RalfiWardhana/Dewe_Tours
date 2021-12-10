'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example: */
      await queryInterface.bulkInsert('user', [{
        fullname: "admin",
        email: "admin@gmail.com",
        password: "$2a$10$SemjT3gOz7.ninv6I3H4Dewo/2IDGlrtVNqcTepW/qvV1kAsKPY9u",
        phone: "08123456789",
        address:"Bekasi",
        status: "admin",
        photo: null
      },
      {
        fullname: "admin2",
        email: "admin2@gmail.com",
        password: "$2a$10$SemjT3gOz7.ninv6I3H4Dewo/2IDGlrtVNqcTepW/qvV1kAsKPY9u",
        phone: "08123456789",
        address:"Bekasi",
        status: "admin",
        photo: null
      }
    ], {});
    
   
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
