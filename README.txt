HƯỚNG DẪN SỬ DỤNG PHIẾU HỌC TẬP TƯƠNG TÁC
=========================================

1. Cách chạy:
- Giữ tất cả 5 file trong cùng 1 thư mục.
- Mở file index.html bằng bất kỳ trình duyệt web nào (Chrome, Edge, Safari...).

2. Cách tạo bài học mới / Thay đổi nội dung:
- TUYỆT ĐỐI KHÔNG sửa file app.js, index.html hay style.css.
- Chỉ mở file content.js bằng Notepad hoặc công cụ chỉnh sửa code (VS Code) và thay đổi dữ liệu trong biến LESSON_DATA.

3. Hướng dẫn soạn nội dung trong content.js:
- subject, grade, title, subtitle: Các thông tin chung hiển thị ở đầu trang.
- goals: Danh sách mục tiêu bài học.
- remember: Ghi nhớ hiển thị ở cuối bài.
- sections: Mảng chứa các câu hỏi, chia theo dạng. Hỗ trợ các type sau:

   A. Trắc nghiệm (type: "mcq"):
      {
          type: "mcq", title: "Vòng 1",
          questions: [
              { id: "q1", question: "Câu hỏi?", options: ["A", "B", "C"], answer: "A" }
          ]
      }

   B. Đúng/Sai (type: "truefalse"):
      {
          type: "truefalse", title: "Vòng 2",
          questions: [
              { id: "q2", text: "Nhận định...", answer: "Đúng" } // Giá trị answer là "Đúng" hoặc "Sai"
          ]
      }

   C. Điền khuyết (type: "fill"):
      {
          type: "fill", title: "Vòng 3",
          questions: [
              { id: "q3", prefix: "Đoạn đầu", suffix: "đoạn sau.", answers: ["dapan1", "dapan2"] }
          ]
      }

   D. Nối cột (type: "match"):
      {
          type: "match", title: "Vòng 4",
          questions: [
              { id: "q4", left: "Khái niệm", options: ["A", "B", "C"], answer: "A" }
          ]
      }

   E. Kéo thả (type: "dragdrop"):
      {
          type: "dragdrop", title: "Vòng 5",
          cards: [
              { id: "c1", label: "Chữ hiển thị" },
              { id: "c2", type: "image", src: "link_anh.jpg", label: "Ảnh" }
          ],
          targets: [
              { accept: "c1", text: "Vị trí đặt c1" }
          ]
      }

4. Lưu ý về công thức hóa học:
Để hiển thị chỉ số dưới (ví dụ CH3), bạn có thể dùng mã Unicode (CH₃, NH₂) trực tiếp trong content.js.
Hệ thống sẽ render chính xác.
