import Head from 'next/head'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import {UserService} from '../../services/UserService';

export default  function form() {

    const [todo, setTodo] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        fetch('/api/todo/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${UserService.userValue.token}`
            },
            body: JSON.stringify({
                title: todo,
                description: description
            })
        }).then(res => res.json()).then(data => {
            setTodo('');
            setDescription('')
            router.back('/home')
            setLoading(false);
        }).catch(err => {
            setError(err);
            setLoading(false);
        }
    );
    }

    
    return (
    <div className="flex flex-col items-center justify-center h-screen bg-slate-600">
        <Head>
           <title>Create Todo</title>
           <link rel="icon" href="/favicon.ico" />
       </Head>
       <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-1/2">
           <div className="flex flex-col justify-center">
               <h1 className="text-2xl font-bold text-center mb-4">
                    Create Todo
               </h1>
               <div className='flex flex-col items-center justify-center'>
                    {/*form for create todo  Styling with tailwindcss*/}
                    <form className="w-full max-w-lg">
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full md:w-full px-3 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                                    Title
                                </label>
                                <input onChange={e => setTodo(e.target.value)} value={todo} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-first-name" type="text" placeholder="Title" />

                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full md:w-full px-3 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                                    Description
                                </label>
                                <textarea onChange={e => setDescription(e.target.value)} value={description} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Description" />
                            </div>
                        </div>
                        {/*button for create todo*/}
                        <div className="flex items-center justify-between">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleSubmit}>
                                Create
                            </button>
                        </div>
                    </form>

                    
               </div>
            </div>
        </div>
    </div>
    )
}