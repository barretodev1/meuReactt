import { Link, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import conexao from '../../../Services/api.js';

function Cadastro() {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [erroClient, setError] = useState('');
  const navigate = useNavigate();

  const serverVálido = [
    'gmail.com',
    'googlemail.com',
    'yahoo.com',
    'ymail.com',
    'rocketmail.com',
    'outlook.com',
    'hotmail.com',
    'live.com',
    'msn.com',
    'aol.com',
    'icloud.com',
    'zoho.com',
    'mail.com',
    'email.com',
    'usa.com',
    'europe.com',
    'protonmail.com',
    'gmx.com',
    'gmx.net',
    'yandex.com',
    'yandex.ru',
    'mail.ru',
    'fastmail.com',
    'hushmail.com',
    'tutanota.com',
    'inbox.com',
    'sendgrid.net',
    'exchange.com',
    'elasticemail.com',
    'sendinblue.com',
    'mandrillapp.com'
  ];

  async function handleSubmit(event) {
    event.preventDefault();
    
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (!name) {
      setError('Insira um nome.');
      return;
    }

    if (!email) {
      setError('Insira um e-mail.');
      return;
    }

    const dominioEmail = email.split('@')[1];
    if (!serverVálido.includes(dominioEmail)) {
      setError('Insira um e-mail existente.');
      return;
    }

    if (!password) {
      setError('Insira uma senha.');
      return;
    } 

    try {
      await conexao.post('/cadastro', { name, email, password });
      alert('Usuário Cadastrado com Sucesso');
      navigate('/login'); // Redirecionar para a página de login
    } catch (error) {
      setError('Erro ao Cadastrar o Usuário.');
    }
  }

  function GoingLogin() {
    navigate('/login');
  }

  return (
    <div className="mx-auto mt-10 bg-white p-8 border border-gray-300 rounded-3xl shadow-lg max-w-md ">
      <h2 className="text-4xl font-bold mb-6 text-center text-gray-800">CADASTRO</h2>
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <input placeholder="Nome" type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none" ref={nameRef}/>
        <input placeholder="Email" type="email" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none" ref={emailRef}/>
        <input placeholder="Senha" type="password" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none" ref={passwordRef}/>
        <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-400">Cadastrar-se</button>
      </form>
      {erroClient && <p className="text-red-500 mt-4 text-center">{erroClient}</p>}
      <button onClick={GoingLogin}  className="w-full bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-400 mt-4">Ir para Login</button>
      <Link to="/login" className="text-blue-600 hover:underline mt-4 block text-center">Já tem uma conta? Faça o Login</Link>
    </div>
  );
}

export default Cadastro;
