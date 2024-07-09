import { faker } from "@faker-js/faker";

const products = new Array(1500).fill(null).map(() => ({
  id: faker.database.mongodbObjectId(),
  name: faker.commerce.productName(),
  des: faker.commerce.productDescription(),
  price: faker.commerce.price,
}));

export default products;
