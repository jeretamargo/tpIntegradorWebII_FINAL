async function getCategories(): Promise<object[]> {
  try {
    const res = await fetch("http://161.35.104.211:8000/categories", {
      headers: {
        accept: "application/json",
        Authorization: "Bearer jeremias01",
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(`Error cargando categorias: ", ${error}`);
    throw error;
  }
}

async function getCategorieByID(id: number): Promise<object[]> {
  try {
    const res = await fetch(`http://161.35.104.211:8000/categories/${id}`, {
      headers: {
        accept: "application/json",
        Authorization: "Bearer jeremias01",
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(`Error cargando categoria: ", ${error}`);
    throw error;
  }
}
export interface Categorie {
  title: string;
  description: string;
  id: number;
  picture: string;
}
export { getCategories, getCategorieByID };
