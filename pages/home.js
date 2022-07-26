import Head from 'next/head'
import { useState, useEffect } from 'react'
import { BehaviorSubject } from 'rxjs';
import { UserService } from '../services/UserService';
import { useRouter } from 'next/router'

export default function Home() {
    const [todos, setTodos] = useState([]);
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
       fetchTodos();

    }, []);

    const fetchTodos = async () => {

        setLoading(true);
        fetch('/api/todo', {
            headers: {
                'Authorization': `Bearer ${UserService.userValue.token}`
            }
        }).then(res => res.json()).then(data => {setTodos(data.message);}).catch(err => {setError(err);})
    }

    const deleteTodo = async (todoId) => {
        fetch(`/api/todo/delete/${todoId}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${UserService.userValue.token}`
            }
        }).then(res => res.json()).then(data => {fetchTodos()}).catch(err => {setError(err);})
    }

    const handleCreateTodoClick = (e) => {
        e.preventDefault();
        router.push('/form')
    }

    const handlleCompleteTodoClick = (todoId, completed) => {
        fetch(`/api/todo/update/${todoId}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${UserService.userValue.token}`
            },
            body: JSON.stringify({
                completed: completed ? false : true
            })
        }).then(res => res.json()).then(data => {fetchTodos()}).catch(err => {setError(err);})
    }

    return(
        <div className="flex flex-col items-center justify-center h-screen bg-slate-600">
             <Head>
                <title>Todo Lists</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-1/2">
                <div className="flex flex-col justify-center">
                    <h1 className="text-2xl font-bold text-center mb-4">
                       Todo Lists
                    </h1>
                    <div className="flex justify-end mb-4">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleCreateTodoClick}>
                            Create
                        </button>
                    </div>
                    <div className='flex flex-col items-center justify-center'>
                        {todos.map((todo, key) => (
                        <div className='flex flex-row bg-orange-200 w-full rounded-md px-7 py-4' key={key}>
                            <div className='flex-initial w-8'>
                                <input type='checkbox' className='form-checkbox w-5 h-5 mt-1' value={todo.completed} onClick={e => e.target.checked && handlleCompleteTodoClick(todo.id, todo.completed)}/>
                            </div>
                            <div className='flex-1'>
                                <h3 className='font-semibold text-xl mb-1'>{todo.title}</h3>
                                <p className='text-sm'> {todo.description} </p>
                            </div>
                            <div className='flex-initial w-6 justify-end'>
                                <a onClick={() => deleteTodo(todo.id)}>
                                    <svg className='h-6 w-6 fill-current text-gray-500' viewBox='0 0 24 24'>
                                        <path d='M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z' />
                                        <path d='M0 0h24v24H0z' fill='none' />
                                    </svg>
                                </a>
                            </div>
                        </div>
                        ))}
                    </div>
                  
                </div>
            </div>
        </div>
    )
}