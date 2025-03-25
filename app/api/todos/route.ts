import { NextResponse } from "next/server";
import { getTodos,addTodo,Todo } from "./types";
import { error } from "console";

export async function GET() {
    const todos = getTodos()
    return NextResponse.json(todos)//将数据作为json返回
}

export async function POST(request: Request) {
    const { name,completed =false} =await request.json()

    //验证代办事项
    if(!name){
        return NextResponse.json(
            {errorMessage:'代办事情必须填写'},
            {status:400}
        )
    }

    const newTodo =addTodo({name,completed}
    )
    return NextResponse.json(newTodo,{status:201})
}