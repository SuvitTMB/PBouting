var dateString = new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' });
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear()+543;
today = dd + '/' + mm + '/' + yyyy;
var cleararray = "";
var ShortDate = "";

$(document).ready(function () {
  var str = "";
  //if(sessionStorage.getItem("EmpID_Outing")==null) { location.href = "index.html"; }

  str += '<div><img src="'+ sessionStorage.getItem("LinePicture") +'" class="add-profile"></div>';
  str += '<div class="NameLine" style="margin-top:8px;">'+ sessionStorage.getItem("LineName")+'</div>';
  $("#MyProfile").html(str);  
  Connect_DB();
  dbProfile = firebase.firestore().collection("CheckProfile");
  //dbBootCamp = firebase.firestore().collection("BootMember");
  //dbGiftRewards = firebase.firestore().collection("GiftNewYear2567");
  //dbCardNewyear = firebase.firestore().collection("NewyearCard2567");
  CheckData();
});



function CheckData() {
  dbProfile.where('lineID','==',sessionStorage.getItem("LineID"))
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      CheckFoundData = doc.data().statusconfirm;
        EidProfile = doc.id;
        document.getElementById("txtEmpID").value = doc.data().empID;
        document.getElementById("txtEmpName").value = doc.data().empName;
        document.getElementById("txtEmpPhone").value = doc.data().empPhone;
    });
  });
}


var stxtEmpID = "";
var stxtEmpName = "";
var stxtEmpPhone = "";
function CheckRegister() {
  var str = "";
  var sCheckBottom= 0;
  stxtEmpID = document.getElementById("txtEmpID").value;
  stxtEmpName = document.getElementById("txtEmpName").value;
  stxtEmpPhone = document.getElementById("txtEmpPhone").value;
  if(stxtEmpID !== null && stxtEmpID !== '') { sCheckBottom = sCheckBottom+1; } else { str += '- กรุณากรอกรหัสพนักงาน\n'; }
  if(stxtEmpName !== null && stxtEmpName !== '') { sCheckBottom = sCheckBottom+1; } else { str += '- กรุณากรอกชื่อ-นามสกุลของท่าน\n'; }
  if(stxtEmpPhone !== null && stxtEmpPhone !== '') { sCheckBottom = sCheckBottom+1; } else { str += '- กรุณากรอกหมายเลขโทรศัพท์ของท่าน\n'; }
  if(sCheckBottom!=3) { 
    alert("คุณยังกรอกข้อมูลไม่ครบถ้วน\n\n"+str);
  }
  if(sCheckBottom==3) {
    dbProfile.add({
      lineID : sessionStorage.getItem("LineID"),
      linename : sessionStorage.getItem("LineName"),
      linePicture : sessionStorage.getItem("LinePicture"),
      empPicture : sessionStorage.getItem("LinePicture"),
      empID : stxtEmpID,
      empName : stxtEmpName,
      empPhone : stxtEmpPhone,
      empRH : '',
      empBr : '',
      empAddress : '',
      empAccept : '',
      statusconfirm : 2,
      statusedit : 1,
      statuspass : 0,
      lastcheckin : '',
      memo : '',
      EmpCheckIN : 0,
      DateAccept : '',
      DateRegister : dateString
    });
    alert("Save Data Done");
    ConfirmAddData();
  } 

}


function ConfirmAddData() {
  location.href = "https://liff.line.me/1657509542-RoEBbvpq";
}


function NewDate() {
  var months = new Array(12);
  months[0] = "January";
  months[1] = "February";
  months[2] = "March";
  months[3] = "April";
  months[4] = "May";
  months[5] = "June";
  months[6] = "July";
  months[7] = "August";
  months[8] = "September";
  months[9] = "October";
  months[10] = "November";
  months[11] = "December";
  var today = new Date();
  var day = today.getDate() + "";
  var monthEN = (today.getMonth()) + "";
  var month = (today.getMonth() + 1) + "";
  var year = today.getFullYear() + "";
  var hour = today.getHours() + "";
  var minutes = today.getMinutes() + "";
  var seconds = today.getSeconds() + "";
  var ampm = hour >= 12 ? 'PM' : 'AM';
  day = checkZero(day);
  month = checkZero(month);
  year = checkZero(year);
  hour = checkZero(hour);
  minutes = checkZero(minutes);
  seconds = checkZero(seconds);
  dateString = day + "/" + month + "/" + year + " " + hour + ":" + minutes + ":" + seconds +" "+ ampm;

  xdateCheck = months[monthEN] + " " + day + ", " + year + " " + hour + ":" + minutes + ":" + seconds ;
  //var GetWatingTime = "april 25, 2022 12:30:00";


}


function checkZero(data){
  if(data.length == 1){
    data = "0" + data;
  }
  return data;
}
