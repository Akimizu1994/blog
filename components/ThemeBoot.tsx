// Runs inline in <head> before paint. Reads localStorage / URL hash and
// applies the theme to <html> so users never see a Light → Dark flash on reload.
// Ported from theme-boot.js in the original design.
const script = `(function(){try{
var hash=(location.hash||'').replace('#','');
var themeFromHash=['light','dark','crt'].includes(hash)?hash:null;
var theme=themeFromHash||localStorage.getItem('blog.theme');
var accent=localStorage.getItem('blog.accent');
var scale=localStorage.getItem('blog.fontScale');
var rm=localStorage.getItem('blog.reduceMotion');
if(theme)document.documentElement.setAttribute('data-theme',theme);
if(accent)document.documentElement.style.setProperty('--accent',accent);
if(scale)document.documentElement.style.setProperty('--font-scale',scale+'%');
if(rm==='true')document.documentElement.setAttribute('data-reduce-motion','true');
}catch(e){}})();`

export function ThemeBoot() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />
}
