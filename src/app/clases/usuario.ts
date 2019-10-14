export class Usuario{
    id: string;
    email: string;
    clave: string;
    nombre: string;

    constructor(id: string, email: string, nombre: string, clave: string){
        this.id = id;
        this.email = email;
        this.clave = clave;
        this.nombre = nombre;
    }

}