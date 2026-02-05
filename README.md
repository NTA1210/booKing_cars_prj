# Run

- `npm start`

# API Reference

---

## ✅ Users (Người dùng)

- **GET** ` /api/users`  
  **Chức năng:** Lấy danh sách tất cả người dùng.

- **GET** ` /api/users/:id`  
  **Chức năng:** Lấy thông tin một người dùng theo `id`.

- **POST** ` /api/users`  
  **Chức năng:** Tạo người dùng mới.  
  **Body (JSON):** `{ "name": "Tên người dùng" }`  
  **Trả về:** đối tượng user mới.

- **PUT** ` /api/users/:id`  
  **Chức năng:** Cập nhật tên người dùng theo `id`.  
  **Body (JSON):** `{ "name": "Tên mới" }`  
  **Trạng thái:** 204 (No Content) nếu thành công.

- **DELETE** ` /api/users/:id`  
  **Chức năng:** Xoá người dùng theo `id`.  
  **Trạng thái:** 204 (No Content) nếu thành công.

---

## ✅ Cars (Xe)

- **GET** ` /api/cars`  
  **Chức năng:** Lấy danh sách xe. Hỗ trợ filter bằng query params:

  - `name` — lọc theo tên xe;
  - `status=AVAILABLE` cùng `startTime` & `endTime` — lọc những xe **còn trống** trong khoảng thời gian (định dạng thời gian giống input của app).  
    **Lỗi:** nếu `startTime` không trước `endTime` sẽ trả về 400.

- **GET** ` /api/cars/:id`  
  **Chức năng:** Lấy thông tin xe theo `id`.

- **POST** ` /api/cars`  
  **Chức năng:** Tạo xe mới.  
  **Body (JSON):** `{ "name": "Tên xe", "price": <số tiền theo đơn vị>" }`  
  **Trả về:** đối tượng car mới.

- **PUT** ` /api/cars/:id`  
  **Chức năng:** Cập nhật tên xe theo `id`.  
  **Body (JSON):** `{ "name": "Tên mới" }`  
  **Trạng thái:** 204 (No Content) nếu thành công.

- **DELETE** ` /api/cars/:id`  
  **Chức năng:** Xoá xe theo `id`.  
  **Trạng thái:** 204 (No Content) nếu thành công.

---

## ✅ Bookings (Đặt xe)

- **POST** ` /api/bookings`  
  **Chức năng:** Tạo booking mới (đặt xe).  
  **Body (JSON) bắt buộc:** `{ "userId": <id>, "carId": <id>, "startTime": "<start>", "endTime": "<end>" }`  
  **Xử lý:** kiểm tra tính hợp lệ của tham số, kiểm tra tình trạng sẵn có của xe; tính chi phí thuê theo `price` của xe.  
  **Trả về:** 201 cùng chi tiết booking (bao gồm `rentalCost` và thông tin `car`).  
  **Lỗi:** 400 nếu tham số không hợp lệ, 409 nếu xe không khả dụng cho khoảng thời gian đó.

- **GET** ` /api/bookings`  
  **Chức năng:** Lấy danh sách bookings. Hỗ trợ query param:
  - `userId` — lọc bookings theo người dùng.

---

🔧
