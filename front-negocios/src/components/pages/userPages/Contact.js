import React from 'react'
import { Box, Typography } from '@material-ui/core'

export default function Contact() {
    return (
        <>
            <Box my={5}>
                <Typography varaint="h4">
                    Contactanos
                </Typography>
                <Typography>
                    {/* TODO crear una cuenta de correo diferente para recibir contacto informacion etc */}
                    <a href="mailto:mail@negociosdelbarrio.com?Subject=Información%20">
                        Envianos un correo
                    </a>
                </Typography>
            </Box>
        </>
    )
}
