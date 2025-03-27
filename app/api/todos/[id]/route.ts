import { NextResponse } from 'next/server';
import { getTodoById, updateTodo, deleteTodo } from '../types';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const todo = getTodoById(Number(params.id));
  
  if (!todo) {
    return NextResponse.json(
      { errorMessage: 'Todo not found' },
      { status: 404 }
    );
  }
  
  return NextResponse.json(todo);
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const updates = await request.json();//获取传递的数据
  const updatedTodo = updateTodo(Number(params.id), updates);
  
  if (!updatedTodo) {
    return NextResponse.json(
      { errorMessage: 'Todo not found' },
      { status: 404 }
    );
  }
  
  return NextResponse.json(updatedTodo);
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: number } }
) {

try {
    
    const success = deleteTodo(Number(params.id));
    
    if (!success) {
      return NextResponse.json({ error: '未找到待办事项' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: '服务器内部错误' },
      { status: 500 }
    )
}
}