//шелуха для модального окна
const modal = document.getElementById("modal");
const close = document.getElementById('closed');
const modalCont = document.getElementById('content');

//отображение модального окна с таблицей
function opacityFunc(){
    modalCont.style.opacity = '1';
}
function opacityModalAndRequest(){  
    modal.style.display = "block";
    setTimeout(opacityFunc, 100);   
}

//закрытие модального окна
close.addEventListener('click', function(){
    modal.style.display = "none";
    modalCont.style.opacity = '0';
});

//вставка данных в таблицу
let table = document.getElementById('table');
parseData(localStorage.getItem("request"),table);
let lengthRequest = JSON.parse(localStorage.getItem("request")).items.length;
/*for(let i = 0; i < lengthRequest; i++){
    table.insertAdjacentHTML('beforeend',
        `<tr>
           <td>${JSON.parse(localStorage.getItem("request")).items[i].owner.display_name}</td>
           <td>${JSON.parse(localStorage.getItem("request")).items[i].title}</td>
           <td>${JSON.parse(localStorage.getItem("request")).items[i].answer_count}</td>
           <td>${JSON.parse(localStorage.getItem("request")).items[i].tags.join(', ')}</td>
        </tr>`);
}*/
//функция вставки данных в таблицу из запроса
function parseData(request,elem){
    let requestJson;
    let lengthRequest;
    if(typeof request == "string"){
        requestJson = JSON.parse(request);
    }
    else{
        requestJson = request;
    }
    lengthRequest = requestJson.items.length;
    for(let i = 0; i < lengthRequest; i++){
        elem.insertAdjacentHTML('beforeend',
            `<tr>
               <td>${requestJson.items[i].owner.display_name}</td>
               <td>${requestJson.items[i].title}</td>
               <td>${requestJson.items[i].answer_count}</td>
               <td>${requestJson.items[i].tags.join(', ')}</td>
            </tr>`);
    }
}



let userName;
let id;
/*повесил на первый столбец события, для открытия модального окна и получил id
с помощью имя автора*/
for(let i = 1; i < lengthRequest; i++){
    table.rows[i].cells[0].addEventListener('click', opacityModalAndRequest);
    table.rows[i].cells[0].addEventListener('click', event => {
        userName = event.toElement.innerText;
        id = localStorage.getItem("usersId").split(',')[
                localStorage.getItem("usersName").split(',').findIndex(item => item == userName)
        ];
        console.log(id);
        getQuestions(id);
    });
}

//получение всех вопросов пользователя и внесение их
async function getQuestions(id){
    try {
        const req = await fetch(`https://api.stackexchange.com/2.2/users/${id}/questions?order=desc&sort=activity&site=stackoverflow`)
        const questions = await req.json();
        console.log(questions);
        let scroll;
        scroll = document.getElementById("tablemodal").overflow = "auto";
        parseData(questions,document.getElementById("tablemodal"))
    }
    catch(e){
        console.log(e);
    }
}



