const { useState, useEffect } = React;
const WeeklyScheduler = () => {
  const diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  
  // Categorías inspiradas en personajes de One Piece
  const categorias = [
    { nombre: 'Prioridad Pirata', color: 'bg-red-100/80 border-red-400', icon: '🏴‍☠️' }, // Luffy
    { nombre: 'Entrenamiento', color: 'bg-green-100/80 border-green-400', icon: '⚔️' },   // Zoro
    { nombre: 'Navegación', color: 'bg-orange-100/80 border-orange-400', icon: '🗺️' },    // Nami
    { nombre: 'Aventura', color: 'bg-blue-100/80 border-blue-400', icon: '🌊' },          // Jinbe
    { nombre: 'Cocina', color: 'bg-yellow-100/80 border-yellow-400', icon: '🍖' }         // Sanji
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
          icon: selectedCategory.icon
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
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md bg-white/90 backdrop-blur-lg shadow-2xl border border-white/50">
        <CardHeader className="border-b border-white/20">
          <CardTitle className="text-xl flex items-center gap-2">
            <Skull className="h-6 w-6 text-red-500" />
            Nueva Aventura
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Día de la Aventura</label>
              <select
                value={selectedDay}
                onChange={(e) => setSelectedDay(e.target.value)}
                className="w-full p-2 rounded-xl border bg-white/50 backdrop-blur-sm focus:ring-2 focus:ring-red-500"
              >
                {diasSemana.map(dia => (
                  <option key={dia} value={dia}>{dia}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Hora</label>
              <div className="relative">
                <Clock className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <input
                  type="time"
                  value={newTime}
                  onChange={(e) => setNewTime(e.target.value)}
                  className="w-full pl-10 p-2 rounded-xl border bg-white/50 backdrop-blur-sm focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Tipo de Misión</label>
              <div className="grid grid-cols-2 gap-2">
                {categorias.map(cat => (
                  <button
                    key={cat.nombre}
                    onClick={() => setSelectedCategory(cat)}
                    className={`p-2 rounded-xl border transition-all flex items-center gap-2 ${
                      selectedCategory.nombre === cat.nombre
                        ? cat.color + ' border-2'
                        : 'bg-white/50 border-white/20'
                    }`}
                  >
                    <span>{cat.icon}</span>
                    {cat.nombre}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Descripción de la Misión</label>
              <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="¿Cuál es tu próxima aventura?"
                className="w-full p-2 rounded-xl border bg-white/50 backdrop-blur-sm focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div className="flex gap-2 justify-end pt-4">
              <button
                onClick={() => setIsAdding(false)}
                className="px-4 py-2 rounded-xl border border-gray-200 hover:bg-gray-100 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleAddTask}
                className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transition-colors flex items-center gap-2"
              >
                <Check className="h-4 w-4" />
                ¡A la Aventura!
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="p-4 min-h-screen bg-gradient-to-br from-blue-50 to-red-50">
      <Card className="w-full max-w-6xl mx-auto bg-white/70 backdrop-blur-lg shadow-2xl border border-white/50">
        <CardHeader className="border-b border-white/20 bg-white/30">
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl font-bold flex items-center gap-2">
              <img src="/api/placeholder/32/32" alt="One Piece Logo" className="h-8 w-8" />
              Log Pose Semanal
            </CardTitle>
            <button
              onClick={() => setIsAdding(true)}
              className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full hover:from-red-600 hover:to-red-700 transition-colors flex items-center gap-2 shadow-lg"
            >
              <Plus className="h-4 w-4" />
              Nueva Aventura
            </button>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {diasSemana.map(dia => (
              <div key={dia} className="rounded-2xl bg-white/60 backdrop-blur-sm shadow-lg border border-white/50 overflow-hidden hover:shadow-xl transition-all">
                <div className="p-3 border-b border-white/20 bg-white/30">
                  <h3 className="font-bold text-gray-700">{dia}</h3>
                </div>
                <div className="p-3">
                  {tasks[dia].length === 0 ? (
                    <p className="text-gray-400 text-sm italic">¡Isla sin explorar!</p>
                  ) : (
                    <ul className="space-y-2">
                      {tasks[dia]
                        .sort((a, b) => a.time.localeCompare(b.time))
                        .map((task, index) => (
                          <li
                            key={index}
                            className={`p-3 rounded-xl border ${task.color} backdrop-blur-sm transition-all hover:shadow-md`}
                          >
                            <div className="flex justify-between items-start gap-2">
                              <span className="text-sm font-medium flex items-center gap-2">
                                {task.icon} {task.time}
                              </span>
                              <button
                                onClick={() => handleDeleteTask(dia, index)}
                                className="text-gray-400 hover:text-red-500 transition-colors"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </div>
                            <p className="text-sm mt-1">{task.text}</p>
                          </li>
                        ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {isAdding && <AddTaskForm />}
    </div>
  );
};

export default WeeklyScheduler;
