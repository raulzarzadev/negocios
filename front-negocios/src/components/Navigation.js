import { makeStyles } from '@material-ui/core'
import React from 'react'
import Filtro from './Filtro'
//const negdelbar = require('./images/NegDelBar.png')
const useStyles = makeStyles(theme => ({
    topBar: {
        position: "relative",

    }
}))

export default function Navigation() {
    const classes = useStyles()
    return (
        <div className={classes.topBar}>
            <Filtro />
        </div>
    )
}

