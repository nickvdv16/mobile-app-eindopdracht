export const checkResponse = async (response) => {
    const data = await response.json();
  
    if (!response.ok) {
      console.log("WEBFLOW API ERROR:", data);
      throw new Error(`API error: ${response.status}`);
    }
  
    return data;
  };
  
  export const formatDate = (dateString) => {
    if (!dateString) {
      return "";
    }
  
    const date = new Date(dateString);
  
    return date.toLocaleDateString("nl-BE", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };