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
        "products",
        [
          {
            id: 1,
            name: "Milk Tea",
            description: "Tea made with milk",
            price: 40,
            image:"",
            category_id: 4,
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            id: 2,
            name: "Black Tea",
            description: "Tea made with tea leaves",
            price: 40,
            image:"",
            category_id: 4,
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            id: 3,
            name: "Chana Anda",
            description: "Chaana Anda",
            price: 40,
            image:"",
            category_id: 5,
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
    await queryInterface.bulkDelete("products", null, {})
  },
};
