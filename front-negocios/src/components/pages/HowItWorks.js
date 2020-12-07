import { Box, Typography } from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom'

export default function HowItWorks() {
    return (
        <>
            <Typography variant="h4" paragraph> ¿Como funciona? </Typography>
            <div style={{ display: 'flex', justifyContent: 'center' }}>

                <Box maxWidth="400px">
                    <Typography variant='p' paragraph>
                        <strong>1.</strong> Busca el Barrio o Colonia <strong>donde vives</strong>  o el más cercano <Typography component={Link} to='/'>aquí.</Typography>
                    </Typography>
                    <Typography variant='p' paragraph>
                        <strong>2.</strong> Dentro verás todos los negocios que se hayan registrado.Tú también  <strong>puedes crear</strong> un anuncio <strong>Grátis </strong><Typography component={Link} to='/nuevo-anuncio'>aquí.</Typography>
                    </Typography>
                    <Typography variant='p' paragraph>
                        <strong>3.</strong> Guarda los anuncios que necesites dando click en la banderita. Buscalos en <strong>favoritos</strong>.
                    </Typography>
                    <Typography variant='p' paragraph>
                        <strong>4.</strong> Si tu Barrio <strong>NO</strong> está, crealo <Typography component={Link} to='/nuevo-barrio'>aquí.</Typography>
                    </Typography>
                    <Typography component={Link} to="/nosotros">
                        ¿Por qué lo hacemos?
                    </Typography>

                </Box>
            </div>
        </>
    )
}
