export interface Oferta{
    id?: number;
    nombre:string;
    descripcion:string;
    imageUrl:string;
    estado?: boolean;
    descuento: number|null;
    fechaInicio: string;
    fechaFin: string;
}