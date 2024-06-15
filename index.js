// BÀI TẬP 1: QUẢN LÝ SINH VIÊN
document.getElementById('btnTinhDiemChuan').onclick = function () {

  let diemThuNhat = document.getElementById('diemThuNhat').value * 1;
  let diemThuHai = document.getElementById('diemThuHai').value * 1;
  let diemThuBa = document.getElementById('diemThuBa').value * 1;
  let ketQuaDiemChuan = "";

  if (diemThuNhat <= 0 || diemThuHai <= 0 || diemThuBa <= 0) {
      ketQuaDiemChuan = `Bạn đã rớt. Do có điểm nhỏ hơn hoặc bằng 0`;
  } else {
      ketQuaDiemChuan = tinhDiemChuan(diemThuNhat, diemThuHai, diemThuBa);
  }
  document.getElementById('showDiemChuan').innerHTML = ketQuaDiemChuan;
}

let tinhDiemChuan = function (diemThuNhat, diemThuHai, diemThuBa) {
  let diemChuan = document.getElementById('diemChuan').value * 1;
  let area = document.getElementById('area').value;
  let object = document.getElementById('object').value;

  let tongDiem = diemThuNhat + diemThuHai + diemThuBa;
  let diemTongKet = tongDiem + diemKhuVuc(area) + diemDoiTuong(object);
  let ketqua = "";
  if (diemTongKet > diemChuan) {
      return ketqua = `Bạn đã Đậu. Có số điểm:  ${diemTongKet} điểm `
  } else {
      return ketqua = `Bạn đã Rớt. Có số điểm:  ${diemTongKet} điểm `
  }
}

let diemKhuVuc = function (area) {
  let diemKV = 0;
  switch (area) {
      case "A":
          diemKV = 2;
          break;
      case "B":
          diemKV = 1;
          break;
      default:
          diemKV = 0.5;
          break;
  }
  return diemKV;
}

let diemDoiTuong = function (object) {
  let diemDT = 0;
  switch (object) {
      case "1":
          diemDT = 2.5;
          break;
      case "2":
          diemDT = 1.5;
          break;
      default:
          diemDT = 1;
          break;
  }
  return diemDT;
}

// ----------------------------------------------------------------------------------

// BÀI TẬP 2: TÍNH TIỀN ĐIỆN

const soKw50_Dau = 500;
const soKw50_Ke = 650;
const soKw100_Ke = 850;
const soKw150_Ke = 1100;
const soKw1300 = 1300;

document.getElementById('btnTinhTienDien').onclick = function () {
  // Input:
  let hoTen = document.getElementById('hoTen').value;
  let laySoKw = document.getElementById('soKW').value * 1;

  let formatNumber = new Intl.NumberFormat("vn-VN");
  // Xử Lý:
  let tienDien = tinhTienDien(laySoKw);

  // Output:
  document.getElementById('showTienDien').innerHTML = `Họ tên: ${hoTen} ; Tiền điện phải trả: ${formatNumber.format(tienDien)} VNĐ`;
}

let tinhTienDien = function (soKW) {
  let thanhTien = 0;

  if (soKW >= 1 && soKW <= 50) {
      thanhTien = soKW * soKw50_Dau;
  } else if (soKW > 50 && soKW <= 100) {
      thanhTien = 50 * soKw50_Dau + (soKW - 50) * soKw50_Ke;
  } else if (soKW > 100 && soKW <= 200) {
      thanhTien = 50 * soKw50_Dau + 50 * soKw50_Ke + (soKW - 100) * soKw100_Ke;
  } else if (soKW > 200 && soKW <= 350) {
      thanhTien = 50 * soKw50_Dau + 50 * soKw50_Ke + 100 * soKw100_Ke + (soKW - 200) * soKw150_Ke;
  } else {
      thanhTien = 50 * soKw50_Dau + 50 * soKw50_Ke + 100 * soKw100_Ke + 150 * soKw150_Ke + (soKW - 350) * soKw1300;
  }
  return thanhTien

}

// ----------------------------------------------------------------------------------

// BÀI TẬP 3: TÍNH THUẾ THU NHẬP CÁ NHÂN

const thueSuat_05 = 0.05;
const thueSuat_10 = 0.1;
const thueSuat_15 = 0.15;
const thueSuat_20 = 0.2;
const thueSuat_25 = 0.25;
const thueSuat_30 = 0.3;
const thueSuat_35 = 0.35;
const tien_4tr = 4e+6;

document.getElementById('btnTinhThue').onclick = function () {
  // Input
  let nameInput = document.getElementById('nameInput').value;
  let tongThuNhap = document.getElementById('tongThuNhap').value * 1;
  let soNguoiPhuThuoc = document.getElementById('soNguoiPhuThuoc').value * 1;

  // tạo đối tượng Format Number
  let formatNumber = new Intl.NumberFormat("vn-VN");

  // Xử lý
  let tongTienThueCaNhan = thueCaNhan(tongThuNhap, soNguoiPhuThuoc)

  // Output
  if (tongTienThueCaNhan <= 0) {
      document.getElementById('showThueThuNhap').innerHTML = `Kiểm tra lại Tổng thu nhập`;
  } else {
      document.getElementById('showThueThuNhap').innerHTML = `Họ tên: ${nameInput}; Tiền thuế thu nhập cá nhân: ${formatNumber.format(tongTienThueCaNhan)} VNĐ`;
  }
}

