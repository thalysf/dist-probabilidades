window.onload = main();
const propriedades = {
    xi: [],
    pxi: []
}

function main()
{
    const btnInsere = document.getElementById('btn-insere');
    const btnFinaliza = document.getElementById('btn-finaliza');
    const btnApaga = document.getElementById('btn-apaga');
    btnInsere.addEventListener('click', insere);
    btnFinaliza.addEventListener('click', finaliza);
    btnApaga.addEventListener('click', apaga);
}
function apaga(){
    propriedades.xi = [];
    propriedades.pxi = [];
    console.log(propriedades);
    document.getElementById('table-b').innerHTML = '';
    document.getElementById('area-table').classList.add('oculta');
}
function insere()
{
    event.preventDefault();
    const xi = document.getElementById('xi');
    const p_xi = document.getElementById('p-xi');
    const table_b = document.getElementById('table-b');
    const tr = document.createElement('tr');
    const tdxi = document.createElement('td');
    const tdpxi = document.createElement('td');
   
    if(!erros(xi, p_xi) || !acimade100(p_xi))
    {
        msgErro()
    }
    else{
        reset();
        document.getElementById('area-table').classList.remove('oculta');
        tdxi.innerText = xi.value;
        tr.appendChild(tdxi);
        tdpxi.innerText = p_xi.value;
        tr.appendChild(tdpxi);
        table_b.appendChild(tr);
        propriedades.xi.push(xi.value);
        propriedades.pxi.push(p_xi.value);
    }
    
}
function erros(input_xi, input_pxi)
{
    
    if(
        input_xi.value == '' || input_pxi.value == '' || input_pxi.value > 100
        || input_pxi.value < 1
        ) 
    {
        return 0;
    }
    else return 1;
}
function acimade100(input_pxi)
{
    let somat = 0;
    for(let i = 0; i < propriedades.xi.length; i++){
        somat += Number(propriedades.pxi[i]);
    }
    if((Number(somat) + Number(input_pxi.value)) > 100)
    {
        alert('Tabela completa\n Ou tentativa de inserir um valor que estoure os 100%');
       return 0;
    }
    return 1;
}
function msgErro(){
    
    document.getElementById('btn-insere').style.borderColor = 'tomato';
    document.getElementById('erros').innerHTML = '<em> Valores inseridos inválidos!</em>';
}
function reset()
{
    document.getElementById('btn-insere').style.borderColor = '#fff';
    document.getElementById('erros').innerHTML = '';
}

function finaliza()
{
    if(!verifica())
    {
        alert('Tabela incompleta!\n Somatório das probabilidades inferior a 100%');
    }
    else{
        resultados();
        document.getElementById('btn-finaliza').setAttribute("href", "#modal");
    }
}

function verifica()
{
    let somatorio = 0;
    // verifica se já temos 100% da probabilidade

    for(let i = 0; i < propriedades.pxi.length; i++)
    { 
        propriedades.pxi[i] = Number(propriedades.pxi[i]);
        propriedades.xi[i] = Number(propriedades.xi[i]);
        somatorio += propriedades.pxi[i]/100;
    }
    if(somatorio != 1) return 0;
    else return 1;
}
function resultados(){
    let valorEsperado = 0;
    let valorEsperado2 = 0;
    let desvioPadrao = 0;
    let variancia = 0;

    for(let i = 0; i < propriedades.xi.length; i++)
    {
        valorEsperado += propriedades.xi[i] * (propriedades.pxi[i]/100);
        valorEsperado2 += Math.pow(propriedades.xi[i], 2) * (propriedades.pxi[i]/100);
    }
    variancia = valorEsperado2 - Math.pow(valorEsperado, 2);
    desvioPadrao = Math.sqrt(variancia);

    escreveResultados(valorEsperado.toFixed(2), variancia.toFixed(2), desvioPadrao.toFixed(2));
}
function escreveResultados(ve = 0, vari = 0, desvp = 0)
{
    document.getElementById('v-e').innerText = `${ve}`;
    document.getElementById('var').innerText = `${vari}`;
    document.getElementById('dp').innerText = `${desvp}`;
}