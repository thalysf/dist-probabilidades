window.onload = main();

function fat(n){
    if(n == 0 || n == 1) 
    {
        return 1;
    }
    let fat = 1;
    for(let x = n; x > 1; x--)
    {
        fat = fat * x;
    }
    return fat;
}
function comb(n, p)
{
    let comb = fat(n) / (fat(p) * (fat(n-p)));
    return comb;
}
function main()
{
    document.getElementById('x').focus();
    const btnFinaliza = document.getElementById('btn-finaliza');
    const btnApaga = document.getElementById('btn-apaga');
    btnApaga.addEventListener('click', apaga);
    btnFinaliza.addEventListener('click', form_binomial);
}
function apaga()
{
    limpaInputs(x, p, n);
}
function form_binomial()
{
    document.getElementById('erros').innerHTML = '';
    let x = document.getElementById('x');
    let p = document.getElementById('p');
    let n = document.getElementById('n');
    
    if(!valida(x.value, p.value, n.value))
    {
        document.getElementById('erros').innerHTML = 'Inputs Inválidos!';
    }
    else{
        const combi = comb(n.value, x.value);
        const prob = Number(p.value)/100;
        
        let resultado = combi * Math.pow(prob, x.value) * Math.pow(1 - prob, n.value - x.value);
        const esperanca = n.value * prob;
        const variancia = n.value * prob * (1 - prob);
        const desvioPadrao = Math.sqrt(variancia);
        resultado = resultado * 100;
        chamaModal(resultado.toFixed(2), esperanca.toFixed(2), variancia.toFixed(2), desvioPadrao.toFixed(2));
    }
    limpaInputs(x, p, n);
}
function chamaModal(res, espe, vari, desvp)
{
    document.getElementById('btn-finaliza').setAttribute("href", "#modal");
    document.getElementById('prob').innerHTML = `${res} %`;
    document.getElementById('espe').innerHTML = `${espe}`;
    document.getElementById('vari').innerHTML = `${vari}`;
    document.getElementById('desvp').innerHTML = `${desvp}`;
}
function limpaInputs(x, p, n)
{
    x.value = '';
    p.value = '';
    n.value = '';
}
function valida(x, p, n)
{
    if(x == '' || p == '' || n == '')
    {
        return 0;
    }
    return 1;
}
