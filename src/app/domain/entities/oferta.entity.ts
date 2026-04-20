export interface Oferta{
    idOferta: number;
    nombre:string;
    descripcion:string;
    imagenUrl:string;
    estado: string;
    descuento: number;
    fechaInicio: Date;
    fechaFin: Date;
}