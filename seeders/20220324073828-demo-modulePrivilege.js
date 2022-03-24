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
        "module_priviledges",
        [
          {
            id: 1,
            module_id: 1, // category
            privilege_id: 1, // create
              created_at: new Date(),
            updated_at: new Date(),

          },
          {
            id: 2,
            module_id: 1, // category
            privilege_id: 2, // read
              created_at: new Date(),
            updated_at: new Date(),
          },
          {
            id: 3,
            module_id: 1, // category
            privilege_id: 3, // update
              created_at: new Date(),
            updated_at: new Date(),
          },
          {
            id: 4,
            module_id: 1, // category
            privilege_id: 4, // delete
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
    await queryInterface.bulkDelete("module_privilege", null, {});
  },
};
