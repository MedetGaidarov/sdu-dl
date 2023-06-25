import { CContainer, CFooter, CHeader } from '@coreui/react';
import React from 'react'


const DefaultLayout = ( {children}) => {
    return (
        <div className="c-app c-default-layout">
          <div className="c-wrapper">
            <CHeader/>
            <div className="c-body">
              <CContainer fluid>
                    {children}
              </CContainer>
            </div>
            <CFooter/>
          </div>
        </div>
      );
}

export default DefaultLayout