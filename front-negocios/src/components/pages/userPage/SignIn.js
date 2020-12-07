import { Box, Typography } from '@material-ui/core'
import React from 'react'
import Alert from '../../Alert'
import SignForm2 from './SignForm2';
import { useUser } from '../../../context/userContext';
import { useHistory } from 'react-router-dom';

export default function SignIn() {
    const { login, data, loadingUser } = useUser()
    const history = useHistory()
    console.log(data)
    if (data?.ok) {
        history.push('/')
    }
    console.log(loadingUser)
    return (
        <>
            <Box>
                {data?.type === "faildSignIn" &&
                    <Alert severity="error" message="Las credenciales no son validas. Intenta nuevamente o recupera tu contraseña " link={{ to: "/forgot-password", label: "aquí" }} />
                }
                {data?.type === "successSignIn" &&
                    <Alert severity="success" message="!Bienvendio!" />
                }
            </Box>
            <Box m={5}>
                <Typography variant="h4">
                    Ingresa
                </Typography>
            </Box>
            <SignForm2 onSubmit={login} isLoading={loadingUser} />
        </>
    )
}
