export const createProductIntoDB = async (payload) => {
  const { productDescription } = payload;

  const productData = {
    productDescription,
  };

  const result = await Product.create(productData);

  return result;
};
