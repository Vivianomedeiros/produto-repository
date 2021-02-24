package com.github.vivianomedeiros.model.repository;

import java.util.Date;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.github.vivianomedeiros.model.entity.Produto;

public interface ProdutoRepository extends JpaRepository<Produto, Integer> {

	@Query("SELECT p.dataCadastro FROM Produto p WHERE p.id = :id")
	public Date getDataById(@Param("id") Integer id);
}
