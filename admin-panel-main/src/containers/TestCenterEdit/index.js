import React, { useEffect, useState } from 'react'
import { Button, Container, TextField, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const useStyles = makeStyles({
  root: {
    marginTop: 50,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  textField: {
    marginBottom: 15,
  },
  submitButton: {
    marginTop: 20,
    backgroundColor: '#1976d2',
    color: '#ffffff',
    '&:hover': {
      backgroundColor: '#115293',
    },
  },
})

function TestCenterEdit() {
  const classes = useStyles()
  const { id } = useParams()
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [zip, setZip] = useState('')
  const navigate = useNavigate()
  // Fetch test center data based on the ID from an API or other data source
  // For this example, let's assume you have a function named `fetchTestCenter` that returns the test center data based on the ID
  const fetchTestCenter = async () => {
    try {
      // Make an API request to fetch the test center data
      const response = await fetch(`http://localhost:8080/api/testcenters/${id}`)
      const data = await response.json()

      // Update the form fields with the fetched test center data
      setName(data.name)
      setAddress(data.address)
      setCity(data.city)
      setState(data.state)
      setZip(data.zip)
    } catch (error) {
      console.error('Failed to fetch test center:', error)
    }
  }

  // Call the fetchTestCenter function when the component mounts
  useEffect(() => {
    fetchTestCenter()
  }, [])

  const handleNameChange = (event) => {
    setName(event.target.value)
  }

  const handleAddressChange = (event) => {
    setAddress(event.target.value)
  }

  const handleCityChange = (event) => {
    setCity(event.target.value)
  }

  const handleStateChange = (event) => {
    setState(event.target.value)
  }

  const handleZipChange = (event) => {
    setZip(event.target.value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    // Create the testCenter object with the updated values
    const testCenter = {
      name,
      address,
      city,
      state,
      zip,
    }

    try {
      // Make an API request to update the test center data
      const response = await axios.put(`http://localhost:8080/api/testcenters/${id}`, testCenter)

      // Handle the response from the server as needed
      console.log('Test center updated successfully:', response.data)
      navigate('/testcenters')
    } catch (error) {
      // Handle the error from the server if the request fails
      console.error('Failed to update test center:', error)
    }
  }

  return (
    <Container maxWidth="xs" className={classes.root}>
      <Typography variant="h4" align="center" gutterBottom>
        Редактировать Тест Центр
      </Typography>
      <form className={classes.form} onSubmit={handleSubmit}>
        <TextField
          label="Названия"
          variant="outlined"
          fullWidth
          className={classes.textField}
          value={name}
          onChange={handleNameChange}
        />
        <TextField
          label="Адрес"
          variant="outlined"
          fullWidth
          className={classes.textField}
          value={address}
          onChange={handleAddressChange}
        />
        <TextField
          label="Город"
          variant="outlined"
          fullWidth
          className={classes.textField}
          value={city}
          onChange={handleCityChange}
        />
        <TextField
          label="Штат"
          variant="outlined"
          fullWidth
          className={classes.textField}
          value={state}
          onChange={handleStateChange}
        />
        <TextField
          label="Почтовый индекс"
          variant="outlined"
          fullWidth
          className={classes.textField}
          value={zip}
          onChange={handleZipChange}
        />
        <Button variant="contained" fullWidth className={classes.submitButton} type="submit">
          Изменить
        </Button>
      </form>
    </Container>
  )
}

export default TestCenterEdit
