/* DATA CONTOH - nanti diganti data dari Google Sheet HRD.
   id = kode acak (bukan nomor urut) supaya orang luar tidak bisa menebak kartu orang lain. */
window.SKN_KARTU = {
  dasar: "https://ptskn-id.github.io/kartu/",
  /* Alamat web app Apps Script (Google Sheet HRD). Terisi = data diambil dari Sheet; kosong = pakai daftar "orang" di bawah. */
  api: "https://script.google.com/macros/s/AKfycbyQSnGu_-V0x0tvawbGSVqpMVc4rR37yHsb6-zVlVmDNM8JpGc-aDR7zZCmP0cZGI46ZQ/exec",
  perusahaan: "PT Satelit Komunika Nusantara",
  kantor: { wa: "628117566789", web: "https://ptskn-id.github.io/" },
  orang: []
};

/* Pembantu bersama: gambar QR sebagai SVG (butuh qrcode-generator). */
window.sknQR = function (teks) {
  var q = qrcode(0, "M"); q.addData(teks); q.make();
  var n = q.getModuleCount(), d = "", t = 2, s = n + t * 2;   /* t = tepi putih (zona tenang) */
  for (var r = 0; r < n; r++) for (var c = 0; c < n; c++)
    if (q.isDark(r, c)) d += "M" + (c + t) + " " + (r + t) + "h1v1h-1z";
  return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + s + " " + s +
    '" shape-rendering="crispEdges" role="img" aria-label="Kode QR"><rect width="' + s + '" height="' + s +
    '" fill="#fff"/><path fill="#000" d="' + d + '"/></svg>';
};
window.sknInisial = function (nama) {
  var p = String(nama).trim().split(/\s+/);
  return ((p[0] || "").charAt(0) + (p.length > 1 ? p[p.length - 1].charAt(0) : "")).toUpperCase();
};
window.sknTempat = function (o) {          /* "Wilayah Lampung · Depo Lampung", atau kosong */
  var b = [];
  if (o.wilayah) b.push("Wilayah " + o.wilayah);
  if (o.depo) b.push(o.depo);
  return b.join(" · ");
};
window.sknNomor = function (wa) {           /* 6281200000001 -> 0812-0000-0001 */
  var s = "0" + String(wa).replace(/^62/, "");
  return s.replace(/^(\d{4})(\d{4})(\d+)$/, "$1-$2-$3");
};
