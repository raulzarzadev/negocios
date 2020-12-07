import React, { useState } from 'react'

import FastfoodIcon from '@material-ui/icons/Fastfood';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import LocalDrinkIcon from '@material-ui/icons/LocalDrink';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import DirectionsBikeIcon from '@material-ui/icons/DirectionsBike';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import ChildCareIcon from '@material-ui/icons/ChildCare';
import AllInclusiveIcon from '@material-ui/icons/AllInclusive';

export default function Filtro() {
    const [filtro, setFiltro] = useState('todos');

    const handleChangeFilter = newFiltro => {
        setFiltro(newFiltro)
    }
    return (
        <div>
            <div style={styles.root}>
                <AllInclusiveIcon style={styles.icon} onClick={() => handleChangeFilter('todos')} />
                <FastfoodIcon style={styles.icon} onClick={() => handleChangeFilter('comida')} />
                <HomeWorkIcon style={styles.icon} onClick={() => handleChangeFilter('hogar')} />
               <LocalDrinkIcon style={styles.icon} onClick={() => handleChangeFilter('bebidas')} />
                <LocalHospitalIcon style={styles.icon} onClick={() => handleChangeFilter('salud')} />
                <DirectionsBikeIcon style={styles.icon} onClick={() => handleChangeFilter('entrega')} />
                <LocalMallIcon style={styles.icon} onClick={() => handleChangeFilter('recogelo')} />
                <ChildCareIcon style={styles.icon} onClick={() => handleChangeFilter('niños')} />
            </div>
            <p style={{backgroundColor: '#fff', margin:' 0 80px', borderRadius: '50%'}}>
                {filtro}
            </p>
        </div>
    )
}

const styles = {
    root: {
        display: 'flex',
        justifyContent: 'center'
    },
    button: {
    },
    icon: {
        margin: '5px 5px 15px',
    }
}