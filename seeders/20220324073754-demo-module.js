"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
        "modules",
        [
          {
            id: 1,
            name: "Category",
            path: "/category",
            description:"",
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            id: 2,
            name: "User",
            path: "/user",
            description:"",
            created_at: new Date(),
            updated_at: new Date(),
          },
        ],
        {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("modules", null, {});
  },
};
