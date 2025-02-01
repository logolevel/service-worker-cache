console.log('hello app.js');

const btn = document.createElement('button');
btn.textContent = 'show log';
app.append(btn);

btn.addEventListener('click', function(e) {
    console.log('e', e);
})