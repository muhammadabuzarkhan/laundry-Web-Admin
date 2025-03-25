import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { Navigate } from 'react-router'

const UserAuthCheck = ({ children }) => {
    const navigate = useNavigate()
    const { token } = useSelector((state) => state?.user?.data)
    useEffect(() => {
        if (!token) {
            navigate("/signin", { replace: true })
        }
    },[ token])

    if(!token){
        return <Navigate to="/signin" replace={true} />
    }
    return (
        <>{children}</>
    )
}

export default UserAuthCheck