function Nodo(id, label, title)
{
    this.id = id;
    this.label = label;
    this.title = title;
}

function Edge(from, to)
{
    this.from = from;
    this.to = to;
}

function addEdges()
{		
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function()
	{
		if(this.readyState == 4 && this.status == 200)
		{
			console.log(this.responseText);
		}
	};
	xhttp.open("GET", "mainInsertNeighborhood.php", true);
	xhttp.send();
}

function addNodeForm()
{	
		var nombre = document.getElementById("idNodo").value;
		var ip = document.getElementById("idIPNodo").value;
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function()
		{
			if(this.readyState == 4 && this.status == 200)
			{
				console.log(this.responseText);
			}
		};
		
		xhttp.open("GET", "mainInsertDevice.php?name="+nombre+"&ip="+ip, true);
		console.log("desde js envie datos");
		xhttp.send();
		document.getElementById("idNodo").value = "Nuevo nombre";
		document.getElementById("idNodo").value = "Nueva IP";		
}
function allowDrop(ev) 
{
    ev.preventDefault();
}

function drag(ev) 
{
    ev.dataTransfer.setData("text", ev.target.id);    
}


function creaServicios(idNodo)
{
    
    var textArea = document.getElementById("idTextArea");
    var inputCommand = document.getElementById("idComando");

    if(textArea && inputCommand)
    {
        textArea.remove();
        inputCommand.remove();
        console.log("en efecto hay un text area, lo borre");
    }

    var bolsa = []
    bolsa.push(document.getElementById('idAccesList'));
    bolsa.push(document.getElementById('idVlan'));
    bolsa.push(document.getElementById('idLabelIN'));
    bolsa.push(document.getElementById('idLabelOUT'));
    bolsa.push(document.getElementById('myDiv'));
    bolsa.push(document.getElementById('botonAccesList'));
    bolsa.push(document.getElementById('botonVLAN'));
    bolsa.push(document.getElementsByName('interfacesForAccesList'));
    bolsa.push(document.getElementsByName('interfacesForVLAN'));
    bolsa.push(document.getElementsByName('lugar'));
    var i=0;
    for(i=0; i< bolsa.length; i++)
    {
        console.log("*********** "+bolsa.length);
        if(bolsa[i])
        {
            bolsa[i].remove;
            console.log("removi ");
        }
       

    }
    
    var cell = document.getElementById("myDiv");
    if(cell)
    {
        if ( cell.hasChildNodes() )
        {
            while ( cell.childNodes.length >= 1 )
            {
                cell.removeChild( cell.firstChild );
            }
        }
        cell.remove;
    }
    


    var div2 = document.getElementById("div2");
    div2.innerHTML = "Servicios para el dispositivo "+idNodo;

    document.getElementById("div2").ondrop = (event) => {
        drop(idNodo, event);
    };
}

