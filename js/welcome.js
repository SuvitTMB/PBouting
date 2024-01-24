var dateString = new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' });
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear()+543;
today = dd + '/' + mm + '/' + yyyy;
var cleararray = "";
var ShortDate = "";
var dateString = "";
var Eid = "";
var xShortName = "";
var xEmpName = "";
var xEmpPosition = "";
var xEmpBranch = "";
var xEmpZone = "";
var xEmpBU = "";
var xEmpPhone = "";
var xStatusMember = "";


$(document).ready(function () {
  Connect_DB();
  dbRSOCMember = firebase.firestore().collection("RSOC_Member");
  CheckData();
});





function CheckData() {
  var str = "";
  dbRSOCMember.where('EmpID','==',parseInt(sessionStorage.getItem("EmpID_Outing")))
  //dbRSOCMember.where('EmpID','==',82622)
  .limit(1)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      Eid = doc.id;
      if(doc.data().StatusRegister==1) {
        location.href = "home.html";
      } else {
        xEmpName = doc.data().EmpName;
        xShortName = doc.data().ShortName;
        xEmpPosition = doc.data().EmpPosition;
        xEmpBranch = doc.data().EmpBranch;
        xEmpZone = doc.data().EmpZone;
        xEmpBU = doc.data().EmpBU;
        xStatusMember = doc.data().StatusMember;
        console.log(Eid);
        str += '<div><img src="'+ sessionStorage.getItem("LinePicture") +'" class="add-profile"></div>';
        str += '<div class="NameLine" style="margin-top:8px;">'+ sessionStorage.getItem("LineName")+'</div>';
        str += '<div style="margin-top:15px;font-size:14px;"><b>'+ xEmpName +'</b></div>';
        if(xEmpPosition!="") {
          str += '<div>'+ xEmpPosition +'</div>';
        }
        if(xEmpBranch!="") {
          str += '<div>'+ xEmpBranch +'</div>';
        }
        if(xEmpZone!="") {
          str += '<div>'+ xEmpZone +'</div>';
        }
        if(xEmpBU!="") {
          str += '<div>'+ xEmpBU +'</div>';
        }
        if(xEmpPhone !="") {
          str += '<div>'+ xEmpPhone +'</div>';
        }

        $("#MyProfile").html(str);  
      }
      document.getElementById("txtShortName").value = doc.data().ShortName;
      document.getElementById("txtEmpPhone").value = doc.data().EmpPhone;
      //document.getElementById("txtEmpName").value = doc.data().empName;
    });
  });
}


var stxtShortName = "";
var stxtEmpPhone = "";
function CheckRegister() {
  var str = "";
  var sCheckBottom= 0;
  stxtShortName = document.getElementById("txtShortName").value;
  stxtEmpPhone = document.getElementById("txtEmpPhone").value;
  if(stxtShortName !== null && stxtShortName !== '') { sCheckBottom = sCheckBottom+1; } else { str += '- กรุณาชื่อเล่นของคุณ\n'; }
  if(stxtEmpPhone !== null && stxtEmpPhone !== '') { sCheckBottom = sCheckBottom+1; } else { str += '- กรุณาระบุหมายเลขโทรศัพท์ของคุณ\n'; }
  if(sCheckBottom!=2) { 
    alert("คุณยังกรอกข้อมูลไม่ครบถ้วน\n\n"+str);
  } else {
    SaveEmpID();
  }
}


function SaveEmpID() {
  NewDate();
  var TimeStampDate = Math.round(Date.now() / 1000);
  stxtShortName = document.getElementById("txtShortName").value;
  stxtEmpPhone = document.getElementById("txtEmpPhone").value;
  //console.log(Eid);
  dbRSOCMember.doc(Eid).update({
    LineID : sessionStorage.getItem("LineID"),
    LineName : sessionStorage.getItem("LineName"),
    LinePicture : sessionStorage.getItem("LinePicture"),
    ShortName : stxtShortName,
    EmpPhone : stxtEmpPhone,
    TimeStampReg : dateString,
    StatusRegister : 1
  });
  var myTimeout = setTimeout(WelcomeAll, 2000);

  //GotoHomePage();
}


function WelcomeAll() {
  document.getElementById('id01').style.display='block';
}


/*
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
*/


function GotoHomePage() {
  dbProfile.where('lineID','==',sessionStorage.getItem("LineID"))
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      sessionStorage.setItem("EmpID_Outing", doc.data().empID);
      sessionStorage.setItem("EmpName_Outing", doc.data().empName);
      sessionStorage.setItem("EmpRefID", doc.id);
      sessionStorage.setItem("EmpPhone", doc.data().empPhone);
      sessionStorage.setItem("EmpAddress", doc.data().empAddress);
      dbProfile.doc(sessionStorage.getItem("EmpRefID")).update({
        linename : sessionStorage.getItem("LineName"),
        empPicture : sessionStorage.getItem("LinePicture"),
        linePicture : sessionStorage.getItem("LinePicture")
      });
    });
    location.href = "./home.html";
  });
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
