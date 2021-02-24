import { Injectable } from '@angular/core';
import { Produto } from './produtos/produto.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {

  constructor(
    private http:HttpClient
  ) { }

  salvar(produto: Produto ): Observable<Produto>{
    return this.http.post<Produto>('http://localhost:8080/produto-api/', produto);
  }

  getHoraSistema(): Observable<string> {
    return this.http.get<string>('http://localhost:8080/produto-api/data-sistema');
  }

  getAll(): Observable<Produto[]> {
    return this.http.get<Produto[]>('http://localhost:8080/produto-api/lista-todos');
  }

  getProdutoPorId(urlReq:string): Observable<Produto>{
    return this.http.get<Produto>(urlReq);

  }

 



}
