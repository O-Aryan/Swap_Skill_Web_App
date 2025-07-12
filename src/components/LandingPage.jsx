import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSkill, setSelectedSkill] = useState('');

  useEffect(() => {
    fetchPublicUsers();
  }, [searchTerm, selectedSkill]);

  const fetchPublicUsers = async () => {
    try {
      let url = 'http://localhost:5000/api/public/users/discover';
      const params = new URLSearchParams();
      
      if (searchTerm) params.append('search', searchTerm);
      if (selectedSkill) params.append('skill', selectedSkill);
      
      if (params.toString()) {
        url += `?${params.toString()}`;
      }

      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setUsers(data.users);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-800">Skill Swap Platform</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="btn btn-primary"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="btn btn-secondary"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Trade Skills, Learn Together
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Connect with people who have skills you want to learn, and share your expertise in return. 
            No money needed - just knowledge exchange.
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              to="/register"
              className="btn btn-primary text-lg px-8 py-3"
            >
              Get Started
            </Link>
            <Link
              to="/login"
              className="btn btn-secondary text-lg px-8 py-3"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
              Discover People with Skills
            </h3>
            
            <div className="card mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Search by name or skill</label>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="form-input"
                    placeholder="Search users..."
                  />
                </div>
                <div>
                  <label className="form-label">Filter by specific skill</label>
                  <input
                    type="text"
                    value={selectedSkill}
                    onChange={(e) => setSelectedSkill(e.target.value)}
                    className="form-input"
                    placeholder="e.g., Photoshop, Excel"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Users Grid */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {users.map((user) => (
              <div key={user._id} className="card">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{user.name}</h3>
                    {user.location && (
                      <p className="text-sm text-gray-600">{user.location}</p>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600">Rating</div>
                    <div className="font-semibold text-gray-800">
                      {user.rating > 0 ? `${user.rating}/5` : 'No ratings'}
                    </div>
                  </div>
                </div>

                {user.availability && (
                  <div className="mb-3">
                    <span className="text-sm font-medium text-gray-600">Availability: </span>
                    <span className="text-sm text-gray-800">{user.availability}</span>
                  </div>
                )}

                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-600 mb-2">Skills Offered:</h4>
                  <div className="flex flex-wrap gap-1">
                    {user.skillsOffered?.slice(0, 3).map((skill, index) => (
                      <span key={index} className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-700">
                        {skill}
                      </span>
                    ))}
                    {user.skillsOffered?.length > 3 && (
                      <span className="text-xs text-gray-500">+{user.skillsOffered.length - 3} more</span>
                    )}
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-600 mb-2">Skills Wanted:</h4>
                  <div className="flex flex-wrap gap-1">
                    {user.skillsWanted?.slice(0, 3).map((skill, index) => (
                      <span key={index} className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-700">
                        {skill}
                      </span>
                    ))}
                    {user.skillsWanted?.length > 3 && (
                      <span className="text-xs text-gray-500">+{user.skillsWanted.length - 3} more</span>
                    )}
                  </div>
                </div>

                <div className="text-center">
                  <Link
                    to="/login"
                    className="btn btn-primary w-full"
                  >
                    Sign In to Send Request
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {users.length === 0 && !loading && (
            <div className="text-center py-8">
              <p className="text-gray-600">No users found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            How It Works
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-300 mb-4">1</div>
              <h4 className="text-xl font-semibold text-gray-800 mb-2">Create Profile</h4>
              <p className="text-gray-600">
                Sign up and add the skills you can teach and the skills you want to learn.
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-300 mb-4">2</div>
              <h4 className="text-xl font-semibold text-gray-800 mb-2">Find Matches</h4>
              <p className="text-gray-600">
                Browse other users and find people with complementary skills.
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-300 mb-4">3</div>
              <h4 className="text-xl font-semibold text-gray-800 mb-2">Start Swapping</h4>
              <p className="text-gray-600">
                Send swap requests and start learning from each other.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-300">
            Skill Swap Platform. Built for the Oddo Hackathon.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage; 