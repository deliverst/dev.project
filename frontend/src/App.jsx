import './App.css'
import { useEffect, useState } from 'react'


const { VITE_URL } = import.meta.env


function App() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [users, setUsers] = useState([])


    useEffect(() => {

        const getUser = async () => {
            const response = await fetch(`${VITE_URL}/user`)
            const responseParsed = await response.json()
            setUsers(responseParsed)
        }

        getUser()

    }, [])

    console.log(email)
    console.log(password)
    const handleChangeEmail = (e) => {
        e.preventDefault()
        setEmail(e.target.value)
    }

    const handleChangePassword = (e) => {
        e.preventDefault()
        setPassword(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const response = await fetch(`${VITE_URL}/user`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email,
                    password,
                }),
            })

        if (response.ok) {
            const responseParsed = await response.json()
            console.log(responseParsed)
            // alert("algo salio bien")
            setUsers([...users, responseParsed])
            setPassword('')
            setEmail('')


        } else {
            alert("algo salio mal")
        }


    }

    const handleDelete = async (id) => {

        console.log(id)

        const response = await fetch(`${VITE_URL}/user/${id}`,
            {
                method: 'DELETE',
            })
        const responseParseed = await response.json()
        console.log({ responseParseed })

        const resto = users.filter(user => user._id !== id)
        setUsers(resto)

    }

    return (
        <>
            <div className='flex'>
            <div className='flex justify-center items-center h-screen'>
                <form onSubmit={handleSubmit} className='border border-black flex flex-col p-10 gap-5' action=''>
                    <input value={email} placeholder='email' name='email' onChange={handleChangeEmail} className='border border-black p-2 rounded-lg' type='text' />
                    <input value={password} placeholder='password' name='password' onChange={handleChangePassword} className='border border-black p-2 rounded-lg' type='password' />
                    <button className='bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-300' type='submit'>ENVIAR INFORMACION</button>
                </form>
            </div>

            <table className='min-w-full'>
                      <thead>
                        <tr className='bg-gray-200'>
                          <th className='text-left py-2 px-4'>Email</th>
                          <th className='text-left py-2 px-4'>Password</th>
                            <th className='text-left py-2 px-4'>Delete</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map(usuario => (
                            <tr key={usuario?._id} className='border-b'>
                        <td className='text-left py-2 px-4'>{usuario?.email}</td>
                        <td className='text-left py-2 px-4'>{usuario?.password}</td>
                        <button onClick={() => handleDelete(usuario?._id)} className='bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-300' type='submit'>DELETE</button>
                          </tr>
                        ))}
                      </tbody>
                    </table>
            </div>
    </>

    )
}

export default App
