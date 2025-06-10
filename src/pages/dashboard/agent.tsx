import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { ChevronDown, Settings, Check } from 'lucide-react';

interface STTConfig {
  providers: {
    [key: string]: {
      name: string;
      models: {
        [key: string]: {
          name: string;
          languages: {
            [key: string]: string;
          };
        };
      };
    };
  };
}

const Agent: React.FC = () => {
  const [sttConfig, setSttConfig] = useState<STTConfig | null>(null);
  const [selectedProvider, setSelectedProvider] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    // Load STT config
    fetch('/stt.json')
      .then(res => res.json())
      .then(data => {
        setSttConfig(data);
        
        // Load saved selections from localStorage
        const savedConfig = localStorage.getItem('agentConfig');
        if (savedConfig) {
          const config = JSON.parse(savedConfig);
          setSelectedProvider(config.provider || '');
          setSelectedModel(config.model || '');
          setSelectedLanguage(config.language || '');
        }
      })
      .catch(err => console.error('Failed to load STT config:', err));
  }, []);

  useEffect(() => {
    // Save to localStorage whenever selections change
    if (selectedProvider && selectedModel && selectedLanguage) {
      const config = {
        provider: selectedProvider,
        model: selectedModel,
        language: selectedLanguage,
        timestamp: new Date().toISOString()
      };
      localStorage.setItem('agentConfig', JSON.stringify(config));
      setSuccess('Configuration saved automatically!');
      setTimeout(() => setSuccess(''), 3000);
    }
  }, [selectedProvider, selectedModel, selectedLanguage]);

  const handleProviderChange = (provider: string) => {
    setSelectedProvider(provider);
    setSelectedModel('');
    setSelectedLanguage('');
  };

  const handleModelChange = (model: string) => {
    setSelectedModel(model);
    setSelectedLanguage('');
  };

  const getAvailableModels = () => {
    if (!sttConfig || !selectedProvider) return {};
    return sttConfig.providers[selectedProvider]?.models || {};
  };

  const getAvailableLanguages = () => {
    if (!sttConfig || !selectedProvider || !selectedModel) return {};
    return sttConfig.providers[selectedProvider]?.models[selectedModel]?.languages || {};
  };

  const getDisplayConfig = () => {
    if (!sttConfig || !selectedProvider || !selectedModel || !selectedLanguage) return null;
    
    const provider = sttConfig.providers[selectedProvider];
    const model = provider.models[selectedModel];
    const language = model.languages[selectedLanguage];

    return {
      provider: { name: provider.name, value: selectedProvider },
      model: { name: model.name, value: selectedModel },
      language: { name: language, value: selectedLanguage }
    };
  };

  if (!sttConfig) {
    return (
      <DashboardLayout activeTab="agent">
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500 dark:text-gray-400">Loading configuration...</div>
        </div>
      </DashboardLayout>
    );
  }

  const displayConfig = getDisplayConfig();

  return (
    <DashboardLayout activeTab="agent">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-2xl p-8 border border-gray-200 dark:border-gray-700 shadow-xl">
          <div className="flex items-center gap-3 mb-6">
            <Settings className="h-6 w-6 text-purple-600" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Agent Configuration</h1>
          </div>

          {success && (
            <div className="mb-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-600 dark:text-green-400 px-4 py-3 rounded-lg flex items-center gap-2">
              <Check className="h-5 w-5" />
              {success}
            </div>
          )}

          {/* Configuration Dropdowns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Provider Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Speech-to-Text Provider
              </label>
              <div className="relative">
                <select
                  value={selectedProvider}
                  onChange={(e) => handleProviderChange(e.target.value)}
                  className="w-full appearance-none bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 pr-10 focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 dark:text-white transition-all"
                >
                  <option value="">Select Provider</option>
                  {Object.entries(sttConfig.providers).map(([key, provider]) => (
                    <option key={key} value={key}>
                      {provider.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Model Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Model
              </label>
              <div className="relative">
                <select
                  value={selectedModel}
                  onChange={(e) => handleModelChange(e.target.value)}
                  disabled={!selectedProvider}
                  className="w-full appearance-none bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 pr-10 focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 dark:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <option value="">Select Model</option>
                  {Object.entries(getAvailableModels()).map(([key, model]) => (
                    <option key={key} value={key}>
                      {model.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Language Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Language
              </label>
              <div className="relative">
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  disabled={!selectedModel}
                  className="w-full appearance-none bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 pr-10 focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 dark:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <option value="">Select Language</option>
                  {Object.entries(getAvailableLanguages()).map(([key, language]) => (
                    <option key={key} value={key}>
                      {language}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Summary Card */}
          {displayConfig && (
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-xl p-6 border border-purple-200 dark:border-purple-800">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Configuration Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-4">
                  <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Provider</div>
                  <div className="text-lg font-semibold text-gray-900 dark:text-white">
                    {displayConfig.provider.name}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    ({displayConfig.provider.value})
                  </div>
                </div>
                
                <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-4">
                  <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Model</div>
                  <div className="text-lg font-semibold text-gray-900 dark:text-white">
                    {displayConfig.model.name}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    ({displayConfig.model.value})
                  </div>
                </div>
                
                <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-4">
                  <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Language</div>
                  <div className="text-lg font-semibold text-gray-900 dark:text-white">
                    {displayConfig.language.name}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    ({displayConfig.language.value})
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Help Text */}
          <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <strong>Note:</strong> Changes are automatically saved. Select a provider first, then choose from the available models, and finally pick a supported language for your voice agent configuration.
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Agent;
