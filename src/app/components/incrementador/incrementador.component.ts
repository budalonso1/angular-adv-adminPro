import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';


@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styleUrls: ['./incrementador.component.css']
})
export class IncrementadorComponent implements OnInit {

  @Input() progreso: number;
  @Input() btnClass =  'btn-primary';
  @Output() valorSalida: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit(){
    this.btnClass = `btn ${this.btnClass }`;
  }

  onChange( nuevoValor: number ){

    if ( nuevoValor >= 100 ){
      this.progreso = 100;
    } else if( nuevoValor <= 0 ){
      this.progreso = 0;
    } else {
      this.progreso = nuevoValor;
    }

    this.valorSalida.emit( this.progreso );
  }

  cambiarValor( valor: number){
    if (this.progreso >= 100 && valor >= 0) {
      const valor1 = 100;
      this.valorSalida.emit(valor1);
      return this.progreso = valor1;
    }
    if (this.progreso <= 0 && valor <= 0) {
      const valor2 = 0;
      this.valorSalida.emit(valor2);
      return this.progreso = valor2;
    }
    this.progreso = this.progreso + valor;
    this.valorSalida.emit(this.progreso);
  }
}
