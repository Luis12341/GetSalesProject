export class Venta {
  constructor(
    public id: string,
    public cliente_id: string,
    public usuario_id: string,
    public fecha: any,
    public detalle_venta:any
  ) {}
}
