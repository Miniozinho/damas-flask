var bw = 500;
// Box height
var bh = 500;
// Padding
var p = 0;

var lar = 50;

var selectedi = -1;
var selectedj = -1;
var selected = false;
var estaemsequencia = false;

//1 = vez do jogador preto
//2 = vez do jogador vermelho
var jogador = 2;

function red(){
    jogador = 2;
    document.getElementById("selecionarcor").style.display = "none";

    socket.emit('jogador', {jogador:jogador});

}

function black(){
    jogador = 1;
    document.getElementById("selecionarcor").style.display = "none";
}


function drawBoard(){
    var canvas = document.getElementById("tabuleiro");
    var context = canvas.getContext("2d");

    context.beginPath();
    context.rect(0, 0, 500, 500);
    context.fillStyle = "#F7ECE8";
    context.fill();
     var nq = (bw / lar) - 1;
     context.strokeStyle = "black"
    context.fillStyle = "#795548";
    for (var i = 0 ; i <= nq; i++) {
        for (var j = 0 ; j <= nq; j++) {
            if ((i + j) % 2 != 0)
                context.fillRect(p + i*lar, p + j*lar, lar, lar)
        }
    }

    drawLinhas();

    context.strokeStyle = "black"
    context.fillStyle = "gray";
    context.stroke();

   /*
   Desenhar um circulo
   context.beginPath();
   o 0 representa o angulo inicial e o 2PI o angulo final
      context.arc(centerX, centerY, radius, 0, 2 * Math.PI);
      context.fillStyle = 'green';
      context.fill();
      context.lineWidth = 5;
      context.strokeStyle = '#003300';
      context.stroke();
      */
      drawPecas();
}

function drawLinhas(){
    var canvas = document.getElementById("tabuleiro");
    var context = canvas.getContext("2d");
    context.beginPath();
    context.lineWidth = 2;
for (var x = 0; x <= bw; x += lar) {
        context.moveTo(x , p);
        context.lineTo(x , bh);
    }

    for (var x = 0; x <= bh; x += lar) {
        context.moveTo(p,x + p);
        context.lineTo(bw + p,x + p);
    }
    context.stroke();
}

function drawPecas(){
    var canvas = document.getElementById("tabuleiro");
    var context = canvas.getContext("2d");

    for(var i =0;i<10;i++){
        for(var j = 0;j<10;j++){
            if(tabuleiro[i][j]==1){
                    context.beginPath();
                    context.arc((j*50)+25, (i*50)+25, 20, 0, 2 * Math.PI);
                    context.fillStyle = 'black';
                    context.fill();
                    context.lineWidth = 2;
                    context.strokeStyle = '#87CEFA';
                    context.stroke();
            }
        }
    }


    for(var i =0;i<10;i++){
        for(var j = 0;j<10;j++){
            if(tabuleiro[i][j]==2){
                    context.beginPath();
                    context.arc((j*50)+25, (i*50)+25, 20, 0, 2 * Math.PI);
                    context.fillStyle = '#e33333';
                    context.fill();
                    context.lineWidth = 2;
                    context.strokeStyle = '#5e1111';
                    context.stroke();
            }
        }
    }

    for(var i =0;i<10;i++){
        for(var j = 0;j<10;j++){
            if(tabuleiro[i][j]==20){
                    //var ctx = document.getElementById("star").getContext("2d");
                    context.beginPath();
                    context.fillStyle = "#e33333";
                    context.arc((j*50)+25, (i*50)+25, 20, 0, 2 * Math.PI);
                    context.fill();
                    context.lineWidth = 2;
                    context.strokeStyle = '#5e1111';
                    context.stroke();
                    //aqui desenha a estrla
                    //ctx.arc(100, 100, 100, 0, Math.PI * 2);
                    context.fillStyle = "yellow";
                    drawStar(context, (j*50)+25, (i*50)+25, 5, 17, 10);
                    context.fill();
                    context.lineWidth = 1;
                    context.strokeStyle = '#5e1111';
                    context.stroke();

                    // Draw a star. This function just does does the lineTo's. It is up to the caller
                    // to set the fillStyle and/or strokeStyle on the context, and call fill() or stroke()
                    // after this function returns.
                    // context     - The HTML5 canvas' context, obtained with getContext("2d").
                    // xCenter     - The x coordinate of the center of the star, in the context.
                    // yCenter     - The y coordinate of the center of the star, in the context.
                    // nPoints     - The number of points the start should have.
                    // outerRadius - The radius of a circle that would tightly fit the star's outer vertexes.
                    // innerRadius - The radius of a circle that would tightly fit the star's inner vertexes.
                    
            }
        }
    }

    for(var i =0;i<10;i++){
        for(var j = 0;j<10;j++){
            if(tabuleiro[i][j]==10){
                    context.beginPath();
                    context.fillStyle = "black";
                    context.arc((j*50)+25, (i*50)+25, 20, 0, 2 * Math.PI);
                    context.fill();
                    context.lineWidth = 2;
                    context.strokeStyle = '#87CEFA';
                    context.stroke();
                    //aqui desenha a estrla
                    //ctx.arc(100, 100, 100, 0, Math.PI * 2);
                    context.fillStyle = "yellow";
                    drawStar(context, (j*50)+25, (i*50)+25, 5, 17, 10);
                    context.fill();
                    context.lineWidth = 1;
                    context.strokeStyle = '#5e1111';
                    context.stroke();
            }
        }
    }


}

