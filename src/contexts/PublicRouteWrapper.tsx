import { ReactElement, ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from './AuthContext' 

const PublicRouteWrapper = ({ component }: { component: ReactNode }): ReactElement => {
    const loggedIn  = useAuth()
    const location = useLocation()

    const redirectPath = () => {
        if (loggedIn) {
            return '/dashboard'
        }       

        return location.pathname
    }

    return !loggedIn ?
        <>
            <div>
                {component}
            </div>
        </> : <Navigate to={redirectPath()} replace />
}

export default PublicRouteWrapper
