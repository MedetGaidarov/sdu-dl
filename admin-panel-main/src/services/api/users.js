// src/services/api/users.js


const users = [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phoneNumber: '555-555-5555',
    },
    {
      id: 2,
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'jane.doe@example.com',
      phoneNumber: '555-555-5556',
    },
    // Add more users here as needed
  ];
  
  export const getUsers = async () => {
    try {
      return users;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  };
  