function drawStar(context, xCenter, yCenter, nPoints, outerRadius, innerRadius) {
                        context.beginPath();
                        for (var ixVertex = 0; ixVertex <= 2 * nPoints; ++ixVertex) {
                            var angle = ixVertex * Math.PI / nPoints - Math.PI / 2;
                            var radius = ixVertex % 2 == 0 ? outerRadius : innerRadius;
                            context.lineTo(xCenter + radius * Math.cos(angle), yCenter + radius * Math.sin(angle));
                        }
                    }
//a variavel jogador eh global
function drawSelected(i,j){
    var canvas = document.getElementById("tabuleiro");
    var context = canvas.getContext("2d");

        drawBoard();
    context.beginPath();
    context.arc((j*50)+25, (i*50)+25, 21, 0, 2 * Math.PI);
    var fill="";
    if(jogador ==1){
    fill = "black"
    } else if(jogador==2){
    fill = '#e33333';
    }
    context.fillStyle = fill;
    context.fill();
    context.lineWidth = 2;
    context.strokeStyle = '#FFDF00';
    context.stroke();
    if(tabuleiro[i][j]==jogador*10){
        context.fillStyle = "yellow";
        drawStar(context, (j*50)+25, (i*50)+25, 5, 17, 10);
        context.fill();
        context.lineWidth = 1;
        context.strokeStyle = '#5e1111';
        context.stroke();
    }



}


   var tabuleiro = new Array(10)

    for (i=0; i<10; i++){
        tabuleiro[i]=new Array(10);
    }

    for(i=0;i<10;i++){
        if(i<=3){
            if(i%2==0){
                //primeira e terceira coluna
                tabuleiro[i] = [0,1,0,1,0,1,0,1,0,1];
            }else{
                tabuleiro[i] = [1,0,1,0,1,0,1,0,1,0];
            }
        } else if(i>=6){
            if(i%2==0){
                //primeira e terceira coluna
                tabuleiro[i] = [0,2,0,2,0,2,0,2,0,2];
            }else{
                tabuleiro[i] = [2,0,2,0,2,0,2,0,2,0];
            }
        } else{
        tabuleiro[i] = [0,0,0,0,0,0,0,0,0,0];
        }
    }

function drawDica(i,j){
    var canvas = document.getElementById("tabuleiro");
    var context = canvas.getContext("2d");
    context.beginPath();
    //context.arc((j*50)+25, (i*50)+25, 13, 0, 2 * Math.PI);
    context.fillStyle = "rgba(0, 255, 0, 0.2)";
    context.fillRect((j*50)+1, (i*50)+1, 48, 48);
    
    // context.fillStyle = "green";
    // context.fill();
    // context.lineWidth = 2;
    // context.strokeStyle = 'black';
    context.stroke();
   
}