function drop(idNodo,ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    const objetoClonado =  document.getElementById(data).cloneNode(true);
    ev.target.appendChild(objetoClonado);
    if(data == "drag1")
    {
        crearRequisitosVlan(idNodo);
    }
    else if(data == "drag2")
    {
        crearRequisitosAccesList(idNodo)
    }
}
function crearRequisitosAccesList(id)
{
    var inputIdAccesList = document.createElement('input');
	inputIdAccesList.setAttribute("id","idAccesList");
	inputIdAccesList.value = "acces list";
    document.body.appendChild(inputIdAccesList);
        //solcitiar las interfaces del dispositivo en cuestion

    xhttp.onreadystatechange = function(){
            console.log(this.status);
            if(this.readyState == 4 && this.status == 200)
            {
                var respuesta = this.responseText;
                myJSON = JSON.parse(respuesta);
                var myDiv = document.getElementById("myDiv"); 
                if(myDiv)
                {
                    console.log("habia div, lo quito ");
                    myDiv.remove;
                }
                var myDiv = document.createElement("div");
                myDiv.setAttribute("id","myDiv");
                myDiv.float= "left";
                myDiv.width =  "260px";
                myDiv.height = "360px";
                myDiv.margin =  "10px";
                myDiv.padding = "10px";
                myDiv.border= "1px solid black";     

                var radioButtonIN = document.createElement("input");
                radioButtonIN.setAttribute('type', 'radio');
                radioButtonIN.setAttribute('value','in');
                radioButtonIN.setAttribute('name','lugar');
                radioButtonIN.setAttribute('id','idIN');
                radioButtonIN.checked = true;

                var radioButtonOUT = document.createElement("input");
                radioButtonOUT.setAttribute('type', 'radio');
                radioButtonOUT.setAttribute('value','out');
                radioButtonOUT.setAttribute('name','lugar');
                radioButtonIN.setAttribute('id','idOUT');

                var labelIN = document.createElement('label'); 
                labelIN.htmlFor = "idLabelIN"; 
                labelIN.appendChild(document.createTextNode('IN')); 
                labelIN.setAttribute('id','idLabelIN');

                var labelOUT = document.createElement('label'); 
                labelOUT.htmlFor = "idLabelIN"; 
                labelOUT.appendChild(document.createTextNode('OUT')); 
                labelOUT.setAttribute('id','idLabelOUT');

                document.body.appendChild(labelIN);
                document.body.appendChild(radioButtonIN);
                document.body.appendChild(labelOUT);
                document.body.appendChild(radioButtonOUT);
                document.body.appendChild(myDiv);
                console.log("ahora ya lo puse");


                for(i=0; i< myJSON.length; i++)
                {
                    
                    var label = document.createElement('label'); 
                    label.htmlFor = "idLabelCheckBox"; 
                    label.appendChild(document.createTextNode('Interface: ' + myJSON[i].name));
                    
                    
                    var x = document.createElement("INPUT");
                    x.setAttribute("type", "checkbox");
                    x.setAttribute("name","interfacesForAccesList");
                    x.setAttribute("value",myJSON[i].name);

                    br = document.createElement("br");

                    myDiv.appendChild(x);
                    myDiv.appendChild(label);
                    myDiv.appendChild(br);
                    //alert("sirve");
                }
                
            }
        };
        console.log("para la accesList envio "+id);
        xhttp.open("GET", "getInterfacesForVlan.php?id="+id, true);
        xhttp.send();

        var button = document.createElement("BUTTON");
        button.setAttribute("id","botonAccesList");
        button.innerHTML = "Crear acces list";
        button.addEventListener("click", function(){
            var selectedInterfaces = []
            var idAccesList = document.getElementById("idAccesList");
            var interfaces = document.getElementsByName("interfacesForAccesList");
            console.log("acces list -- "+idAccesList.value);
            for(i = 0; i< interfaces.length; i++)
            {
                if(interfaces[i].checked)
                {
                    console.log(interfaces[i]);
                    var aux  = { name: interfaces[i].value};
                    selectedInterfaces.push(aux);
                }
            }

			var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function()
            {
                if(this.readyState == 4 && this.status == 200)
                {
                    console.log("php dice (estoy en js): ");
                    console.log(this.response);
                }
            };
            var s = document.getElementsByName('lugar');
            if(s[0].checked)
            {
                xhttp.open("GET", "mainCreateAccesList.php?id="+id+"&interfaces="+JSON.stringify( selectedInterfaces)+"&accesList="+idAccesList.value+"&inOut=in", true);
            }
            else
            {
                xhttp.open("GET", "mainCreateAccesList.php?id="+id+"&interfaces="+JSON.stringify( selectedInterfaces)+"&accesList="+idAccesList.value+"&inOut=out", true);
            }
            
            xhttp.send()

        });
        document.body.appendChild(button);
}

