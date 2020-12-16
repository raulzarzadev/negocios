import React, { useState } from 'react'
import { Container, makeStyles } from '@material-ui/core'
import Footer from './Footer'
import Navbar from './Navbar'
import { isAuthenticated } from '../utils/user'
import Axios from 'axios'
import url from '../url/url'
import { useHistory } from 'react-router-dom'
import Loading from './Loading'

const useStyles = makeStyles(theme => ({
    mainContainer: {
        marginTop: 0,
        padding: theme.spacing(0, 0),
        minHeight: '30rem'
    },

}))



export default function MainContainer({ children, isLoading }) {
    const history = useHistory()
    const classes = useStyles()
    const authenticatedUser = isAuthenticated()
    const [userId, setUserId] = useState(authenticatedUser.id)

    const handleSignOut = (e) => {
        e.preventDefault();
        localStorage.removeItem("access-token");
        history.push('/')
        setUserId();
    };

    React.useEffect(() => {
        if (userId) {
            Axios.get(`${url}/users/${userId}`)
                .then((res) => { setUser(res.data) })
        }

    }, [userId])

    const [user, setUser] = useState(null)

    return (
        <>
            <Navbar handleSignOut={handleSignOut} user={user} />
            <Container className={classes.mainContainer} >
                {isLoading ? <Loading /> :
                    <>
                        {children}
                    </>
                }
            </Container>
            <Footer />
        </>
    )
}