// Hàm xử lý Thuế thu nhập Cá Nhân dựa trên Tổng thu nhập & Người phụ thuộc
let thueCaNhan = function (tongThuNhap, nguoiPhuThuoc) {
  let tienThueCaNhan = 0;

  if (tongThuNhap > 0 && tongThuNhap <= 60e+6) {
      tienThueCaNhan = ((tongThuNhap - tien_4tr) - (nguoiPhuThuoc * 16e+5)) * thueSuat_05;
  } else if (tongThuNhap > 60e+6 && tongThuNhap <= 120e+6) {
      tienThueCaNhan = ((tongThuNhap - tien_4tr) - (nguoiPhuThuoc * 16e+5)) * thueSuat_10;
      // tienThueCaNhan = (60e+6 * thueSuat_05) + ((tongThuNhap - 60e+6 - tien_4tr) - (nguoiPhuThuoc * 16e+5)) * thueSuat_10;
  } else if (tongThuNhap > 120e+6 && tongThuNhap <= 210e+6) {
      tienThueCaNhan = ((tongThuNhap - tien_4tr) - (nguoiPhuThuoc * 16e+5)) * thueSuat_15;
      // tienThueCaNhan = 60e+6 * thueSuat_05 + 60e+6 * thueSuat_10 + ((tongThuNhap - 120e+6 - tien_4tr) - (nguoiPhuThuoc * 16e+5)) * thueSuat_15;
  } else if (tongThuNhap > 210e+6 && tongThuNhap <= 384e+6) {
      tienThueCaNhan = ((tongThuNhap - tien_4tr) - (nguoiPhuThuoc * 16e+5)) * thueSuat_20;
  } else if (tongThuNhap > 384e+6 && tongThuNhap <= 624e+6) {
      tienThueCaNhan = ((tongThuNhap - tien_4tr) - (nguoiPhuThuoc * 16e+5)) * thueSuat_25;
  } else if (tongThuNhap > 624e+6 && tongThuNhap <= 960e+6) {
      tienThueCaNhan = ((tongThuNhap - tien_4tr) - (nguoiPhuThuoc * 16e+5)) * thueSuat_30;
  } else {
      tienThueCaNhan = ((tongThuNhap - tien_4tr) - (nguoiPhuThuoc * 16e+5)) * thueSuat_35;
  }
  return tienThueCaNhan;

}

// ----------------------------------------------------------------------------------

// BÀI TẬP 4: TÍNH TIỀN CÁP

document.getElementById('loaiKH').onchange = function () {
  let showDiv = document.getElementById('loaiKH').value;
  let laySoKetNoi = document.getElementById('soKetNoi');
  laySoKetNoi.style.display = (showDiv == "company") ? "block" : "none";
}

document.getElementById('btnTinhTienCap').onclick = function () {
  // input
  let maKH = document.getElementById('maKH').value;
  let loaiKH = document.getElementById('loaiKH').value;
  let tongTienCap = "";

  if (loaiKH === "personal") {
      tongTienCap = personal(loaiKH);
  } else if (loaiKH === "company") {
      tongTienCap = company(loaiKH);
  } else {
      alert("Vui lòng chọn Khách Hàng");
  }

  // output
  document.getElementById('showTienCap').innerHTML = `Mã khách hàng: ${maKH}; Tiền cáp cần thanh toán: $ ${tongTienCap.toFixed(2)}`;
}

let personal = function (loaiKH) {
  let soKenh = document.getElementById('soKenh').value * 1;

  const phiXylyHD = 4.5;
  const phiDichVu = 20.5;
  const thueKenhCaoCap = 7.5;
  let tienCapND = phiXylyHD + phiDichVu + thueKenhCaoCap * soKenh;

  return tienCapND;
}

let company = function (loaiKH) {
  const phiXylyHD = 15;
  const thueKenhCaoCap = 50;
  const phiDichVu = 75;
  let soKenh = document.getElementById('soKenh').value * 1;
  let soKetNoi = document.getElementById('soKetNoi').value * 1;

  let tienCapDN = 0;
  if (soKetNoi >= 0 && soKetNoi <= 10) {
      tienCapDN = phiXylyHD + phiDichVu + thueKenhCaoCap * soKenh;
  } else if (soKetNoi >= 10) {
      tienCapDN = phiXylyHD + phiDichVu + thueKenhCaoCap * soKenh + (soKetNoi - 10) * 5;
  } else {
      alert('Kiểm tra lại giá trị nhập');
  }
  return tienCapDN;
}