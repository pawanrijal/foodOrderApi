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
        "accesses",
        [
          {
            role_id: 1, // admin
            module_priviledge_id: 1, // to create category
              created_at: new Date(),
            updated_at: new Date(),
          },
          {
            role_id: 1, // admin
            module_priviledge_id: 2, // to read category
              created_at: new Date(),
            updated_at: new Date(),
          },
          {
            role_id: 1, // admin
            module_priviledge_id: 3, // to update category
              created_at: new Date(),
            updated_at: new Date(),
          },
          {
            role_id: 1, // admin
            module_priviledge_id: 4, // to delete category
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
    await queryInterface.bulkDelete("access", null, {});
  },
};
