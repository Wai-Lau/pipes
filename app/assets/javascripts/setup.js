function generateColor(name) {
  var data = [0];
  for (var i = 0; i < name.length; i++){
      data.push(name.charCodeAt(i));
  }
  let randomNumber = data.reduce((total, num)=>{return total + num})
  return '#' + Math.floor((Math.abs(Math.sin(randomNumber) * 16777215)) % 16777215).toString(16).padStart(6, '0');
}

update_preview_circle = (event) => {
  name = document.getElementById("name").value
  document.getElementById("preview_circle").style.color = generateColor(name);
}

finish_setup = (host, hsh) => {
  name = document.getElementById("name").value
  if (name) {
    startUpdating()
    GLOBAL_HOST = host
    GLOBAL_HSH = hsh
    GLOBAL_NAME = name
    document.getElementById("setup").style.display = "none"
  }
}
