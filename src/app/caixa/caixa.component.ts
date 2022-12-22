import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartaoConsumoService } from 'src/cartao-consumo.service';

@Component({
  selector: 'app-caixa',
  templateUrl: './caixa.component.html',
  styleUrls: ['./caixa.component.scss']
})
export class CaixaComponent implements OnInit {

  constructor(private CartaoConsumoService: CartaoConsumoService,
    private router: Router) { }

  dataagora = new Date().toISOString().substring(0, 10);
  caixa: any;
  total: any;
  totalDinheiro: any;
  totalCartao: any;
  totalImps: any;
  totalNeg: any;
  login: any = localStorage.getItem('login');
  isAdmin: any = localStorage.getItem('admin');
  usuarios: any;

  async ngOnInit(){
await this.CartaoConsumoService.obterTudoAbertoPorDia(this.dataagora, this.login).then((cx) => {
  this.caixa = cx;
});
await this.CartaoConsumoService.obterUsuarios().then((users) => {
  this.usuarios = users;
});
console.log(this.usuarios);
console.log(this.dataagora);
console.log(this.caixa);
  }

  converterCurrency(valor: number) {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(valor);
  }

  converterLongDate(data: any) {
    let dataFormatada = new Date(data).toLocaleString()
    return  dataFormatada;
  }

  async searchByDate(data: any) {
    await this.CartaoConsumoService.obterTudoAbertoPorDia(data, this.login).then((cx) => {
      this.caixa = cx;
    });
  }

  gotoCadastro() {
    this.router.navigate(['/admin']);
  }

  printThisPage() {
    window.print();
  }

  converteMetodo(met: any){
    if(met == 1){
      return "Dinheiro";
    }
    else if(met == 2){
      return "Cartão Débito";
    }
    else if(met == 3){
      return "Cartão Crédito";
    }
    else if(met == 5){
      return "Implantação de Crédito";
    }
    else if(met == 6){
      return "Voucher";
    }
    else if(met == 0)
    {
      return "Negativa";
    }
    else{
      return ""
    }
  }

  sumValoresDinheiro() {
    const sum = this.caixa.results
      .filter((xx: any) => xx.metodo === 1)
      .reduce((sum: any, current: any) => sum + current.valor, 0);
    this.totalDinheiro = sum;
    return this.converterCurrency(sum);
  }

  sumValoresCartao() {
    const sum = this.caixa.results
      .filter((xx: any) => xx.metodo === 2 || xx.metodo === 3 || xx.metodo === 6)
      .reduce((sum: any, current: any) => sum + current.valor, 0);
    this.totalCartao = sum;
    return this.converterCurrency(sum);
  }

  sumValoresImp() {
    const sum = this.caixa.results
      .filter((xx: any) => xx.metodo === 5)
      .reduce((sum: any, current: any) => sum + current.valor, 0);
    this.totalImps= sum;
    return this.converterCurrency(sum);
  }

  sumValoresNeg() {
    const sum = this.caixa.results
      .filter((xx: any) => xx.metodo === 0)
      .reduce((sum: any, current: any) => sum + current.valor, 0);
    this.totalNeg= sum;
    return this.converterCurrency(sum);
  }

  sumTotal() {
    this.total = this.totalCartao + this.totalDinheiro;
    return this.converterCurrency(this.total);
  }

  async fecharCaixa(data: any) {
    if (confirm('Tem certeza que deseja fechar o caixa de '+this.login+'?')) {
     await this.CartaoConsumoService.fecharCaixa(this.dataagora, localStorage.getItem('login'), this.total)
    }
    location.reload();
  }

  async obterCaixa(login: any){
    console.log(login);
    this.login = login
    await this.CartaoConsumoService.obterTudoAbertoPorDia(this.dataagora, this.login).then((cx) => {
      this.caixa = cx;
    });
  }

}
