import React from 'react'
export default function Credit() {
    const addCredit = (credit) => {
        console.log(credit)
    }
    return (
        <div style={{textAlign: 'center'}}>
            <h1>
                Agrega  credito
            </h1>
            <button disabled onClick={() => addCredit(25)}>$ 25.00 de credito </button>
            <h1>Ups! Aun estamos trabajando en esto</h1>
        </div>
    )
}
