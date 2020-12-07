import React from 'react'

import TextField from '@material-ui/core/TextField';

import Card from '../../AdvertCard';
import Select from '@material-ui/core/Select';

import useAxios from '../../myHooks/useFetch'
import FatalError from '../errors/500'
import url from '../../../url/url'


import FormControl from '@material-ui/core/FormControl';

import AvisoPrivContainer from '../avisoPrivacidad/AvisoPrivContainer';
import { Container } from '@material-ui/core';
import Loading from '../../atomos/Loading';


export default function NewAdvertForm(props) {
    const { onChange, form, onSubmit, message } = props

    const { data, loading, error } = useAxios(`${url}/barrios/`)
    if (loading) return <Loading />
    if (error) return <FatalError />


    return (
        <>
        
            <h4>Nuevo Anuncio</h4>

            <div style={styles.cardContainer}>
                <Card
                    {...form}
                />
            </div>
            <Container style={{ padding: '15px 10% 100px' }}>
                <form onSubmit={onSubmit}>
                    {/* Aqui iba la seleccion del fondo */}
                    <h5 style={styles.subTiltes}>¿Que vendes?</h5>
                    <TextField
                        onChange={onChange}
                        autoFocus
                        margin="dense"
                        name="title"
                        label="Titulo [30 letras]"
                        type="text"
                        fullWidth
                    />

                    <TextField
                        onChange={onChange}
                        margin="dense"
                        name="description"
                        label="Contenido [120 letras]"
                        type="text"
                        fullWidth
                    />

                    <h5 style={styles.subTiltes}>¿Como te encuentran?</h5>

                    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                        <TextField
                            onChange={onChange}
                            margin="dense"
                            name="faceUrl"
                            label="Facebook [recomendable]"
                            type="string"
                        />
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                        <TextField
                            onChange={onChange}
                            margin="dense"
                            name="whatsApp"
                            label="WhatsApp [recomendable]"
                            type="string"
                        />
                    </div>
                    <h5 style={styles.subTiltes}>¿En donde lo publicamos?</h5>
                    <FormControl variant="outlined">
                        <Select
                            name='barrio'
                            native
                            //value={state.name}
                            onChange={onChange}
                        >
                            <option aria-label="None" value="" >Selecciona un barrio</option>
                            {data?.barrios?.map(barrio =>
                                <option key={barrio._id} value={JSON.stringify(barrio)}>{barrio.name}</option>
                            )}
                        </Select>
                    </FormControl>
                    {message}
                    <AvisoPrivContainer {...props} />
                </form>
            </Container>
        </>

    )
}
const styles = {
    subTiltes:{
            marginTop: '40px'
    },
    cardContainer: {
        display: 'flex',
        justifyContent: 'center',
        minWidth: '180px',
        minHeight: '130px',
    },
}
