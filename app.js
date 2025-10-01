// app_basic_errors.js
// Mục đích: minh hoạ 5 lỗi cơ bản dễ thấy cho người mới học JS/Node

// 1) Assignment in `if` instead of comparison
let userInput = ""; 
if (userInput = "admin") { // ❌ LỖI: gán (=) thay vì so sánh (== hoặc ===)
  console.log("Welcome admin");
}
// ✅ fix: dùng == or ===
// if (userInput === "admin") { console.log("Welcome admin"); }


/* 2) Off-by-one error (vượt quá giới hạn mảng)
   Vòng lặp dùng <= sẽ truy cập index bằng length (không tồn tại) */
const items = ["a", "b", "c"];
for (let i = 0; i <= items.length; i++) { // ❌ LỖI: <= -> sẽ chạy i = 3, items[3] = undefined
  console.log("Item:", items[i]);
}
// ✅ fix: i < items.length
// for (let i = 0; i < items.length; i++) { console.log(items[i]); }


/* 3) Using an undeclared variable (implicit global or ReferenceError in strict mode)
   Người mới thường quên khai báo let/const/var */
function sumPrices(prices) {
  total = 0; // ❌ LỖI: total không được khai báo bằng let/const -> tạo biến global (xấu)
  for (let p of prices) {
    total += p;
  }
  return total;
}
// ✅ fix:
// function sumPrices(prices) {
//   let total = 0;
//   for (let p of prices) total += p;
//   return total;
// }


/* 4) Forgetting to await an async function (common with newcomers)
   Kết quả là biến nhận Promise chứ không phải giá trị mong muốn */
async function getUserName(id) {
  // giả sử getUserFromDB trả về Promise
  const user = getUserFromDB(id); // ❌ LỖI: thiếu await => user là Promise, không phải object
  console.log("User:", user.name); // sẽ lỗi vì user chưa phải object
}
// ✅ fix:
// const user = await getUserFromDB(id);


/* 5) Logging sensitive data to console (bad practice, dễ bị lộ khi debug)
   Dùng console.log để in mật khẩu / token là thói quen xấu */
const password = "P@ssw0rd"; // giả sử lấy từ đâu đó
console.log("User password is:", password); // ❌ LỖI: in mật khẩu ra console
// ✅ fix: không log mật khẩu, log thông tin không nhạy cảm hoặc mask:
// console.log("User password is: ****");


/* Helper demo function (fake) */
function getUserFromDB(id) {
  // mô phỏng trả về Promise
  return new Promise((resolve) => {
    setTimeout(() => resolve({ id, name: "User" + id }), 100);
  });
}

// Gọi để kích hoạt lỗi demo
sumPrices([10, 20, 30]);
getUserName(1);
