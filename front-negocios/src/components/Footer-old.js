import React from 'react'

import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';


export default function Footer({ avatar, addBarrio, addAdvert, barrios }) {

    return (
        <div>
            <div style={styles.bottomBar}>
                {avatar ?
                    <Link
                        to='/perfil'
                        style={styles.avatarDiv}
                    >
                        <Avatar
                            style={styles.avatar}
                            alt="Remy Sharp"
                            src="/static/images/avatar/1.jpg"

                        //className={classes.large}
                        />

                    </Link>
                    :
                    null}
                {barrios ?
                    <Button
                        variant="contained"
                        color="primary"
                        href='/'

                    >
                        Ver barrios
                    </Button>
                    :
                    null}
                    
                {addBarrio ?
                    <Button
                        variant="contained"
                        color="primary"
                        href='/nuevo-barrio'
                    >
                        Nuevo Barrio
                    </Button>
                    :
                    null}


                {addAdvert ?
                    <Button
                        variant="contained"
                        color="primary"
                        href='/nuevo-anuncio'
                    >
                        Crea anuncio
                    </Button>
                    :
                    null
                }

            </div>
        </div>
    )
}

const styles = {
    avatarDiv: {
        position: 'fixed',
        right: '50%',
    },
    avatar: {
        marginTop: '-75px',
        marginRight: '-40px',
        width: '80px',
        height: '80px',
        backgroundColor: 'blue',
        cursor: 'pointer'
    },
    bottomBar: {
        padding: '0',
        width: '100%',
        height: '80px',
        backgroundColor: '#F5A9D0',
        position: 'fixed',
        bottom: 0,
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center'

    }
}
