function Features() {
    return (
      <section className="mt-32 px-10">
  
        <h2 className="text-4xl font-bold text-center mb-12">
          Powerful Features
        </h2>
  
        <div className="grid md:grid-cols-3 gap-6">
  
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
            <h3 className="text-xl font-bold mb-3">
              🤖 AI Code Review
            </h3>
  
            <p className="text-slate-400">
              Get instant code analysis and improvement suggestions.
            </p>
          </div>
  
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
            <h3 className="text-xl font-bold mb-3">
              💬 Team Collaboration
            </h3>
  
            <p className="text-slate-400">
              Chat and work together in real time.
            </p>
          </div>
  
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
            <h3 className="text-xl font-bold mb-3">
              🚀 Project Tracking
            </h3>
  
            <p className="text-slate-400">
              Manage tasks and releases efficiently.
            </p>
          </div>
  
        </div>
  
      </section>
    );
  }
  
  export default Features;