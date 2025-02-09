const LoginLeftPanel = () => {
    return (
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-purple-600 to-blue-600 p-12 text-white items-center justify-center">
        <div className="max-w-xl">
          <h1 className="text-4xl font-bold mb-6">Welcome Back!</h1>
          <p className="text-lg text-purple-100 mb-8">
            Access your notes, organize your thoughts, and boost your productivity with our powerful note-taking platform.
          </p>
          <div className="grid grid-cols-2 gap-6 text-sm">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d={feature.iconPath1} />
                    {feature.iconPath2 && <path fillRule="evenodd" d={feature.iconPath2} clipRule="evenodd" />}
                  </svg>
                </div>
                <span>{feature.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  const features = [
    {
      text: "End-to-end encryption",
      iconPath1: "M10 12a2 2 0 100-4 2 2 0 000 4z",
      iconPath2: "M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z",
    },
    {
      text: "Cloud sync",
      iconPath1: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z",
    },
    {
      text: "Customizable",
      iconPath1: "M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z",
    },
    {
      text: "Real-time sync",
      iconPath1: "M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z",
    },
  ];
  
  export default LoginLeftPanel;
  