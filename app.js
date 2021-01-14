const { app, BrowserWindow } = require("electron");
const fs = require("fs");

function createWindow() {
  const win = new BrowserWindow({
    width: 280,
    height: 570,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  win.loadFile("main.html");
}


function dis(val)
{
document.getElementById("dis").value+=val
}

function clear()
{
document.getElementById("dis").value="";
}


function call() {
  let num = document.getElementById("dis").value;
  let path = "./storage/history.txt";
  var date = new Date();
  var today = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();
  var time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
  


  if (fs.existsSync(path)) {
   
    fs.appendFile(
      path,
      num + " " + today + " " + time + " \n",
      function (err) {
        if (err) {
          console.log(err);
        }
      }
    );
  } else {
    fs.writeFile(path, num + " " + today + " " + time + " \n", (err) => {
      if (err) throw err;
    
    });
  }
};

function store() {
  let num = document.getElementById("dis").value;
  let name = document.getElementById("name").value;
  let path = "./storage/contacts.txt";



  if (fs.existsSync(path)) {
    
    fs.appendFile(path, name + " " + num + " \n", function (err) {
      if (err) {
        console.log(err);
      } 
    });
  } else {
    fs.writeFile(path, name + " " + number + " \n", (err) => {
      if (err) throw err;
    });
  }
}

function contacts() {
  let path = "storage/contacts.txt";

  fs.readFile(path, "utf-8", (err, contacts) => {
    if (err) {
      alert(err.message);
      return;
    }


    let ul = document.querySelector(".list-group");
    for (var i = 0; i < contacts.toString().split(/\r?\n/).length - 1; i++) {
    
      ul.innerHTML +=`
      <li class="list-group-item list-group-item-dark">
      <i class="fas fa-user-circle"></i>
          ${contacts.toString().split(/\r?\n/)[i]}
      </li>
      `;
    }
  });
}

function history() {
  let path = "storage/history.txt";

  fs.readFile(path, "utf-8", (err, history) => {
    if (err) {
      alert(err.message);
      return;
    }


    let ul = document.querySelector(".list-group");
    for (var i = 0; i < history.toString().split(/\r?\n/).length - 1; i++) {
    
      ul.innerHTML +=`
      <li class="list-group-item list-group-item-dark">
          ${history.toString().split(/\r?\n/)[i]}
      </li>
      `;
    }
  });
}



app.whenReady().then(createWindow);
