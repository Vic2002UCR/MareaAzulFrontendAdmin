export interface Reserva{
    idReserva:number;
    idCliente: number;
    idHabitacion:number;
    fechaLlegada: Date;
    fechaSalida: Date;
    fechaReservacion: Date;
    totalPagar: number;
    idOferta:number;
}