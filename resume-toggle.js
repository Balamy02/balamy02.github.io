// Dark/Clear mode toggle for resume.html
(function() {
  const themeToggle = document.getElementById('theme-toggle');
  const html = document.documentElement;
  // Check for saved theme preference or use system preference
  const savedTheme = localStorage.getItem('resume-theme') || 
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  if(savedTheme === 'dark') html.classList.add('dark');
  else html.classList.remove('dark');

  if(themeToggle) {
    themeToggle.addEventListener('click', function() {
      html.classList.toggle('dark');
      const theme = html.classList.contains('dark') ? 'dark' : 'light';
      localStorage.setItem('resume-theme', theme);
    });
  }
})();
