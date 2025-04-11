
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import SearchBar from '@/components/SearchBar';
import MedicineCard from '@/components/MedicineCard';
import RequestForm from '@/components/RequestForm';
import { searchMedicines } from '@/lib/data';
import { toast } from 'sonner';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { MessageSquarePlus } from 'lucide-react';
import BlurContainer from '@/components/ui/BlurContainer';
import { Progress } from '@/components/ui/progress';

function Search() {
  const isMobile = useIsMobile();
  const [searchResults, setSearchResults] = useState([]);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showRequestNewForm, setShowRequestNewForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Simulate loading when page loads
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);
    
    return () => clearTimeout(timer);
  }, []);
  
  function handleSearch(query) {
    setIsLoading(true);
    setSearchQuery(query);
    
    // Add a small delay to show loading
    setTimeout(() => {
      const results = searchMedicines(query);
      setSearchResults(results);
      setHasSearched(true);
      setIsLoading(false);
      
      if (results.length === 0) {
        toast.info('No medicines found. You can request this medicine below.');
      }
    }, 400);
  }
  
  function handleRequestMedicine(medicine) {
    setSelectedMedicine(medicine);
  }
  
  function handleCloseRequestForm() {
    setSelectedMedicine(null);
    setShowRequestNewForm(false);
  }
  
  function handleRequestNew() {
    setShowRequestNewForm(true);
  }
  
  function handleSubmitRequest(data) {
    // In a real app, we would send this data to a backend API
    console.log('Request submitted:', data);
    
    toast.success('Your request has been submitted!', {
      description: 'We will notify you when the medicine is available.'
    });
    
    setSelectedMedicine(null);
    setShowRequestNewForm(false);
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <Navbar />
      
      <div className={isMobile ? 'pl-4 pr-4 pt-20 pb-16' : 'pl-72 pr-8 pt-8 pb-16'}>
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-medilink-black">Medicine Search</h1>
          <p className="text-medilink-darkGray mt-1">Find and request medicines</p>
        </header>
        
        <div className="max-w-2xl mb-8">
          <SearchBar onSearch={handleSearch} />
        </div>
        
        {isLoading && (
          <BlurContainer className="p-6 max-w-2xl mx-auto mb-8">
            <p className="text-center text-medilink-darkGray mb-4">Loading results...</p>
            <Progress value={45} className="h-2" />
          </BlurContainer>
        )}
        
        {hasSearched && !isLoading && (
          <div className="mt-8 animate-in fade-in duration-500">
            <h2 className="text-xl font-semibold text-medilink-black mb-4">
              Search Results {searchResults.length > 0 && `(${searchResults.length})`}
            </h2>
            
            {searchResults.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {searchResults.map((medicine) => (
                  <MedicineCard
                    key={medicine.id}
                    medicine={medicine}
                    onRequest={!medicine.inStock ? handleRequestMedicine : undefined}
                  />
                ))}
              </div>
            ) : (
              <BlurContainer className="p-8 text-center max-w-xl mx-auto">
                <p className="text-lg text-medilink-darkGray">No medicines found matching your search.</p>
                <p className="mt-2 text-medilink-darkGray mb-6">Try using different keywords or check the spelling.</p>
                
                <Button 
                  onClick={handleRequestNew}
                  className="bg-medilink-blue hover:bg-medilink-darkBlue mt-2"
                >
                  <MessageSquarePlus className="mr-2" size={18} />
                  Request "{searchQuery}"
                </Button>
              </BlurContainer>
            )}
          </div>
        )}
        
        {!hasSearched && !isLoading && (
          <BlurContainer className="p-8 text-center max-w-xl mx-auto mt-12 animate-in fade-in duration-500">
            <p className="text-lg text-medilink-darkGray">Enter a medicine name to search.</p>
            <p className="mt-2 text-sm text-medilink-darkGray">You can search by medicine name or manufacturer.</p>
          </BlurContainer>
        )}
        
        {selectedMedicine && (
          <RequestForm
            medicine={selectedMedicine}
            onClose={handleCloseRequestForm}
            onSubmit={handleSubmitRequest}
          />
        )}
        
        {showRequestNewForm && !selectedMedicine && (
          <RequestForm
            medicine={{
              id: 'new-request',
              name: searchQuery,
              manufacturer: 'Unknown',
              dosage: 'Not specified',
              inStock: false,
              price: 0
            }}
            onClose={handleCloseRequestForm}
            onSubmit={handleSubmitRequest}
          />
        )}
      </div>
    </div>
  );
}

export default Search;
