const bt_Nwline = document.getElementById('New-Line')
  ,   xForm     = document.getElementById('form-X')
  ,   wTable    = xForm.querySelector('table')
  ,   baseLine  = wTable.querySelector('thead tr:nth-of-type(3)')
  ,   tBody     = wTable.querySelector('tbody')
  ,   tPayout   = wTable.querySelector('tfoot td:nth-of-type(2)')
  ;
xForm.onsubmit = e=>e.preventDefault()  // disable form submit;
xForm.onreset =_=>{ tPayout.textContent = '0.00' };
function betCalculator()
  {
  let bet  = xForm.betAmount.valueAsNumber || 0
    , odds = [...tBody.querySelectorAll('input')]
              .filter(ml=>!isNaN(ml.valueAsNumber) )
              .reduce((odd,ml)=> odd *= ml.valueAsNumber >= 0
                                      ? (ml.valueAsNumber /100) +1
                                      : (100 / Math.abs(ml.valueAsNumber)) +1
                    ,1)
  tPayout.textContent = ((odds *bet).toFixed(2)).replace(/\B(?=(\d{3})+(?!\d))/g,',')
  }
betCalculator();
bt_Nwline.onclick=_=>
  {
  tBody.appendChild( baseLine.cloneNode(true)) 
  }
tBody.onclick=e=>
  {
  if (!e.target.matches('button')) return
  wTable.deleteRow(e.target.closest('tr').rowIndex)
  betCalculator()
  }
xForm.oninput = betCalculator;
// jjjjjj