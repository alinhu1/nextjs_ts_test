export interface Todo {
    id: number
    name: string
    completed: boolean
    createdAt?: string
  }
  
  // 获取所有待办事项
  export const getTodos = async (): Promise<Todo[]> => {
    const response = await fetch('/api/todos')
   
    return response.json()
  }
  
  // 创建新待办事项
  export const createTodo = async (name: string): Promise<Todo> => {
    const response = await fetch('/api/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    })
  
    return response.json()
  }
  
  // 更新待办事项
  export const updateTodo = async (todo: Todo): Promise<Todo> => {
    const response = await fetch(`/api/todos/${todo.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todo),
    })
   
    return response.json()
  }
  
  // 删除待办事项
  export const deleteTodo = async (id: number): Promise<void> => {
    const response = await fetch(`/api/todos/${id}`, {
      method: 'DELETE',
    })
    
  }