function dicaSequencia(i,j){
    if(tabuleiro[i+1][j+1]!=0&&tabuleiro[i+1][j+1]!=jogador&&tabuleiro[i+2][j+2]==0){
drawDica(i+2,j+2);
}
if(tabuleiro[i+1][j-1]!=0&&tabuleiro[i+1][j-1]!=jogador&&tabuleiro[i+2][j-2]==0){
drawDica(i+2,j-2);
}
if(tabuleiro[i-1][j+1]!=0&&tabuleiro[i-1][j+1]!=jogador&&tabuleiro[i-2][j+2]==0){
drawDica(i-2,j+2);
}
if(tabuleiro[i-1][j-1]!=0&&tabuleiro[i-1][j-1]!=jogador&&tabuleiro[i-2][j-2]==0){
drawDica(i-2,j-2);

}
}
function sequencia(i,j){
    var m=0;
    tabuleiro[selectedi+1][selectedj-1]!=0&&tabuleiro[selectedi+1][selectedj-1]!=jogador
if(tabuleiro[i+1][j+1]!=0&&tabuleiro[i+1][j+1]!=jogador&&tabuleiro[i+2][j+2]==0){

m++;
}
if(tabuleiro[i+1][j-1]!=0&&tabuleiro[i+1][j-1]!=jogador&&tabuleiro[i+2][j-2]==0){

m++;
}
if(tabuleiro[i-1][j+1]!=0&&tabuleiro[i-1][j+1]!=jogador&&tabuleiro[i-2][j+2]==0){

m++; 
}
if(tabuleiro[i-1][j-1]!=0&&tabuleiro[i-1][j-1]!=jogador&&tabuleiro[i-2][j-2]==0){

m++;
}
if(m!=0){
    console.log("entrou");
    selected==true;
    selectedi=i;
    selectedj=j;
    drawBoard();
    drawSelected(i,j);
    dicaSequencia(i,j);
    estaemsequencia=true;
    console.log(selected)
} else{
    if(jogador==1){
        jogador=2;
    } else { 
        jogador=1;
    }
    estaemsequencia=false;
    selected=false;
    selectedi=-1;
    selectedj=-1;
    drawBoard();
}

}

function fazerSequencia(y,x){
    if(y-selectedi == 2||y-selectedi == -2){
        if(x-selectedj == 2||x-selectedj == -2){
            console.log(selectedi," selectedi")
    console.log(selectedj," selectedj")
    console.log(selected," selected")
    console.log(y," y")
    console.log(x," x")
    //
            if(tabuleiro[selectedi+1][selectedj-1]!=0&&tabuleiro[selectedi+1][selectedj-1]!=jogador){
                console.log("entrou nessa bagaca")
                if(tabuleiro[y][x]==0&&selectedi+2==y&&selectedj-2==x){
                    tabuleiro[y][x] = jogador;
                    tabuleiro[selectedi][selectedj] = 0;
                    tabuleiro[selectedi+1][selectedj-1] = 0;
                    sequencia(y,x);
                    jogada();
                }
            } 
            if(tabuleiro[selectedi+1][selectedj+1]!=0&&tabuleiro[selectedi+1][selectedj+1]!=jogador){
                console.log("entrou nessa bagaca")
                if(tabuleiro[y][x]==0&&selectedi+2==y&&selectedj+2==x){
                    tabuleiro[y][x] = jogador;
                    tabuleiro[selectedi][selectedj] = 0;
                    tabuleiro[selectedi+1][selectedj+1] = 0;
                    sequencia(y,x);
                    jogada();
                }
            } 
            if(tabuleiro[selectedi-1][selectedj-1]!=0&&tabuleiro[selectedi-1][selectedj-1]!=jogador){
                console.log("entrou nessa bagaca")
                if(tabuleiro[y][x]==0&&selectedi-2==y&&selectedj-2==x){
                    console.log("entrou na bgagaca foda 2")
                    tabuleiro[y][x] = jogador;
                    tabuleiro[selectedi][selectedj] = 0;
                    tabuleiro[selectedi-1][selectedj-1] = 0;
                    sequencia(y,x);
                    jogada();
                }
            } 
            if(tabuleiro[selectedi-1][selectedj+1]!=0&&tabuleiro[selectedi-1][selectedj+1]!=jogador){
                console.log("entrou nessa bagaca")
                if(tabuleiro[y][x]==0&&selectedi-2==y&&selectedj+2==x){
                    tabuleiro[y][x] = jogador;
                    tabuleiro[selectedi][selectedj] = 0;
                    tabuleiro[selectedi-1][selectedj+1] = 0;
                    sequencia(y,x);
                    jogada();
                                }
                            }
        }
    }
}

