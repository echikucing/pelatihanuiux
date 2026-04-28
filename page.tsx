"use client";

import { useEffect, useState } from 'react';
import { LayoutDashboard, Settings, Menu, Bell } from 'lucide-react';

type SensorData = {
  id: number;
  temperature: number;
  humidity: number;
  createdAt: string;
};

export default function Dashboard() {
  const [latestSensor, setLatestSensor] = useState<SensorData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000';

    async function loadSensorData() {
      try {
        setIsLoading(true);
        setError('');

        const response = await fetch(`${apiBaseUrl}/api/sensor`, { cache: 'no-store' });

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const sensor = (await response.json()) as SensorData | null;
        setLatestSensor(sensor);
      } catch (fetchError) {
        setError(fetchError instanceof Error ? fetchError.message : 'Gagal ambil data sensor');
      } finally {
        setIsLoading(false);
      }
    }

    loadSensorData();
  }, []);

  return (
    <div className="flex h-screen bg-[#0e1116] text-white">
      <aside className="w-64 bg-[#15181e] p-6 border-r border-gray-800 hidden lg:block h-full">
        <h1 className="text-xl font-bold mb-8">IoT Monitor</h1>

        <nav className="space-y-4">
          <div className="flex items-center gap-3 p-3 bg-blue-900/30 text-blue-400 rounded-lg cursor-pointer">
            <LayoutDashboard className="w-5 h-5" />
            <span>Dashboard</span>
          </div>
        </nav>
      </aside>

      <main className="w-full flex flex-col h-full">
        <header className="h-16 border-b border-gray-800 flex items-center justify-between px-6 bg-[#0e1116]">
          <button className="lg:hidden text-gray-400">
            <Menu className="w-6 h-6" />
          </button>

          <div className="flex items-center gap-6 ml-auto">
            <span className="text-sm text-emerald-400 bg-emerald-900/30 px-3 py-1 rounded-full">1 Online</span>
            <Bell className="w-5 h-5 text-gray-400" />
            <Settings className="w-5 h-5 text-gray-400" />
          </div>
        </header>

        <div className="p-6 grid grid-cols-1 gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div className="bg-[#171c25] border border-gray-800 p-6 rounded-xl min-h-50">
              <h3 className="text-lg font-bold text-gray-300 mb-6">DHT22</h3>
              <div className="text-center">
                <span className="text-6xl font-bold text-blue-100">
                  {isLoading ? '--' : latestSensor?.temperature?.toFixed(1) ?? '--'}
                </span>
                <span className="text-2xl text-gray-500">°C</span>
                <p className="text-sm text-gray-400 mt-2">Temperature</p>
                <p className="mt-3 text-sm text-gray-500">
                  {latestSensor ? `Updated ${new Date(latestSensor.createdAt).toLocaleString()}` : 'Belum ada data'}
                </p>
              </div>
            </div>

            <div className="bg-[#171c25] border border-gray-800 border-dashed p-6 rounded-xl flex items-center justify-center min-h-50">
              <div className="text-center space-y-2">
                <span className="text-gray-500 font-bold">Humidity</span>
                <p className="text-4xl font-bold text-cyan-100">
                  {isLoading ? '--' : latestSensor?.humidity?.toFixed(1) ?? '--'}
                  <span className="text-lg text-gray-500">%</span>
                </p>
              </div>
            </div>

            <div className="bg-[#171c25] border border-gray-800 border-dashed p-6 rounded-xl flex items-center justify-center min-h-50">
              <span className="text-gray-500 font-bold">Desain Sendiri (Output Devices)</span>
            </div>

            <div className="bg-[#171c25] border border-gray-800 border-dashed p-6 rounded-xl flex items-center justify-center min-h-50">
              <span className="text-gray-500 font-bold">Desain Sendiri (MQ Series)</span>
            </div>

          </div>

           <div className="bg-[#171c25] border border-gray-800 border-dashed p-6 rounded-xl flex items-center justify-center min-h-100">
              <div className="text-center space-y-2">
                <span className="text-gray-500 font-bold">Backend Status</span>
                <p className="text-sm text-gray-300">
                  {error ? `Error: ${error}` : 'FE sudah connect ke BE via API'}
                </p>
                <p className="text-xs text-gray-500">API base: {process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000'}</p>
              </div>
            </div>

        </div>
      </main>
    </div>
  );
}
