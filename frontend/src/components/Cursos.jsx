import { useState, useEffect } from 'react';
import { getCursos, createCurso, updateCurso, deleteCurso } from '../services/api';
import './Cursos.css';

function Cursos() {
  const [cursos, setCursos] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingCurso, setEditingCurso] = useState(null);
  const [formData, setFormData] = useState({ nome: '', cargaHoraria: '' });

  useEffect(() => {
    loadCursos();
  }, []);

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
      if (editingCurso) {
        await updateCurso(editingCurso.id, formData);
      } else {
        await createCurso(formData);
      }
      setFormData({ nome: '', cargaHoraria: '' });
      setShowForm(false);
      setEditingCurso(null);
      loadCursos();
    } catch (error) {
      console.error('Erro ao salvar curso:', error);
      alert('Erro ao salvar curso. Verifique os dados.');
    }
  };

  const handleEdit = (curso) => {
    setEditingCurso(curso);
    setFormData({ nome: curso.nome, cargaHoraria: curso.cargaHoraria });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Deseja realmente excluir este curso?')) {
      try {
        await deleteCurso(id);
        loadCursos();
      } catch (error) {
        console.error('Erro ao deletar curso:', error);
      }
    }
  };

  return (
    <div className="cursos-container">
      <div className="header">
        <h2>Gerenciamento de Cursos</h2>
        <button className="btn-primary" onClick={() => { setShowForm(!showForm); setEditingCurso(null); setFormData({ nome: '', cargaHoraria: '' }); }}>
          {showForm ? 'Cancelar' : 'Novo Curso'}
        </button>
      </div>

      {showForm && (
        <div className="form-container">
          <h3>{editingCurso ? 'Editar Curso' : 'Novo Curso'}</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Nome do Curso</label>
              <input
                type="text"
                value={formData.nome}
                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Carga Horária (horas)</label>
              <input
                type="number"
                value={formData.cargaHoraria}
                onChange={(e) => setFormData({ ...formData, cargaHoraria: e.target.value })}
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
              <th>Carga Horária</th>
              <th>Alunos Matriculados</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {cursos.map((curso) => (
              <tr key={curso.id}>
                <td>{curso.id}</td>
                <td>{curso.nome}</td>
                <td>{curso.cargaHoraria}h</td>
                <td>{curso.alunos ? curso.alunos.length : 0}</td>
                <td>
                  <button className="btn-edit" onClick={() => handleEdit(curso)}>Editar</button>
                  <button className="btn-delete" onClick={() => handleDelete(curso.id)}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Cursos;