function crearRequisitosVlan(id)
{
    var inputIdVlan = document.createElement('input');
	inputIdVlan.setAttribute("id","idVlan");
	inputIdVlan.value = "id vlan";
    document.body.appendChild(inputIdVlan);
        //solcitiar las interfaces del dispositivo en cuestion

    xhttp.onreadystatechange = function(){
            console.log(this.status);
            if(this.readyState == 4 && this.status == 200)
            {
                var respuesta = this.responseText;
                myJSON = JSON.parse(respuesta);
                var myDiv = document.getElementById("myDiv"); 
                if(myDiv)
                {
                    console.log("habia div, lo quito ");
                    myDiv.remove;
                }
                var myDiv = document.createElement("div");
                myDiv.setAttribute("id","myDiv");
                myDiv.float= "left";
                myDiv.width =  "260px";
                myDiv.height = "360px";
                myDiv.margin =  "10px";
                myDiv.padding = "10px";
                myDiv.border= "1px solid black";     
                document.body.appendChild(myDiv);
                console.log("ahora ya lo puse");
                for(i=0; i< myJSON.length; i++)
                {
                    
                    var label = document.createElement('label'); 
                    label.htmlFor = "idLabelCheckBox"; 
                    label.appendChild(document.createTextNode('Interface: ' + myJSON[i].name)); 
                    
                    var x = document.createElement("INPUT");
                    x.setAttribute("type", "checkbox");
                    x.setAttribute("name","interfacesForVLAN");
                    x.setAttribute("value",myJSON[i].name);

                    br = document.createElement("br");

                    myDiv.appendChild(x);
                    myDiv.appendChild(label);
                    myDiv.appendChild(br);
                    //alert("sirve");
                }
                
            }
        };
        console.log("para la vlan envio "+id);
        xhttp.open("GET", "getInterfacesForVlan.php?id="+id, true);
        xhttp.send();

        var button = document.createElement("BUTTON");
        button.setAttribute("id","botonVlan");
        button.innerHTML = "Crear vlan";
        button.addEventListener("click", function(){
            var selectedInterfaces = []
            var idVlan = document.getElementById("idVlan");
            var interfaces = document.getElementsByName("interfacesForVLAN");
            console.log("id vlan -- "+idVlan.value);
            for(i = 0; i< interfaces.length; i++)
            {
                if(interfaces[i].checked)
                {
                    console.log(interfaces[i]);
                    var aux  = { name: interfaces[i].value};
                    selectedInterfaces.push(aux);
                }
            }

			var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function()
            {
                if(this.readyState == 4 && this.status == 200)
                {
                    console.log("php dice (estoy en js): ");
                    console.log(this.response);
                }
            };
            xhttp.open("GET", "mainCreateVlan.php?id="+id+"&interfaces="+JSON.stringify( selectedInterfaces)+"&idVlan="+idVlan.value, true);
            xhttp.send()

        });
        document.body.appendChild(button);
}
    
function activateTerminal(idNodo)
{
	console.log("activando terminal para el nodo " + idNodo);
	comandos = []
	var textArea = document.getElementById("idTextArea");
	var inputCommand = document.getElementById("idComando");
        
	if(textArea && inputCommand)
	{
		textArea.remove();
		inputCommand.remove();
		console.log("en efecto hay un text area, lo borre");
    }
        
    var myDiv = document.getElementById("myDiv"); 
    var inputVlan = document.getElementById("idVlan");
    var botonVlan = document.getElementById("botonVlan");
    if(myDiv &&  inputVlan && botonVlan)
    {
        myDiv.remove();
        inputVlan.remove();
        botonVlan.remove();
    }

	console.log("no habia text area, lo agrego");		
	var inputComando = document.createElement('input');
	inputComando.setAttribute("id","idComando");
	inputComando.value = "comando...";
    // este sirve inputComando.setAttribute("onkeypress","agregarComando(event);");
            
    inputComando.onkeydown = (event) => {
        agregarComando(idNodo, event);
    };


	document.body.appendChild(inputComando);		
	var newTextArea = document.createElement('textarea');
	newTextArea.setAttribute("id", "idTextArea");
	newTextArea.cols = "100";	
	newTextArea.rows = "40";
	newTextArea.value = "Historial de dispositivo "+idNodo+"\n";
   
	document.body.appendChild(newTextArea);	
		
		
}

function agregarComando(idNodoGlobal, event)
{
	console.log("al menos llegue aqui");
	var textArea = document.getElementById("idTextArea");
	if(event.which == 13)
	{
		var inputCommand = document.getElementById("idComando");
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function()
		{
			console.log(this.readyState);
			console.log(this.status);
			if(this.readyState == 4 && this.status == 200)
			{
				console.log(this.responseText);
				textArea.value += this.responseText;
			}
		};
		console.log("envio---------"+idNodoGlobal + ","+ inputCommand.value); //aqui la uso
		xhttp.open("GET", "mainSendInstruction.php?id="+idNodoGlobal+"&inst="+inputCommand.value, true);
		xhttp.send()

		inputCommand.value = "";
	}	
}