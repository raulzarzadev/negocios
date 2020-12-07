import React from 'react'

import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { useForm } from "react-hook-form";
import Alert from '@material-ui/lab/Alert'

const estadosDeMexico = [
    "Aguascalientes",
    "Baja California",
    "Baja California Sur",
    "Campeche",
    "Coahila de Zaragoza",
    "Colima",
    "Chiapas",
    "Chihuahua",
    "CDMX",
    "Durango",
    "Guanajuato",
    "Guerrero",
    "Hidalgo",
    "Jalisco",
    "Estado de Mexico",
    "Michoacán de Ocampo",
    "Morelos",
    "Nayarit",
    "Nuevo León",
    "Oaxaca",
    "Puebla",
    "Querétaro",
    "Quintana Roo",
    "San Luis Potosí",
    "Sinaloa",
    "Sonora",
    "Tabasco",
    "Tamaulipas",
    "Tlaxcala",
    "Veracruz ",
    "Yucatán",
    "Zacatecas",
]


export default function NewBarrioForm({ onSubmit, form }) {
    const { register, handleSubmit, errors } = useForm();

    return (
        <>
            <h4>Nuevo Barrio</h4>
            <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="on">
                <div style={styles.input}>
                    <FormControl>
                        <TextField
                            name='name'
                            label="nombre del barrio"
                            variant="outlined"
                            inputRef={register({
                                required: {
                                    value: true,
                                    message: "Escribe el nombre completo del barrio"
                                },
                                minLength: {
                                    value: 6,
                                    message: "Al menos 6 caracteres"
                                }
                            })} />
                        {errors.name && <Alert style={{ margin: 0 }} severity="warning">{errors.name.message}</Alert>}
                 [Ej. Villas de La Hacienda, Atizapán]
                </FormControl>
                </div>
                <div style={styles.input}>
                    <FormControl variant="outlined">
                        <TextField
                            name='shortName'
                            label="nombre corto"
                            variant="outlined"
                            inputRef={register({
                                required: {
                                    value: true,
                                    message: "Escribe un nombre corto"
                                },
                                pattern: {
                                    value: /^([a-z]{4,20})$/,
                                    message: "Sin espacios, minusculas, 20 caracteres"
                                }
                            })} />

                        {errors.shortName && <Alert severity="warning">{errors.shortName.message}</Alert>}
                 [ Ej. lasvillas]

                </FormControl>
                </div>
                <div style={styles.input}>
                    <FormControl variant="outlined">
                        <Select
                            name='state'
                            native
                            //value={state.name}
                            inputRef={register({
                                required: {
                                    value: true,
                                    message: "Selecciona un Estado"
                                }
                            })}
                        >
                            <option aria-label="" value="" >Selecciona un estado</option>
                            {estadosDeMexico.map((estado) => (
                                <option key={estado} value={estado} >{estado}</option>
                            ))}
                        </Select>
                        {errors.state && <Alert severity="warning">{errors.state.message}</Alert>}
                    Solo en México, por ahora.
                    </FormControl>
                </div>

                <div style={styles.input}>


                    <Button
                        variant="contained"
                        color="primary"
                        type='submit'
                    >
                        Agregar
                    </Button>
                </div>


            </form>

        </>
    )
}

const styles = {
    title: {
        margin: '20px 0',
    },
    input: {
        margin: '20px 0'
    }
}