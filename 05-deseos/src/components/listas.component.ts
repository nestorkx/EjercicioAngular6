import {Component, Input} from '@angular/core';
import { DeseosService } from '../services/deseos.service';
import { Lista         } from '../models';
import { AgregarPage   } from '../pages/agregar/agregar.component';
import {NavController, AlertController, ItemSliding} from 'ionic-angular';

@Component({
  selector: 'app-listas',
  templateUrl: 'listas.component.html'
})

export class ListasComponent {
  @Input() terminada: boolean = false;

  constructor(public deseosService: DeseosService, private navCtrl:NavController, private alertCtrl: AlertController) {

  }

  listaSeleccionada( lista:Lista ) {
    // Funcion para pasar a otra pagina
    this.navCtrl.push( AgregarPage , {
      titulo : lista.titulo,
      lista  : lista
    });
    console.log(lista)
  }

  borrarLista(lista: Lista) {
    this.deseosService.borrarLista( lista );
  }

  editarLista(lista: Lista, slidingItem: ItemSliding) {
    slidingItem.close();

    const alerta = this.alertCtrl.create({
      title: 'Editar nombre',
      message: 'Editar el nombre de la lista',
      inputs: [{
        name: 'titulo',
        placeholder: 'Nombre de la lista',
        value: lista.titulo
      }],
      buttons: [
        {
          text: 'Cancelar'
        },
        {
          text: 'Guardar',
          handler: data => {
            if (data.titulo.lenght === 0) {
              return;
            }

            lista.titulo = data.titulo;
            this.deseosService.guardarStorage();
          }
        }
      ]
    });

    alerta.present();
  }

}
