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
  selector: 'app-admin-consumo',
  templateUrl: './admin-consumo.component.html',
  styleUrls: ['./admin-consumo.component.scss'],
})
export class AdminConsumoComponent implements OnInit {
  @ViewChild('imp', { static: false }) el!: ElementRef;
  title = 'CartaoConsumoAngular';
  total: any;
  totalzao: any;
  restaurante: any;
  resNro = environment.resId;
  shortdate: any;
  movimentacao: any;
  consumo: any = '';
  consumoAtual: any;
  Id: any;
  searchText: any;
  index: any = 0;
  valorMovAtual: any = 0;
  dataMovAtual: any = new Date();
  soma: any;
  consumotodos: any;
  grupos: any;
  desc: any = '';
  frete: any = true;
  consumo2: any;
  login: any = localStorage.getItem('login');
  isAdmin: any = localStorage.getItem('admin');

  makePdf() {
    let pdf = new jsPDF('p', 'pt', 'a4');
    pdf.html(this.el.nativeElement, {
      callback: (pdf) => {
        pdf.output('dataurlnewwindow');
        this.reloading();
      },
    });
  }

  reloading() {
    location.reload();
  }

  converterCurrency(valor: number) {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(valor);
  }

  async printThisPage() {
    window.print();
  }

  converterLongDate(data: any) {
    let dataFormatada = new Date(data).toLocaleDateString();
    return dataFormatada;
  }

  catchIndex(i: any) {
    this.index = i;
    console.log(this.index);
  }

  catchId(i: any) {
    this.Id = i;
    console.log(this.Id);
  }

  getValues(value: any) {
    console.warn(value);
  }
  constructor(
    private CartaoConsumoService: CartaoConsumoService,
    private router: Router
  ) {}
  consumoModel: iConsumo = new iConsumo();
  consumId: any;
  consumId2: any;
  mov: iMovXandao = new iMovXandao();

  getTxtValue() {
    console.warn(this.consumId);
  }

  getRestaurante(resId: any) {
    this.CartaoConsumoService.obterResById(resId).then((res) => {
      this.restaurante = res;
    });
    return this.restaurante.nome;
  }

  async getTxtInfo(
    _numero: any,
    _desc: any,
    _validade: any,
    _cpf: any,
    _desconto: any,
    _nome: any,
    _restaurante: any,
    _grupo: any
  ) {
    this.consumoModel = {
      numero: _numero.value,
      descricao: _desc.value,
      valor: 0,
      validade: _validade.value,
      Cpf: _cpf.value,
      Desconto: _desconto.value,
      Nome: _nome.value,
      restauranteId: _restaurante.value,
      saldoAtual: 0,
      grupo: _grupo.value,
      registradoPor: localStorage.getItem('login'),
      frete: this.frete,
    };
    if (_numero.value !== ''&& _nome.value !=='') {
      let consumo: any;
      await this.CartaoConsumoService.obterConsuByNr(_numero.value).then(
        (consum) => {
          consumo = consum;
          console.log(consum);
        }
      );
      if (consumo == null) {
        this.CartaoConsumoService.insertConsu(this.consumoModel).then(() => {
          location.reload();
          console.log(_grupo.value);
        });
      } else {
        window.alert('O cartão ja existe!');
      }

      console.log(this.consumoModel);
    } else {
      window.alert('Por favor insira todas as Informações');
    }
  }

  getEditId(
    _guid: any,
    _numeroEdit: any,
    _descEdit: any,
    _valorEdit: any,
    _validadeEdit: any,
    _cpfEdit: any,
    _descontoEdit: any,
    _nomeEdit: any,
    _restauranteEdit: any
  ) {
    this.consumoModel = {
      cartaoConsumoId: _guid,
      numero: _numeroEdit,
      descricao: _descEdit,
      valor: _valorEdit,
      validade: _validadeEdit,
      Cpf: _cpfEdit,
      Desconto: _descontoEdit,
      Nome: _nomeEdit,
      restauranteId: _restauranteEdit,
      grupo: 'exemplo',
      frete: this.frete,
    };
  }

