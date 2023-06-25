// Profile.js
import React from 'react'
import {
  CRow,
  CCol,
  CCard,
  CCardHeader,
  CCardBody,
  CForm,
  CFormInput,
  CAvatar,
} from '@coreui/react'

const Profile = () => {
  const name = 'Medet Gaidarov' // This could be fetched from a server in a real application
  const initials = name
    .split(' ')
    .map((part) => part.charAt(0))
    .join('')

  return (
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader>
            <CAvatar color="info" text={initials.toUpperCase()} size="lg" />
            Profile
          </CCardHeader>
          <CCardBody>
            <CForm>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <CFormInput id="name" placeholder="Enter your name" />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <CFormInput type="email" id="email" placeholder="Enter your email" />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <CFormInput type="password" id="password" placeholder="Enter your password" />
              </div>
              <div className="form-group">
                <label htmlFor="bio">Bio</label>
                <CFormInput
                  type="textarea"
                  id="bio"
                  placeholder="Tell us a little about yourself"
                />
              </div>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Profile
