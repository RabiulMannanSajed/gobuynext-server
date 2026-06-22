export const getAllProducts = async (req, res) => {
  try {
    const result = await req.query;

    res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      meta: result.meta,
      data: result.data,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to fetch products",
    });
  }
};

export const createProduct = async (req, res) => {
  try {
    const result = await req.body;

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to create product",
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await (id, req.body);

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to update product",
    });
  }
};
