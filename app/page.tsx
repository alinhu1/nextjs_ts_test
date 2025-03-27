
'use client'

import React, { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getTodos, createTodo, updateTodo, deleteTodo, Todo } from '../services/todo'

export default function Home() {
  const queryClient = useQueryClient()
  const [inputValue, setInputValue] = useState('')
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all')

  // 获取待办事项
  const { data: todos = [] } = useQuery<Todo[]>({
    queryKey: ['todos'],
    queryFn: getTodos,
  })

  // 创建待办事项
  const createMutation = useMutation({
    mutationFn: createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
      setInputValue('')
    },
  })

  // 更新待办事项
  const updateMutation = useMutation({
    mutationFn: updateTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  })

  // 删除待办事项
  const deleteMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  })

  // 处理输入框回车
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (inputValue === '' || event.key !== 'Enter') return
    createMutation.mutate(inputValue.trim())
  }

  // 切换完成状态
  const toggleComplete = (todo: Todo) => {
    updateMutation.mutate({ ...todo, completed: !todo.completed })
  }

  // 删除待办事项
  const handleDelete = (id: number) => {
    deleteMutation.mutate(id)
  }

  // 筛选待办事项
  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed
    if (filter === 'completed') return todo.completed
    return true
  })

  const activeCount = todos.filter(todo => !todo.completed).length

 

  return (
    <div className="top">
      <h1>TODO LIST</h1>
      <input
        className="input-todo"
        type="text"
        placeholder="您想做点什么"
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        value={inputValue}
      />
    
      
      <ul>
        {filteredTodos.map(todo => (
          <li key={todo.id}>
            <span
              style={{
                textDecoration: todo.completed ? 'line-through' : 'none',
                color: todo.completed ? '#888' : '#000',
              }}
            >
              {todo.name}
            </span>
            <span
              className={`icon-complete ${todo.completed ? 'icon-complete-active' : ''}`}
              onClick={() => toggleComplete(todo)}
            />{' '}
            <button 
              onClick={() => handleDelete(todo.id)}
            >
              {deleteMutation.variables === todo.id ? '删除中...' : '删除'}
            </button>
          </li>
        ))}
      </ul>
      
      <div>
        <span>还有<span>{activeCount}</span>个未完成</span>
        <div className="filter-btn-group">
          筛选
          <button onClick={() => setFilter('all')}>全部</button>
          <button onClick={() => setFilter('active')}>未完成</button>
          <button onClick={() => setFilter('completed')}>已完成</button>
        </div>
      </div>
    </div>
  )
}