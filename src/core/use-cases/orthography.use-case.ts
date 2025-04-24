import type { OrthographyResponse } from "../../interfaces";

export const orthographyUseCase = async (prompt: string) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_BASE_URL}/core-ia/orthography-check`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
        }),
      }
    );
    if (!response.ok) {
      throw new Error("No se pudo realizar la corrección ortográfica");
    }
    const data = (await response.json()) as OrthographyResponse;


    return {
      ok: true,
      ...data,
    };
  } catch (error) {
    return {
      ok: false,
      message: "Error al corregir la ortografía",
    };
  }
};
