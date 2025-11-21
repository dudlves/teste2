package com.academico;

import com.academico.model.Aluno;
import com.academico.repository.AlunoRepository;
import com.academico.service.AlunoService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
public class AlunoServiceTest {

    @Autowired
    private AlunoService alunoService;

    @Autowired
    private AlunoRepository alunoRepository;

    @Test
    public void testCriarAluno() {
        Aluno aluno = new Aluno();
        aluno.setNome("Teste Aluno");
        aluno.setEmail("teste@email.com");
        aluno.setMatricula("TEST001");

        Aluno salvo = alunoService.salvar(aluno);

        assertNotNull(salvo.getId());
        assertEquals("Teste Aluno", salvo.getNome());
    }

    @Test
    public void testListarAlunos() {
        assertTrue(alunoService.listarTodos().size() >= 0);
    }

    @Test
    public void testBuscarAlunoPorId() {
        Aluno aluno = new Aluno();
        aluno.setNome("Buscar Teste");
        aluno.setEmail("buscar@email.com");
        aluno.setMatricula("BUSCA001");

        Aluno salvo = alunoService.salvar(aluno);
        
        assertTrue(alunoService.buscarPorId(salvo.getId()).isPresent());
    }
}
