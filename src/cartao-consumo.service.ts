import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './environments/environment';
import { iConsumo } from './app/iConsumo';
import { iMov } from './app/iMov';
import { iMovXandao } from './app/iMovXandao';
import { iRes } from './app/iRes';

@Injectable({
  providedIn: 'root',
})
export class CartaoConsumoService {
  public isAdmin: any;
  public token: any;
  public movIdAtual: any;

  constructor(private HttpClient: HttpClient) {}

  public obterConsuByRes() {
    return this.HttpClient.get<iConsumo[]>(
      `${environment.apiurl}api/CartaoConsumo/obterByConsuRes/${environment.resId}`
    ).toPromise();
  }

  public obterTodosConsu() {
    return this.HttpClient.get<iConsumo[]>(
      `${environment.apiurl}api/CartaoConsumo/obterTodosConsu`
    ).toPromise();
  }

  public obterConsuById(id: any) {
    return this.HttpClient.get<iConsumo>(
      `${environment.apiurl}api/CartaoConsumo/obterByConsuId/${id}`
    ).toPromise();
  }

  public insertConsu(consumo: iConsumo) {
    return this.HttpClient.post<iConsumo>(
      `${environment.apiurl}api/CartaoConsumo/adicionarConsul`,
      consumo
    ).toPromise();
  }

  public obterConsuByNr(id: any) {
    return this.HttpClient.get<iConsumo>(
      `${environment.apiurl}api/CartaoConsumo/obterByConsuNr/${environment.resId}/${id}`
    ).toPromise();
  }

  public obterConsuByNrOrName(id: any, name: any) {
    return this.HttpClient.get<iConsumo>(
      `${environment.apiurl}api/CartaoConsumo/obterByConsuNrOrName/${environment.resId}/${id}/${name}`
    ).toPromise();
  }

  public updateConsu(consumo: iConsumo) {
    console.log(consumo);
    return this.HttpClient.put<iConsumo>(
      `${environment.apiurl}api/CartaoConsumo/alterarConsu`,
      consumo
    ).toPromise();
  }
  public deleteConsu(id: any) {
    return this.HttpClient.delete<iConsumo>(
      `${environment.apiurl}api/CartaoConsumo/deletarConsu/${id}/${localStorage.getItem('login')}`
    ).toPromise();
  }

  //mov

  public obterMovByConsuId(id: any) {
    return this.HttpClient.get<iConsumo[]>(
      `${environment.apiurl}api/CartaoConsumo/obterMovByConsuId/${id}`
    ).toPromise();
  }

  public obterMovPos(id: any) {
    return this.HttpClient.get<iConsumo[]>(
      `${environment.apiurl}api/CartaoConsumo/obterMovPos/${id}`
    ).toPromise();
  }

  public obterMovById(id: any) {
    return this.HttpClient.get<iConsumo[]>(
      `${environment.apiurl}api/CartaoConsumo/obterMovByMovId/${id}`
    ).toPromise();
  }

  public obterMovNeg(id: any) {
    return this.HttpClient.get<iConsumo[]>(
      `${environment.apiurl}api/CartaoConsumo/obterMovNeg/${id}`
    ).toPromise();
  }

  public insertMov(mov: iMovXandao) {
    return this.HttpClient.post<iMovXandao>(
      `${environment.apiurl}api/CartaoConsumo/adicionarMov`,
      mov
    ).toPromise();
  }

  public updateMov(mov: iMov) {
    return this.HttpClient.put<iMov>(
      `${environment.apiurl}api/CartaoConsumo/alterarMov`,
      mov
    ).toPromise();
  }

  public deleteMovCartConsu(id: any) {
    return this.HttpClient.delete<iMov>(
      `${environment.apiurl}api/CartaoConsumo/deletarConsuCart/${id}`
    ).toPromise();
  }

  public deleteMovById(id: any) {
    return this.HttpClient.delete<iMov>(
      `${environment.apiurl}api/CartaoConsumo/deletarMov/${id}/${localStorage.getItem('login')}`
    ).toPromise();
  }

  //res

  public obterResById(id: any) {
    return this.HttpClient.get<iRes>(
      `${environment.apiurl}api/Restaurante/getById/${id}`
    ).toPromise();
  }

  //usuarios

