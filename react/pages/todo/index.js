import { useState } from 'react';

const useHash = () => {
  const [hash, setHash] = useState(0);

  const generateHash = () => {
    setHash(hash + 1);
    return hash;
  };

  return { generateHash };
};

const Categories = {
  All: 'ALL',
  Active: 'ACTIVE',
  Completed: 'COMPLETED',
};

const filterByCategory = (todos, category) => {
  switch (category) {
    case Categories.All:
      return todos;
    case Categories.Active:
      return todos.filter((todo) => !todo.checked);
    case Categories.Completed:
      return todos.filter((todo) => todo.checked);
    default:
      return todos;
  }
};

const useTodo = () => {
  const [todos, setTodos] = useState([]);
  const [todoTitle, setTodoTitle] = useState('');
  const [category, setCategory] = useState(Categories.All);
  const { generateHash } = useHash();

  const handleTodoChange = (event) => setTodoTitle(event.target.value);

  const handleAddTodo = () => {
    setTodos([
      ...todos,
      { id: generateHash(), title: todoTitle, checked: false },
    ]);
  };

  const handleDeleteTodo = (id) => () => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleTodoCheck = (id) => () => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, checked: !todo.checked } : todo
      )
    );
  };

  const handleCategory = (category) => () => {
    setCategory(category);
  };

  return {
    todos,
    todoTitle,
    category,
    handleTodoChange,
    handleAddTodo,
    handleDeleteTodo,
    handleTodoCheck,
    handleCategory,
  };
};

const useSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const handleSearchInput = (event) => {
    setSearchTerm(event.target.value);
  };

  const search = (todos, searchTerm) =>
    todos.filter(({ title }) =>
      title.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return { searchTerm, search, handleSearchInput };
};

const Todo = () => {
  const { searchTerm, search, handleSearchInput } = useSearch();
  const {
    todos,
    todoTitle,
    category,
    handleTodoChange,
    handleAddTodo,
    handleDeleteTodo,
    handleTodoCheck,
    handleCategory,
  } = useTodo();

  const filteredByCategories = filterByCategory(todos, category);
  const filteredTodos = search(filteredByCategories, searchTerm);

  return (
    <>
      <h1>ToDo</h1>

      <input value={todoTitle} onChange={handleTodoChange} />
      <button onClick={handleAddTodo}>add todo</button>

      <p>
        Search
        <input value={searchTerm} onChange={handleSearchInput} />
      </p>

      <div>
        <button onClick={handleCategory(Categories.All)}>All</button>
        <button onClick={handleCategory(Categories.Active)}>Active</button>
        <button onClick={handleCategory(Categories.Completed)}>
          Completed
        </button>
      </div>

      <ul>
        {filteredTodos.map(({ id, title, checked }) => (
          <li key={`${title}-${id}`}>
            <input
              type="checkbox"
              checked={checked}
              onChange={handleTodoCheck(id)}
            />
            {title}
            <button onClick={handleDeleteTodo(id)}>X</button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Todo;
