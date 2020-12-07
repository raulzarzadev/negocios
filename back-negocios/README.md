 ![alt text](https://res.cloudinary.com/dl8uisxpu/image/upload/v1588015629/NdB/NegDelBar_ovney6.png) 
 
# Negocios del Barrio

_Una api para ver y crear pequeños anuncios en un barrio especifico._

## Comenzando 🚀

Puedes acceder a algunos endpoints sin necesidad de autenticarte. La mayoria de esta información es libre y esta autorizada por los anunciantes de ser publica.

_Podras encontrar el proyecto principal en:_  http://www.negociosdelbarrio.com/) .

_Para crear anuncios debes estar autenticado. Usamos jwt para este proceso._

### Pre-requisitos 📋


Podras ver todos los barrios creados aqui. 

https://api.negociosdelbarrio.com/api/barrios

Obteniendo un json como el siguiente.

```
[
    {
        "_id":"5eb5dcab4656540099fa52e929",
        "shortName":"villas"},
        "name":"Villas de la Hacienda",
        "state":"Estado de Mexico",
        "price":25,
        "owner":"5eb5dbc541853158099fa52e929"
    },
    ...obj
]

```
Para acceder a los anucnios despegados en por barrio basta con agregar en _shortName_ del barrio a la peticion 

https://api.negociosdelbarrio.com/api/barrios/villas

```
{
    "barrio":
        {
        "_id":"5eb5dbc558725099fa52e929",
        "name":"Villas de la Hacienda",
        "price":25,"owner":"mio",
        "state":"Estado de Mexico",
        "pathname":"villas",
        "shortName":"villas"
        },
    "adverts":
        [
            {
                "_id": "5ea3e56e6f443e69a082d94c",
                "title":"Purificadora GRUPO PURISYSTEMS",
                "description":"Servicio por mayoreo a precios especiales! .",
                "tel":"5562868307",
                "barrio":{
                    "name":"Villas de la Hacienda",
                    "shortName":"villas",
                    "state":"Estado de Mexico"
                    },
                "labels":[],
                "tamaño":1,
                "advertContent":{"labels":[]},
                "esquema":1,
                "whatsApp":"5562868307",
                "instaUrl":[url],
                "faceUrl":[url],
                "siteUrl":[url],
                "imgUrlIzq":[url]",
                "imgUrlDer":[url],
                "location":[url],
                "styles":{"backgroundColor":"#E469A2"},
                "state":"Estado de Mexico"
                }
            },
            ...obj
        ]
}
```

### Acceder 🔧

Para acceder a crear barrios y anuncios, se deben hacer solicitudes POST a los siguientes rutas y especificaciones.


https://api.negociosdelbarrio.com/api/barrios/users/signup
    
    
El json del method POST debe coneter el siguiente formato


```
{
    email: String , Required, 
    password: String, Required
}
```


La respuesta sera 
```
    {
            ok: boolean, 
            message: String,
            newUser: {objeto},
            token: String
    }
```
Aqui se resumen los en points asta ahora. 

api/users/
    get: user
    post: creo usuario
        {
            email: required
            password : required
        }

api/users/addCredit/
    get:


api/barrios/

    get: muestra todos los barrios registrados
    post: crea un barrio, solo si token y credito son true

api/barrios/:id 

    get : muestra todos los anuncios de ese barrio

api/adverts/

    get: trae todos los anuncios creados
    post: crea un anuncio nuevo, solo si token y credito son 
    
api/adverts/:user

    get: todos los anuncios de ese user

## Esta API aun se encuentra en desarrollo. 

¿Te interesa colaborar?

Contactame _raulzarza.com_
