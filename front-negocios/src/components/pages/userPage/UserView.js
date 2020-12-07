import React from 'react'
import { Box, Typography } from '@material-ui/core'/* 
import Card from '../../AdvertCard';
import { Link } from 'react-router-dom'; */


export default function UserView({ data }) {
    console.log(data)
    const { user } = data
    console.log(user)
    return (
        <Box my={3}>
            <Typography variant="h4">
                Usuario
            </Typography>
            <Box>

            </Box>
            <Typography variant="h4">
                Anuncios Creados
            </Typography>
        </Box>
    )
}
