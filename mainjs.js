const btn = document.getElementById("button-find");
const arrayOfName = [];
const arrayOfIdUsers = [];

function go(){
    btn.style.background = "grey";
    setTimeout(()=>btn.style.background = "#eee",60);
} 

async function getAnswers(){
    try {
        const question = document.getElementById('input-find').value;
        const sort = document.getElementById('selection').value;
        const request = await fetch(`https://api.stackexchange.com/2.2/similar?order=desc&sort=${sort}&title=${question}&site=stackoverflow`);
        const result = await request.json();
        console.log(result);
        for(let i = 0; i < result.items.length; i++){
            arrayOfName.push(result.items[i].owner.display_name)
            arrayOfIdUsers.push(result.items[i].owner.user_id);
        }
        localStorage.setItem("request", JSON.stringify(result));
        localStorage.setItem("usersName", arrayOfName);
        localStorage.setItem("usersId", arrayOfIdUsers);
        window.location = "find.html";
        return result;
    } catch (e) {
        alert("oooops" + e);
    }
    
}

//function createRecordAuthor(){
//   document.createElement
//}