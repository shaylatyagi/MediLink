
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '@/components/Logo';
import BlurContainer from '@/components/ui/BlurContainer';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const Index = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [showAuth, setShowAuth] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
      setShowAuth(true);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error(isLogin ? 'Please enter your credentials' : 'Please fill all fields');
      return;
    }
    
    // In a real app, we would handle actual authentication here
    // For now, we'll just simulate a login success
    
    if (isLogin) {
      toast.success('Login successful!');
    } else {
      toast.success('Account created successfully!');
    }
    
    // Navigate to dashboard after successful login/signup
    setTimeout(() => {
      navigate('/dashboard');
    }, 1000);
  };
  
  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 w-80 h-80 bg-medilink-blue/10 rounded-full filter blur-3xl" />
        <div className="absolute right-20 top-60 w-72 h-72 bg-indigo-500/10 rounded-full filter blur-3xl" />
        <div className="absolute left-40 bottom-20 w-64 h-64 bg-sky-500/10 rounded-full filter blur-3xl" />
      </div>
      
      <div className="w-full max-w-md z-10 flex flex-col items-center">
        <div className={`flex flex-col items-center transition-all duration-500 ${isLoading ? 'scale-100' : 'scale-75'}`}>
          <Logo size="lg" animated={isLoading} />
          
          {isLoading && (
            <div className="mt-8 text-medilink-darkGray animate-pulse-subtle">
              Loading...
            </div>
          )}
        </div>
        
        {showAuth && (
          <BlurContainer className="w-full mt-8 animate-scale-in">
            <h1 className="text-2xl font-bold text-center text-medilink-black mb-6">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h1>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-medilink-darkGray mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-medilink-blue focus:ring-1 focus:ring-medilink-blue outline-none"
                  placeholder="Enter your email"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-medilink-darkGray mb-1">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-medilink-blue focus:ring-1 focus:ring-medilink-blue outline-none"
                  placeholder="Enter your password"
                  required
                />
              </div>
              
              {isLogin && (
                <div className="flex justify-end">
                  <button 
                    type="button" 
                    className="text-sm text-medilink-blue hover:text-medilink-darkBlue focus:outline-none"
                  >
                    Forgot password?
                  </button>
                </div>
              )}
              
              <Button 
                type="submit" 
                className="w-full bg-medilink-blue hover:bg-medilink-darkBlue"
              >
                {isLogin ? 'Login' : 'Sign Up'}
              </Button>
            </form>
            
            <div className="mt-4 text-center">
              <span className="text-medilink-darkGray">
                {isLogin ? "Don't have an account?" : "Already have an account?"}
              </span>
              <button
                type="button"
                onClick={toggleAuthMode}
                className="ml-2 text-medilink-blue hover:text-medilink-darkBlue font-medium focus:outline-none"
              >
                {isLogin ? 'Sign Up' : 'Login'}
              </button>
            </div>
          </BlurContainer>
        )}
      </div>
    </div>
  );
};

export default Index;
