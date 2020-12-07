import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

export default function TransitionAlerts({ message, severity, link = false }) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);

    return (
        <div className={classes.root}>
            <Collapse in={open}>
                <Alert
                    severity={severity}
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                setOpen(false);
                            }}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                >
                    {message}{" "}
                    {link && <Link to={link.to}>{link?.label}</Link>}
                </Alert>
            </Collapse>

        </div>
    );
}
