// app.js
const { useState, useEffect } = React;

const WeeklyScheduler = () => {
  const diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  
  // Categorías con colores premium y efectos de gradiente
  const categorias = [
    { 
      nombre: 'Prioritario', 
      color: 'bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10 border-violet-200',
      hoverColor: 'hover:from-violet-500/20 hover:to-fuchsia-500/20',
      textColor: 'text-violet-700'
    },
    { 
      nombre: 'Personal', 
      color: 'bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border-cyan-200',
      hoverColor: 'hover:from-cyan-500/20 hover:to-blue-500/20',
      textColor: 'text-cyan-700'
    },
    { 
      nombre: 'Trabajo', 
      color: 'bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border-emerald-200',
      hoverColor: 'hover:from-emerald-500/20 hover:to-teal-500/20',
      textColor: 'text-emerald-700'
    },
    { 
      nombre: 'Lifestyle', 
      color: 'bg-gradient-to-br from-rose-500/10 to-pink-500/10 border-rose-200',
      hoverColor: 'hover:from-rose-500/20 hover:to-pink-500/20',
      textColor: 'text-rose-700'
    }
  ];

  const initialTasks = diasSemana.reduce((acc, dia) => {
    acc[dia] = [];
    return acc;
  }, {});

  const [tasks, setTasks] = useState(initialTasks);
  const [newTask, setNewTask] = useState('');
  const [newTime, setNewTime] = useState('');
  const [selectedDay, setSelectedDay] = useState(diasSemana[0]);
  const [selectedCategory, setSelectedCategory] = useState(categorias[0]);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    const savedTasks = localStorage.getItem('weeklyTasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('weeklyTasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = () => {
    if (newTask.trim() && newTime.trim()) {
      setTasks(prev => ({
        ...prev,
        [selectedDay]: [...prev[selectedDay], {
          text: newTask,
          time: newTime,
          categoria: selectedCategory.nombre,
          color: selectedCategory.color,
          textColor: selectedCategory.textColor
        }]
      }));
      setNewTask('');
      setNewTime('');
      setIsAdding(false);
    }
  };

  const handleDeleteTask = (day, index) => {
    setTasks(prev => ({
      ...prev,
      [day]: prev[day].filter((_, i) => i !== index)
    }));
  };

  const AddTaskForm = () => (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-2xl flex items-center justify-center p-4 z-50 transition-all">
      <div className="w-full max-w-md bg-white/70 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/50 overflow-hidden transition-transform">
        <div className="border-b border-white/20 p-6 bg-gradient-to-br from-white/50 to-white/30">
          <h2 className="text-2xl font-semibold text-gray-900">Nueva Tarea</h2>
          <p className="text-sm text-gray-500 mt-1">Planifica tu próxima actividad</p>
        </div>
        <div className="p-6 space-y-6">
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Día</label>
              <select
                value={selectedDay}
                onChange={(e) => setSelectedDay(e.target.value)}
                className="w-full p-4 rounded-2xl border border-white/60 bg-white/40 backdrop-blur-sm focus:ring-2 focus:ring-violet-500/50 focus:border-violet-300 transition-all"
              >
                {diasSemana.map(dia => (
                  <option key={dia} value={dia}>{dia}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Hora</label>
              <input
                type="time"
                value={newTime}
                onChange={(e) => setNewTime(e.target.value)}
                className="w-full p-4 rounded-2xl border border-white/60 bg-white/40 backdrop-blur-sm focus:ring-2 focus:ring-violet-500/50 focus:border-violet-300 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Categoría</label>
              <div className="grid grid-cols-2 gap-3">
                {categorias.map(cat => (
                  <button
                    key={cat.nombre}
                    onClick={() => setSelectedCategory(cat)}
                    className={`p-4 rounded-2xl border transition-all ${
                      selectedCategory.nombre === cat.nombre
                        ? cat.color + ' border-2 border-' + cat.textColor
                        : 'bg-white/40 border-white/60 hover:bg-white/50'
                    } backdrop-blur-sm`}
                  >
                    <span className={selectedCategory.nombre === cat.nombre ? cat.textColor : 'text-gray-700'}>
                      {cat.nombre}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Descripción</label>
              <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="¿Qué tienes planeado?"
                className="w-full p-4 rounded-2xl border border-white/60 bg-white/40 backdrop-blur-sm focus:ring-2 focus:ring-violet-500/50 focus:border-violet-300 transition-all"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <button
                onClick={() => setIsAdding(false)}
                className="flex-1 p-4 rounded-2xl border border-white/60 text-gray-700 font-medium bg-white/40 hover:bg-white/50 backdrop-blur-sm transition-all"
              >
                Cancelar
              </button>
              <button
                onClick={handleAddTask}
                className="flex-1 p-4 rounded-2xl bg-gradient-to-r from-violet-500 to-purple-500 text-white font-medium hover:from-violet-600 hover:to-purple-600 shadow-lg shadow-purple-500/30 transition-all"
              >
                Agregar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-blue-50 p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-7xl mx-auto bg-white/60 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl border border-white/50 overflow-hidden">
        <div className="border-b border-white/20 bg-gradient-to-br from-white/50 to-white/30 p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-semibold bg-gradient-to-br from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Planificador Semanal
              </h1>
              <p className="text-gray-500 mt-1">Organiza tu semana de manera eficiente</p>
            </div>
            <button
              onClick={() => setIsAdding(true)}
              className="px-6 py-3 bg-gradient-to-r from-violet-500 to-purple-500 text-white rounded-2xl hover:from-violet-600 hover:to-purple-600 transition-all font-medium shadow-lg shadow-purple-500/20"
            >
              Nueva Tarea
            </button>
          </div>
        </div>
        <div className="p-6 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
            {diasSemana.map(dia => (
              <div key={dia} className="rounded-2xl bg-white/40 backdrop-blur-sm shadow-xl border border-white/50 overflow-hidden hover:shadow-2xl transition-all">
                <div className="p-4 border-b border-white/20 bg-gradient-to-br from-white/50 to-white/30">
                  <h3 className="font-medium text-gray-900">{dia}</h3>
                </div>
                <div className="p-4">
                  {tasks[dia].length === 0 ? (
                    <p className="text-gray-400 text-sm">Sin tareas pendientes</p>
                  ) : (
                    <ul className="space-y-3">
                      {tasks[dia]
                        .sort((a, b) => a.time.localeCompare(b.time))
                        .map((task, index) => (
                          <li
                            key={index}
                            className={`p-4 rounded-2xl border ${task.color} backdrop-blur-sm transition-all hover:shadow-md`}
                          >
                            <div className="flex justify-between items-start">
                              <span className="text-sm font-medium text-gray-900">{task.time}</span>
                              <button
                                onClick={() => handleDeleteTask(dia, index)}
                                className="text-gray-400 hover:text-red-500 transition-colors"
                              >
                                ×
                              </button>
                            </div>
                            <p className="text-sm mt-2 text-gray-700">{task.text}</p>
                            <span className={`text-xs mt-2 block ${task.textColor}`}>
                              {task.categoria}
                            </span>
                          </li>
                        ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {isAdding && <AddTaskForm />}
    </div>
  );
};

// Renderizamos la aplicación
ReactDOM.render(<WeeklyScheduler />, document.getElementById('root'));
