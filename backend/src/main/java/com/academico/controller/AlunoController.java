package com.academico.controller;

import com.academico.model.Aluno;
import com.academico.service.AlunoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/alunos")
@CrossOrigin(origins = "*")
@Tag(name = "Alunos", description = "API para gerenciamento de alunos")
public class AlunoController {

    @Autowired
    private AlunoService alunoService;

    @GetMapping
    @Operation(summary = "Listar todos os alunos")
    public ResponseEntity<List<Aluno>> listarTodos() {
        return ResponseEntity.ok(alunoService.listarTodos());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar aluno por ID")
    public ResponseEntity<Aluno> buscarPorId(@PathVariable Long id) {
        return alunoService.buscarPorId(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @Operation(summary = "Criar novo aluno")
    public ResponseEntity<Aluno> criar(@RequestBody Aluno aluno) {
        Aluno novoAluno = alunoService.salvar(aluno);
        return ResponseEntity.status(HttpStatus.CREATED).body(novoAluno);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Atualizar aluno existente")
    public ResponseEntity<Aluno> atualizar(@PathVariable Long id, @RequestBody Aluno aluno) {
        return alunoService.buscarPorId(id)
            .map(alunoExistente -> {
                aluno.setId(id);
                return ResponseEntity.ok(alunoService.salvar(aluno));
            })
            .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Deletar aluno")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        if (alunoService.buscarPorId(id).isPresent()) {
            alunoService.deletar(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping("/{alunoId}/cursos/{cursoId}")
    @Operation(summary = "Matricular aluno em curso")
    public ResponseEntity<Aluno> matricularEmCurso(
            @PathVariable Long alunoId, 
            @PathVariable Long cursoId) {
        try {
            Aluno aluno = alunoService.matricularEmCurso(alunoId, cursoId);
            return ResponseEntity.ok(aluno);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{alunoId}/cursos/{cursoId}")
    @Operation(summary = "Desmatricular aluno de curso")
    public ResponseEntity<Aluno> desmatricularDeCurso(
            @PathVariable Long alunoId, 
            @PathVariable Long cursoId) {
        try {
            Aluno aluno = alunoService.desmatricularDeCurso(alunoId, cursoId);
            return ResponseEntity.ok(aluno);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
