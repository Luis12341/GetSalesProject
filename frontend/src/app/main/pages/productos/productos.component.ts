import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../../services/producto.service';
import { MarcaService } from '../../../services/marca.service';
import { GrupoService } from '../../../services/grupo.service';
import { AmperajeService } from '../../../services/amperaje.service';
import { InventariosService } from '../../../services/inventario.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  providers:[ProductoService, MarcaService, GrupoService, AmperajeService]
})
export class ProductosComponent implements OnInit {
  public formBuscar: FormGroup;
  public productos: any[];
  public limit: any = 10;
  public page: any = 1;
  public totalPages: number;
  public marcas: any[];
  public grupos: any[];
  public amperajes: any[];
  public usuario;
  
  

  constructor(
    private _productoService: ProductoService,
    private _marcaService: MarcaService,
    private _amperajeService: AmperajeService,
    private _grupoService: GrupoService,
    private _inventariosService: InventariosService,
    private fb: FormBuilder,
    private _authService : AuthService
  ) {
    this.formBuscar = this.fb.group({
      parametro: ['nombre',Validators.required],
      valorParametro: ['',Validators.required],
    });
    this.usuario = this._authService.getIdentity();
  }

  ngOnInit(): void {
    this.traerProductos();
    this.traerInfoProductos();
  }

  traerProductos() {
    this._productoService.getAll(this.limit, this.page).subscribe(
      (res: any) => {
        console.log(res.results)
        this.productos = res.results;
        this.totalPages = res.totalPages;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  traerInfoProductos(){
     this._marcaService.getAll().subscribe(
       (res:any)=>{
         this.marcas = res.results
       }
     )
     this._amperajeService.getAll().subscribe(
       (res:any)=>{
         this.amperajes = res.results
       }
     )
     this._grupoService.getAll().subscribe(
       (res:any)=>{
         this.grupos = res.results
       }
     )
  }

  busqueda(){
    if(this.formBuscar.invalid) {
      this.traerProductos()
      return;
  };
    const {parametro, valorParametro  } = this.formBuscar.value;

    this._productoService.search(parametro, valorParametro).subscribe(
      (res:any)=>{
        console.log(res)
        
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
