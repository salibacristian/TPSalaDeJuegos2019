export class Usuario{
    id: string;
    email: string;
    clave: string;
    nombre: string;
    edad: number;
    sexo: string;

    constructor(id: string, email: string, nombre: string, clave: string, edad: number, sexo: string){
        this.id = id;
        this.email = email;
        this.clave = clave;
        this.nombre = nombre;
        this.edad = edad;
        this.sexo = sexo;
    }

}