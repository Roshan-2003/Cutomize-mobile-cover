const API_URL = "http://localhost:5000/api";

export const createProduct = async (formData) => {
  const response = await fetch(
    `${API_URL}/products`,
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Product create failed"
    );
  }

  return data;
};