  EditById(
    _guid: any,
    _numeroEdit: any,
    _descEdit: any,
    _valorEdit: any,
    _validadeEdit: any,
    _cpfEdit: any,
    _descontoEdit: any,
    _nomeEdit: any,
    _restauranteEdit: any
  ) {
    this.consumoModel = {
      cartaoConsumoId: _guid,
      numero: _numeroEdit,
      descricao: _descEdit,
      valor: _valorEdit,
      validade: _validadeEdit,
      Cpf: _cpfEdit,
      Desconto: _descontoEdit,
      Nome: _nomeEdit,
      restauranteId: _restauranteEdit,
      grupo: 'exemplo',
      frete: this.frete,
    };
    this.CartaoConsumoService.updateConsu(this.consumoModel).then(() =>
      window.alert('Registro Alterado!')
    );
    console.log(this.consumoModel);
    location.reload();
  }
  async ngOnInit() {
    this.CartaoConsumoService.isAdmin = localStorage.getItem('admin');
    if (
      this.CartaoConsumoService.isAdmin !== '1' &&
      this.CartaoConsumoService.isAdmin !== '3'
    ) {
      location.href = '/login';
    }
    await this.CartaoConsumoService.obterGrupos().then((grupos) => {
      this.grupos = grupos;
    });
    await this.CartaoConsumoService.obterConsuByRes().then((consum) => {
      this.consumo = consum;
    });
    this.consumo.results.validade.forEach(
      this.converterShortDate(this.consumo.results.validade)
    );
    console.log(this.shortdate);
    console.log(this.consumo);
  }

  async obterConsulById(id: any) {
    if (id != null && id != '') {
      this.CartaoConsumoService.obterConsuById(this.consumId).then((consum) => {
        this.consumo = consum;
        console.log(consum);
      });
    } else {
      this.CartaoConsumoService.obterConsuByRes().then((consum) => {
        this.consumo = consum;
        console.log(consum);
      });
    }
  }

  async deleteById(id: any) {
    await this.deleteMovById(id);
    await this.CartaoConsumoService.deleteConsu(id).then(() =>
      location.reload()
    );
  }

  async deleteMovById(id: any) {
    await this.CartaoConsumoService.deleteMovCartConsu(id);
  }

  converterShortDate(data: any) {
    let dataco = new Date(data).getUTCDate();
    let dia = new Date(data).getDate();
    let mes = new Date(data).getMonth() + 1;
    let ano = new Date(data).getFullYear();
    this.shortdate = mes + '/' + ano;
  }

  async obterConsulByNrList(consumId: any) {
    this.CartaoConsumoService.obterConsuByNr(consumId).then((consum) => {
      this.consumo = consum;
      console.log(consum);
      if (
        this.consumo.results.length >= 1 &&
        consumId !== '' &&
        consumId !== null
      ) {
        this.CartaoConsumoService.obterConsuByNr(this.consumId).then(
          (consum) => {
            this.consumo = consum;
            console.log(consum);
          }
        );
      } else {
        this.CartaoConsumoService.obterConsuByRes().then((consum) => {
          this.consumo = consum;
          console.log(consum);
        });
        window.alert('Cartão consumo não encontrado!');
      }
    });
  }

  async obterConsulByNr(consumId: any) {
    this.CartaoConsumoService.obterConsuByNr(consumId).then((consum) => {
      this.consumo = consum;
      console.log(consum);
      if (this.consumo !== null) {
        this.goToUser(consumId);
      } else {
        window.alert('Cartão consumo não encontrado!');
      }
    });
  }

  async obterConsulByNrOrName(consumId: any) {
    if(consumId !== '' && consumId !== null){
    this.CartaoConsumoService.obterConsuByNrOrName(consumId, consumId).then(
      (consum) => {
        this.consumo = consum;
        console.log(consum);
        if (
          this.consumo.results.length >= 1
        ) {
          this.CartaoConsumoService.obterConsuByNrOrName(
            this.consumId,
            this.consumId
          ).then((consum) => {
            this.consumo = consum;
            console.log(consum);
          });
        } else {
          this.CartaoConsumoService.obterConsuByRes().then((consum) => {
            this.consumo = consum;
            console.log(consum);
          });
          window.alert('Cartão consumo não encontrado!');
        }
      }
    );
    }
    else{
      location.reload();
    }
  }
  goToUser(consumId: any) {
    this.router.navigate(['/user/' + consumId]);
  }
  Sair() {
    localStorage.clear();
    localStorage.removeItem('admin');
    location.href = '/';
  }