function getCursorPosition(canvas, event) {
    //i == y
    //j == x

    var comeu=false;
    const rect = canvas.getBoundingClientRect()
    var x = event.clientX - rect.left
    var y = event.clientY - rect.top
    x = parseInt(x/50);
    y = parseInt(y/50);
    if(estaemsequencia==true){
        console.log("estaemsequencia");
        fazerSequencia(y,x);
        comeu=true;
    } else if (selected==false){
        //selecionar a peca para jogar
        //checar se tem uma peca ali
        if(tabuleiro[y][x] == jogador){
            //tem sua peca ai
            selectedi = y;
            selectedj = x;
            drawSelected(y,x);
            selected=true;
            if(jogador==2){
                //jogador 2
                if(x!=0&&x!=9){
                        //funcao normal
                        //falta checar se eh possivel
                        var i = y-1;
                        var j = x-1;
                        //comparar para esquerda superior
                        if (tabuleiro[i][j]==0){
                        drawDica(i,j);
                        } else if(tabuleiro[i][j]!=jogador&&tabuleiro[i-1][j-1]==0){
                        drawDica(i-1,j-1);
                        }

                        i = y-1;
                        j = x+1;
                        //compara direita superior
                        if (tabuleiro[i][j]==0){
                        drawDica(i,j);
                        } else if(tabuleiro[i][j]!=jogador&&tabuleiro[i-1][j+1]==0){
                        drawDica(i-1,j+1);
                        }

                    }else if(x==0){
                        var i = y-1;
                        var j = x+1;
                        //compara direita superior
                        if (tabuleiro[i][j]==0){
                        drawDica(i,j);
                        } else if(tabuleiro[i][j]!=jogador&&tabuleiro[i-1][j+1]==0){
                        drawDica(i-1,j+1);
                        }
                    } else if (x==9){
                        var i = y-1;
                        var j = x-1;
                        //comparar para esquerda superior
                        if (tabuleiro[i][j]==0){
                        drawDica(i,j);
                        } else if(tabuleiro[i][j]!=jogador&&tabuleiro[i-1][j-1]==0){
                        drawDica(i-1,j-1);
                        }

                    }
            } else {
                //jogador 1
                if(x!=0&&x!=9){
                        //funcao normal
                        //falta checar se eh possivel
                        var i = y+1;
                        var j = x-1;
                        //comparar para esquerda inferior
                        if (tabuleiro[i][j]==0){
                        drawDica(i,j);
                        } else if(tabuleiro[i][j]!=jogador&&tabuleiro[i+1][j-1]==0){
                        drawDica(i+1,j-1);
                        }
                        i = y+1;
                        j = x+1;
                        //compara direita inferior
                        if (tabuleiro[i][j]==0){
                        drawDica(i,j);
                        } else if(tabuleiro[i][j]!=jogador&&tabuleiro[i+1][j+1]==0){
                        drawDica(i+1,j+1);
                        }
                    } else if(x==0){
                        var i = y+1;
                        var j = x+1;
                        //compara direita superior
                        if (tabuleiro[i][j]==0){
                        drawDica(i,j);
                        } else if(tabuleiro[i][j]!=jogador&&tabuleiro[i+1][j+1]==0){
                        drawDica(i+1,j+1);
                        }
                    } else if (x==9){
                        var i = y+1;
                        var j = x-1;
                        //comparar para esquerda superior
                        if (tabuleiro[i][j]==0){
                        drawDica(i,j);
                        } else if(tabuleiro[i][j]!=jogador&&tabuleiro[i+1][j-1]==0){
                        drawDica(i+1,j-1);
                        }

                    }
            }

            

        }
    } else {
            //checa se o local clicado eh o msm que a peca selecionada
            //este if é para movimentacao simples
        if(y!=selectedi && x!=selectedj){
                //checa se esta a 1 de distancia para x e para y
        if(y-selectedi == 1||y-selectedi == -1){
            if(x-selectedj == 1||x-selectedj == -1){
                //faz a jogada para o jogador 2
                if(tabuleiro[y][x]==0){
                if(jogador==2&&selectedi>y){
                    //jogador 2 = vermelho
                    //jogador 1 = preto
                    
                    
                    tabuleiro[y][x] =  jogador;
                    tabuleiro[selectedi][selectedj] = 0;
                    selectedj= -1;
                    selectedi= -1;
                    selected=false;
                    if(jogador==1){jogador = 2} else{jogador=1}
                    drawBoard();
                    jogada();
                
                    } else if(jogador==1&&selectedi<y){
                        tabuleiro[y][x] =  jogador;
                    tabuleiro[selectedi][selectedj] = 0;
                    selectedj= -1;
                    selectedi= -1;
                    selected=false;
                    if(jogador==1){jogador = 2} else{jogador=1}
                    drawBoard();
                    jogada();
                        }
                    }
                    }
                
            }


            //faz o movimento de comer
            if(y-selectedi == 2||y-selectedi == -2){
                if(x-selectedj == 2||x-selectedj == -2){
                    //jogador1
                    if(jogador==1&&selectedi<y){
                        //tb[+][-] e tb[+][+]
                            if(tabuleiro[selectedi+1][selectedj-1]!=0&&tabuleiro[selectedi+1][selectedj-1]!=jogador){
                                if(tabuleiro[y][x]==0&&selectedi+2==y&&selectedj-2==x){
                                    tabuleiro[y][x] = jogador;
                                    tabuleiro[selectedi][selectedj] = 0;
                                    tabuleiro[selectedi+1][selectedj-1] = 0;
                                    sequencia(y,x);
                                    comeu=true;
                                    jogada();
                                    
                                }
                            } 

                             if(tabuleiro[selectedi+1][selectedj+1]!=0&&tabuleiro[selectedi+1][selectedj+1]!=jogador){
                                if(tabuleiro[y][x]==0&&selectedi+2==y&&selectedj+2==x){
                                    tabuleiro[y][x] = jogador;
                                    tabuleiro[selectedi][selectedj] = 0;
                                    tabuleiro[selectedi+1][selectedj+1] = 0;
                                    sequencia(y,x);
                                    comeu=true;
                                    jogada();
                                }
                            }

                        
                    } 
                    //jogador2
                    else if(jogador==2&&selectedi>y){
                        //tb[-][-] e tb[-][+]
                            if(tabuleiro[selectedi-1][selectedj-1]!=0&&tabuleiro[selectedi-1][selectedj-1]!=jogador){
                                if(tabuleiro[y][x]==0&&selectedi-2==y&&selectedj-2==x){
                                    tabuleiro[y][x] = jogador;
                                    tabuleiro[selectedi][selectedj] = 0;
                                    tabuleiro[selectedi-1][selectedj-1] = 0;
                                    sequencia(y,x);
                                    comeu=true;
                                    jogada();
                                    //paramos aqui
                                }
                            }

                             if(tabuleiro[selectedi-1][selectedj+1]!=0&&tabuleiro[selectedi-1][selectedj+1]!=jogador){
                                if(tabuleiro[y][x]==0&&selectedi-2==y&&selectedj+2==x){
                                    tabuleiro[y][x] = jogador;
                                    tabuleiro[selectedi][selectedj] = 0;
                                    tabuleiro[selectedi-1][selectedj+1] = 0;
                                    sequencia(y,x);
                                    comeu=true;
                                    jogada();
                                }
                            }

                        
                    }
                }
            }
            }
        if(selectedi==y&&selectedj==x&&comeu==false){
            console.log('entrou aqui troxa');
            selected=false;
            drawBoard();
        }
        }
    }


    function init() {
        const canvas = document.getElementById('tabuleiro')
        canvas.addEventListener('mousedown', function (e) {
            getCursorPosition(canvas, e)
        })

        canvas.addEventListener('mousemove', function (e) {
            getHover(canvas, e)
        })
        drawBoard();
    }




