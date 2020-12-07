import React, { useState } from 'react'
import { Box, Typography } from '@material-ui/core'
import Axios from 'axios'
import { useHistory, useParams } from 'react-router-dom'
import swal from 'sweetalert'
import url from '../../../url/url'
import SignForm2 from './SignForm2'

export default function RecoverPassword() {
    const { token } = useParams()
    const history = useHistory()
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (form) => {
        try {
            setIsLoading(true)
            const { data } = await Axios.post(`${url}/users/recover-password/${token}`, form)
            if (data.ok) {
                swal({
                    title: "Genial",
                    text: `${data.message}`,
                    icon: "success",
                    buttons: {
                        confirm: 'Ingresar',
                    },
                }).then(
                    val => {
                        console.log(val)
                        if (val) {
                            history.push('/ingresa')
                        }
                    })
            } else {
                swal({
                    title: "Ups!",
                    text: `${data.message}`,
                    icon: data.ok ? "success" : "error",
                    buttons: {
                        confirm: 'Intenta nuevamente',

                    },
                }).then(
                    val => {
                        if (val) {
                            history.push('/forgot-password')
                        }
                    })
            }
            setIsLoading(false)

        } catch (error) {
            console.log(error)
            setIsLoading(false)

        }

    }

    return (
        <>

            <Box m={5}>
                <Typography variant="h4">
                    Ingresa una nueva contraseña
                </Typography>
            </Box>
            <SignForm2 onSubmit={handleSubmit} isLoading={isLoading} />
            <Box m={5}>
                {/*   {status.value === "alreadyReg" &&
                    <Alert severity="warning" message="Este mail ya esta registrado." link={{ to: "/perfil", label: "Ingresa" }} />
                }
                {status.value === "emailSent" &&
                    <Alert severity="success" message="Revisa tu correo para continuar el proceso" />
                } */}
            </Box>
        </>
    )
}