  async getTxtInfoMov(_saldo: any, _tipoMov: any, _metodo: any) {
    await this.CartaoConsumoService.obterConsuById(this.Id).then((consum) => {
      this.consumo = consum;
    });
    this.mov = {
      numeroCartao: this.consumo.numero,
      valor: _saldo,
      tipoMov: _tipoMov,
      restauranteId: environment.resId,
      usuarioId: localStorage.getItem('usuarioId'),
      login: localStorage.getItem('login'),
      metodo: _metodo,
    };
    if (this.mov.valor !== '' && this.mov.tipoMov !== '') {
      this.dataMovAtual = new Date();
      this.valorMovAtual = this.mov.valor;
      let soma = parseFloat(this.consumo.saldoAtual) + parseFloat(_saldo);
      this.soma = soma;

      this.CartaoConsumoService.insertMov(this.mov);
      console.log(this.mov);
    } else {
      window.alert('Por favor insira todos os campos!');
      this.reloading();
    }
  }

  async getTxtInfoMovWithNro(_saldo: any, _tipoMov: any, _metodo: any) {
    await this.CartaoConsumoService.obterConsuByNr(this.consumId).then(
      (consum) => {
        this.consumo = consum;
      }
    );
    if (
      this.consumo !== null &&
      this.consumId !== '' &&
      this.consumId !== null &&
      _saldo !== '' &&
      _saldo !== null
    ) {
      this.index = 0;
      this.mov = {
        numeroCartao: this.consumo.numero,
        valor: _saldo,
        tipoMov: _tipoMov,
        restauranteId: environment.resId,
        usuarioId: localStorage.getItem('usuarioId'),
        login: localStorage.getItem('login'),
        metodo: _metodo,
      };
      this.CartaoConsumoService.insertMov(this.mov);
    } else {
      window.alert('Cartão consumo não encontrado!');
      this.reloading();
      console.log(this.mov);
    }
  }

  goToUsers() {
    this.router.navigate(['/usuarios/']);
  }

  goToCaixa() {
    this.router.navigate(['/caixa/']);
  }

  goToGroups() {
    this.router.navigate(['/grupos/']);
  }

  goToAuditoria() {
    this.router.navigate(['/auditoria/']);
  }

  async impCre(id1: any, id2: any, vl: any){
    await this.CartaoConsumoService.obterConsuByNr(id1).then(
      (consum) => {
        this.consumo = consum;
      }
    );
    await this.CartaoConsumoService.obterConsuByNr(id2).then(
      (consum) => {
        this.consumo2 = consum;
      }
    );

    if(this.consumo !== null && this.consumo2 !== null && vl !== null)
    {
      this.index = 0;
      this.mov = {
        numeroCartao: this.consumo.numero,
        valor: vl,
        tipoMov: 2,
        restauranteId: environment.resId,
        usuarioId: localStorage.getItem('usuarioId'),
        login: localStorage.getItem('login'),
        metodo: 5,
      };
      if(this.consumo.saldoAtual >= vl)
      {
        await this.CartaoConsumoService.insertMov(this.mov);

        this.mov = {
          numeroCartao: this.consumo2.numero,
          valor: vl,
          tipoMov: 1,
          restauranteId: environment.resId,
          usuarioId: localStorage.getItem('usuarioId'),
          login: localStorage.getItem('login'),
          metodo: 5,
        };
           
        await this.CartaoConsumoService.insertMov(this.mov);

      }
    }

    else{
      window.alert('Cartão consumo não encontrado!');
      this.reloading();
      console.log(this.mov);
    }

  }

}
