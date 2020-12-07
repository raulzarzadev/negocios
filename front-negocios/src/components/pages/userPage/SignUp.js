import { Box, Typography } from '@material-ui/core'
import React from 'react'
import Alert from '../../Alert'
import SignForm2 from './SignForm2';
import { useUser } from '../../../context/userContext';

export default function SignUp() {

    const { signup, data } = useUser()
    console.log(data)


    return (
        <>
            <Box>
                {data?.type === "alreadyReg" &&
                    <Alert severity="warning" message="Este mail ya esta registrado." link={{ to: "/ingresa", label: "Ingresa" }} />
                }
                {data?.type === "emailSent" &&
                    <Alert severity="success" message="Revisa tu correo para continuar el proceso" />
                }
            </Box>
            <Box m={5}>
                <Typography variant="h4">
                    Registrate
                </Typography>
            </Box>
            <SignForm2 onSubmit={signup} />
        </>
    )
}
