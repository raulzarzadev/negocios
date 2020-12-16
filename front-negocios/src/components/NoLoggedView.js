import { Box, Typography } from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom'

export default function NoLoggedView({ text = "anuncio" }) {
    return (

        <Box display="flex" justifyContent="center">
            <Box maxWidth="400px" my={4}>
                <Typography variant="h3">{text}</Typography>
                <Typography variant="h5">Debes acceder primero</Typography>
                <Link to="/ingresa">Ingresa </Link>
            </Box>
        </Box>
    )
}
