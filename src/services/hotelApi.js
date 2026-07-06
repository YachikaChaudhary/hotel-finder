const API_URL = "https://demohotelsapi.pythonanywhere.com/hotels/";

export async function getHotels() {
  const response = await fetch(API_URL);
  const data = await response.json();
  return data;
}