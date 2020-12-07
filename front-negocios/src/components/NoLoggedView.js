import { Box, Typography } from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom'

export default function NoLoggedView({ text = "anuncio" }) {
    return (

        <Box display="flex" justifyContent="center">
            <Box maxWidth="400px" my={4}>
                <Typography variant="h4">Para crear un {text}, primero entra a tu cuenta</Typography>
                <Link to="/perfil">Ingresa </Link>
            </Box>
        </Box>
    )
}
