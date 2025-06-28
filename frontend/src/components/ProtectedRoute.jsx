//import Login from '@/pages/Login'
//import React from 'react'
//import { useSelector } from 'react-redux'
//import { Navigate } from 'react-router-dom'
//
//const ProtectedRoute = ({children}) => {
//    const {user} = useSelector(store=>store.auth)
//  return (
//    <div>
//      {
//        user ? children:<Navigate to={'/login'}/>
//      }
//    </div>
//  )
//}
//
//export default ProtectedRoute
//

import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user } = useSelector((store) => store.auth)

  if (!user) return <Navigate to="/login" replace />
  if (adminOnly && user.role !== 'admin') return <Navigate to="/403" replace />

  return <>{children}</>
}

export default ProtectedRoute
