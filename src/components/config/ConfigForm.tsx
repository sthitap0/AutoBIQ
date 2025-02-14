import React, { useState } from 'react';
import type { ConfigFormData } from '../../types/config';

export function ConfigForm() {
  const [config, setConfig] = useState<ConfigFormData>({
    openAIKey: '',
    headless: false,
    browserWidth: 1920,
    browserHeight: 1080,
    useOwnBrowser: true,
    disableSecurity: false,
    recordingPath: './tmp/record_videos'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Saving config:', config);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-6">Browser & AI Configuration</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              OpenAI API Key
            </label>
            <input
              type="password"
              value={config.openAIKey}
              onChange={(e) => setConfig({ ...config, openAIKey: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          <div className="bg-gray-50 p-4 rounded-lg space-y-4">
            <h3 className="font-medium text-gray-900">Browser Settings</h3>
            
            <div className="flex items-center space-x-4">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={config.useOwnBrowser}
                  onChange={(e) => setConfig({ ...config, useOwnBrowser: e.target.checked })}
                  className="rounded text-primary-600"
                />
                <span>Use Own Browser</span>
              </label>

              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={config.headless}
                  onChange={(e) => setConfig({ ...config, headless: e.target.checked })}
                  className="rounded text-primary-600"
                />
                <span>Headless Mode</span>
              </label>

              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={config.disableSecurity}
                  onChange={(e) => setConfig({ ...config, disableSecurity: e.target.checked })}
                  className="rounded text-primary-600"
                />
                <span>Disable Security</span>
              </label>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Window Width
                </label>
                <input
                  type="number"
                  value={config.browserWidth}
                  onChange={(e) => setConfig({ ...config, browserWidth: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Window Height
                </label>
                <input
                  type="number"
                  value={config.browserHeight}
                  onChange={(e) => setConfig({ ...config, browserHeight: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Recording Path
              </label>
              <input
                type="text"
                value={config.recordingPath}
                onChange={(e) => setConfig({ ...config, recordingPath: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Save Configuration
          </button>
        </div>
      </form>
    </div>
  );
}