const celulas = document.querySelectorAll(".celula");
let fimdeJogo = false;
const jogador_X= "X";
const jogador_O= "O";

const combinacoes =[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

document.addEventListener("click", (event) => {
   if(event.target.matches(".celula")){

    jogar(event.target.id,jogador_X);
    setTimeout(() => bot(), 500);


   }
});

function bot (){
    const posicaesDisponivel = [];
    for(index in celulas){
        if(!isNaN(index)){
           if(!celulas[index].classList.contains("X")
           &&
           !celulas[index].classList.contains("O")
           ){
            posicaesDisponivel.push(index);
           }
        }
        
    }
    const posicoesAleatorias = Math.floor(
        Math.random()*posicaesDisponivel.length
        );

       if(!fimdeJogo){
        jogar(posicaesDisponivel[posicoesAleatorias], 
            jogador_O);
       }
}


function jogar(id, turno){
    const celula = document.getElementById(id);
    celula.textContent = turno;
    celula.classList.add(turno);
    checarvencedor(turno);
}

function checarvencedor(turno){
    const vencedor = combinacoes.some((comb) =>{
     return comb.every((index) => {
    return celulas[index].classList.contains(turno);    
      });
        
    });
    if(vencedor){
        encerrajogo(turno);
    }else if (checarempate()){
        encerrajogo();
    }
}

 function checarempate(){
    let x=0;
    let o=0;

    for (index in celulas){
        if(!isNaN(index)){
            if(celulas[index].classList.contains(jogador_X)){
                x++;
            }
            if(celulas[index].classList.contains(jogador_O)){
                o++;
            }
        }
        }
    
    return x+o == 9? true:false;
}

function encerrajogo (vencedor = null){
    fimdeJogo = true;
    const telaescura = document.getElementById("tela-escura");
    const h2= document.createElement("h2");
    const h3= document.createElement("h3");
    let mensagem = null;

    telaescura.style.display = "block";
    telaescura.appendChild(h2);
    telaescura.appendChild(h3);

    if(vencedor){
        h2.innerHTML = `O player <span>${vencedor}</span> veceu`;
    }else{
        h2.innerHTML ="Empatou";
    }

    let contador = 3;
    setInterval(() => {
        h3.innerHTML =` reiniciando ${contador--}`;
    }, 1000);
    
    setTimeout(() => location.reload(), 4000);
    
}