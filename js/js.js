let range = document.getElementById('rng');
range.addEventListener('input', () => {
      let r = range;
      let d = document.getElementById('rangeValue');
      r.innerHTML = this.value;
      d.innerHTML = range.value;
});

let questions = 