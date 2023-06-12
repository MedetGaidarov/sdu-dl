
  export const getTestCenters = async () => {
    try {
      let serverUrl = new URL('http://localhost:8080/api/testcenters');
      const response = await fetch(serverUrl);
      const data =  await response.json(); 
      return data
    } catch (error) {
      console.error('Error fetching test centers:', error);
      throw error;
    }
  };
  

  
  

