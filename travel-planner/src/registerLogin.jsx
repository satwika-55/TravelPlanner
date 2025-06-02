import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const InputField = ({ label, type, name, value, onChange, required }) => (
  <div className="mb-6 animate-slide-up">
    <label className="block text-white text-sm font-semibold mb-2" htmlFor={name}>
      {label}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300 ease-in-out"
      placeholder={`Enter your ${label.toLowerCase()}`}
    />
  </div>
);

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login:', formData);
    navigate('/signup');
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-fixed"
      style={{ 
        backgroundImage: `url('https://images.unsplash.com/photo-1507521621353-3b9280ae4b62?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')`
      }}
    >
      <div className="bg-white/10 backdrop-blur-xl p-10 rounded-2xl shadow-2xl w-full max-w-md animate-fade-in border border-white/20">
        <h1 className="text-4xl font-bold text-white text-center mb-2">Login Here</h1>
        <p className="text-center text-gray-200 mb-8">Welcome back! Sign in to continue.</p>
        <form onSubmit={handleSubmit}>
          <InputField
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <InputField
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg transition duration-300 transform hover:scale-105 hover:shadow-lg"
          >
            Login
          </button>
        </form>
        <p className="mt-6 text-center text-gray-200">
          Don't have an account?{' '}
          <Link to="/signup" className="text-blue-400 hover:text-blue-300 transition duration-200">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Signup:', formData);
    navigate('/login');
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-fixed"
      style={{ 
        backgroundImage: `url('https://images.unsplash.com/photo-1507521621353-3b9280ae4b62?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')`
      }}
    >
      <div className="bg-white/10 backdrop-blur-xl p-10 rounded-2xl shadow-2xl w-full max-w-md animate-fade-in border border-white/20">
        <h1 className="text-4xl font-bold text-white text-center mb-2">Sign Up Here</h1>
        <p className="text-center text-gray-200 mb-8">Join us! Create your account.</p>
        <form onSubmit={handleSubmit}>
          <InputField
            label="Username"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <InputField
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <InputField
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg transition duration-300 transform hover:scale-105 hover:shadow-lg"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-6 text-center text-gray-200">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-400 hover:text-blue-300 transition duration-200">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

const RegisterLogin = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  </BrowserRouter>
);

export default RegisterLogin;