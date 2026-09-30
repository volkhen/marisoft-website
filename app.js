(()=>{
  const c=window.MARISOFT_CONFIG||{};
  const u=document.getElementById('construction');
  const s=document.getElementById('site');
  u.hidden=!c.UNDER_CONSTRUCTION;
  s.hidden=!!c.UNDER_CONSTRUCTION;

  const downloads=document.getElementById('tav-downloads');
  if(downloads){
    fetch('/api/downloads',{headers:{'Accept':'application/json'}})
      .then(r=>{if(!r.ok) throw new Error('counter unavailable'); return r.json();})
      .then(data=>{
        if(Number.isFinite(data.downloads)) downloads.textContent=data.downloads.toLocaleString();
      })
      .catch(()=>{downloads.textContent='—';});
  }
})();
