import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CartaoConsumoService } from 'src/cartao-consumo.service';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { iConsumo } from '../iConsumo';
import { NumberFormatStyle } from '@angular/common';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { iMov } from '../iMov';
import { iMovXandao } from '../iMovXandao';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-grupos',
  templateUrl: './grupos.component.html',
  styleUrls: ['./grupos.component.scss']
})
export class GruposComponent implements OnInit {

  constructor(private CartaoConsumoService: CartaoConsumoService,
    private router: Router) { }

    grupos: any;
    grupo: any = '';
    acao: any;
    frete: any;

    async ngOnInit() {
      await this.CartaoConsumoService.obterGrupos().then((groups) => {
        this.grupos = groups;
      });
      console.log(this.grupos);
    }
  

  voltarLogin() {
    this.router.navigate(['/admin/']);
  }

  async findGroup(id: any) {
    await this.CartaoConsumoService.grupoPorCodigo(id).then((group) => {
      this.grupo = group;
    });
    console.log(this.grupo);
  }

  async deleteGroup(id: any) {
    await this.CartaoConsumoService.grupoDelete(id);
    location.reload();
  }

  editar() {
    this.acao = true;
  }

  inserir() {
    this.acao = false;
  }

  async onSubmit(data: any) {
    data.RestauranteId = environment.resId;
    if (this.acao == false) {
      data.frete = this.frete;
      if (data.descricao != '') {
        await this.CartaoConsumoService.salvarGrupo(data);
        console.log(data);
        location.reload();
      } else {
        window.alert('Por favor preencha todos os Campos!');
      }
    } else if (this.acao == true) {
      data.frete = this.grupo.frete;
      if (data.descricao != '') {
        data.grupoId = this.grupo.grupoId;
        await this.CartaoConsumoService.alterarGrupo(data);
        console.log(data);
        location.reload();
      } else {
        window.alert('Por favor preencha todos os Campos!');
        console.log(data);
      }
    }
  }

}
