import React, { useState } from 'react'
import Alert from '@material-ui/lab/Alert'
import swal from 'sweetalert';

import NewBarrioForm from './NewBarrioForm'

import url from '../../../url/url';
import Axios from 'axios';
import { isAuthenticated } from '../../../utils/user';
import { makeStyles } from '@material-ui/core';
import NoLoggedView from '../../NoLoggedView';


const useStyles = makeStyles((theme) => ({
    newBarrioContent: {
        padding: '16px',
    }
}))

export default function NewBarrio(props) {
    const classes = useStyles()
    const token = localStorage.getItem('access-token')

    const [status, setStatus] = useState({
        loading: false,
        messageError: '',
        error: null
    })


    async function onSubmit(data) {
        console.log(data)

        setStatus({
            ...status,
            loading: true
        })
        console.log(token)
        try {
            let config = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'access-token': token
                },
                data
            }
            console.log('peticion enviada')
            let res = await Axios(`${url}/barrios`, config)
            console.log('peticion recibida', res)
            if (!res.data.ok) {
                console.log('peticion rechazada', res)
                setStatus({
                    status,
                    loading: false,
                    messageError: <Alert severity="error">{res.data.message} </Alert>
                })
            } else {
                console.log('peticion aceptada recuperando token', res.data)
                //setToken(res.da)
                setStatus({
                    status,
                    loading: false,
                    messageError: <Alert severity="success">{res.data.message} </Alert>
                })
            }
            swal({
                title: 'Barrio creado con exito',
                icon: "success",
                buttons: {
                    confirm: 'Ver Barrios',
                }
            }).then(
                val => {
                    if (val) {
                        props.history.push('/')
                    }
                }
            );
        } catch (error) {
            console.log('error capturado', (error))

            setStatus({
                loading: false,
                messageError: <Alert severity="error">Error de connección.</Alert>,
                error
            })

        }
    }

    const logged = isAuthenticated()

    return (
        <>
            <dev className={classes.newBarrioContent}>
                {logged ?
                    <NewBarrioForm
                        onSubmit={onSubmit}
                    />
                    : <NoLoggedView text="barrio" />}
            </dev>
        </>
    );
}
