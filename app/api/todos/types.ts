import { PrismaClient } from "@prisma/client/extension"

export interface Todo{
    id:number
    name:string
    completed:boolean
}

let todos: Todo[] = [
    {id:1,name:'吃饭',completed:false},
    {id:2,name:'睡觉',completed:true},
    {id:3,name:'打豆豆',completed:true}
]

// const prisma =new PrismaClient()
let nextId = 4

export  function getTodos(){
    return todos
    // return await prisma.todo.findMany()
}

export  function getTodoById(id: number) {
    return todos.find(todo => todo.id === id);
    // return await prisma.todo.findUnique({where:{id}})
  }

//创建新代办事项
export  function addTodo(todo:Omit<Todo,'id'>){
    const newTodo ={...todo,id:nextId++}
    todos.push(newTodo)
    return newTodo
    // return await prisma.todo.create({data:todo})
}

export  function updateTodo(id: number, updates: Partial<Omit<Todo, 'id'>>) {
    const index = todos.findIndex(todo => todo.id === id);
    if (index === -1) return null;
    
    todos[index] = { ...todos[index], ...updates };
    return todos[index];
    // return await prisma.todo.update({
    //     where:{id},
    //     data:updates
    // })
  }
  

//删除代办事项
export  function deleteTodo(id:number){
    const index = todos.findIndex(todo => todo.id === id)
    if(index === -1){
        return false
    }
    todos.splice(index,1)
    return true
    // await prisma.todo.delete({where:{id}})
    // return true
}