function Settings() {
    return (
      <div className="min-h-screen bg-slate-900 text-white p-10">
        <h1 className="text-4xl font-bold mb-8">
          Settings
        </h1>
  
        <div className="bg-slate-800 p-6 rounded-xl">
          <h2 className="text-xl font-bold mb-4">
            Account Settings
          </h2>
  
          <p>Email Notifications: Enabled</p>
          <p>Theme: Dark Mode</p>
          <p>Version: 1.0.0</p>
        </div>
      </div>
    );
  }
  
  export default Settings;