import { Component, OnInit } from '@angular/core';

import{ ProdutosService } from '../produtos.service';
import{ Produto } from './produto.model';
import{ PRODUTOS } from './produtos.mock';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent implements OnInit {

  produtoForm: string = ""

  viviano: string = '';

  dataSistema: string = 'Aguardando...';
  
  produtos: Produto[] = []//PRODUTOS;

  idProdutoTela:number;
  
  produto: Produto;// = {id:0, descricao:'', dataCadastro:''};
  produtoLimpo: Produto = {id:0, descricao:'', dataCadastro:''};
  // produtoAlterar:Produto;

  constructor(private service:ProdutosService) { 
    this.produto = this.produtoLimpo;
    this.idProdutoTela = this.produtos.length + 1;
    // this.produtoAlterar = this.produtoLimpo;
  }


  public formataData(dataSql: string):string{
    let dataString:string = dataSql.substring(8,10) + "/" + dataSql.substring(5,7) + "/" + dataSql.substring(0,4);
    return dataString;
  }

  onSubmit(){
    console.log(this.produto);
    this.salvar();
  }
  public salvar(){
    console.log(this.produto.descricao);
    this.service.salvar(this.produto).subscribe( response => {
      console.log(response);
      this.produto = response;
      console.log('######################################');
      console.log(this.produto);
      this.produto.dataCadastro = this.produto.dataCadastro.substring(0,10);
      this.produtos[this.produtos.length] = this.produto;
      this.produto = this.produtoLimpo;
      this.produto.descricao = '';
      console.log(this.produto);
      this.idProdutoTela = this.produtos.length + 1;

      this.listar();
      this.produtoForm = '';
    
    // this.ngOnInit();
    })

  }

  public listar(){

    let teste:Produto = {id: 1, descricao: "celular MOTOROLA", dataCadastro: "2021-02-23"};
    
    console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
    console.log(teste);
    this.service.getAll().subscribe(resposta => {
      console.log("@@@@@@@@@@@@@@@@@@@@@");
      console.log(resposta);
      this.produtos = resposta;
      
    this.idProdutoTela = this.produtos.length + 1;
    });

  }

  public alterar(id:number){
    this.service.getProdutoPorId('http://localhost:8080/produto-api/' + id).subscribe(resposta => {
      console.log(resposta);
      this.produto = resposta;
      this.idProdutoTela = this.produto.id;
    })
  }

  ngOnInit(): void {

    this.listar();

    
    this.service.getHoraSistema().subscribe(resposta => {
      this.produto.dataCadastro = resposta.substring(0,10);
    })

    this.idProdutoTela = this.produtos.length + 1;
    
    this.produto = this.produtoLimpo;

    // this.produto.id = this.produtos.length + 1;

    // let teste:Produto = {id: 1, descricao: "celular MOTOROLA", dataCadastro: "2021-02-23"};
    
    // console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
    // console.log(teste);
    // this.service.getAll().subscribe(resposta => {
    //   console.log("@@@@@@@@@@@@@@@@@@@@@");
    //   console.log(resposta);
    //   this.produtos = resposta;
    // });

    //this.service.salvar(this.produto).subscribe( response => {
    //  console.log(response);
    //  this.produto = response;
    //  console.log('######################################');
    //  console.log(this.produto);
    //  this.produtos = [this.produto];
    //})

  }

}
