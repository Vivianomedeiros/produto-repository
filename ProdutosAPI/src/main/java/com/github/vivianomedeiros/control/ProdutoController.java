package com.github.vivianomedeiros.control;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.github.vivianomedeiros.model.entity.Produto;
import com.github.vivianomedeiros.model.repository.ProdutoRepository;

@RestController
@RequestMapping("/produto-api")
@CrossOrigin("*")
public class ProdutoController {

	@Autowired
	private ProdutoRepository produtoRepository;
	
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public Produto save(@RequestBody Produto produto) {
		produto.setDataCadastro(new Date());
		return produtoRepository.save(produto);
	}
	
	@PutMapping("{id}")
	@ResponseStatus(HttpStatus.ACCEPTED)
	public Produto update(@PathVariable Integer id, @RequestBody Produto produtoAtualizado) {
		produtoAtualizado.setId(id);
		produtoRepository.save(produtoAtualizado);
		Produto produto = produtoRepository.findById(id).get();
		
		produto.setDataCadastro(produtoRepository.getDataById(id));
		
		return produto;
	}
	
	@GetMapping("/lista-todos")
//	@ResponseStatus(HttpStatus.FOUND)
	public List<Produto> getAll() {
		return produtoRepository.findAll();
	}

	@GetMapping("{id}")
	public Produto getProdutoPorId(@PathVariable Integer id) {
		return produtoRepository.findById(id).get();
	}

	@GetMapping("/data-sistema")
//	@ResponseStatus(HttpStatus.FOUND)
	public Date getDataSistema() {
		return new Date();
	}

}
