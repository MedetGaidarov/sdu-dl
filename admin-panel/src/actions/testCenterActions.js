import axios from "axios";


export const postTestCenter = async  (testCenter) => {
    try {
        // Make an API request to the server to add the test center
        const response = await axios.post("http://localhost:8080/api/testcenters", testCenter);
        // Handle the response from the server as needed
        console.log("Test center added successfully:", response.data);
      } catch (error) {
        // Handle the error from the server if the request fails
        console.error("Failed to add test center:", error);
      }
}