const contactForm =document.querySelector('.contact-form');

   let fullName =document.getElementById('fullname');
   let phone =document.getElementById('phone');
   let email =document.getElementById('email');
   let subject =document.getElementById('subject');
   let message=document.getElementById('message');


contactForm.addEventListener('submit',(e)=>{
   e.preventDefault() ;

   let formData ={
       fullName: fullName.value,
       phone:  phone.value,
       email:  email.value,
       subject: subject.value,
       message: message.value
   }
   let xhr = new XMLHttpRequest();
   xhr.open('POST','/');
   xhr.setRequestHeader('content-type','application/json');
   xhr.onload = function(){
       console.log(xhr.responseText);
       if(xhr.responseText =='success'){
       alert('Email sent');
       fullName.value ='';
       phone.value ='';
       email.value ='';
       subject.value ='';
       message.value ='';
   }else{
       alert('something went wrong why sending the mail');
   }
}
xhr.send(JSON.stringify(formData));
})