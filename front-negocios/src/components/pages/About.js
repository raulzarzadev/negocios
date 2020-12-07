import { Box, Typography } from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom'

export default function About() {
    return (
        <>
            <Typography variant="h4" paragraph>
                ¿Qué es<br /> negociosdelbarrio.com?
            </Typography>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <Box maxWidth="400px">
                    <Typography paragraph>
                        <strong>Una idea. </strong>
                 ¿Que todo el mundo sepa lo que <strong>producen / venden / comercian</strong> sus vecinos o cerca de ellos.
            </Typography>
                    <Typography paragraph>
                        <strong>Un propósito. </strong>
               Reducir las <strong>desventajas </strong> que significa salir lejos de casa, a buscar articulos que puede vendan cerca de tí.  <strong>tiempo / transporte / contaminación / estrés / delincuencia </strong>
                    </Typography>
                    <Typography paragraph>
                        <strong>Un medio. </strong>
                        <strong>Software. </strong>  La tecnologia nos brinda hoy la capacidad de <strong>crear</strong>  cosas increíbles. Porque no hacer algo para nuestras comunidades
            </Typography>
                    <Typography component={Link} to='/como-funciona'>
                        ¿Quieres saber cómo funciona?
                </Typography>
                </Box>
            </div>
        </>
    )
}
