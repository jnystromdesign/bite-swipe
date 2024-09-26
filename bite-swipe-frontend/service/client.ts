import { SuggestionCreate, SuggestionCreateResponse } from "@/components/App";

const API_ENDPOINT = process.env.NEXT_PUBLIC_API_URL;
const vote = async (id: number, points: number) => {
  try {
    const response = await fetch(`${API_ENDPOINT}/vote/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ points }),
    });
    if (!response.ok) {
      throw new Error("Voting failed");
    }
  } catch (error) {
    console.error("Error voting:", error);
  }
};

const fetchSuggestions = async () => {
  try {
    const response = await fetch(`${API_ENDPOINT}/suggestions`);
    if (!response.ok) {
      throw new Error("Failed to fetch suggestions");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching suggestions:", error);
  }
};

const postSuggestion = async (
  suggestion: SuggestionCreate
): Promise<SuggestionCreateResponse> => {
  try {
    const formData = new FormData();
    const jsonData = JSON.stringify({
      name: suggestion.name,
      address: suggestion.address,
    });
    formData.append("json", jsonData);

    if (suggestion.image) {
      formData.append("file", suggestion.image);
    }

    const response = await fetch(`${API_ENDPOINT}/suggestions`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to fetch suggestions");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export { vote, fetchSuggestions, postSuggestion };
