
import React, { useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Activity, Calendar, Bell, TrendingUp, Pill, MessageSquare } from 'lucide-react';
import Button from '@/components/Button';
import TransitionWrapper from '@/components/TransitionWrapper';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1 pt-28 px-4 md:px-8 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10">
            <TransitionWrapper animation="fade-in">
              <div>
                <h1 className="text-3xl font-bold mb-2">Health Dashboard</h1>
                <p className="text-muted-foreground">
                  Track your health data and get personalized insights
                </p>
              </div>
            </TransitionWrapper>
            
            <TransitionWrapper delay={100} animation="fade-in">
              <div className="mt-4 md:mt-0 flex space-x-3">
                <Button variant="outline" icon={<Calendar className="w-4 h-4" />}>
                  View Calendar
                </Button>
                <Button icon={<Activity className="w-4 h-4" />}>
                  Log Health Data
                </Button>
              </div>
            </TransitionWrapper>
          </div>
          
          <TransitionWrapper delay={200} animation="fade-in">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <Card className="glass p-6 rounded-xl">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-4">
                    <Activity className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Overall Health</h3>
                    <p className="text-2xl font-bold">Good</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Sleep</span>
                    <div className="w-32 h-2 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: '75%' }}></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Activity</span>
                    <div className="w-32 h-2 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: '60%' }}></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Nutrition</span>
                    <div className="w-32 h-2 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                </div>
              </Card>
              
              <Card className="glass p-6 rounded-xl">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-4">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Health Trends</h3>
                    <p className="text-2xl font-bold">Improving</p>
                  </div>
                </div>
                <div className="h-32 flex items-end justify-between px-2">
                  {[40, 65, 45, 70, 55, 80, 60].map((height, index) => (
                    <div key={index} className="w-6 bg-primary/20 rounded-t-sm relative" style={{ height: `${height}%` }}>
                      <div className="absolute bottom-0 left-0 right-0 bg-primary rounded-t-sm transition-all duration-700 animate-rise" style={{ height: `${height}%` }}></div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                  <span>Mon</span>
                  <span>Tue</span>
                  <span>Wed</span>
                  <span>Thu</span>
                  <span>Fri</span>
                  <span>Sat</span>
                  <span>Sun</span>
                </div>
              </Card>
              
              <Card className="glass p-6 rounded-xl">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-4">
                    <Pill className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Medications</h3>
                    <p className="text-2xl font-bold">2 Today</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                    <div>
                      <h4 className="font-medium">Vitamin D</h4>
                      <p className="text-sm text-muted-foreground">1 pill, morning</p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                      <Bell className="w-4 h-4 text-primary" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                    <div>
                      <h4 className="font-medium">Allergy Medicine</h4>
                      <p className="text-sm text-muted-foreground">1 pill, evening</p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                      <Bell className="w-4 h-4 text-primary" />
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </TransitionWrapper>
          
          <TransitionWrapper delay={300} animation="fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card className="glass p-6 rounded-xl h-full">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold">Recent Health Insights</h3>
                    <Button variant="ghost" size="sm">View All</Button>
                  </div>
                  <div className="space-y-4">
                    <div className="p-4 border border-border rounded-lg hover:border-primary/50 transition-all">
                      <div className="flex items-start">
                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-700 mr-3 flex-shrink-0">
                          <Activity className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-medium mb-1">Exercise Recommendation</h4>
                          <p className="text-sm text-muted-foreground">
                            Based on your data, a 30-minute brisk walk 4 times a week would help improve your cardiovascular health.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 border border-border rounded-lg hover:border-primary/50 transition-all">
                      <div className="flex items-start">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 mr-3 flex-shrink-0">
                          <MessageSquare className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-medium mb-1">Health Analysis</h4>
                          <p className="text-sm text-muted-foreground">
                            Your recent headache symptoms may be related to changes in your sleep pattern. Try maintaining a consistent sleep schedule.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 border border-border rounded-lg hover:border-primary/50 transition-all">
                      <div className="flex items-start">
                        <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 mr-3 flex-shrink-0">
                          <Bell className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-medium mb-1">Medication Reminder</h4>
                          <p className="text-sm text-muted-foreground">
                            Don't forget to take your evening medication at 8:00 PM today.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
              
              <div>
                <Card className="glass p-6 rounded-xl h-full">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold">Quick Actions</h3>
                  </div>
                  <div className="space-y-3">
                    <Link to="/chat">
                      <Button variant="outline" fullWidth className="justify-start h-auto py-3 px-4">
                        <MessageSquare className="w-5 h-5 mr-3" />
                        <div className="text-left">
                          <span className="block font-medium">Talk to Health AI</span>
                          <span className="text-xs text-muted-foreground">Ask health questions</span>
                        </div>
                      </Button>
                    </Link>
                    <Link to="/symptoms">
                      <Button variant="outline" fullWidth className="justify-start h-auto py-3 px-4">
                        <Activity className="w-5 h-5 mr-3" />
                        <div className="text-left">
                          <span className="block font-medium">Check Symptoms</span>
                          <span className="text-xs text-muted-foreground">Analyze your symptoms</span>
                        </div>
                      </Button>
                    </Link>
                    <Button variant="outline" fullWidth className="justify-start h-auto py-3 px-4">
                      <Calendar className="w-5 h-5 mr-3" />
                      <div className="text-left">
                        <span className="block font-medium">Schedule Reminder</span>
                        <span className="text-xs text-muted-foreground">Set health reminders</span>
                      </div>
                    </Button>
                    <Button variant="outline" fullWidth className="justify-start h-auto py-3 px-4">
                      <Pill className="w-5 h-5 mr-3" />
                      <div className="text-left">
                        <span className="block font-medium">Add Medication</span>
                        <span className="text-xs text-muted-foreground">Track your medications</span>
                      </div>
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          </TransitionWrapper>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
