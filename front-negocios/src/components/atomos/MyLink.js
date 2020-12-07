import { makeStyles } from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
    link: {
        textDecoration: "none",
        color: "inherit"
    }
}))

export default function MyLink({ to, children, component }) {
    const classes = useStyles()
    return (
        <Link className={classes.link} to={to} component={component}>
            {children}
        </Link>
    )
}
