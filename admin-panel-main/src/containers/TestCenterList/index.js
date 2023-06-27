import React, { useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { Button, Card, CardContent } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import EditIcon from '@mui/icons-material/Edit'
import { useNavigate } from 'react-router-dom'
import { CButton } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPlus } from '@coreui/icons'
const TestCenterList = ({ testCenters }) => {
  // const [testCenters, setTestCenters] = React.useState([])
  const [open, setOpen] = React.useState(false)
  const [deleteId, setDeleteId] = React.useState(null)
  const navigate = useNavigate()

  const handleDeleteTestCenter = (id) => {
    fetch(`http://localhost:8080/api/testcenters/${id}`, {
      method: 'DELETE',
    })
      .then((res) => {
        if (!res.ok) {
          throw res
        }
        // Delete was successful, handle it here
        // You could update your state to remove the deleted test center, for example
        setOpen(false)
      })
      .catch((err) => {
        console.error('Failed to delete test center:', err)
        // Handle any errors here
      })
  }

  const handleOpen = (id) => {
    setDeleteId(id)
    setOpen(true)
    handleDeleteTestCenter(id)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleDelete = () => {
    // delete operation here
    setOpen(false)
  }
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Test Center Name', width: 300 },
    { field: 'address', headerName: 'Test Center Address', width: 300 },
    { field: 'city', headerName: 'Test Center City', width: 300 },
    {
      field: '',
      headerName: 'Actions',
      sortable: false,
      width: 240,
      renderCell: (params) => {
        return (
          <>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate(`/testcenters/${params.row.id}`)}
            >
              Брони
            </Button>
            <Button
              variant="contained"
              startIcon={<EditIcon />}
              onClick={() => navigate(`/testcenters/edit/${params.row.id}`)}
            >
              Изменить
            </Button>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<DeleteIcon />}
              onClick={() => handleOpen(params.row.id)}
            >
              Удалить
            </Button>
          </>
        )
      },
    },
  ]

  return (
    <Card>
      <CButton color="primary" onClick={() => navigate('/testcenters/add')}>
        <CIcon icon={cilPlus} /> Добавить
      </CButton>
      <CardContent>
        <DataGrid
          rows={testCenters.map((center) => ({
            id: center.id,
            address: center.name,
            name: center.address,
            city: center.city,
          }))}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{'Confirm Delete'}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Вы уверены удалить ?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Отмена
            </Button>
            <Button onClick={handleDelete} color="primary" autoFocus>
              Удалить
            </Button>
          </DialogActions>
        </Dialog>
      </CardContent>
    </Card>
  )
}

export default TestCenterList
