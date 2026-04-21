export interface Oferta{
    id?: number;
    nombre:string;
    descripcion:string;
    imageUrl:string;
    estado?: boolean;
    descuento: number;
    fechaInicio: string;
    fechaFin: string;
}