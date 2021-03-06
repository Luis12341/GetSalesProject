import { Component, OnInit, Output, EventEmitter,Input } from '@angular/core';
import { ProductoService } from "src/app/services/producto.service";
import { FormGroup,Validators,FormBuilder } from '@angular/forms';

@Component({
  selector: 'elegir-producto',
  templateUrl: './elegirProducto.component.html',
  providers:[ProductoService]
})
export class ElegirProducto implements OnInit {
  @Output() producto:EventEmitter<any> = new EventEmitter<any>();
  @Input() productoElegido: any = {};

  public formBuscar: FormGroup;
  public productos: any[];
  public limit: any = 10;
  public page: any = 1;
  public totalPages: number;
  public marcas: any[];
  public grupos: any[];
  public amperajes: any[];

  showModal = false;
  toggleModal(){
    this.showModal = !this.showModal;
  }
  elegir(producto){
    if(parseInt(producto.inventario.existencia_producto) === 0) return;
    this.producto.emit(producto);
    this.showModal = false;
  }
 
  
  

  constructor(
    private _productoService: ProductoService,
    private fb: FormBuilder
  ) {
    this.formBuscar = this.fb.group({
      parametro: ['nombre',Validators.required],
      valorParametro: ['',Validators.required],
    });
  }

  ngOnInit(): void {
    this.traerProductos();
  }

  traerProductos() {
    this._productoService.getAll(this.limit, this.page).subscribe(
      (res: any) => {
        // console.log(res.results)
        this.productos = res.results;
        this.totalPages = res.totalPages;
      },
      (err) => {
        console.log(err);
      }
    );
  }


  busqueda(){
    if(this.formBuscar.invalid) {
      this.traerProductos()
      return;
  };
    const {parametro, valorParametro  } = this.formBuscar.value;

    this._productoService.search(parametro, valorParametro).subscribe(
      (res:any)=>{
        // console.log(res)
        
        this.productos = res;
        this.totalPages = 0;
      },
      err=>{
        this.productos = [];
        console.log(err)
      }
    )
  }

  paginaSiguiente(){
    this.page++;
     this.traerProductos()
  }
  paginaAnterior(){
    this.page--;
    this.traerProductos()
  }
}