  obterUsuarios() {
    return this.HttpClient.get(
      `${environment.apiurl}api/UsuarioCartaoConsumo/obterTodos/${environment.resId}`
    )
      .toPromise()
      .then((res) => {
        return res;
      });
  }

  logar(nome: any, senha: any) {
    return this.HttpClient.get(
      `${environment.apiurl}api/UsuarioCartaoConsumo/obterLogin/${nome}/${senha}/${environment.resId}`
    )
      .toPromise()
      .then((res) => {
        return res;
      });
  }

  usuarioPorCodigo(codigo: any) {
    return this.HttpClient.get(
      `${environment.apiurl}api/UsuarioCartaoConsumo/obterPorCodigo/${codigo}/${environment.resId}`
    )
      .toPromise()
      .then((res) => {
        return res;
      });
  }

  salvarUsuario(data: any) {
    return this.HttpClient.post(
      `${environment.apiurl}api/UsuarioCartaoConsumo/adicionar`,
      data
    )
      .toPromise()
      .then((res) => {
        return res;
      });
  }

  alterarUsuario(data: any) {
    return this.HttpClient.put(
      `${environment.apiurl}api/UsuarioCartaoConsumo/alterar`,
      data
    )
      .toPromise()
      .then((res) => {
        return res;
      });
  }

  usuarioDelete(codigo: any) {
    return this.HttpClient.delete(
      `${environment.apiurl}api/UsuarioCartaoConsumo/deletar/${codigo}`
    )
      .toPromise()
      .then((res) => {
        return res;
      });
  }

  //grupos

  obterGrupos() {
    return this.HttpClient.get(
      `${environment.apiurl}api/GrupoConsumo/obterTodosGrupo/${environment.resId}`
    )
      .toPromise()
      .then((res) => {
        return res;
      });
  }

  grupoPorCodigo(codigo: any) {
    return this.HttpClient.get(
      `${environment.apiurl}api/GrupoConsumo/obterByGrupoId/${codigo}`
    )
      .toPromise()
      .then((res) => {
        return res;
      });
  }

  grupoPorNome(nome: any) {
    return this.HttpClient.get(
      `${environment.apiurl}api/GrupoConsumo/obterByGrupoNome/${nome}/${environment.resId}`
    )
      .toPromise()
      .then((res) => {
        return res;
      });
  }

  salvarGrupo(data: any) {
    return this.HttpClient.post(
      `${environment.apiurl}api/GrupoConsumo/adicionar`,
      data
    )
      .toPromise()
      .then((res) => {
        return res;
      });
  }

  alterarGrupo(data: any) {
    return this.HttpClient.put(
      `${environment.apiurl}api/GrupoConsumo/alterar`,
      data
    )
      .toPromise()
      .then((res) => {
        return res;
      });
  }

  grupoDelete(codigo: any) {
    return this.HttpClient.delete(
      `${environment.apiurl}api/GrupoConsumo/deletar/${codigo}`
    )
      .toPromise()
      .then((res) => {
        return res;
      });
  }
  //caixa

  public obterTudoAbertoPorDia(date: any, login: any) {
    return this.HttpClient.get(
      `${environment.apiurl}api/CartaoConsumo/obterCaixaAberto/${date}/${login}/${environment.resId}`
    ).toPromise().then((res)=>{return res});
  }
  fecharCaixa(date: any, login: any, valor: any) {
    return this.HttpClient
      .put(`${environment.apiurl}api/CartaoConsumo/fecharCaixa/${date}/${login}/${valor}/${environment.resId}`, null)
      .toPromise()
      .then((res) => {
        return res;
      });
  }

  //auditoria

  public obterTudoAuditoria() {
    return this.HttpClient.get(
      `${environment.apiurl}api/CartaoConsumo/obterAuditoria/${environment.resId}`
    ).toPromise().then((res)=>{return res});
  }

  public obterAuditoriaData(date: any) {
    return this.HttpClient.get(
      `${environment.apiurl}api/CartaoConsumo/obterAuditoriaData/${date}/${environment.resId}`
    ).toPromise().then((res)=>{return res});
  }

  //zerarCartão

  zerarCartao(id: any, login: any) {
    return this.HttpClient
      .put(`${environment.apiurl}api/CartaoConsumo/zerarCartao/${id}/${login}`, null)
      .toPromise()
      .then((res) => {
        return res;
      });
  }



}
