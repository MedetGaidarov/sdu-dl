import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Typography } from '@mui/material'
import { getTestCenters } from '../../services/api/testCenters'
import TestCenterList from '../TestCenterList'

const TestCenters = () => {
  const [testCenters, setTestCenters] = useState([])
  const location = useLocation()

  useEffect(() => {
    const fetchTestCenters = async () => {
      try {
        const data = await getTestCenters()
        setTestCenters(data)
        console.log(testCenters, 'mytests')
      } catch (error) {
        console.error('Error fetching test centers:', error)
      }
    }

    fetchTestCenters()
  }, [location]) // include location in the dependency array

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Test Centers
      </Typography>
      <TestCenterList testCenters={testCenters} />
    </div>
  )
}

export default TestCenters
