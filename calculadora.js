const visor = document.getElementById('visor')
let current = '0', prev= '', op=null;

function atualizaVisor(){
    let numero = '0'
    visor.textContent = current;
}

function appendNumber(num){//add numero
    if(current === '' || current ==='0') current = num;
    else current +=num
}

function deleteLast (){
    current = current.toString().slice(0,-1) ||'0'

}

function clearAll(){
    current= '0'; prev=''; op=null
}
function chooseOperation(operation){ //escolherOperador
    if(current ==='' ) return ; // se variavel current for vazia retorna nada
    
   if(prev!== '') calculate(); 
    op=operation; //var op = operation
    prev = current;
    current ='';

}

function calculate(){
    let result;
    const a = parseFloat(prev), b = parseFloat(current);
    //isNaN = IsNotaNumber "é um não numero"
    if(isNaN(a) || isNaN(b))return;
    switch(op){
        case '+': result = a + b; break;
        case '-': result = a - b; break;
        case '*': result = a * b; break;
        //b !== 0 ? a / b verificando se 
        // a var b é diferente de 0
        case '/': result = b !== 0 ? a / b: 'Error'; break;
        case '%': result = (a % b);break;
        default: return;

    }
    current = result.toString()
    op = null; prev='';

}
/*querySelectorAll está pegando a classs do html botões e acesso o html button

*/

document.querySelectorAll('.botoes button').forEach(btn => {
    btn.addEventListener('click', () => {
        const action = btn.dataset.action;
        const val = btn.textContent;
        console.log('action ->', action)
        console.log('val ->', val)

        // ! ele nega uma lógica
        if(!action) appendNumber(val)
        else if(action === 'delete')deleteLast()
        else if (action === 'igual'){
            calculate()
            console.log("visor query selector", visor.textContent)
        }
        else{
            chooseOperation({'+': '+', '-': '-', 'x': '*', '/': '/'}[val] || val);

        }
            atualizaVisor()

    })
})