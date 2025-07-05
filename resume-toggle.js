// Dark/Clear mode toggle for resume.html
(function() {
  try {
    var themeToggle = document.getElementById('theme-toggle');
    var html = document.documentElement;
    // Check for saved theme preference or use system preference
    var savedTheme = localStorage.getItem('resume-theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    if(savedTheme === 'dark') html.classList.add('dark');
    else html.classList.remove('dark');
    if(themeToggle) {
      themeToggle.addEventListener('click', function() {
        html.classList.toggle('dark');
        var theme = html.classList.contains('dark') ? 'dark' : 'light';
        localStorage.setItem('resume-theme', theme);
      });
    } else {
      console.error('Theme toggle button not found');
    }
  } catch(e) {
    console.error('Resume dark mode JS error:', e);
  }
})();
