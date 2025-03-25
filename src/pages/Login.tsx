
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '@/components/Button';
import { Heart, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import TransitionWrapper from '@/components/TransitionWrapper';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  
  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-secondary/30 p-4">
      <TransitionWrapper animation="scale-in">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center mb-6">
              <div className="text-primary mr-2">
                <Heart className="h-7 w-7 stroke-[2.5px]" />
              </div>
              <h1 className="font-bold text-2xl">HealthPal</h1>
            </Link>
            <h2 className="text-2xl font-bold mb-2">
              {isLogin ? 'Welcome back' : 'Create your account'}
            </h2>
            <p className="text-muted-foreground">
              {isLogin 
                ? 'Sign in to access your health assistant' 
                : 'Join us for personalized health insights'}
            </p>
          </div>
          
          <div className="glass p-8 rounded-2xl">
            <form className="space-y-5">
              {!isLogin && (
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-2.5 rounded-lg border border-input bg-card focus:outline-none focus:ring-2 focus:ring-primary/30"
                    placeholder="Enter your name"
                  />
                </div>
              )}
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                    <Mail className="w-5 h-5" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-input bg-card focus:outline-none focus:ring-2 focus:ring-primary/30"
                    placeholder="Enter your email"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                    <Lock className="w-5 h-5" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-input bg-card focus:outline-none focus:ring-2 focus:ring-primary/30"
                    placeholder={isLogin ? "Enter your password" : "Create a password"}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
              
              {isLogin && (
                <div className="flex justify-end">
                  <Link to="#" className="text-sm text-primary hover:underline">
                    Forgot password?
                  </Link>
                </div>
              )}
              
              <Button type="submit" fullWidth size="lg">
                {isLogin ? 'Sign In' : 'Create Account'}
              </Button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                {isLogin ? "Don't have an account?" : "Already have an account?"}
                <button 
                  onClick={toggleAuthMode}
                  className="ml-1 text-primary hover:underline focus:outline-none"
                >
                  {isLogin ? 'Sign up' : 'Sign in'}
                </button>
              </p>
            </div>
          </div>
          
          <p className="text-xs text-center text-muted-foreground mt-8">
            By continuing, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </TransitionWrapper>
    </div>
  );
};

export default Login;
