import React, { useState, useEffect } from 'react';
import { TextField, Button, Card, CardContent } from '@mui/material';

const TestCenterEdit = ({ match }) => {
  const [testCenter, setTestCenter] = useState({ name: '', address: '' });

  // Fetch the test center when the component mounts
  useEffect(() => {
    fetchTestCenter(match.params.id);
  }, [match.params.id]);

  const fetchTestCenter = async (id) => {
    // Fetch the test center from your API here
    // This is a placeholder and will need to be replaced
    const fetchedTestCenter = {
      id,
      name: 'Test Center ' + id,
      address: '123 Main St'
    };

    setTestCenter(fetchedTestCenter);
  };

  const handleChange = (event) => {
    setTestCenter({
      ...testCenter,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Submit the updated test center to your API here
  };

  return (
    <Card>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Test Center Name"
            name="name"
            value={testCenter.name}
            onChange={handleChange}
          />
          <TextField
            label="Test Center Address"
            name="address"
            value={testCenter.address}
            onChange={handleChange}
          />
          <Button type="submit" variant="contained" color="primary">
            Save
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default TestCenterEdit;
