import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import Login from './components/Auth/Login';
import SignIn from './components/Auth/SignIn';
import Header from './components/Header';
import BottomMenu from './components/BottomMenu';
import NewChat from './components/NewChat';
import Chat from './components/Chat';
import ChatHistory from './components/ChatHistory';
import Dashboard from './components/Dashboard';
import DreamTeam from './components/DreamTeam';
import GYBLiveNetwork from './components/GYBLiveNetwork';
import UserProfile from './components/UserProfile';
import Profile from './components/Profile';
import Settings from './components/Settings';
import UserOnboarding from './components/UserOnboarding';
import GYBTeamChat from './components/GYBTeamChat';
import Analytics from './components/Analytics';
import Upload from './components/Upload';
import GYBMedia from './components/NewPost';
import GYBStudio from './components/GYBStudio';
import WorkHistory from './components/WorkHistory';
import Invites from './components/Invites';
import Reviews from './components/Reviews';
import Rewards from './components/Rewards';
import Payments from './components/Payments';
import Earnings from './components/Earnings';
import ForgotPassword from './components/Auth/ForgotPassword';
import ResetPassword from './components/Auth/ResetPassword';
import AuthCallback from './components/Auth/AuthCallback';
import RoadMap from './components/RoadMap';
import BusinessPlan from './components/templates/BusinessPlan';
import InvestorDeck from './components/templates/InvestorDeck';
import MarketAnalysis from './components/templates/MarketAnalysis';
import MarketingSales from './components/templates/MarketingSales';
import FulfilmentPlan from './components/templates/FulfilmentPlan';
import MediaPlan from './components/templates/MediaPlan';
import RoadMapTemplate from './components/templates/RoadMapTemplate';
import DataControls from './components/settings/DataControls';
import EmailSettings from './components/settings/EmailSettings';
import LanguageSettings from './components/LanguageSettings';
import PersonalizationSettings from './components/PersonalizationSettings';
import SubscriptionSettings from './components/SubscriptionSettings';
import Integrations from './components/settings/integrations/Integrations';
import Portfolio from './components/Portfolio';
import Resume from './components/Resume';

const App: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-navy-blue"></div>
      </div>
    );
  }

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-white text-navy-blue">
        {isAuthenticated && <Header />}
        <main className="flex-grow mt-16 mb-16 container mx-auto px-4">
          <Routes>
            <Route path="/" element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />} />
            <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />} />
            <Route path="/signin" element={!isAuthenticated ? <SignIn /> : <Navigate to="/dashboard" />} />
            <Route path="/forgot-password" element={!isAuthenticated ? <ForgotPassword /> : <Navigate to="/dashboard" />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/auth/callback" element={<AuthCallback />} />
            <Route path="/onboarding" element={!isAuthenticated ? <UserOnboarding /> : <Navigate to="/dashboard" />} />
            
            {/* Protected Routes */}
            <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
            <Route path="/new-chat" element={isAuthenticated ? <NewChat /> : <Navigate to="/login" />} />
            <Route path="/chat/:chatId" element={isAuthenticated ? <Chat /> : <Navigate to="/login" />} />
            <Route path="/chat-history" element={isAuthenticated ? <ChatHistory /> : <Navigate to="/login" />} />
            <Route path="/dream-team" element={isAuthenticated ? <DreamTeam /> : <Navigate to="/login" />} />
            <Route path="/gyb-live-network" element={isAuthenticated ? <GYBLiveNetwork /> : <Navigate to="/login" />} />
            <Route path="/user-profile/:userId" element={isAuthenticated ? <UserProfile /> : <Navigate to="/login" />} />
            <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/login" />} />
            <Route path="/settings" element={isAuthenticated ? <Settings /> : <Navigate to="/login" />} />
            <Route path="/gyb-team-chat" element={isAuthenticated ? <GYBTeamChat /> : <Navigate to="/login" />} />
            <Route path="/analytics" element={isAuthenticated ? <Analytics /> : <Navigate to="/login" />} />
            <Route path="/upload" element={isAuthenticated ? <Upload /> : <Navigate to="/login" />} />
            <Route path="/new-post" element={isAuthenticated ? <GYBMedia /> : <Navigate to="/login" />} />
            <Route path="/gyb-studio" element={isAuthenticated ? <GYBStudio /> : <Navigate to="/login" />} />
            <Route path="/work-history" element={isAuthenticated ? <WorkHistory /> : <Navigate to="/login" />} />
            <Route path="/invites" element={isAuthenticated ? <Invites /> : <Navigate to="/login" />} />
            <Route path="/reviews" element={isAuthenticated ? <Reviews /> : <Navigate to="/login" />} />
            <Route path="/rewards" element={isAuthenticated ? <Rewards /> : <Navigate to="/login" />} />
            <Route path="/payments" element={isAuthenticated ? <Payments /> : <Navigate to="/login" />} />
            <Route path="/earnings" element={isAuthenticated ? <Earnings /> : <Navigate to="/login" />} />
            <Route path="/road-map" element={isAuthenticated ? <RoadMap /> : <Navigate to="/login" />} />
            <Route path="/portfolio" element={isAuthenticated ? <Portfolio /> : <Navigate to="/login" />} />
            <Route path="/resume" element={isAuthenticated ? <Resume /> : <Navigate to="/login" />} />
            
            {/* Settings Routes */}
            <Route path="/settings/email" element={isAuthenticated ? <EmailSettings /> : <Navigate to="/login" />} />
            <Route path="/settings/subscription" element={isAuthenticated ? <SubscriptionSettings /> : <Navigate to="/login" />} />
            <Route path="/settings/personalization" element={isAuthenticated ? <PersonalizationSettings /> : <Navigate to="/login" />} />
            <Route path="/settings/data-controls" element={isAuthenticated ? <DataControls /> : <Navigate to="/login" />} />
            <Route path="/settings/language" element={isAuthenticated ? <LanguageSettings /> : <Navigate to="/login" />} />
            <Route path="/settings/integrations" element={isAuthenticated ? <Integrations /> : <Navigate to="/login" />} />
            
            {/* Template Routes */}
            <Route path="/business-plan" element={isAuthenticated ? <BusinessPlan /> : <Navigate to="/login" />} />
            <Route path="/investor-deck" element={isAuthenticated ? <InvestorDeck /> : <Navigate to="/login" />} />
            <Route path="/market-analysis" element={isAuthenticated ? <MarketAnalysis /> : <Navigate to="/login" />} />
            <Route path="/marketing-sales" element={isAuthenticated ? <MarketingSales /> : <Navigate to="/login" />} />
            <Route path="/fulfilment-plan" element={isAuthenticated ? <FulfilmentPlan /> : <Navigate to="/login" />} />
            <Route path="/media-plan" element={isAuthenticated ? <MediaPlan /> : <Navigate to="/login" />} />
            <Route path="/road-map-template" element={isAuthenticated ? <RoadMapTemplate /> : <Navigate to="/login" />} />
          </Routes>
        </main>
        {isAuthenticated && <BottomMenu />}
      </div>
    </Router>
  );
};

export default App;