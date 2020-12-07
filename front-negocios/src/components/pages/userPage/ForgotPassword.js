import { Box, Button, CircularProgress, TextField, Typography } from '@material-ui/core'
import Axios from 'axios'
import React, { useState } from 'react'
import swal from 'sweetalert'
import url from '../../../url/url'

export default function ForgotPassword() {
    const [isValid, setIsValid] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setIsLoading(true)
            await Axios.post(`${url}/users/forgot-password`, form)
            setIsLoading(false)

        } catch (error) {
            setIsLoading(false)
            console.log(error)
        }
        // *** Independientemente del resultado, envia la alerta de revisar email

        swal({
            title: `Revisa ${form?.email} \n\n  para recuperar tu contraseña`,
            icon: "success",
            buttons: {
                confirm: 'cerrar',
            },
            timer: 3000,
        })
    }

    const [form, setForm] = useState()
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })

        if (e.target.value?.length > 5) {
            setIsValid(true)
        } else {
            setIsValid(false)
        }
    }

    return (
        <>
            <Box my={5}>
                <Typography variant="h4">
                    Recupera tu contraseña
               </Typography>
            </Box>

            <form onSubmit={handleSubmit} noValidate autoComplete="on" >
                <Box m={2}>
                    <TextField
                        autoFocus
                        size="small"
                        type="text"
                        name="email"
                        label="Correo"
                        variant="outlined"
                        onChange={handleChange}
                        helperText={!isValid && !!form?.email?.length && "Escribe un email valido"}

                    />
                </Box>
                <Box m={5}>
                    {isLoading ? <CircularProgress /> :
                        <Button disabled={!isValid} variant="contained" color="primary" type="submit">
                            Enviar
                    </Button>
                    }
                </Box>
            </form >

        </>
    )
}
