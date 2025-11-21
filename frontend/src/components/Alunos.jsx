import { useState, useEffect } from 'react';
import { getAlunos, createAluno, updateAluno, deleteAluno, getCursos, matricularAluno, desmatricularAluno } from '../services/api';
import './Alunos.css';

function Alunos() {
  const [alunos, setAlunos] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingAluno, setEditingAluno] = useState(null);
  const [formData, setFormData] = useState({ nome: '', email: '', matricula: '' });
  const [showMatricular, setShowMatricular] = useState(null);

  useEffect(() => {
    loadAlunos();
    loadCursos();
  }, []);

  const loadAlunos = async () => {
    try {
      const response = await getAlunos();
      setAlunos(response.data);
    } catch (error) {
      console.error('Erro ao carregar alunos:', error);
    }
  };

  const loadCursos = async () => {
    try {
      const response = await getCursos();
      setCursos(response.data);
    } catch (error) {
      console.error('Erro ao carregar cursos:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingAluno) {
        await updateAluno(editingAluno.id, formData);
      } else {
        await createAluno(formData);
      }
      setFormData({ nome: '', email: '', matricula: '' });
      setShowForm(false);
      setEditingAluno(null);
      loadAlunos();
    } catch (error) {
      console.error('Erro ao salvar aluno:', error);
      alert('Erro ao salvar aluno. Verifique os dados.');
    }
  };

  const handleEdit = (aluno) => {
    setEditingAluno(aluno);
    setFormData({ nome: aluno.nome, email: aluno.email, matricula: aluno.matricula });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Deseja realmente excluir este aluno?')) {
      try {
        await deleteAluno(id);
        loadAlunos();
      } catch (error) {
        console.error('Erro ao deletar aluno:', error);
      }
    }
  };

  const handleMatricular = async (alunoId, cursoId) => {
    try {
      await matricularAluno(alunoId, cursoId);
      loadAlunos();
      setShowMatricular(null);
    } catch (error) {
      console.error('Erro ao matricular aluno:', error);
      alert('Erro ao matricular aluno.');
    }
  };

  const handleDesmatricular = async (alunoId, cursoId) => {
    if (window.confirm('Deseja realmente desmatricular este aluno do curso?')) {
      try {
        await desmatricularAluno(alunoId, cursoId);
        loadAlunos();
      } catch (error) {
        console.error('Erro ao desmatricular aluno:', error);
      }
    }
  };

  return (
    <div className="alunos-container">
      <div className="header">
        <h2>Gerenciamento de Alunos</h2>
        <button className="btn-primary" onClick={() => { setShowForm(!showForm); setEditingAluno(null); setFormData({ nome: '', email: '', matricula: '' }); }}>
          {showForm ? 'Cancelar' : 'Novo Aluno'}
        </button>
      </div>

      {showForm && (
        <div className="form-container">
          <h3>{editingAluno ? 'Editar Aluno' : 'Novo Aluno'}</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Nome</label>
              <input
                type="text"
                value={formData.nome}
                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Matrícula</label>
              <input
                type="text"
                value={formData.matricula}
                onChange={(e) => setFormData({ ...formData, matricula: e.target.value })}
                required
              />
            </div>
            <button type="submit" className="btn-primary">Salvar</button>
          </form>
        </div>
      )}

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Email</th>
              <th>Matrícula</th>
              <th>Cursos</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {alunos.map((aluno) => (
              <tr key={aluno.id}>
                <td>{aluno.id}</td>
                <td>{aluno.nome}</td>
                <td>{aluno.email}</td>
                <td>{aluno.matricula}</td>
                <td>
                  <div className="cursos-list">
                    {aluno.cursos && aluno.cursos.map((curso) => (
                      <span key={curso.id} className="curso-tag">
                        {curso.nome}
                        <button onClick={() => handleDesmatricular(aluno.id, curso.id)} className="btn-remove">×</button>
                      </span>
                    ))}
                    <button className="btn-add" onClick={() => setShowMatricular(aluno.id)}>+</button>
                  </div>
                  {showMatricular === aluno.id && (
                    <div className="matricular-dropdown">
                      {cursos.filter(c => !aluno.cursos?.some(ac => ac.id === c.id)).map((curso) => (
                        <div key={curso.id} onClick={() => handleMatricular(aluno.id, curso.id)} className="curso-option">
                          {curso.nome}
                        </div>
                      ))}
                      <button onClick={() => setShowMatricular(null)} className="btn-cancel">Cancelar</button>
                    </div>
                  )}
                </td>
                <td>
                  <button className="btn-edit" onClick={() => handleEdit(aluno)}>Editar</button>
                  <button className="btn-delete" onClick={() => handleDelete(aluno.id)}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Alunos;
