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
        "categories",
        [
          {
            id: 1,
            name: "Drinks",
            description: "Drinks and Liquors",
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            id: 2,
            name: "Breakfast",
            description: "Light foods for morning",
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            id: 3,
            name: "Snacks",
            description: "Light foods for day",
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            id: 4,
            name: "Hot Drinks",
            description: "Hot drinks",
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            id: 5,
            name: "Non-veg snacks",
            description: "Snacks for vegeterian",
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
    await queryInterface.bulkDelete("categories", null, {});
  },
};
