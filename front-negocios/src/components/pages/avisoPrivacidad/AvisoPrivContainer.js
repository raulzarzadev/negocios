import React from 'react'
import AvisoPriv from './AvisoPriv';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { green } from '@material-ui/core/colors';

const GreenCheckbox = withStyles({
    root: {
        color: green[400],
        '&$checked': {
            color: green[600],
        },
    },
    checked: {},
})((props) => <Checkbox color="default" {...props} />);

export default function AvisoPrivContainer() {
    const [state, setState] = React.useState({
        avisoPrivCheck: false,
        disabled: true,
    })

    const handleChange = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.checked,
            disabled: !state.disabled,
        });
    };
    return (
        <div style={{ textAlign: 'center', margin: '50px 0' }}>
            <FormControlLabel
                label={<AvisoPriv />}
                control={<GreenCheckbox checked={state.avisoPrivCheck} onChange={handleChange} name="avisoPrivCheck" />}
            /> <br/>
            {state.disabled ?
                <Button variant="contained" color="primary" disabled>
                    Crear Anuncio
                </Button> :
                <Button type='submit' variant="contained" color="primary">
                    Crear Anuncio
                </Button>
            }
        </div>
    )
}
