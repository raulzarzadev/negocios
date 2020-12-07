# apiNdB

api.negociosdelbarrio.com 


users
    email: required
    password : required
    credit: number

barrios
    owner : required
    name: required
    price: number


adverts:
    owner: required string
    barrio: require string
    price: number 
    title:  string
    description: String
    whatsApp: String
    tel: string

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
