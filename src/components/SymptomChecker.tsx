
import React, { useState } from 'react';
import { Search, Check, ArrowRight, AlertCircle } from 'lucide-react';
import Button from './Button';
import TransitionWrapper from './TransitionWrapper';

type SymptomSeverity = 'mild' | 'moderate' | 'severe';

interface Symptom {
  id: string;
  name: string;
  selected: boolean;
  severity?: SymptomSeverity;
}

const SymptomChecker = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSymptoms, setSelectedSymptoms] = useState<Symptom[]>([]);
  const [step, setStep] = useState<'select' | 'review' | 'result'>('select');
  const [analysisComplete, setAnalysisComplete] = useState(false);
  
  const allSymptoms: Symptom[] = [
    { id: '1', name: 'Headache', selected: false },
    { id: '2', name: 'Fever', selected: false },
    { id: '3', name: 'Cough', selected: false },
    { id: '4', name: 'Fatigue', selected: false },
    { id: '5', name: 'Shortness of breath', selected: false },
    { id: '6', name: 'Sore throat', selected: false },
    { id: '7', name: 'Dizziness', selected: false },
    { id: '8', name: 'Nausea', selected: false },
    { id: '9', name: 'Muscle pain', selected: false },
    { id: '10', name: 'Abdominal pain', selected: false },
  ];
  
  const filteredSymptoms = allSymptoms.filter(symptom => 
    symptom.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const toggleSymptom = (symptom: Symptom) => {
    const exists = selectedSymptoms.find(s => s.id === symptom.id);
    
    if (exists) {
      setSelectedSymptoms(selectedSymptoms.filter(s => s.id !== symptom.id));
    } else {
      setSelectedSymptoms([...selectedSymptoms, { ...symptom, selected: true }]);
    }
  };
  
  const updateSeverity = (id: string, severity: SymptomSeverity) => {
    setSelectedSymptoms(
      selectedSymptoms.map(s => 
        s.id === id ? { ...s, severity } : s
      )
    );
  };
  
  const goToReview = () => {
    if (selectedSymptoms.length > 0) {
      setStep('review');
    }
  };
  
  const goToResults = () => {
    setStep('result');
    setAnalysisComplete(false);
    
    // Simulate analysis
    setTimeout(() => {
      setAnalysisComplete(true);
    }, 2000);
  };
  
  const resetChecker = () => {
    setSelectedSymptoms([]);
    setStep('select');
    setAnalysisComplete(false);
  };
  
  return (
    <div className="glass rounded-xl overflow-hidden">
      {step === 'select' && (
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-6">Select Your Symptoms</h2>
          
          <div className="relative mb-6">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
              <Search className="w-5 h-5" />
            </div>
            <input
              type="text"
              placeholder="Search symptoms..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-input bg-background"
            />
          </div>
          
          <div className="mb-6">
            <h3 className="font-medium mb-3">Selected Symptoms ({selectedSymptoms.length})</h3>
            {selectedSymptoms.length === 0 ? (
              <p className="text-muted-foreground text-sm">No symptoms selected yet.</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {selectedSymptoms.map(symptom => (
                  <div 
                    key={symptom.id}
                    className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm flex items-center"
                  >
                    {symptom.name}
                    <button 
                      onClick={() => toggleSymptom(symptom)}
                      className="ml-2 text-primary/70 hover:text-primary"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="mb-6">
            <h3 className="font-medium mb-3">Common Symptoms</h3>
            <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
              {filteredSymptoms.map(symptom => (
                <button
                  key={symptom.id}
                  onClick={() => toggleSymptom(symptom)}
                  className={`w-full text-left p-3 rounded-lg flex items-center justify-between transition-colors ${
                    selectedSymptoms.some(s => s.id === symptom.id)
                      ? 'bg-primary/10 text-primary'
                      : 'bg-secondary hover:bg-secondary/80'
                  }`}
                >
                  {symptom.name}
                  {selectedSymptoms.some(s => s.id === symptom.id) && (
                    <Check className="w-5 h-5" />
                  )}
                </button>
              ))}
              
              {filteredSymptoms.length === 0 && (
                <div className="text-center py-4 text-muted-foreground">
                  No symptoms match your search.
                </div>
              )}
            </div>
          </div>
          
          <div className="flex justify-end">
            <Button 
              onClick={goToReview}
              disabled={selectedSymptoms.length === 0}
              icon={<ArrowRight className="w-4 h-4" />}
              iconPosition="right"
            >
              Continue
            </Button>
          </div>
        </div>
      )}
      
      {step === 'review' && (
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-6">Rate Your Symptoms</h2>
          
          <div className="space-y-4 mb-8">
            {selectedSymptoms.map(symptom => (
              <div key={symptom.id} className="border border-border rounded-lg p-4">
                <h3 className="font-medium mb-3">{symptom.name}</h3>
                <div className="flex space-x-2">
                  {(['mild', 'moderate', 'severe'] as SymptomSeverity[]).map(severity => (
                    <button
                      key={severity}
                      onClick={() => updateSeverity(symptom.id, severity)}
                      className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                        symptom.severity === severity
                          ? severity === 'mild' 
                            ? 'bg-green-100 text-green-700 border border-green-200'
                            : severity === 'moderate'
                              ? 'bg-orange-100 text-orange-700 border border-orange-200'
                              : 'bg-red-100 text-red-700 border border-red-200'
                          : 'bg-secondary hover:bg-secondary/80'
                      }`}
                    >
                      {severity.charAt(0).toUpperCase() + severity.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-between">
            <Button 
              variant="outline"
              onClick={() => setStep('select')}
            >
              Back
            </Button>
            <Button 
              onClick={goToResults}
              disabled={selectedSymptoms.some(s => !s.severity)}
              icon={<ArrowRight className="w-4 h-4" />}
              iconPosition="right"
            >
              Analyze Symptoms
            </Button>
          </div>
        </div>
      )}
      
      {step === 'result' && (
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-6">Analysis Results</h2>
          
          {!analysisComplete ? (
            <div className="text-center py-10">
              <div className="inline-block w-16 h-16 rounded-full border-4 border-t-transparent border-primary animate-spin mb-4"></div>
              <p className="text-muted-foreground">Analyzing your symptoms...</p>
            </div>
          ) : (
            <TransitionWrapper animation="fade-in">
              <div>
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6 flex items-start">
                  <AlertCircle className="w-5 h-5 text-amber-500 mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-amber-800 mb-1">Important Note</h3>
                    <p className="text-sm text-amber-700">
                      This analysis is not a medical diagnosis. Always consult with a healthcare professional for proper evaluation.
                    </p>
                  </div>
                </div>
                
                <div className="border border-border rounded-lg p-5 mb-6">
                  <h3 className="font-semibold mb-3">Possible Conditions</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-primary mr-2"></div>
                      <span className="font-medium">Common Cold</span>
                      <span className="ml-2 text-sm text-muted-foreground">High match</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-primary mr-2"></div>
                      <span className="font-medium">Seasonal Allergies</span>
                      <span className="ml-2 text-sm text-muted-foreground">Moderate match</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-primary mr-2"></div>
                      <span className="font-medium">Flu (Influenza)</span>
                      <span className="ml-2 text-sm text-muted-foreground">Low match</span>
                    </li>
                  </ul>
                </div>
                
                <div className="border border-border rounded-lg p-5 mb-6">
                  <h3 className="font-semibold mb-3">Recommended Next Steps</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-2 mt-0.5">1</div>
                      <span>Rest and stay hydrated</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-2 mt-0.5">2</div>
                      <span>Monitor your symptoms for 24-48 hours</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-2 mt-0.5">3</div>
                      <span>If symptoms worsen or persist, consult a healthcare provider</span>
                    </li>
                  </ul>
                </div>
                
                <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
                  <Button 
                    variant="outline"
                    onClick={resetChecker}
                  >
                    Start Over
                  </Button>
                  <div className="flex gap-2">
                    <Button variant="secondary">
                      Save Results
                    </Button>
                    <Button>
                      Talk to AI Assistant
                    </Button>
                  </div>
                </div>
              </div>
            </TransitionWrapper>
          )}
        </div>
      )}
    </div>
  );
};

export default SymptomChecker;