function getHover(canvas, evt){
        var rect = canvas.getBoundingClientRect();
        var x= evt.clientX - rect.left
        var y= evt.clientY - rect.top
        x = parseInt(x/50);
        y = parseInt(y/50);
        if(tabuleiro[y][x]==jogador&&selected==false){
            drawBoard();
            drawHover(y,x);
        } else if(selected==false){
            drawBoard();
        }

          
}

function drawHover(i,j){
    var canvas = document.getElementById("tabuleiro");
    var context = canvas.getContext("2d");

    context.beginPath();
    context.arc((j*50)+25, (i*50)+25, 22.5, 0, 2 * Math.PI);
    var fill="";
    if(jogador ==1){
    fill = "black"
    } else if(jogador==2){
    fill = '#e33333';
    }
    context.fillStyle = fill;
    context.fill();
    context.lineWidth = 2.5;
    context.strokeStyle = 'white';
    context.stroke();
}


socket = io.connect('//' + document.domain + ':' + location.port);

function jogada(){
    var tabule = JSON.stringify(tabuleiro);
    console.log(tabule)
    socket.emit('message', {name: tabule,jogador:jogador});
    };



    socket.on('jogou', function(data){
        console.log("entrou aqui")
        var a = JSON.parse(data.tabela);
        tabuleiro = a;
        drawBoard();

    });

    socket.on('message', function(data){
        console.log(data.name);
        var a = JSON.parse(data.name);
        tabuleiro = a;
        drawBoard();
    });