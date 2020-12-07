import {  Typography } from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom'


export default function State(props) {
    const { nameState, barrios } = props
    let { count } = props

    const barriosList = []
    barrios.map(barrio => {
        if (barrio.state === nameState) {
            barriosList.push(barrio)
            count = count + 1
        }
        return count
    })
    return (

        <li style={styles.listStates}>
            <Typography variant="h6">
                {nameState} ({count})
                </Typography>
            <ul style={styles.listStates}>
                {barriosList.map((barrio) => (
                    <li key={barrio._id} >
                        <Link to={`/${barrio.shortName}`} > {barrio.name} </Link>
                    </li>
                ))}
            </ul>
        </li>
    )
}

const styles = {

    listContainer: {
        textAlign: 'center',

    },
    listStates: {
        listStyle: 'none',
        padding: '0',
    },
    listItem: {
        cursor: 'pointer'
    }

}

