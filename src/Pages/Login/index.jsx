import { Link } from "react-router-dom"
import { useRef } from "react"
import conexao from '../../../Services/api.js'


function Login(){
    const emailRef = useRef()
    const passwordRef = useRef() 
    
    async function handleSubmit(event) {
        event.preventDefault()
        
        try {
           const {  data:token  } = await conexao.post('/login', {
                email: emailRef.current.value,
                password: passwordRef.current.value
            })

            localStorage.setItem('token', token)
            console.log(token)
            alert('LOGIN OK')
        } catch (error) {
            alert('Senha ou e-mail incorretos')
        }
    }

    return (
        <div className="mx-auto mt-10 bg-white p-8 border border-gray-300 rounded-3xl shadow-lg max-w-md ">
            <h2 className="text-4xl font-bold mb-6 text-center text-gray-800">LOGIN</h2>
            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                <input placeholder="Email" type="email" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none" ref={emailRef} />
                <input placeholder="Senha" type="password" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none" ref={passwordRef} />
                <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-400 ">Fazer Login</button> 
            </form>
            <Link to="/" className=" text-blue-600 hover:underline mt-4 block text-center">Não tem uma conta? Cadastre-se</Link>
     
        </div>
    )

}

export default Login