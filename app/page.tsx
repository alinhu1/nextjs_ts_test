'use client'

import React,{ useState} from "react"

let nextId = 4

export default function Home() {
  //定义数组
  const [products, setProducts] = useState([
    { name: '吃饭', completed: false, id: 1 },
    { name: '睡觉', completed: true, id: 2 },
    { name: '打豆豆', completed: true, id: 3 },
  ])

  // const TodoItem = products.map(product =>
  //   <li key={product.id}>
  //     {product.name}
  //   </li>
  // )

  const [inputValue, setinputValue] = useState('')



  //在input中输入的值
  const handleInputValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setinputValue(value)
    console.log('当前的值', value);

  }

  //在输入框中按下回车键的事件
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (inputValue === '') {
      return
    }
    if (event.key === 'Enter') {
      const newProduct = {
        name: inputValue.trim(),
        completed: false,
        id: nextId++
      }

      setProducts([...products, newProduct]);
      setinputValue('')
      console.log(`按下回车键的值:${inputValue}`);
    }

  }

  //切换completed的状态
  const CompleteStatus = (id:number)=>{
    setProducts(
      products.map((product) =>
      product.id === id ? {...product,completed: !product.completed} : product)
    )
  }

  //筛选功能的实现
  const [filter,setFilter] = useState<'all'|'active'|'completed'>('all')

  const onShow = products.filter((product) => {
    if(filter === 'active'){
      return !product.completed
    }else if(filter === 'completed'){
      return product.completed
    }else{
      return true
    }
  })

  const count = products.filter((product) => !product.completed).length
  return (
    <div className="top">
        <h1>TODO LIST</h1>
        <input
          className="input-todo"
          type='text'
          placeholder='您想做点什么'
          onChange={handleInputValue}
          onKeyDown={handleKeyDown}
          value={inputValue}
        ></input>
        <ul>
          {/* {TodoItem}  */}
          {onShow.map(product => (
            <li key={product.id}>{product.name}{' '}
              <span className={`icon-complete ${product.completed ? 'icon-complete-active' : ''}`}
               onClick={() => CompleteStatus(product.id)}
               >
                </span>{' '}
              <button onClick={() => {
                setProducts(products.filter((a) => a.id !== product.id));
              }}>删除</button>
            </li>
          ))}

        </ul>
        <div>
          <span>还有<span>{count}</span>个未完成</span>
          <div className='filter-btn-group'>筛选
            <button onClick={()=> setFilter('all')}>全部</button>
            <button onClick={()=> setFilter('active')}>未完成</button>
            <button onClick={()=>setFilter('completed')}>已完成</button>
          </div>
        </div>
      </div>

   
  );
}
