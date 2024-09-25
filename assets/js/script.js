'use strict';

/**
 * element toggle function
 */

const elemToggleFunc = function (elem) { elem.classList.toggle("active"); }



/**
 * header sticky & go to top
 */

const header = document.querySelector("[data-header]");
const goTopBtn = document.querySelector("[data-go-top]");

window.addEventListener("scroll", function () {

  if (window.scrollY >= 10) {
    header.classList.add("active");
    goTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    goTopBtn.classList.remove("active");
  }

});



/**
 * navbar toggle
 */

const navToggleBtn = document.querySelector("[data-nav-toggle-btn]");
const navbar = document.querySelector("[data-navbar]");

navToggleBtn.addEventListener("click", function () {

  elemToggleFunc(navToggleBtn);
  elemToggleFunc(navbar);
  elemToggleFunc(document.body);

});



/**
 * skills toggle
 */

const toggleBtnBox = document.querySelector("[data-toggle-box]");
const toggleBtns = document.querySelectorAll("[data-toggle-btn]");
const skillsBox = document.querySelector("[data-skills-box]");

for (let i = 0; i < toggleBtns.length; i++) {
  toggleBtns[i].addEventListener("click", function () {

    elemToggleFunc(toggleBtnBox);
    for (let i = 0; i < toggleBtns.length; i++) { elemToggleFunc(toggleBtns[i]); }
    elemToggleFunc(skillsBox);

  });
}



/**
 * dark & light theme toggle
 */

const themeToggleBtn = document.querySelector("[data-theme-btn]");

themeToggleBtn.addEventListener("click", function () {

  elemToggleFunc(themeToggleBtn);

  if (themeToggleBtn.classList.contains("active")) {
    document.body.classList.remove("dark_theme");
    document.body.classList.add("light_theme");

    localStorage.setItem("theme", "light_theme");
  } else {
    document.body.classList.add("dark_theme");
    document.body.classList.remove("light_theme");

    localStorage.setItem("theme", "dark_theme");
  }

});

/**
 * check & apply last time selected theme from localStorage
 */

if (localStorage.getItem("theme") === "light_theme") {
  themeToggleBtn.classList.add("active");
  document.body.classList.remove("dark_theme");
  document.body.classList.add("light_theme");
} else {
  themeToggleBtn.classList.remove("active");
  document.body.classList.remove("light_theme");
  document.body.classList.add("dark_theme");
}


(function() {
  emailjs.init("KrIqtPYupZuDu3N0k"); // Thay YOUR_PUBLIC_KEY bằng Public Key bạn đã sao chép
})();

function isValidEmail(email) {
  const emailPattern = /^[^\s@]+@gmail\.com$/; // Chỉ chấp nhận email gmail
  return emailPattern.test(email);
}

document.getElementById('contact-form').addEventListener('submit', function(event) {
  event.preventDefault(); // Ngăn chặn hành vi mặc định của form

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim(); // Lấy số điện thoại
  const message = document.getElementById('message').value.trim();

  // Kiểm tra các trường thông tin
  if (!name || !email || !message) {
      alert('Vui lòng điền đầy đủ!');
      return;
  }

  const namePattern = /^[\p{L}\s]+$/u; // Kiểm tra tên hợp lệ
  if (!namePattern.test(name)) {
      alert('Tên không hợp lệ!');
      return;
  }

  if (!isValidEmail(email)) {
      alert('Vui lòng nhập địa chỉ email hợp lệ!');
      return;
  }

  if (message.length < 2) {
      alert('Hãy soạn ít nhất 2 ký tự để gửi!');
      return;
  }

  // Gửi email qua EmailJS
  emailjs.send('service_977w1cr', 'template_a72090p', {
      name: name,
      email: email,
      phone: phone, // Thêm số điện thoại nếu cần
      message: message
  })
  .then(function(response) {
      console.log('Email gửi thành công!', response.status, response.text);
      alert('Tin nhắn đã được gửi!');
      document.getElementById('contact-form').reset(); 
  }, function(error) {
      console.error('Lỗi khi gửi email.', error);
      alert('Gửi tin nhắn không thành công!');
  });
});


