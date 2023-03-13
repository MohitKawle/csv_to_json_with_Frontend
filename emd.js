
const apiForReadonlyFile="http://localhost:8080/";
const apiForWriteonlyFile="http://localhost:8080/"
let display_data_length="1"     
        
let display_existing_data=document.getElementById("display_existing_data")


async function getData(path,destination){
    
   let data= await fetch(path)
       data=await data.json()
      // console.log(data)
       destination.innerHTML=""
       if(data.length==0){
        destination.innerHTML="No Data to Display"
        return
       }
       createThead(destination)
       
    let start=0
    if(data.length>10){
        start=data.length-10
    
    }
   for(i=start;i<data.length;i++){
    let tr=document.createElement('tr')
    let th1=document.createElement('th')
    th1.innerHTML=data[i].PARAMETER
    let th2=document.createElement('th')
    th2.innerHTML=data[i].READING
    let th3=document.createElement('th')
    th3.innerHTML=data[i].TIME
    let th4=document.createElement('th')
    th4.innerHTML=data[i].DATE
    
    tr.append(th1,th2,th3,th4)
    
    if(i-start<9 && display_data_length==1){continue;}
    destination.append(tr)




   }
   
}

function createThead(path){
    let tr=document.createElement('tr')
    let th1=document.createElement('th')
    th1.innerHTML="PARAMETER"
    let th2=document.createElement('th')
    th2.innerHTML="READING"
    let th3=document.createElement('th')
    th3.innerHTML="TIME"
    let th4=document.createElement('th')
    th4.innerHTML="DATE"


    tr.append(th1,th2,th3,th4)
    path.append(tr)
}


//adding function
async function addDataToCsv(){
   
    
    let PARAMETER=document.getElementById("Parameter")
    let Reading=document.getElementById("Reading")
    let dateObj = new Date();
    let month = String(dateObj.getMonth() + 1).padStart(2, '0');
    let year = dateObj.getFullYear();
    let day = String(dateObj.getDate()).padStart(2, '0');
    let date = day + '/' + month + '/' + year;
    let time=dateObj.getHours() + ":"+ dateObj.getMinutes() + ":" + dateObj.getSeconds()
    let obj={"PARAMETER":PARAMETER.value,"SET_POINT":Reading.value,"DATE":date,"TIME":time}

    console.log(obj)
    fetch(apiForWriteonlyFile,{method: "POST",headers: {
    'Content-Type': 'application/json'},
      body: JSON.stringify(obj)})
      .then(res=>{ 
        if(res.statusText=='OK'){
        alert("data added");
        PARAMETER.value="";
        Reading.value="";
    }else{
        alert("Something went Wrong"
        )}});

}
function show_button(){
    let show_button=document.getElementById("show_data_buttons")
    let hide_button=document.getElementById("hide_data_buttons")
    display_data_length=10
    show_button.style.display="none"
    hide_button.style.display="block"
    getData(apiForReadonlyFile,display_existing_data);
}
function hide_button(){
    let show_button=document.getElementById("show_data_buttons")
    let hide_button=document.getElementById("hide_data_buttons")
    display_data_length=1
    show_button.style.display="block"
    hide_button.style.display="none"
    getData(apiForReadonlyFile,display_existing_data);
}


//interval for getting data and first call for 2s delay
getData(apiForReadonlyFile,display_existing_data);
setInterval(()=>{
    getData(apiForReadonlyFile,display_existing_data);
},2000)      